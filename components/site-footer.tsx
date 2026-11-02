import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/photo";

type FooterLink = { href: string; label: string };

export function SiteFooter({
  name,
  note,
  copyrightYear,
  addressLines,
  hours,
  phoneHref,
  phoneDisplay,
  phoneAltHref,
  phoneAltDisplay,
  email,
  contactLabel,
  nav,
}: {
  name: string;
  note: string;
  copyrightYear: string;
  addressLines: string[];
  hours: string;
  phoneHref: string;
  phoneDisplay: string;
  phoneAltHref: string;
  phoneAltDisplay: string;
  email: string;
  contactLabel: string;
  nav: FooterLink[];
}) {
  return (
    <footer className="relative isolate overflow-hidden bg-deep text-paper">
      <Photo
        src="/images/campus.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_42%] opacity-25"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-deep via-deep/95 to-deep/70" aria-hidden />
      <span className="breeze-cut-cta absolute -right-24 top-0 h-full w-[46%] bg-accent/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.72fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid size-12 place-items-center overflow-hidden rounded-full border border-paper/20">
                <Image src="/brand/logo.jpg" alt="" width={48} height={48} unoptimized className="size-12 object-cover" />
              </span>
              <p className="max-w-[13rem] text-sm font-medium leading-tight tracking-[-0.02em]">{name}</p>
            </div>
            <p className="mt-7 max-w-md font-serif text-4xl leading-[1.02] tracking-[-0.055em] md:text-5xl">
              Excel with purpose<span className="text-accent">.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/75">{note}</p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:scale-[0.98]"
            >
              Contact the office
              <ArrowUpRightIcon size={15} weight="bold" aria-hidden />
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-paper/55">Explore</p>
            <ul className="mt-5 grid gap-3 text-sm">
              {nav
                .filter((item) => item.href !== "/")
                .slice(0, 6)
                .map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} className="text-paper/80 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-paper/55">Visit</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-paper/80">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-3 block text-paper/60">{hours}</span>
            </address>

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-paper/55">Office</p>
            <div className="mt-3 grid gap-1.5 text-sm">
              <a className="w-fit text-paper/85 transition hover:text-white" href={phoneHref}>
                {phoneDisplay}
              </a>
              <a className="w-fit text-paper/85 transition hover:text-white" href={phoneAltHref}>
                {phoneAltDisplay}
              </a>
              {email ? (
                <a className="w-fit text-paper/85 transition hover:text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              ) : null}
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-paper underline decoration-accent underline-offset-4 transition hover:text-white"
            >
              {contactLabel}
              <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} {name}
          </p>
          <p>Sevar Thandipora, Lolab</p>
        </div>
      </div>
    </footer>
  );
}
