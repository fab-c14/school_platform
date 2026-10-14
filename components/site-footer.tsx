import Link from "next/link";
import { Mark } from "@/components/mark";

export function SiteFooter({
  name,
  note,
  addressLines,
  hours,
  phoneHref,
  phoneDisplay,
  email,
  contactLabel,
}: {
  name: string;
  note: string;
  addressLines: string[];
  hours: string;
  phoneHref: string;
  phoneDisplay: string;
  email: string;
  contactLabel: string;
}) {
  return (
    <footer className="mt-auto border-t border-line bg-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Mark className="size-8 text-accent" />
            <p className="font-serif text-xl">{name}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#d9d0c6]">{note}</p>
        </div>
        <div>
          <p className="text-sm text-[#d9d0c6]">Visit</p>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-3 block">{hours}</span>
          </address>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="text-[#d9d0c6]">Office</p>
          <a className="mt-3 block hover:text-white" href={phoneHref}>
            {phoneDisplay}
          </a>
          <a className="mt-1 block hover:text-white" href={`mailto:${email}`}>
            {email}
          </a>
          <Link href="/contact" className="mt-4 inline-block text-white underline decoration-accent underline-offset-4">
            {contactLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
