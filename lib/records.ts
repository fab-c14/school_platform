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

export type StoredNote = {
  id: string;
  kind: "application" | "note";
  parentName: string;
  studentName: string;
  className: string;
  email: string;
  phone: string;
  message: string;
  details: Record<string, unknown>;
  documents: StoredApplicationDocument[];
  status: string;
  createdAt: string;
};

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
    url: row.bucket === "admissions" ? `/api/media/${row.id}` : publicObjectUrl(row.bucket, row.path),
    kind: row.kind,
    createdAt: row.created_at,
  };
}

async function readFiles(kind?: StoredFile["kind"], bucket?: string) {
  if (!supabaseConfigured()) return [];
  const supabase = getSupabase();
  let query = supabase.from("documents").select("id,name,bucket,path,kind,created_at").order("created_at", { ascending: false }).limit(40);
  if (kind) query = query.eq("kind", kind);
  if (bucket) query = query.eq("bucket", bucket);
  const { data, error } = await query;
  if (error || !data) return [];
  return (data as FileRow[]).map(asFile);
}

export async function listPublicDocuments() {
  "use cache";
  cacheTag("documents");
  cacheLife("max");
  // Admission papers live in the private admissions bucket and must never be
  // listed on the public downloads page.
  return readFiles("document", "documents");
}

export async function listFilesForAdmin() {
  return readFiles();
}

export async function listNotesForAdmin() {
  if (!supabaseConfigured()) return [];
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("applications")
    .select("id,kind,parent_name,student_name,class_name,email,phone,message,details,documents,status,created_at")
    .order("created_at", { ascending: false })
    .limit(40);
  if (error || !data) return [];
  return data.map((row) => {
    const documents = Array.isArray(row.documents)
      ? row.documents
          .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
          .map((item) => {
            const storedUrl = typeof item.url === "string" ? item.url : "";
            const bucket = String(item.bucket ?? "");
            const url =
              storedUrl.startsWith("/api/media/")
                ? storedUrl
                : bucket === "admissions"
                  ? ""
                  : publicObjectUrl(bucket || "documents", String(item.path ?? ""));
            return {
              label: String(item.label ?? "Document"),
              name: String(item.name ?? ""),
              url,
            };
          })
          .filter((item) => item.url)
      : [];
    return {
      id: String(row.id),
      kind: row.kind === "application" ? "application" : "note",
      parentName: String(row.parent_name),
      studentName: String(row.student_name),
      className: String(row.class_name ?? ""),
      email: String(row.email ?? ""),
      phone: String(row.phone),
      message: String(row.message),
      details: typeof row.details === "object" && row.details !== null ? (row.details as Record<string, unknown>) : {},
      documents,
      status: String(row.status ?? "new"),
      createdAt: String(row.created_at),
    } satisfies StoredNote;
  });
}
