import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  FlaskIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TranslateIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AdmissionsForm } from "@/components/admissions-form";
import { AuroraWash } from "@/components/aurora-wash";
import { Faq } from "@/components/faq";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

const reasons = [
  {
    icon: BookOpenIcon,
    title: "Qur'an with Tajweed",
    body: "Qur'an and Islamic studies sit inside the school day, not after it.",
  },
  {
    icon: FlaskIcon,
    title: "Modern sciences",
    body: "Science and the other modern subjects are taught beside religious learning.",
  },
  {
    icon: TranslateIcon,
    title: "Arabic and languages",
    body: "Arabic is treated as a foundation, taught with the languages needed for further study.",
  },
  {
    icon: UsersThreeIcon,
    title: "A local school",
    body: "Families from Sevar Thandipora and North Lolab grow together in one place.",
  },
];

const faqs = [
  {
    question: "Which classes are open for admission?",
    answer:
      "The office confirms which classes have places for the current session. Call 7006384265 before you fill in the form if you are asking about a specific class.",
  },
  {
    question: "What documents should I keep ready?",
    answer:
      "A birth certificate and a passport size photograph are needed with the form. The previous year report card and Aadhar card can follow if they are not ready today.",
  },
  {
    question: "Is there an entrance test?",
    answer:
      "The office will say whether a visit or a short assessment is needed for the class you are asking about. Nothing is decided before that call.",
  },
  {
    question: "Can we visit the school before applying?",
    answer:
      "Yes. Call the office and ask for a time to see the classrooms and meet the people who teach.",
  },
  {
    question: "Does the school provide transport?",
    answer:
      "The school has not published a transport note. Ask the office about routes and timings when you call.",
  },
  {
    question: "How are fees shared?",
    answer:
      "The office shares the current fee note directly with families. It is not published on this page because it can change with the session.",
  },
];

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Apply for admission",
    "Apply to Welkin International School, Sevar Thandipora, Lolab. Nursery to Grade 10 application form and document checklist.",
    "/apply",
  );
}

export default async function ApplyPage() {
  const site = await getSite();
  const phone = site.contact.phoneDisplay;
  const phoneHref = site.contact.phoneHref;

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <section className="relative overflow-hidden bg-paper">
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-16">
          <div>
            <p className="text-sm text-accent">Admissions</p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
              {site.apply.title}
            </h1>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
              A place in Sevar Thandipora, Lolab, where modern learning sits beside faith. Start the application here and the office will call you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#application"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
              >
                Start application
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
              <a
                href={phoneHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-5 text-sm font-medium text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
              >
                <PhoneIcon size={16} weight="bold" />
                Call the office
              </a>
            </div>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden bg-line lg:min-h-[32rem]">
            <Photo
              src="/images/life/blue-building.jpg"
              alt="Students of Welkin International School outside the school building"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_42%]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#f6ebe4]">
        <dl className="mx-auto grid max-w-[1400px] md:grid-cols-3">
          <div className="border-b border-line px-5 py-6 md:border-b-0 md:border-r md:px-8">
            <dt className="text-sm font-medium text-ink">Sevar Thandipora</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">The school office is in Lolab.</dd>
          </div>
          <div className="border-b border-line px-5 py-6 md:border-b-0 md:border-r md:px-8">
            <dt className="text-sm font-medium text-ink">Office phone</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              <a href={phoneHref} className="underline decoration-accent underline-offset-4 hover:text-accent">
                {phone}
              </a>{" "}
              on school days.
            </dd>
          </div>
          <div className="px-5 py-6 md:px-8">
            <dt className="text-sm font-medium text-ink">What happens next</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">The office confirms the class and the next step by phone.</dd>
          </div>
        </dl>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-[58ch]">
            <h2 className="font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">Why families choose Welkin</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The school joins religious learning with the subjects a child needs to go further, in one place and in one day.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <li key={reason.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f6ebe4] text-accent">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight">{reason.title}</h3>
                    <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">{reason.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="application" className="scroll-mt-20 border-t border-line bg-[#f6ebe4]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-[62ch]">
            <h2 className="font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">Start your application</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {site.apply.note} Fields marked with an asterisk are needed before the office can take the application forward.
            </p>
          </div>
          <div className="mt-8 rounded-[1.25rem] border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgb(29_43_56_/_0.35)] md:p-8 lg:p-10">
            <AdmissionsForm schoolName={site.name} phoneDisplay={phone} phoneHref={phoneHref} />
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <ShieldCheckIcon size={16} weight="duotone" className="mt-0.5 shrink-0 text-accent" />
            The details stay with the school office. They are not published on this site.
          </p>
        </div>
      </section>

      <section id="questions" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-[58ch]">
            <h2 className="font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">Questions families ask</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              If the answer you need is not here, call the office and ask for the admissions desk.
            </p>
          </div>
          <div className="mt-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-deep text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Talk to the office.</h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-paper/80">
              Call {phone} or {site.contact.phoneAltDisplay} on school days, or send a note from the contact page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition hover:-translate-y-px active:scale-[0.98]"
            >
              <PhoneIcon size={16} weight="bold" />
              {phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-5 text-sm font-medium text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Contact page
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
