import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClockIcon,
  FilePdfIcon,
  GraduationCapIcon,
  HeartIcon,
  InfoIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { DOCUMENT_SLOTS } from "@/lib/admissions";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Admissions 2026–27: Process & Eligibility",
    "Complete admission criteria, steps to apply, required documents, and age eligibility for Welkin International School, Sevar Thandipora, Lolab.",
    "/admissions",
  );
}

const ageCriteria = [
  { grade: "Nursery", age: "3+ Years", asOf: "As of March 2026", seats: "Open" },
  { grade: "L.K.G (Lower Kindergarten)", age: "4+ Years", asOf: "As of March 2026", seats: "Open" },
  { grade: "U.K.G (Upper Kindergarten)", age: "5+ Years", asOf: "As of March 2026", seats: "Open" },
  { grade: "Grade 1st to 5th (Primary)", age: "6 to 10 Years", asOf: "Class-appropriate transfer", seats: "Limited" },
  { grade: "Grade 6th to 8th (Middle)", age: "11 to 13 Years", asOf: "Prior school marks card required", seats: "Limited" },
  { grade: "Grade 9th & 10th (Secondary)", age: "14+ Years", asOf: "Subject to verification & entrance call", seats: "Inquire Office" },
];

export default async function AdmissionsPage() {
  const site = await getSite();
  const page = site.admissions;

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Session 2026–27</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Admissions Procedure
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          We welcome applications for students from Nursery through Grade 10. Our admissions desk in Sevar Thandipora, Lolab, is open to guide families through every step.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/apply#application"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:-translate-y-px active:scale-[0.98]"
          >
            Start online application
            <ArrowUpRightIcon size={16} weight="bold" />
          </Link>
          <a
            href={site.contact.phoneHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper active:scale-[0.98]"
          >
            <PhoneIcon size={16} weight="bold" />
            Helpline: {site.contact.phoneDisplay}
          </a>
        </div>
      </header>

      {/* Step by step process */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Step-by-Step</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
                How to join the Welkin family.
              </h2>
              <ol className="mt-8 space-y-6">
                {page.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f6ebe4] font-serif text-xl font-bold text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Checklist of documents */}
            <aside className="h-fit rounded-2xl border border-line bg-white p-7 shadow-sm md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                  <ShieldCheckIcon size={22} weight="duotone" />
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-ink">Keep These Ready</h3>
                  <p className="text-xs text-muted">Required during application submission</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {DOCUMENT_SLOTS.map((document) => (
                  <li key={document.key} className="flex gap-3 border-t border-line/60 pt-3">
                    <CheckCircleIcon size={18} weight="fill" className="mt-1 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {document.label}
                        {document.required ? <span className="ml-1 text-accent">*</span> : null}
                      </p>
                      <p className="text-xs text-muted">{document.hint}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/apply#application"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition hover:-translate-y-px"
                >
                  <span>Open application form</span>
                  <ArrowUpRightIcon size={16} weight="bold" />
                </Link>
                <Link
                  href="/downloads"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-ink transition hover:bg-[#f6ebe4]"
                >
                  <FilePdfIcon size={16} className="text-accent" />
                  <span>Download printable PDF form</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Age Eligibility Table */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Grade Placement</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Age Criteria & Availability
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              To ensure developmental readiness and peer alignment, please review our recommended age guidelines as of the session start.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line bg-[#f6ebe4]/60 text-xs font-semibold uppercase tracking-wider text-muted">
                    <th className="p-4 md:px-6">Class / Grade</th>
                    <th className="p-4 md:px-6">Recommended Age</th>
                    <th className="p-4 md:px-6">Entry Condition</th>
                    <th className="p-4 md:px-6">Seat Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-sm text-ink">
                  {ageCriteria.map((item) => (
                    <tr key={item.grade} className="hover:bg-paper/40 transition">
                      <td className="p-4 font-serif text-lg font-medium md:px-6">{item.grade}</td>
                      <td className="p-4 font-mono md:px-6">{item.age}</td>
                      <td className="p-4 text-muted md:px-6">{item.asOf}</td>
                      <td className="p-4 md:px-6">
                        <span className="inline-block rounded-md bg-[#f6ebe4] px-2.5 py-1 text-xs font-semibold text-accent">
                          {item.seats}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Fee & Scholarship Policy */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="rounded-2xl border border-line bg-white p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Financial Transparency</span>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink md:text-4xl">
                  Fee Structure & Welfare Concessions
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Welkin International School operates as an educational trust dedicated to North Lolab. We maintain transparent and modest monthly fees designed to cover experienced faculty remuneration and facility maintenance.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <HeartIcon size={20} weight="fill" className="mt-1 text-accent shrink-0" />
                    <p className="text-sm text-muted">
                      <strong className="text-ink">Orphan & Needy Student Support:</strong> Special concessions are available for deserving students and orphans from local villages after confidential administrative review.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon size={20} weight="fill" className="mt-1 text-accent shrink-0" />
                    <p className="text-sm text-muted">
                      <strong className="text-ink">Sibling Concession:</strong> Modest fee waivers apply when two or more siblings are concurrently enrolled.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-[#f6ebe4]/50 p-6 md:p-8">
                <h4 className="font-serif text-2xl text-ink">Inquire About Fees</h4>
                <p className="mt-2 text-sm text-muted">
                  The exact grade-wise fee schedule is shared directly with families upon campus inquiry or phone call.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={site.contact.phoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition hover:-translate-y-px"
                  >
                    <PhoneIcon size={16} weight="bold" />
                    Call {site.contact.phoneDisplay}
                  </a>
                  <p className="text-center text-xs text-muted">Office hours: 8:00 AM – 3:30 PM (Mon–Fri)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="mist" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Take the next step today.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Submit your preliminary details online and our admissions coordinator will call you to confirm your child&rsquo;s place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply#application"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Start application now
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Directions to school
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
