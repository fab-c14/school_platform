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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center gap-3 px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-ink" onClick={() => setOpen(false)}>
          <span className="relative grid size-14 place-items-center">
            <span className="absolute -inset-2 rounded-full bg-accent/20 blur-md" aria-hidden />
            <span className="absolute inset-0 rounded-full bg-paper" aria-hidden />
            <Image
              src="/brand/logo.jpg"
              alt=""
              width={72}
              height={72}
              className="relative size-14 rounded-full object-cover"
              priority
            />
          </span>
          <span className="hidden max-w-[9.5rem] font-serif text-base leading-tight tracking-tight sm:block xl:max-w-[11rem] xl:text-[1.05rem]">
            {name}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 xl:block" aria-label="Primary">
          <ul className="flex items-center justify-end gap-x-2.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] 2xl:gap-x-4 [&::-webkit-scrollbar]:hidden">
            {items.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 py-3 text-[13px] 2xl:text-sm ${
                    pathname === item.href ? "text-accent" : "text-ink hover:text-accent"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                  {item.children?.length ? (
                    <CaretDownIcon size={12} className="transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  ) : null}
                </Link>
                {item.children?.length ? (
                  <ul className="invisible absolute left-0 top-full z-50 min-w-52 translate-y-1 border border-line bg-paper/95 py-2 opacity-0 shadow-[0_16px_40px_rgba(8,69,86,0.12)] backdrop-blur-md transition duration-200 before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-[''] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link href={child.href} className="block px-4 py-2 text-sm text-ink hover:bg-[#e5f6f8] hover:text-accent">
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

        <a href={phoneHref} className="ml-auto hidden text-sm text-ink xl:ml-2 xl:inline">
          {phoneDisplay}
        </a>
        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

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
                        <CaretDownIcon size={14} className={expanded ? "rotate-180 transition duration-200" : "transition duration-200"} />
                        <span className="sr-only">Show {item.label} links</span>
                      </button>
                    ) : null}
                  </div>
                  {expanded && item.children?.length ? (
                    <ul className="bg-[#e5f6f8] pb-2">
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
          <a href={phoneHref} className="block px-5 py-4 text-sm text-ink">
            {phoneDisplay}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
