import { Suspense } from "react";
import { NotificationsEditor } from "@/components/admin/notifications-editor";
import { requireAdminSession } from "@/lib/admin-session";
import { readSiteForAdmin } from "@/lib/site-store";

export default function NotificationsPage() {
  return (
    <Suspense fallback={<p className="admin-surface" role="status">Loading notices…</p>}>
      <NotificationsLoader />
    </Suspense>
  );
}

async function NotificationsLoader() {
  await requireAdminSession();
  let content;
  try {
    content = await readSiteForAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : "The database could not be reached.";
    return (
      <main className="admin-surface">
        <h1 className="admin-title">Notifications</h1>
        <p className="admin-message admin-error" role="alert">{message}</p>
      </main>
    );
  }

  return (
    <main>
      <header className="admin-page-header">
        <h1 className="admin-title">Notifications</h1>
        <p>Create, edit or delete notices for the home and admissions pages.</p>
      </header>
      <NotificationsEditor initial={content.notifications} />
    </main>
  );
}
