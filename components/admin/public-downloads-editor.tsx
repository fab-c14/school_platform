"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { adminRequest } from "@/components/admin/request";
import type { StoredFile } from "@/lib/records";

type Mode = { type: "new" } | { type: "edit" | "delete"; id: string };

export function PublicDownloadsEditor({ files }: { files: StoredFile[] | null }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [warning, setWarning] = useState("");
  const [busy, setBusy] = useState(false);
  const [refreshing, refresh] = useTransition();
  const pending = busy || refreshing;

  function open(next: Mode | null) {
    setMode(next);
    setError("");
    setStatus("");
    setWarning("");
  }

  async function change(url: string, options: RequestInit, message: string) {
    setBusy(true);
    setError("");
    setStatus("");
    setWarning("");
    try {
      const result = await adminRequest<{ warning?: string }>(url, options);
      setStatus(message);
      setWarning(result.warning ?? "");
      setMode(null);
      refresh(() => router.refresh());
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function save(event: FormEvent<HTMLFormElement>, file?: StoredFile) {
    event.preventDefault();
    const body = new FormData(event.currentTarget);
    if (file) {
      void change(`/api/admin/documents/${file.id}`, { method: "PATCH", body }, "Download updated.");
    } else {
      body.set("kind", "document");
      void change("/api/admin/upload", { method: "POST", body }, "PDF published.");
    }
  }

  return (
    <section className="admin-surface min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="admin-section-title">Public downloads</h2>
        <button type="button" className="admin-button admin-button-primary" disabled={pending || mode?.type === "new"} onClick={() => open({ type: "new" })}>
          New download
        </button>
      </div>
      <p className="mb-4 text-sm text-muted">Manage the PDFs families can open on the Downloads page.</p>
      {mode?.type === "new" ? <DownloadForm busy={pending} onSave={save} onCancel={() => open(null)} error={error} /> : null}
      <p className="text-sm text-muted" role="status">{status}</p>
      {warning ? <p className="admin-message admin-error" role="alert">{warning}</p> : null}
      {files === null ? <p className="admin-message admin-error" role="alert">Downloads could not be loaded. Refresh the page to try again.</p> : null}
      {files?.length === 0 ? <p className="mt-4 text-sm text-muted">No PDFs published yet.</p> : null}
      {files?.length ? (
        <ul className="mt-4 divide-y divide-line">
          {files.map((file) => {
            const action = mode && mode.type !== "new" && mode.id === file.id ? mode.type : null;
            return (
              <li key={file.id} className="grid gap-3 py-3">
                <a className="w-fit wrap-anywhere text-sm font-semibold underline decoration-accent underline-offset-4" href={file.url} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
                {action === "edit" ? (
                  <DownloadForm file={file} busy={pending} onSave={(event) => save(event, file)} onCancel={() => open(null)} error={error} />
                ) : action === "delete" ? (
                  <div className="admin-item text-sm">
                    <p>Delete this PDF from the public Downloads page?</p>
                    {error ? <p className="admin-error" role="alert">{error}</p> : null}
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="admin-button admin-button-secondary admin-error"
                        disabled={pending}
                        onClick={() => void change(`/api/admin/documents/${file.id}`, { method: "DELETE" }, "Download deleted.")}
                      >
                        {busy ? "Deleting…" : "Confirm delete"}
                      </button>
                      <button type="button" className="admin-button admin-button-quiet" disabled={pending} onClick={() => open(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="admin-button admin-button-secondary" disabled={pending} onClick={() => open({ type: "edit", id: file.id })}>Edit</button>
                    <button type="button" className="admin-button admin-button-quiet admin-error" disabled={pending} onClick={() => open({ type: "delete", id: file.id })}>Delete</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}

function DownloadForm({ file, busy, error, onSave, onCancel }: {
  file?: StoredFile;
  busy: boolean;
  error: string;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form className="admin-item" onSubmit={onSave}>
      <fieldset className="grid min-w-0 gap-3" disabled={busy}>
        <label className="grid gap-1 text-sm">
          Display name
          <input className="admin-input" name="name" defaultValue={file?.name} maxLength={120} required />
        </label>
        <label className="grid gap-1 text-sm">
          {file ? "Replace PDF (optional)" : "PDF file"}
          <input className="min-w-0 text-sm" type="file" name="file" accept=".pdf,application/pdf" required={!file} />
        </label>
        {error ? <p className="text-sm admin-error" role="alert">{error}</p> : null}
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="admin-button admin-button-primary">{busy ? "Saving…" : file ? "Save changes" : "Publish PDF"}</button>
          <button type="button" className="admin-button admin-button-quiet" onClick={onCancel}>Cancel</button>
        </div>
      </fieldset>
    </form>
  );
}
