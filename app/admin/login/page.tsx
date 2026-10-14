"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const body = (await response.json()) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(body.error || "Could not sign in.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="font-serif text-4xl tracking-tight">School office</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Sign in to change the words and photographs on the public site.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm" htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-line bg-white px-3 py-3 text-base outline-none focus:border-accent"
          />
        </label>
        {error ? (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={busy} className="bg-accent px-5 py-3 text-sm text-white disabled:opacity-60">
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
