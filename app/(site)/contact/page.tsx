import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.contactPage.title, site.contactPage.description, "/contact");
}

export default async function ContactPage() {
  const site = await getSite();
  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {site.contactPage.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{site.contactPage.lede}</p>
      </header>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <address className="not-italic">
            <p className="text-sm text-muted">Address</p>
            {site.contact.addressLines.map((line) => (
              <p key={line} className="font-serif text-2xl leading-snug">
                {line}
              </p>
            ))}
            <p className="mt-8 text-sm text-muted">Hours</p>
            <p className="mt-1 text-base">{site.contact.hours}</p>
            <p className="mt-8 text-sm text-muted">Phone</p>
            <a className="mt-1 block text-base underline decoration-accent underline-offset-4" href={site.contact.phoneHref}>
              {site.contact.phoneDisplay}
            </a>
            {site.contact.email ? (
              <>
                <p className="mt-8 text-sm text-muted">Email</p>
                <a className="mt-1 block text-base underline decoration-accent underline-offset-4" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </>
            ) : null}
          </address>
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
