"use client";

import { createContext, useContext, useState } from "react";
import { adminRequest } from "@/components/admin/request";

export const fieldClass = "admin-input";
export const UploadActivity = createContext<(busy: boolean) => void>(() => {});

export function TextField({
  label,
  value,
  onChange,
  rows,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  type?: "text" | "date";
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="grid gap-2 text-sm text-ink">
      {label}
      {rows ? (
        <textarea className={fieldClass} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={fieldClass} type={type} required={required} maxLength={maxLength} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export function ImageField({
  label,
  src,
  alt,
  onChange,
  editAlt = true,
}: {
  label: string;
  src: string;
  alt: string;
  onChange: (next: { src: string; alt: string }) => void;
  editAlt?: boolean;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const setUploading = useContext(UploadActivity);

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Choose a photo up to 5 MB.");
      return;
    }
    setBusy(true);
    setUploading(true);
    setError("");
    const data = new FormData();
    data.set("file", file);
    try {
      const body = await adminRequest<{ src: string }>("/api/admin/upload", { method: "POST", body: data });
      onChange({ src: body.src, alt });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
      setUploading(false);
    }
  }

  return (
    <div className="admin-item">
      <p className="text-sm text-ink">{label}</p>
      {/* Admin preview of a file the editor just chose. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-36 w-full rounded-md object-cover" />
      {editAlt ? <TextField label="Description of the photo" value={alt} onChange={(next) => onChange({ src, alt: next })} /> : null}
      <label className="text-sm text-muted">
        Replace photo (JPG, PNG or WebP, up to 5 MB)
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            void onFile(file);
          }}
        />
      </label>
      {busy ? <p className="text-sm text-muted">Uploading…</p> : null}
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
    </div>
  );
}

export function BooleanField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink cursor-pointer select-none">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-line text-accent accent-accent focus:ring-accent"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        {label}
        {hint ? <span className="ml-1 text-xs text-muted block sm:inline">({hint})</span> : null}
      </span>
    </label>
  );
}

