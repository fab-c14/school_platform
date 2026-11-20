import Link from "next/link";
import {
  ArrowUpRightIcon,
  FilePdfIcon,
  PhoneIcon,
  PrinterIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { listPublicDocuments } from "@/lib/records";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Downloads & School Circulars",
    "Download admission forms, syllabus split-up, book lists, and official circulars from Welkin International School, Sevar Thandipora, Lolab.",
    "/downloads",
  );
}

export default async function DownloadsPage() {
  const site = await getSite();
  const uploadedFiles = await listPublicDocuments();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Resource Center</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Downloads & Documents
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Official forms, circulars, book lists, and administrative documents for students and parents of Welkin International School, Sevar Thandipora, Lolab.
        </p>
      </header>

      <section className="relative overflow-hidden bg-[#f6ebe4]" aria-labelledby="school-downloads">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <h2 id="school-downloads" className="font-serif text-4xl tracking-tight md:text-5xl">Forms & guidelines</h2>
          {uploadedFiles.length ? (
            <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
              {uploadedFiles.map((file) => (
                <li key={file.id} className="flex flex-wrap items-center justify-between gap-3 p-5 md:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <FilePdfIcon size={24} weight="duotone" className="shrink-0 text-accent" aria-hidden />
                    <span className="wrap-anywhere font-semibold text-ink">{file.name}</span>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${file.name} PDF (opens in a new tab)`}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-ink hover:bg-[#f6ebe4] hover:text-accent"
                  >
                    Open PDF <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">No PDFs are published yet. Contact the school office if you need a printed copy.</p>
          )}
        </div>
      </section>

      {/* Printing & Verification Notice */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <PrinterIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Physical Copies</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Families who do not have access to a printer may collect physical paper sets of all forms and book lists directly from the school office desk during working hours.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <ShieldCheckIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Authentication & Stamp</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Transfer certificates, marks sheets, and bonafide student certificates must be stamped with the official school seal and signed by the Principal to be valid for official verification.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <PhoneIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Document Assistance</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Need clarification regarding syllabus editions or required admission paperwork? Call our office team directly at{" "}
                <span className="font-semibold text-ink">{site.contact.phoneDisplay}</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Ready to apply?</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              You can also complete the admissions application directly online without downloading any forms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Fill online application
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Contact the office
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
