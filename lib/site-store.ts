import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { defaultSite, type SiteContent } from "@/content/site";
import { getDb, mongoConfigured } from "@/lib/db";

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
  return fallback;
}

function asText(value: unknown, fallback: string, max = 4000) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, max);
}

function sanitize(value: unknown, fallback: unknown, key = ""): unknown {
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
    const rows = (incoming.length ? incoming : fallback).slice(0, 20);
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
      return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : fallback;
    }
    return asText(value, fallback);
  }

  return fallback;
}

export function normalizeSite(input: unknown): SiteContent {
  return sanitize(input, defaultSite) as SiteContent;
}

async function contentCollection() {
  const db = await getDb();
  return db.collection<{ key: string; body: SiteContent }>("content");
}

async function readStored() {
  const content = await contentCollection();
  const existing = await content.findOne({ key: "site" });
  if (!existing) {
    const body = normalizeSite(defaultSite);
    await content.insertOne({ key: "site", body });
    return body;
  }
  return normalizeSite(existing.body);
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
  cacheLife("max");
  return withUrl(await readStored());
}

export async function getSite() {
  if (!mongoConfigured()) return withUrl(normalizeSite(defaultSite));
  try {
    return await readCachedSite();
  } catch {
    return withUrl(normalizeSite(defaultSite));
  }
}

export async function readSiteForAdmin() {
  await connection();
  return readStored();
}

export async function writeSite(input: unknown) {
  const content = normalizeSite(input);
  const digits = content.contact.phoneDisplay.replace(/[^\d+]/g, "");
  content.contact.phoneHref = digits ? `tel:${digits}` : defaultSite.contact.phoneHref;
  const collection = await contentCollection();
  await collection.replaceOne({ key: "site" }, { key: "site", body: content }, { upsert: true });
  return content;
}
