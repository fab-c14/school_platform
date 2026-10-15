"use client";

import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { href: string; label: string };
type NavItem = NavLink & { children?: NavLink[] };

export function SiteHeader({
  name,
  nav,
  contactLabel,
  phoneDisplay,
  phoneHref,
}: {
  name: string;
  nav: NavItem[];
  contactLabel: string;
  phoneDisplay: string;
  phoneHref: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const items: NavItem[] = [...nav, { href: "/contact", label: contactLabel }];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-ink" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.jpg"
            alt=""
            width={72}
            height={72}
            className="size-14 shrink-0 object-contain"
            priority
          />
          <span className="truncate font-serif text-lg leading-none tracking-tight">{name}</span>
        </Link>
        <div className="flex items-center gap-3">
          <a href={phoneHref} className="hidden text-sm text-ink sm:inline">
            {phoneDisplay}
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-line xl:block" aria-label="Primary">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 px-8">
          {items.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 py-3 text-sm ${
                  pathname === item.href ? "text-accent" : "text-ink hover:text-accent"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                {item.children?.length ? <CaretDownIcon size={12} /> : null}
              </Link>
              {item.children?.length ? (
                <ul className="invisible absolute left-0 top-full z-50 min-w-52 border border-line bg-paper py-2 opacity-0 shadow-sm group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.href + child.label}>
                      <Link href={child.href} className="block px-4 py-2 text-sm text-ink hover:bg-[#e7edf5] hover:text-accent">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      {open ? (
        <nav id="mobile-nav" className="max-h-[70dvh] overflow-y-auto border-t border-line bg-paper xl:hidden" aria-label="Mobile">
          <ul>
            {items.map((item) => {
              const expanded = section === item.label;
              return (
                <li key={item.label} className="border-b border-line">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`block flex-1 px-5 py-3 text-base ${pathname === item.href ? "text-accent" : "text-ink"}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <button
                        type="button"
                        className="px-4 py-3 text-ink"
                        aria-expanded={expanded}
                        onClick={() => setSection(expanded ? null : item.label)}
                      >
                        <CaretDownIcon size={14} className={expanded ? "rotate-180" : ""} />
                        <span className="sr-only">Show {item.label} links</span>
                      </button>
                    ) : null}
                  </div>
                  {expanded && item.children?.length ? (
                    <ul className="bg-[#e7edf5] pb-2">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            className="block px-8 py-2 text-sm text-ink"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
