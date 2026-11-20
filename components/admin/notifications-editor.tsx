"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";
import { BooleanField, TextField } from "@/components/admin/fields";
import { adminRequest } from "@/components/admin/request";
import { isNoticeAudience, noticeAudiences, type SchoolNotice } from "@/content/notices";

export function NotificationsEditor({ initial }: { initial: SchoolNotice[] }) {
  const [notices, setNotices] = useState(() => initial.map((notice, index) => ({ ...notice, draftId: index })));
  const [saved, setSaved] = useState(notices);
  const nextDraftId = useRef(initial.length);
  const [status, setStatus] = useState<{ text: string; error?: boolean }>();
  const [busy, setBusy] = useState(false);
  const dirty = notices !== saved;

  function update(index: number, next: Partial<SchoolNotice>) {
    setNotices((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, ...next } : row)));
  }

  function add() {
    const draftId = nextDraftId.current++;
    setStatus(undefined);
    setNotices((current) => [{ draftId, date: "", title: "", isNew: true, audience: "home" }, ...current]);
  }

  function move(index: number, offset: -1 | 1) {
    setStatus(undefined);
    setNotices((current) => {
      const next = [...current];
      const target = index + offset;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
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
        body: JSON.stringify({
          notifications: notices.map(({ date, title, isNew, audience }) => ({ date, title, isNew, audience })),
        }),
      });
      const published = body.notifications.map((notice, index) => ({ ...notice, draftId: notices[index].draftId }));
      setNotices(published);
      setSaved(published);
      setStatus({ text: "Notifications published. Open Home or Admissions below to check them." });
    } catch (error) {
      setStatus({ text: (error as Error).message, error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="admin-surface">
      <fieldset disabled={busy} onChange={() => setStatus(undefined)} className="grid min-w-0 gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="admin-section-title mb-1">Published notices</h2>
            <p className="text-sm text-muted">The public pages follow this order, starting at the top.</p>
          </div>
          <button type="button" className="admin-button admin-button-secondary" disabled={notices.length >= 20} onClick={add}>
            Add notice
          </button>
        </div>
        <p className="text-sm text-muted tabular-nums">{notices.length} of 20 notices</p>
        {notices.length === 0 ? (
          <p className="admin-item text-sm text-muted">No notices yet. Add a notice and save to publish it.</p>
        ) : null}
        {notices.map((notice, index) => (
          <div key={notice.draftId} className="admin-item">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold tabular-nums">Position {index + 1}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="admin-button admin-button-secondary" disabled={index === 0} onClick={() => move(index, -1)}>
                  <ArrowUpIcon size={14} aria-hidden /> Move up
                </button>
                <button type="button" className="admin-button admin-button-secondary" disabled={index === notices.length - 1} onClick={() => move(index, 1)}>
                  <ArrowDownIcon size={14} aria-hidden /> Move down
                </button>
              </div>
            </div>
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
        <div className="admin-savebar">
          <button type="submit" disabled={!dirty} className="admin-button admin-button-primary">
            {busy ? "Saving…" : "Save notifications"}
          </button>
          <p className={status?.error ? "admin-error" : "text-muted"} role={status?.error ? "alert" : "status"}>
            {status?.text || (dirty ? "Save to publish your changes and deletions." : "All changes saved")}
          </p>
          {status && !status.error ? (
            <div className="flex gap-3">
              <a className="underline underline-offset-4" href="/#school-notices" target="_blank" rel="noreferrer">Home</a>
              <a className="underline underline-offset-4" href="/admissions#admission-notices" target="_blank" rel="noreferrer">Admissions</a>
            </div>
          ) : null}
        </div>
      </fieldset>
    </form>
  );
}
