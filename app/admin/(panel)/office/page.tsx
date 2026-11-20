import { Suspense } from "react";
import { OfficeDesk } from "@/components/admin/documents";
import { requireAdminSession } from "@/lib/admin-session";
import { readPublicDownloads, listNotesForAdmin } from "@/lib/records";

type OfficeSearchParams = Promise<{ page?: string | string[] }>;

export default function OfficePage({ searchParams }: { searchParams: OfficeSearchParams }) {
  return (
    <main>
      <header className="admin-page-header">
        <h1 className="admin-title">Office desk</h1>
        <p>Review student applications and enquiries, and upload public school PDFs.</p>
      </header>
      <Suspense fallback={<p className="admin-surface" role="status">Loading office records…</p>}>
        <OfficeRecords searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function OfficeRecords({ searchParams }: { searchParams: OfficeSearchParams }) {
  await requireAdminSession();
  const { page: requestedPage } = await searchParams;
  const page = typeof requestedPage === "string" && /^[1-9]\d{0,6}$/.test(requestedPage) ? Number(requestedPage) : 1;
  const [files, inbox] = await Promise.allSettled([readPublicDownloads(), listNotesForAdmin(page)]);
  return (
    <OfficeDesk
      files={files.status === "fulfilled" ? files.value : null}
      notes={inbox.status === "fulfilled" ? inbox.value.notes : null}
      hasNext={inbox.status === "fulfilled" && inbox.value.hasNext}
      page={page}
    />
  );
}
