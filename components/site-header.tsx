"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mark } from "@/components/mark";

export function SiteHeader({
  name,
  nav,
  contactLabel,
}: {
  name: string;
  nav: { href: string; label: string }[];
  contactLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [...nav, { href: "/contact", label: contactLabel }];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-ink" onClick={() => setOpen(false)}>
          <Mark className="size-8 text-accent" />
          <span className="font-serif text-lg leading-none tracking-tight">{name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="inline-flex items-center bg-accent px-4 py-2 text-sm text-white active:scale-[0.98]">
            {contactLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-paper px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link
                    href={item.href}
                    className={`block py-3 text-base ${active ? "text-ink" : "text-muted"}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
