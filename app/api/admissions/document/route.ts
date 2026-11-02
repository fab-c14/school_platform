import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { documentExtension, documentSlot } from "@/lib/admissions";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const slot = documentSlot(String(form?.get("slot") ?? ""));

  if (!slot) {
    return NextResponse.json({ error: "Choose a document type." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  }
  if (!slot.types.includes(file.type)) {
    return NextResponse.json({ error: `${slot.label} must be ${slot.hint.toLowerCase()}.` }, { status: 400 });
  }
  if (file.size > slot.max) {
    return NextResponse.json({ error: `${slot.label} must be under ${Math.round(slot.max / (1024 * 1024))} MB.` }, { status: 400 });
  }

  // The public form still works before Supabase is connected. In that state the
  // office takes the documents by phone and the client says nothing was saved.
  if (!supabaseConfigured()) {
    return NextResponse.json({ skipped: true });
  }

  const supabase = getSupabase();
  const day = new Date().toISOString().slice(0, 10);
  const path = `admissions/${day}/${randomBytes(12).toString("hex")}.${documentExtension(file.type)}`;
  const cleanName = file.name.replace(/[^\w.\- ]+/g, "").slice(0, 100) || `${slot.key}.${documentExtension(file.type)}`;
  const name = `${slot.label} - ${cleanName}`;

  // Admission documents contain identity papers, so they go into a private bucket.
  // The office reads them through the signed /api/media route.
  const uploaded = await supabase.storage.from("admissions").upload(path, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type,
    upsert: false,
  });
  if (uploaded.error) {
    return NextResponse.json({ error: "The document could not be stored. Call the office on the number on this page." }, { status: 503 });
  }

  const saved = await supabase
    .from("documents")
    .insert({
      name,
      bucket: "admissions",
      path,
      content_type: file.type,
      kind: "document",
    })
    .select("id")
    .single();
  if (saved.error || !saved.data?.id) {
    await supabase.storage.from("admissions").remove([path]);
    return NextResponse.json({ error: "The document record could not be saved. Call the office on the number on this page." }, { status: 503 });
  }

  return NextResponse.json({
    document: {
      id: String(saved.data.id),
      slot: slot.key,
      label: slot.label,
      name,
      bucket: "admissions",
      path,
      type: file.type,
      size: file.size,
      url: `/api/media/${saved.data.id}`,
    },
  });
}
