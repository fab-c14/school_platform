"use client";

import { useState } from "react";

export const fieldClass =
  "w-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent";

export function TextField({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm text-ink">
      {label}
      {rows ? (
        <textarea className={fieldClass} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export function ImageField({
  label,
  src,
  alt,
  onChange,
}: {
  label: string;
  src: string;
  alt: string;
  onChange: (next: { src: string; alt: string }) => void;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    const data = new FormData();
    data.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const body = (await response.json()) as { src?: string; error?: string };
    setBusy(false);
    if (!response.ok || !body.src) {
      setError(body.error || "Upload failed.");
      return;
    }
    onChange({ src: body.src, alt });
  }

  return (
    <div className="grid gap-3 border border-line bg-paper p-3">
      <p className="text-sm text-ink">{label}</p>
      {/* Admin preview of a file the editor just chose. */}
      <img src={src} alt="" className="h-36 w-full object-cover" />
      <TextField label="Description of the photo" value={alt} onChange={(next) => onChange({ src, alt: next })} />
      <label className="text-sm text-muted">
        Replace photo
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
      </label>
      {busy ? <p className="text-sm text-muted">Uploading…</p> : null}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </div>
  );
}
