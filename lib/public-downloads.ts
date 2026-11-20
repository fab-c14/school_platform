import { randomBytes } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";

export const maxDownloadNameLength = 120;

export function downloadName(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function pdfError(file: File) {
  if (file.type !== "application/pdf" || file.size === 0 || await file.slice(0, 5).text() !== "%PDF-") {
    return "Choose a valid PDF file.";
  }
  if (file.size > 10 * 1024 * 1024) return "Choose a PDF up to 10 MB.";
  return null;
}

export async function uploadPdf(db: SupabaseClient, file: File) {
  const path = `${randomBytes(12).toString("hex")}.pdf`;
  const { error } = await db.storage.from("documents").upload(path, file, {
    contentType: "application/pdf",
    upsert: false,
  });
  return { path, error };
}

export async function removePdf(db: SupabaseClient, path: string) {
  const bucket = db.storage.from("documents");
  for (let attempt = 0; attempt < 2; attempt++) {
    const { error } = await bucket.remove([path]);
    if (!error || error.statusCode === "404") return true;
  }
  console.error("Could not remove a superseded public download from storage.", path);
  return false;
}

export function refreshDownloads() {
  revalidateTag("documents", { expire: 0 });
  revalidatePath("/downloads");
}
