import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { ArrowUpRightIcon, GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";
import { LogoutButton } from "@/components/admin/logout-button";
import { PanelNav } from "@/components/admin/panel-nav";
import { getSite } from "@/lib/site-store";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const site = await getSite();
  return (
    <>
      <a href="#admin-content" className="sr-only focus:not-sr-only">Skip to content</a>
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link href="/admin" className="admin-brand">
            <span className="admin-brand-mark"><GraduationCapIcon size={23} aria-hidden /></span>
            <span><strong>School office</strong><small>{site.name}</small></span>
          </Link>
          <Suspense fallback={<div className="admin-main-nav" />}>
            <PanelNav />
          </Suspense>
          <div className="admin-topbar-actions">
            <Link href="/" className="admin-button admin-button-quiet">
              View site <ArrowUpRightIcon size={15} aria-hidden />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div id="admin-content" className="admin-container">{children}</div>
    </>
  );
}
