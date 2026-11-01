import { AuroraWash } from "@/components/aurora-wash";
import { EnquiryForm } from "@/components/enquiry-form";
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
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{page.lede}</p>
      </header>

      <section id="apply" className="relative overflow-hidden border-t border-line bg-paper">
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{site.apply.title}</h2>
            <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-muted">{site.apply.note}</p>
            <p className="mt-6 text-sm text-ink">
              <a className="underline decoration-accent underline-offset-4" href={site.contact.phoneHref}>
                {site.contact.phoneDisplay}
              </a>
              <span className="px-2 text-muted">/</span>
              <a className="underline decoration-accent underline-offset-4" href={site.contact.phoneAltHref}>
                {site.contact.phoneAltDisplay}
              </a>
            </p>
          </div>
          <div className="border border-line bg-paper/90 p-5 md:p-8">
            <EnquiryForm copy={site.apply} />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <ol className="mx-auto grid max-w-[1400px] gap-px bg-line px-5 py-16 sm:grid-cols-2 md:px-8">
          {page.steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-6">
              <p className="font-serif text-3xl text-accent">0{index + 1}</p>
              <h2 className="mt-4 font-serif text-2xl">{step.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{page.datesTitle}</h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">{page.datesNote}</p>
          <dl className="mt-8 max-w-xl border-t border-line">
            {page.dates.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-2">
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="font-serif text-xl">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
