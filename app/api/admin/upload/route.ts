import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getSupabase, publicObjectUrl, supabaseConfigured } from "@/lib/supabase";
import { downloadName, maxDownloadNameLength, pdfError, refreshDownloads, removePdf, uploadPdf } from "@/lib/public-downloads";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not connected." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Choose a file and try again." }, { status: 400 });
  const file = form.get("file");
  const kind = form.get("kind") === "document" ? "document" : "image";
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose a file." }, { status: 400 });
  }

  const document = kind === "document";
  const displayName = document ? downloadName(form.get("name")) : "";
  if (displayName.length > maxDownloadNameLength) {
    return NextResponse.json({ error: "Keep the display name to 120 characters." }, { status: 400 });
  }
  if (document) {
    const error = await pdfError(file);
    if (error) return NextResponse.json({ error }, { status: 400 });
  }
  if (!document && !imageTypes.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }
  if (!document && file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const bucket = document ? "documents" : "media";
  const supabase = getSupabase();
  const imagePath = `${randomBytes(12).toString("hex")}.${extension}`;
  const uploaded = document ? await uploadPdf(supabase, file) : {
    path: imagePath,
    error: (await supabase.storage.from(bucket).upload(imagePath, file, {
      contentType: file.type,
      upsert: false,
    })).error,
  };
  if (uploaded.error) {
    return NextResponse.json({ error: "The file could not be stored. Run supabase/schema.sql if the buckets are missing." }, { status: 503 });
  }

  const { path } = uploaded;
  const name = displayName || file.name.replace(/[^\w.\- ]+/g, "").slice(0, maxDownloadNameLength) || path;
  const saved = await supabase.from("documents").insert({ name, bucket, path, content_type: file.type, kind });
  if (saved.error) {
    if (document) await removePdf(supabase, path);
    else await supabase.storage.from(bucket).remove([path]);
    return NextResponse.json({ error: "The file record could not be saved." }, { status: 503 });
  }

  if (document) refreshDownloads();
  return NextResponse.json({ src: publicObjectUrl(bucket, path), name });
}
