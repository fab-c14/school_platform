"use client";

import { useState } from "react";
import { adminRequest } from "@/components/admin/request";

export function LogoutButton() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    setError("");
    try {
      await adminRequest("/api/admin/logout", { method: "POST" });
      window.location.replace("/admin/login");
    } catch (error) {
      setError((error as Error).message);
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" onClick={logout} disabled={busy} className="admin-button admin-button-secondary">
        {busy ? "Signing out…" : "Sign out"}
      </button>
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
    </>
  );
}
