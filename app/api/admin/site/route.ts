import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { readSiteForAdmin, writeSite } from "@/lib/site-store";

async function allowed() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  return NextResponse.json(await readSiteForAdmin());
}

export async function PUT(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 500_000) {
    return NextResponse.json({ error: "That update is too large." }, { status: 413 });
  }

  try {
    const body = await request.json();
    const saved = await writeSite(body);
    revalidateTag("site", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "The update could not be saved." }, { status: 400 });
  }
}
