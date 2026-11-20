"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { adminRequest } from "@/components/admin/request";
import type { StoredFile, NoteSummary } from "@/lib/records";

export function OfficeDesk({ files, notes, page, hasNext }: {
  files: StoredFile[] | null;
  notes: NoteSummary[] | null;
  page: number;
  hasNext: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setSuccess("");
    if (file.size > 10 * 1024 * 1024) {
      setError("Choose a PDF up to 10 MB.");
      return;
    }
    setBusy(true);
    setError("");
    const data = new FormData();
    data.set("file", file);
    data.set("kind", "document");
    try {
      await adminRequest("/api/admin/upload", { method: "POST", body: data });
      setSuccess("PDF published.");
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-office-grid">
      <section className="admin-surface min-w-0">
        <h2 className="admin-section-title">Public downloads</h2>
        <label className="admin-item block text-sm text-ink">
          Upload a PDF, up to 10 MB
          <input
            className="mt-2 block w-full text-sm"
            type="file"
            accept="application/pdf"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              void onFile(file);
            }}
          />
        </label>
        <p className="mt-3 text-sm text-muted" role="status">{busy ? "Uploading…" : success}</p>
        {error ? <p className="mt-3 admin-error" role="alert">{error}</p> : null}
        {files === null ? <p className="admin-message admin-error" role="alert">Downloads could not be loaded. Check Supabase and refresh the page.</p> : null}
        <ul className="divide-y divide-line">
          {files?.map((file) => (
            <li key={file.id} className="break-words py-3 text-sm">
              <a className="underline decoration-accent underline-offset-4" href={file.url}>
                {file.name}
              </a>
            </li>
          ))}
          {files?.length === 0 ? (
            <li className="py-3 text-sm text-muted">No PDFs published yet.</li>
          ) : null}
        </ul>
      </section>
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
