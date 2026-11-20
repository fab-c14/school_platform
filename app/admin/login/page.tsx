"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, GraduationCapIcon } from "@phosphor-icons/react";
import { adminRequest } from "@/components/admin/request";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminRequest("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      window.location.replace("/admin");
    } catch (error) {
      setError((error as Error).message);
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login-form">
        <Link href="/" className="admin-button admin-button-quiet w-fit"><ArrowLeftIcon size={16} aria-hidden /> Back to school website</Link>
        <div>
          <span className="admin-brand-mark mb-5"><GraduationCapIcon size={23} aria-hidden /></span>
          <h1 className="admin-title">School office</h1>
          <p className="mt-3 text-sm text-muted">Sign in to manage site content, notices and applications.</p>
        </div>
        <form onSubmit={onSubmit}>
          <fieldset disabled={busy} className="grid min-w-0 gap-4">
            <label className="grid gap-2 text-sm" htmlFor="email">
              Email
              <input
                id="email"
                required
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-input"
              />
            </label>
            <label className="grid gap-2 text-sm" htmlFor="password">
              Password
              <input
                id="password"
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input"
              />
            </label>
            {error ? (
              <p className="admin-message admin-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="admin-button admin-button-primary">
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </fieldset>
        </form>
      </div>
      <div className="admin-login-image">
        <Image src="/images/campus.jpg" alt="Welkin International School campus" fill sizes="46vw" />
      </div>
    </main>
  );
}
