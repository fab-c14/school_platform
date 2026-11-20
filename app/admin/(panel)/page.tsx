import { Suspense } from "react";
import { Editor } from "@/components/admin/editor";
import { requireAdminSession } from "@/lib/admin-session";
import { readSiteForAdmin } from "@/lib/site-store";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="admin-surface" role="status">Loading the editor…</p>}>
      <EditorLoader />
    </Suspense>
  );
}

async function EditorLoader() {
  await requireAdminSession();
  let content;
  try {
    content = await readSiteForAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : "The database could not be reached.";
    return (
      <main className="admin-surface">
        <h1 className="admin-title">Site content</h1>
        <p className="admin-message admin-error" role="alert">{message}</p>
      </main>
    );
  }
  return (
    <main>
      <header className="admin-page-header">
        <h1 className="admin-title">Site content</h1>
        <p>Update public pages, school details and photos.</p>
      </header>
      <Editor initial={content} />
    </main>
  );
}
