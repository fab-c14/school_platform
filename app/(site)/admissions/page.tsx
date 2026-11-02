import Link from "next/link";
import { ArrowUpRightIcon, CheckCircleIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { DOCUMENT_SLOTS } from "@/lib/admissions";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.admissions.title, site.admissions.description, "/admissions");
}

export default async function AdmissionsPage() {
  const site = await getSite();
  const page = site.admissions;

  return (
    <main>
      <header className="mx-auto max-w-[1400px] px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">{page.title}</h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{page.lede}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/apply#application"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
          >
            Start application
            <ArrowUpRightIcon size={16} weight="bold" />
          </Link>
          <a
            href={site.contact.phoneHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-5 text-sm font-medium text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
          >
            <PhoneIcon size={16} weight="bold" />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </header>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl">How it works</h2>
            <ol className="mt-8">
              {page.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0">
                  <span className="font-serif text-2xl text-accent">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight">{step.title}</h3>
                    <p className="mt-2 max-w-[58ch] text-base leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit border border-line bg-[#f6ebe4] p-6 md:p-8">
            <h2 className="font-serif text-3xl tracking-tight">Keep these ready</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The birth certificate and photograph are needed with the form. The other papers can follow.
            </p>
            <ul className="mt-6 grid gap-4">
              {DOCUMENT_SLOTS.map((document) => (
                <li key={document.key} className="flex gap-3">
                  <CheckCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {document.label}
                      {document.required ? <span className="ml-1 text-accent">*</span> : null}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{document.hint}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/apply#application"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Open the application form
              <ArrowUpRightIcon size={15} weight="bold" />
            </Link>
          </aside>
        </div>
      </section>

      <section id="dates" className="border-t border-line bg-[#f6ebe4]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{page.datesTitle}</h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">{page.datesNote}</p>
          <dl className="mt-8 max-w-xl">
            {page.dates.map((row) => (
              <div key={row.label} className="grid gap-1 border-t border-line py-4 sm:grid-cols-2">
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="font-serif text-xl">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Have a question about the form?{" "}
            <Link href="/apply#questions" className="underline decoration-accent underline-offset-4 hover:text-accent">
              Read the questions families ask
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-deep text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Ask before you apply.</h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-paper/80">
              Call {site.contact.phoneDisplay} or {site.contact.phoneAltDisplay}. The office will tell you which class has a place and what to bring.
            </p>
          </div>
          <a
            href={site.contact.phoneHref}
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition hover:-translate-y-px active:scale-[0.98]"
          >
            <PhoneIcon size={16} weight="bold" />
            Call {site.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}
