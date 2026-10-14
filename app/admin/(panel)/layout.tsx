import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/logout-button";
import { getSite } from "@/lib/site-store";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const site = await getSite();
  return (
    <div className="min-h-full bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <p className="font-serif text-lg">{site.name}</p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted">
              View site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
