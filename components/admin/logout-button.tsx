"use client";

export function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <button type="button" onClick={logout} className="text-ink">
      Log out
    </button>
  );
}
