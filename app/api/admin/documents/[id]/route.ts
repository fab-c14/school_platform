import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { downloadName, maxDownloadNameLength, pdfError, refreshDownloads, removePdf, uploadPdf } from "@/lib/public-downloads";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

type DocumentContext = { params: Promise<{ id: string }> };
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function failure(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

async function checkAccess(id: string) {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) return failure("Sign in required.", 401);
  if (!uuid.test(id)) return failure("Download not found.", 404);
  if (!supabaseConfigured()) return failure("Supabase is not connected.", 503);
}

export async function PATCH(request: Request, { params }: DocumentContext) {
  const { id } = await params;
  const denied = await checkAccess(id);
  if (denied) return denied;

  const form = await request.formData().catch(() => null);
  if (!form) return failure("Enter a display name and try again.", 400);
  const name = downloadName(form.get("name"));
  if (!name || name.length > maxDownloadNameLength) return failure("Enter a display name of up to 120 characters.", 400);

  const file = form.get("file");
  const replacement = file instanceof File && file.name ? file : null;
  if (replacement) {
    const error = await pdfError(replacement);
    if (error) return failure(error, 400);
  }

  const db = getSupabase();
  let oldPath: string | undefined;
  let newPath: string | undefined;
  if (replacement) {
    const { data, error } = await db.from("documents").select("path")
      .eq("id", id).eq("bucket", "documents").eq("kind", "document").maybeSingle();
    if (error) return failure("The current PDF could not be loaded.", 503);
    if (!data) return failure("Download not found.", 404);
    oldPath = data.path;
    const upload = await uploadPdf(db, replacement);
    if (upload.error) return failure("The replacement PDF could not be uploaded.", 503);
    newPath = upload.path;
  }

  let update = db.from("documents")
    .update({ name, ...(newPath ? { path: newPath, content_type: "application/pdf" } : {}) })
    .eq("id", id).eq("bucket", "documents").eq("kind", "document");
  if (oldPath) update = update.eq("path", oldPath);
  const { data, error } = await update.select("id").maybeSingle();
  if (error || !data) {
    if (newPath) {
      // A lost response can follow a committed update. Check before removing the new object.
      const check = await db.from("documents").select("path")
        .eq("id", id).eq("bucket", "documents").eq("kind", "document").maybeSingle();
      if (!check.error && check.data?.path === newPath) {
        refreshDownloads();
        const removed = oldPath ? await removePdf(db, oldPath) : true;
        return NextResponse.json({ ok: true, warning: removed ? undefined : "The previous PDF could not be removed from storage." });
      }
      if (!check.error) await removePdf(db, newPath);
    }
    if (error) return failure("The download could not be updated. Refresh the list and try again.", 503);
    return failure(oldPath ? "This download changed while you were editing. Refresh the list and try again." : "Download not found.", oldPath ? 409 : 404);
  }

  refreshDownloads();
  const removed = oldPath ? await removePdf(db, oldPath) : true;
  return NextResponse.json({ ok: true, warning: removed ? undefined : "The previous PDF could not be removed from storage." });
}

export async function DELETE(_request: Request, { params }: DocumentContext) {
  const { id } = await params;
  const denied = await checkAccess(id);
  if (denied) return denied;

  const db = getSupabase();
  const { data, error } = await db.from("documents").delete()
    .eq("id", id).eq("bucket", "documents").eq("kind", "document").select("path").maybeSingle();
  if (error) return failure("The download could not be deleted. Refresh the list and try again.", 503);
  if (!data) return failure("Download not found.", 404);

  refreshDownloads();
  const removed = await removePdf(db, data.path);
  return NextResponse.json({
    ok: true,
    warning: removed ? undefined : "The download was removed from the site, but its file could not be deleted from storage.",
  });
}
