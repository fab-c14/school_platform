import Link from "next/link";
import { PublicDownloadsEditor } from "@/components/admin/public-downloads-editor";
import type { StoredFile, NoteSummary } from "@/lib/records";

export function OfficeDesk({ files, notes, page, hasNext }: {
  files: StoredFile[] | null;
  notes: NoteSummary[] | null;
  page: number;
  hasNext: boolean;
}) {
  return (
    <div className="admin-office-grid">
      <PublicDownloadsEditor files={files} />
      <section className="admin-surface min-w-0">
        <h2 className="admin-section-title">Applications and enquiries</h2>
        {notes === null ? <p className="admin-message admin-error" role="alert">Applications could not be loaded. Check Supabase and refresh the page.</p> : null}
        <ul className="grid gap-3">
          {notes?.map((note) => (
            <li key={note.id} className="admin-item break-words text-sm">
              <p className="font-semibold text-ink">
                {note.kind === "application" ? "Application" : "Enquiry"} · {note.studentName}
                {note.className ? `, ${note.className}` : ""}
              </p>
              <p className="text-muted">
                {note.parentName} · {note.phone}
              </p>
              {note.email ? <a className="w-fit underline underline-offset-4" href={`mailto:${note.email}`}>{note.email}</a> : null}
              {note.kind === "note" ? <p className="leading-relaxed">{note.message}</p> : null}
              <Link
                href={`/admin/office/${note.id}${page > 1 ? `?page=${page}` : ""}`}
                prefetch={false}
                className="admin-button admin-button-secondary w-fit"
              >
                {note.kind === "application" ? "View application" : "View enquiry"}
              </Link>
            </li>
          ))}
          {notes?.length === 0 ? <li className="text-sm text-muted">{page === 1 ? "No applications or enquiries yet." : "No submissions on this page."}</li> : null}
        </ul>
        {page > 1 || hasNext ? (
          <nav className="admin-savebar" aria-label="Submission pages">
            {page > 1 ? <Link className="admin-button admin-button-secondary" href={page === 2 ? "/admin/office" : `/admin/office?page=${page - 1}`}>Previous</Link> : null}
            <span>Page {page}</span>
            {hasNext ? <Link className="admin-button admin-button-secondary" href={`/admin/office?page=${page + 1}`}>Next</Link> : null}
          </nav>
        ) : null}
      </section>
    </div>
  );
}
