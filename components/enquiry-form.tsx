"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/site";

type Errors = Partial<Record<"parent" | "student" | "email" | "phone" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm({ copy }: { copy: SiteContent["form"] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parent = String(data.get("parent") ?? "").trim();
    const student = String(data.get("student") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};

    if (parent.length < 2) next.parent = "Enter the parent or guardian’s name.";
    if (student.length < 2) next.student = "Enter the student’s name.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 8) next.phone = "Enter a phone number.";
    if (message.length < 10) next.message = "Write at least a short note.";

    setErrors(next);
    setSent(Object.keys(next).length === 0);
  }

  if (sent) {
    return (
      <p className="border border-line bg-white px-5 py-6 text-base leading-relaxed" role="status">
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <p className="text-sm leading-relaxed text-muted">{copy.note}</p>
      <Field
        id="parent"
        name="parent"
        label={copy.fields.parent}
        error={errors.parent}
        autoComplete="name"
      />
      <Field
        id="student"
        name="student"
        label={copy.fields.student}
        error={errors.student}
        autoComplete="off"
      />
      <Field
        id="email"
        name="email"
        type="email"
        label={copy.fields.email}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id="phone"
        name="phone"
        type="tel"
        label={copy.fields.phone}
        error={errors.phone}
        autoComplete="tel"
      />
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-ink">
          {copy.fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-accent"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-accent" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="inline-flex w-fit items-center bg-accent px-5 py-3 text-sm text-white active:scale-[0.98]"
      >
        {copy.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-accent"
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
