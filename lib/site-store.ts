import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { defaultSite, type SiteContent } from "@/content/site";
import { isNoticeAudience, isNoticeDate } from "@/content/notices";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeSrc(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  if (value.includes("..") || value.includes("\\") || value.includes("?")) return fallback;
  if (
    value.startsWith("/images/") ||
    value.startsWith("/uploads/") ||
    value.startsWith("/api/media/")
  ) {
    return value;
  }
  if (/^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/(media|documents)\//.test(value)) {
    return value;
  }
  return fallback;
}

function asText(value: unknown, fallback: string, max = 4000) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, max);
}

function sanitize(value: unknown, fallback: unknown, key = ""): unknown {
  if (key === "notifications") {
    const rows = Array.isArray(value) ? value : defaultSite.notifications;
    return rows.slice(0, 20).map((item) => {
      const source = isRecord(item) ? item : {};
      const date = typeof source.date === "string" ? source.date.trim() : "";
      return {
        date: isNoticeDate(date) ? date : "",
        title: asText(source.title, ""),
        isNew: source.isNew === true,
        audience: isNoticeAudience(source.audience) ? source.audience : "home",
      };
    }).filter((notice) => notice.title);
  }
  if (key === "nav" && Array.isArray(fallback)) {
    const incoming = Array.isArray(value) ? value : [];
    return fallback.map((item, index) => {
      const row = isRecord(item) ? item : { href: "", label: "" };
      const next = isRecord(incoming[index]) ? incoming[index] : {};
      const childSource = Array.isArray(row.children) ? row.children : [];
      const incomingChildren = Array.isArray(next.children) ? next.children : [];
      const children = childSource.map((child, childIndex) => {
        const base = isRecord(child) ? child : { href: "", label: "" };
        const incomingChild = isRecord(incomingChildren[childIndex]) ? incomingChildren[childIndex] : {};
        return {
          href: String(base.href),
          label: asText(incomingChild.label, String(base.label), 48),
        };
      });
      return {
        href: String(row.href),
        label: asText(next.label, String(row.label), 40),
        ...(children.length ? { children } : {}),
      };
    });
  }

  if (key === "src" || key === "ogImage" || (key === "image" && typeof fallback === "string")) {
    return safeSrc(value, String(fallback));
  }

  if (Array.isArray(fallback) && fallback.every((item) => typeof item === "string")) {
    const incoming = Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
    const list = (incoming.length ? incoming : (fallback as string[]))
      .slice(0, 12)
      .map((item) => String(item).trim().slice(0, 500))
      .filter(Boolean);
    if ((fallback as string[]).length === 2) {
      const base = fallback as string[];
      return [list[0] || base[0], list[1] || base[1]];
    }
    return list.length ? list : fallback;
  }

  if (Array.isArray(fallback)) {
    const incoming = Array.isArray(value) ? value : [];
    const sample = fallback[0];
    const useIncoming = incoming.length > 0 || (Array.isArray(value) && key === "items");
    const rows = (useIncoming ? incoming : fallback).slice(0, 20);
    return rows.map((item) => sanitize(item, sample));
  }

  if (isRecord(fallback)) {
    const source = isRecord(value) ? value : {};
    const out: Record<string, unknown> = {};
    for (const child of Object.keys(fallback)) {
      out[child] = sanitize(source[child], fallback[child], child);
    }
    return out;
  }

  if (typeof fallback === "string") {
    if (key === "date") {
      if (typeof value !== "string") return fallback;
      const trimmed = value.trim();
      if (!trimmed) return "";
      return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : fallback;
    }
    return asText(value, fallback);
  }

  if (typeof fallback === "boolean") {
    return typeof value === "boolean" ? value : fallback;
  }

  return fallback;
}

export function normalizeSite(input: unknown): SiteContent {
  return sanitize(input, defaultSite) as SiteContent;
}

function databaseError(message: string | undefined, fallback: string) {
  const text = message ?? "";
  if (text.includes("fetch failed")) {
    return "Unable to reach Supabase. Check the project URL in NEXT_PUBLIC_SUPABASE_URL and confirm the project is online.";
  }
  if (text.includes("521") || text.includes("Web server is down") || text.includes("<!DOCTYPE")) {
    return "The Supabase project is paused or its server is down. Restore it in the Supabase dashboard, then try again.";
  }
  if (text.toLowerCase().includes("permission denied")) {
    return "Supabase denied access. Check the server key and the grants in supabase/schema.sql.";
  }
  return text.trim() || fallback;
}

async function readStored(supabase = getSupabase()) {
  const { data, error } = await supabase.from("site_content").select("body,updated_at").eq("key", "site").maybeSingle();
  if (error) throw new Error(databaseError(error.message, "The site record could not be read."));
  return { content: normalizeSite(data?.body), version: data?.updated_at as string | undefined };
}

function withUrl(content: SiteContent) {
  return {
    ...content,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://newschool-beige.vercel.app",
  };
}

async function readCachedSite() {
  "use cache";
  cacheTag("site");
  try {
    const stored = await readStored();
    cacheLife("max");
    return withUrl(stored.content);
  } catch {
    cacheLife({ stale: 30, revalidate: 60, expire: 300 });
    return withUrl(normalizeSite(defaultSite));
  }
}

export async function getSite() {
  if (!supabaseConfigured()) return withUrl(normalizeSite(defaultSite));
  return readCachedSite();
}

export async function readSiteForAdmin() {
  await connection();
  return (await readStored()).content;
}

function prepareSite(input: unknown) {
  const content = normalizeSite(input);
  const digits = content.contact.phoneDisplay.replace(/[^\d+]/g, "");
  content.contact.phoneHref = digits ? `tel:${digits}` : defaultSite.contact.phoneHref;
  const altDigits = content.contact.phoneAltDisplay.replace(/[^\d+]/g, "");
  content.contact.phoneAltHref = altDigits ? `tel:${altDigits}` : defaultSite.contact.phoneAltHref;
  return content;
}

export class SiteWriteConflict extends Error {}

export async function writeSite(changes: Record<string, unknown>) {
  const supabase = getSupabase();
  for (let attempt = 0; attempt < 3; attempt++) {
    const { content, version } = await readStored(supabase);
    const body = prepareSite({ ...content, ...changes });
    const updated_at = new Date(Math.max(Date.now(), version ? Date.parse(version) + 1 : 0)).toISOString();
    const table = supabase.from("site_content");
    const write = version
      ? table.update({ body, updated_at }).eq("key", "site").eq("updated_at", version)
      : table.upsert({ key: "site", body, updated_at }, { onConflict: "key", ignoreDuplicates: true });
    const { data, error } = await write.select("key").maybeSingle();
    if (error) throw new Error(databaseError(error.message, "The site record could not be saved."));
    if (data) return body;
  }
  throw new SiteWriteConflict("Someone else is saving changes. Try saving again.");
}
