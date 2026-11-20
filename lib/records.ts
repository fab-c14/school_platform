import { cacheLife, cacheTag } from "next/cache";
import { getSupabase, publicObjectUrl, supabaseConfigured } from "@/lib/supabase";

export type StoredFile = {
  id: string;
  name: string;
  url: string;
  kind: "image" | "document";
  createdAt: string;
};

export type StoredApplicationDocument = {
  label: string;
  name: string;
  url: string;
};

export type NoteSummary = {
  id: string;
  kind: "application" | "note";
  parentName: string;
  studentName: string;
  className: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
};

export type StoredNote = NoteSummary & {
  details: Record<string, unknown>;
  documents: StoredApplicationDocument[];
};

const summaryColumns = "id,kind,parent_name,student_name,class_name,email,phone,message,status,created_at";
const inboxPageSize = 20;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

type FileRow = {
  id: string;
  name: string;
  bucket: string;
  path: string;
  kind: "image" | "document";
  created_at: string;
};

function asFile(row: FileRow): StoredFile {
  return {
    id: row.id,
    name: row.name,
    url: `/api/media/${row.id}`,
    kind: row.kind,
    createdAt: row.created_at,
  };
}

export async function listPublicDocuments() {
  "use cache";
  cacheTag("documents");
  if (!supabaseConfigured()) return [];
  try {
    const files = await readPublicDownloads();
    cacheLife("max");
    return files;
  } catch {
    cacheLife({ stale: 30, revalidate: 60, expire: 300 });
    return [];
  }
}

export async function readPublicDownloads() {
  const { data, error } = await getSupabase()
    .from("documents")
    .select("id,name,bucket,path,kind,created_at")
    .eq("kind", "document")
    .eq("bucket", "documents")
    .order("created_at", { ascending: false })
    .limit(40);
  if (error) throw new Error("Downloads could not be loaded from Supabase.");
  return (data as FileRow[]).map(asFile);
}

function asNoteSummary(row: Record<string, unknown>): NoteSummary {
  return {
    id: String(row.id),
    kind: row.kind === "application" ? "application" : "note",
    parentName: String(row.parent_name ?? ""),
    studentName: String(row.student_name ?? ""),
    className: String(row.class_name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    message: String(row.message ?? ""),
    status: String(row.status ?? "new"),
    createdAt: String(row.created_at ?? ""),
  };
}

export async function listNotesForAdmin(page: number) {
  const start = (page - 1) * inboxPageSize;
  const { data, error } = await getSupabase()
    .from("applications")
    .select(summaryColumns)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(start, start + inboxPageSize);
  if (error) throw new Error("Applications and enquiries could not be loaded from Supabase.");
  return { notes: data.slice(0, inboxPageSize).map(asNoteSummary), hasNext: data.length > inboxPageSize };
}

export async function readNoteForAdmin(id: string): Promise<StoredNote | null> {
  if (!uuid.test(id)) return null;
  const { data, error } = await getSupabase()
    .from("applications")
    .select(`${summaryColumns},details,documents`)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("This submission could not be loaded from Supabase.");
  if (!data) return null;

  const documents: StoredApplicationDocument[] = [];
  if (Array.isArray(data.documents)) {
    for (const item of data.documents) {
      if (!item || typeof item !== "object") continue;
      const storedId = typeof item.url === "string" && item.url.startsWith("/api/media/") ? item.url.slice(11) : "";
      const id = uuid.test(storedId) ? storedId : String(item.id ?? "");
      const url = uuid.test(id)
        ? `/api/media/${id}`
        : (item.bucket === "documents" || !item.bucket) && typeof item.path === "string" && item.path
          ? publicObjectUrl("documents", item.path)
          : "";
      if (url) documents.push({ label: String(item.label || "Document"), name: String(item.name ?? ""), url });
    }
  }
  return {
    ...asNoteSummary(data),
    details: data.details && typeof data.details === "object" && !Array.isArray(data.details) ? data.details : {},
    documents,
  };
}
