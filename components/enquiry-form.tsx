"use client";

import { useState, type FormEvent } from "react";
type FormCopy = {
  note: string;
  success: string;
  submit: string;
  fields: {
    parent: string;
    student: string;
    email: string;
    phone: string;
    message: string;
    className?: string;
  };
};

type Errors = Partial<Record<"parent" | "student" | "className" | "email" | "phone" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm({ copy }: { copy: FormCopy }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parent = String(data.get("parent") ?? "").trim();
    const student = String(data.get("student") ?? "").trim();
    const className = String(data.get("className") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};

    if (parent.length < 2) next.parent = "Enter the parent or guardian’s name.";
    if (student.length < 2) next.student = "Enter the student’s name.";
    if (copy.fields.className && className.length < 1) next.className = "Enter the class you are asking about.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 8) next.phone = "Enter a phone number.";
    if (message.length < 10) next.message = "Write at least a short note.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        parent,
        student,
        className,
        email,
        phone,
        message,
        kind: copy.fields.className ? "application" : "note",
      }),
    });
    const body = (await response.json().catch(() => null)) as { stored?: boolean; error?: string } | null;
    if (!response.ok) {
      setErrors({ message: body?.error || "The office record could not be saved." });
      return;
    }
    setSent(body?.stored ? "Saved for the office. No email was sent. Call the school if you need an answer today." : copy.success);
  }

  if (sent) {
    return (
      <p className="border border-line bg-white px-5 py-6 text-base leading-relaxed" role="status">
        {sent}
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
      {copy.fields.className ? (
        <Field
          id="className"
          name="className"
          label={copy.fields.className}
          error={errors.className}
          autoComplete="off"
        />
      ) : null}
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
