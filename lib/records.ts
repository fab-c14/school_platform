import { cacheLife, cacheTag } from "next/cache";
import { getSupabase, publicObjectUrl, supabaseConfigured } from "@/lib/supabase";

export type StoredFile = {
  id: string;
  name: string;
  url: string;
  kind: "image" | "document";
  createdAt: string;
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
    url: publicObjectUrl(row.bucket, row.path),
    kind: row.kind,
    createdAt: row.created_at,
  };
}

async function readFiles(kind?: StoredFile["kind"]) {
  if (!supabaseConfigured()) return [];
  const supabase = getSupabase();
  const query = supabase.from("documents").select("id,name,bucket,path,kind,created_at").order("created_at", { ascending: false }).limit(40);
  const { data, error } = kind ? await query.eq("kind", kind) : await query;
  if (error || !data) return [];
  return (data as FileRow[]).map(asFile);
}

export async function listPublicDocuments() {
  "use cache";
  cacheTag("documents");
  cacheLife("max");
  return readFiles("document");
}

export async function listFilesForAdmin() {
  return readFiles();
}

export async function listNotesForAdmin() {
  if (!supabaseConfigured()) return [];
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("applications")
    .select("id,kind,parent_name,student_name,class_name,email,phone,message,created_at")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error || !data) return [];
  return data.map((row) => ({
    id: String(row.id),
    kind: row.kind === "application" ? "application" : "note",
    parentName: String(row.parent_name),
    studentName: String(row.student_name),
    className: String(row.class_name ?? ""),
    email: String(row.email),
    phone: String(row.phone),
    message: String(row.message),
    createdAt: String(row.created_at),
  })) satisfies StoredNote[];
}
