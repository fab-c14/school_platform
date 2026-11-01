"use client";

import { ArrowUpRightIcon, CaretDownIcon, ListIcon, PhoneIcon, XIcon } from "@phosphor-icons/react";
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
  const isActive = (href: string) => {
    const baseHref = href.split("#")[0];
    return baseHref === "/" ? pathname === "/" : pathname === baseHref || pathname.startsWith(`${baseHref}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[4.5rem] max-w-[1400px] items-center gap-3 px-4 md:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-line bg-paper transition group-hover:border-accent">
            <Image
              src="/brand/logo.jpg"
              alt=""
              width={52}
              height={52}
              className="size-11 object-cover transition duration-500 group-hover:scale-105"
              priority
            />
          </span>
          <span className="hidden max-w-[12rem] text-sm font-semibold leading-tight tracking-[-0.03em] sm:block">
            {name}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 lg:block" aria-label="Primary">
          <ul className="ml-auto flex items-center justify-end gap-1 overflow-x-auto whitespace-nowrap px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((item) => (
              <li key={item.label} className="group relative shrink-0">
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center gap-1 px-2.5 py-2.5 text-[13px] transition ${
                    isActive(item.href) ? "font-medium text-accent" : "text-muted hover:text-ink"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children?.length ? (
                    <CaretDownIcon
                      size={12}
                      className="transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  ) : null}
                  <span
                    className={`absolute inset-x-2.5 bottom-0 h-0.5 origin-left bg-accent transition ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </Link>
                {item.children?.length ? (
                  <ul className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-2 rounded-xl border border-line bg-paper p-2 opacity-0 shadow-[0_18px_45px_rgb(29_43_56_/_0.14)] transition duration-200 before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-[''] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                            isActive(child.href)
                              ? "bg-[#e8eef3] font-medium text-accent"
                              : "text-ink hover:bg-[#e8eef3] hover:text-accent"
                          }`}
                        >
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

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <a
            href={phoneHref}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
            aria-label={`Call ${phoneDisplay}`}
          >
            <PhoneIcon size={17} weight="bold" />
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
          >
            {contactLabel}
            <ArrowUpRightIcon size={15} weight="bold" />
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="max-h-[70dvh] overflow-y-auto border-t border-line bg-paper lg:hidden" aria-label="Mobile">
          <ul>
            {[...nav, { href: "/contact", label: contactLabel }].map((item) => {
              const expanded = section === item.label;
              return (
                <li key={item.label} className="border-b border-line">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`block flex-1 px-5 py-3 text-base ${
                        isActive(item.href) ? "font-medium text-accent" : "text-ink"
                      }`}
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
                    <ul className="bg-[#e8eef3] pb-2">
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
