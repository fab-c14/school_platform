import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { readSiteForAdmin, SiteWriteConflict, writeSite } from "@/lib/site-store";

async function allowed() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  try {
    return NextResponse.json(await readSiteForAdmin());
  } catch (error) {
    const message = error instanceof Error ? error.message : "The database could not be reached.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 500_000) {
    return NextResponse.json({ error: "That update is too large." }, { status: 413 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Send site changes as an object." }, { status: 400 });
  }
  const changes = { ...(body as Record<string, unknown>) };
  delete changes.notifications;

  try {
    const saved = await writeSite(changes);
    revalidateTag("site", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The update could not be saved.";
    return NextResponse.json({ error: message }, { status: error instanceof SiteWriteConflict ? 409 : 503 });
  }
}
