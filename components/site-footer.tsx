import { ArrowUpRightIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

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
}) {
  return (
    <footer className="overflow-hidden bg-deep text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.72fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid size-12 place-items-center overflow-hidden rounded-full border border-paper/20">
                <Image src="/brand/logo.jpg" alt="" width={48} height={48} unoptimized className="size-12 object-cover" />
              </span>
              <p className="max-w-[13rem] text-sm font-medium leading-tight tracking-[-0.02em]">{name}</p>
            </div>
            <p className="mt-7 max-w-md font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-5xl">
              Excel with purpose<span className="text-accent">.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper-secondary">{note}</p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:scale-[0.98]"
            >
              Contact the office
              <ArrowUpRightIcon size={15} weight="bold" aria-hidden />
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-paper-secondary">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              <li>
                <Link href="/about" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  About School
                </Link>
              </li>
              <li>
                <Link href="/motto" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Motto & Crest
                </Link>
              </li>
              <li>
                <Link href="/academics" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/apply" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Apply Online
                </Link>
              </li>
              <li>
                <Link href="/campus" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/students" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Student Corner
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/news" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  News & Notices
                </Link>
              </li>
              <li>
                <Link href="/careers" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="font-medium text-paper/95 transition hover:text-white hover:underline">
                  Alumni Network
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-paper-secondary">Visit</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-paper/80">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-3 block text-paper-secondary">{hours}</span>
            </address>

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-paper-secondary">Office</p>
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

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-paper/15 pt-6 text-xs text-paper-secondary">
          <p>
            © {copyrightYear} {name}
          </p>
          <p>Sevar Thandipora, Lolab</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <HeartIcon size={13} weight="fill" className="shrink-0 text-rose-300" aria-hidden />
            <span>
              Made with love by{" "}
              <a
                href="https://fabsfolio.me"
                className="font-medium text-paper underline decoration-paper/35 underline-offset-4 transition-colors hover:decoration-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
              >
                Faisal Farooq
              </a>
            </span>
            <span aria-hidden>·</span>
            <a
              href="https://github.com/fab-c14"
              aria-label="fab-c14 on GitHub"
              className="inline-flex items-center gap-1 text-paper/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              fab-c14
              <ArrowUpRightIcon size={11} aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
