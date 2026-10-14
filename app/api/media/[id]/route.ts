import { Binary } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const db = await getDb();
  const doc = await db.collection<{ key: string; contentType: string; data: Binary }>("images").findOne({
    key: id,
  });
  if (!doc) return new NextResponse("Not found", { status: 404 });

  const bytes = Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data.buffer);

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": doc.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
