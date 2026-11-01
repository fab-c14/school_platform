"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StoredFile, StoredNote } from "@/lib/records";

export function OfficeDesk({ files, notes }: { files: StoredFile[]; notes: StoredNote[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    const data = new FormData();
    data.set("file", file);
    data.set("kind", "document");
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const body = (await response.json()) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(body.error || "Upload failed.");
      return;
    }
    router.refresh();
  }

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-serif text-3xl tracking-tight">Documents and applications</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        PDFs appear on the Downloads page. Applications are kept here. Email is not sent yet.
      </p>
      <label className="mt-6 block text-sm text-ink">
        Upload a PDF, up to 10 MB
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="application/pdf"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
      </label>
      {busy ? <p className="mt-3 text-sm text-muted">Uploading…</p> : null}
      {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {files.filter((file) => file.kind === "document").map((file) => (
          <li key={file.id} className="py-3 text-sm">
            <a className="underline decoration-accent underline-offset-4" href={file.url}>
              {file.name}
            </a>
          </li>
        ))}
        {files.every((file) => file.kind !== "document") ? (
          <li className="py-3 text-sm text-muted">No documents yet.</li>
        ) : null}
      </ul>
      <h3 className="mt-10 font-serif text-2xl">Recent notes</h3>
      <ul className="mt-4 grid gap-4">
        {notes.map((note) => (
          <li key={note.id} className="border border-line p-4 text-sm">
            <p className="text-ink">
              {note.kind === "application" ? "Application" : "Note"} · {note.studentName}
              {note.className ? `, ${note.className}` : ""}
            </p>
            <p className="mt-1 text-muted">
              {note.parentName} · {note.phone}
            </p>
            <p className="mt-2 leading-relaxed">{note.message}</p>
          </li>
        ))}
        {notes.length === 0 ? <li className="text-sm text-muted">No notes yet.</li> : null}
      </ul>
    </section>
  );
}
