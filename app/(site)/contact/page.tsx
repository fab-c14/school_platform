import Link from "next/link";
import {
  ArrowUpRightIcon,
  BusIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Contact Welkin International School",
    "Office phone numbers, address, visiting hours, and inquiry form for Welkin International School, Sevar Thandipora, Lolab.",
    "/contact",
  );
}

export default async function ContactPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Get in Touch</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Contact the School Office
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          We welcome your inquiries regarding admissions, student progress, campus visits, and career opportunities. Reach out by phone, visit our campus, or send us a message below.
        </p>
      </header>

      {/* Main Contact Form & Details Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact Details Card */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Direct Assistance</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
                We are here to help.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Our administrative staff in Sevar Thandipora is ready to answer questions regarding class availability, documentation, and school policies.
              </p>

              <dl className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <PhoneIcon size={22} weight="duotone" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Phone Helplines</dt>
                    <dd className="mt-1 font-serif text-2xl font-medium text-ink">
                      <a href={site.contact.phoneHref} className="hover:text-accent">
                        {site.contact.phoneDisplay}
                      </a>
                    </dd>
                    <dd className="text-sm text-muted">
                      Alternative:{" "}
                      <a href={site.contact.phoneAltHref} className="font-medium text-ink hover:text-accent">
                        {site.contact.phoneAltDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <MapPinIcon size={22} weight="duotone" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Campus Address</dt>
                    <dd className="mt-1 font-serif text-2xl text-ink">Welkin International School</dd>
                    <dd className="text-sm leading-relaxed text-muted">
                      Sevar Thandipora, Lolab Valley, District Kupwara, Jammu & Kashmir – 193223
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                    <ClockIcon size={22} weight="duotone" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Working Hours</dt>
                    <dd className="mt-1 font-serif text-2xl text-ink">Monday to Friday</dd>
                    <dd className="text-sm text-muted">8:00 AM to 3:30 PM (School Days)</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-white/70 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-ink">
                <ShieldCheckIcon size={22} weight="duotone" className="text-accent shrink-0" />
                <span className="font-semibold text-sm">Official School Verification</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                All communications and receipts are officially processed through the school office at Sevar Thandipora. We do not engage unauthorized third-party representatives.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-line bg-white p-7 shadow-sm md:p-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Online Enquiry</span>
            <h3 className="mt-2 font-serif text-3xl tracking-tight text-ink md:text-4xl">
              Send a note to the office
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Fill in your details below and our team will review your message promptly.
            </p>
            <div className="mt-8">
              <EnquiryForm copy={site.form} />
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach Campus */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Reaching Lolab</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Visiting instructions & directions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Welkin International School is conveniently situated in Sevar Thandipora, easily accessible by road from major hubs of Kupwara district.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <BusIcon size={22} weight="duotone" />
              </span>
              <h3 className="mt-4 font-serif text-2xl text-ink">From Kupwara Town</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Approximately 18 km via the Kupwara–Sogam road. Regular passenger cabs and buses connect Kupwara to Sevar Thandipora daily.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <BusIcon size={22} weight="duotone" />
              </span>
              <h3 className="mt-4 font-serif text-2xl text-ink">From Sogam / Lalpora</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Located just a short drive from Sogam sub-division headquarters. School transport vans cover pickup points throughout the central valley.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <ClockIcon size={22} weight="duotone" />
              </span>
              <h3 className="mt-4 font-serif text-2xl text-ink">Visitor Appointments</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                While walk-in inquiries are welcomed, parents wishing to meet Chairman Iftekhar Ul Akbar are encouraged to call ahead to schedule an appointment.
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
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Prefer to apply online?</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              You can complete the preliminary admission form directly from your mobile phone or computer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply#application"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Start application
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Admissions guide
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
