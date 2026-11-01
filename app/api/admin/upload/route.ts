import { randomBytes } from "crypto";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getSupabase, publicObjectUrl, supabaseConfigured } from "@/lib/supabase";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not connected." }, { status: 503 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = form.get("kind") === "document" ? "document" : "image";
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file." }, { status: 400 });
  }

  const document = kind === "document";
  if (document && file.type !== "application/pdf") {
    return NextResponse.json({ error: "Use a PDF." }, { status: 400 });
  }
  if (!document && !imageTypes.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }
  const limit = document ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > limit) {
    return NextResponse.json({ error: document ? "PDF must be under 10 MB." : "Image must be under 5 MB." }, { status: 400 });
  }

  const extension = document ? "pdf" : file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const bucket = document ? "documents" : "media";
  const path = `${randomBytes(12).toString("hex")}.${extension}`;
  const name = file.name.replace(/[^\w.\- ]+/g, "").slice(0, 120) || path;
  const supabase = getSupabase();
  const uploaded = await supabase.storage.from(bucket).upload(path, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type,
    upsert: false,
  });
  if (uploaded.error) {
    return NextResponse.json({ error: "The file could not be stored. Run supabase/schema.sql if the buckets are missing." }, { status: 503 });
  }

  const saved = await supabase.from("documents").insert({ name, bucket, path, content_type: file.type, kind });
  if (saved.error) {
    await supabase.storage.from(bucket).remove([path]);
    return NextResponse.json({ error: "The file record could not be saved." }, { status: 503 });
  }

  revalidateTag("documents", { expire: 0 });
  return NextResponse.json({ src: publicObjectUrl(bucket, path), name });
}
