import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSite } from "@/lib/site-store";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const site = await getSite();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader name={site.name} nav={[...site.nav]} contactLabel={site.contactLabel} />
      <div id="content" className="flex-1">
        {children}
      </div>
      <SiteFooter
        name={site.name}
        note={site.footer.note}
        addressLines={[...site.contact.addressLines]}
        hours={site.contact.hours}
        phoneHref={site.contact.phoneHref}
        phoneDisplay={site.contact.phoneDisplay}
        email={site.contact.email}
        contactLabel={site.contactLabel}
      />
    </div>
  );
}
