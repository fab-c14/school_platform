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
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{page.lede}</p>
      </header>

      <section className="border-t border-line">
        <ol className="mx-auto grid max-w-7xl gap-px bg-line px-5 py-16 sm:grid-cols-2 md:px-8">
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
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{page.datesTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{page.datesNote}</p>
            <dl className="mt-8 border-t border-line">
              {page.dates.map((row) => (
                <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-2">
                  <dt className="text-sm text-muted">{row.label}</dt>
                  <dd className="font-serif text-xl">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-serif text-3xl tracking-tight">{site.form.title}</h2>
            <div className="mt-6">
              <EnquiryForm copy={site.form} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
