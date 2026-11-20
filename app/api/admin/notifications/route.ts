import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { isNoticeAudience, isNoticeDate } from "@/content/notices";
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
    const site = await readSiteForAdmin();
    return NextResponse.json({ notifications: site.notifications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The database could not be reached.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let notifications: unknown;
  try {
    const body = (await request.json()) as { notifications?: unknown };
    notifications = body.notifications;
  } catch {
    return NextResponse.json({ error: "Send a list of notifications." }, { status: 400 });
  }

  if (!Array.isArray(notifications)) {
    return NextResponse.json({ error: "Send a list of notifications." }, { status: 400 });
  }
  if (notifications.length > 20) {
    return NextResponse.json({ error: "Keep the list to 20 notices." }, { status: 400 });
  }
  for (const item of notifications) {
    if (!item || typeof item !== "object") {
      return NextResponse.json({ error: "Each notice needs a title." }, { status: 400 });
    }
    const row = item as { title?: unknown; date?: unknown; isNew?: unknown; audience?: unknown };
    if (typeof row.title !== "string" || !row.title.trim() || row.title.length > 4000) {
      return NextResponse.json({ error: "Each notice needs a title." }, { status: 400 });
    }
    const date = typeof row.date === "string" ? row.date.trim() : row.date;
    if (!isNoticeDate(date)) {
      return NextResponse.json({ error: "Use a valid date or leave it blank." }, { status: 400 });
    }
    if (typeof row.isNew !== "boolean") {
      return NextResponse.json({ error: "Choose whether each notice shows the New badge." }, { status: 400 });
    }
    if (row.audience !== undefined && !isNoticeAudience(row.audience)) {
      return NextResponse.json({ error: "Choose where each notice should appear." }, { status: 400 });
    }
  }

  try {
    const saved = await writeSite({ notifications });
    revalidateTag("site", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ notifications: saved.notifications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The update could not be saved.";
    return NextResponse.json({ error: message }, { status: error instanceof SiteWriteConflict ? 409 : 503 });
  }
}
