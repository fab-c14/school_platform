"use client";

import { useState, type FormEvent } from "react";
import { BooleanField, TextField } from "@/components/admin/fields";
import { adminRequest } from "@/components/admin/request";
import { isNoticeAudience, noticeAudiences, type SchoolNotice } from "@/content/notices";

export function NotificationsEditor({ initial }: { initial: SchoolNotice[] }) {
  const [notices, setNotices] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [status, setStatus] = useState<{ text: string; error?: boolean }>();
  const [busy, setBusy] = useState(false);
  const dirty = notices !== saved;

  function update(index: number, next: Partial<SchoolNotice>) {
    setNotices((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, ...next } : row)));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dirty) return;
    setBusy(true);
    setStatus(undefined);
    try {
      const body = await adminRequest<{ notifications: SchoolNotice[] }>("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications: notices }),
      });
      setNotices(body.notifications);
      setSaved(body.notifications);
      setStatus({ text: "Notifications published." });
    } catch (error) {
      setStatus({ text: (error as Error).message, error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="admin-surface">
      <fieldset disabled={busy} onChange={() => setStatus(undefined)} className="grid min-w-0 gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="admin-section-title">Published notices</h2>
          <p className="text-sm text-muted tabular-nums">{notices.length} of 20 notices</p>
        </div>
        {notices.length === 0 ? (
          <p className="admin-item text-sm text-muted">No notices yet. Add a notice and save to publish it.</p>
        ) : null}
        {notices.map((notice, index) => (
          <div key={index} className="admin-item">
            <TextField label="Notice" value={notice.title} onChange={(title) => update(index, { title })} required maxLength={4000} />
            <div className="admin-notice-fields">
              <label className="grid gap-2 text-sm text-ink">
                Show on
                <select
                  className="admin-input"
                  value={notice.audience ?? "home"}
                  onChange={(event) => {
                    const audience = event.target.value;
                    if (isNoticeAudience(audience)) update(index, { audience });
                  }}
                >
                  {Object.entries(noticeAudiences).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <TextField
                label="Date (optional)"
                type="date"
                value={notice.date}
                onChange={(date) => update(index, { date })}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BooleanField label="Show the New badge" value={notice.isNew} onChange={(isNew) => update(index, { isNew })} />
              <button
                type="button"
                className="admin-button admin-button-quiet admin-error"
                onClick={() => {
                  setStatus(undefined);
                  setNotices((current) => current.filter((_, rowIndex) => rowIndex !== index));
                }}
              >
                Delete notice
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="admin-button admin-button-secondary w-fit"
          disabled={notices.length >= 20}
          onClick={() => {
            setStatus(undefined);
            setNotices((current) => [
              ...current,
              { date: "", title: "", isNew: true, audience: "admissions" },
            ]);
          }}
        >
          Add notice
        </button>
        <div className="admin-savebar">
          <button type="submit" disabled={!dirty} className="admin-button admin-button-primary">
            {busy ? "Saving…" : "Save notifications"}
          </button>
          <p className={status?.error ? "admin-error" : "text-muted"} role={status?.error ? "alert" : "status"}>
            {status?.text || (dirty ? "Save to publish your changes and deletions." : "All changes saved")}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
