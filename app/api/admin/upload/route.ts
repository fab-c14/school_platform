import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getDb } from "@/lib/db";

const types = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }
  if (!types.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }

  const id = randomBytes(12).toString("hex");
  const db = await getDb();
  await db.collection("images").insertOne({
    key: id,
    contentType: file.type,
    data: Buffer.from(await file.arrayBuffer()),
  });

  return NextResponse.json({ src: `/api/media/${id}` });
}
