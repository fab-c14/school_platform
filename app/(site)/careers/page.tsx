import Link from "next/link";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  HeartIcon,
  LightbulbIcon,
  MapPinIcon,
  PhoneIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Careers & Faculty Openings",
    "Teaching and administrative career opportunities at Welkin International School, Sevar Thandipora, Lolab.",
    "/careers",
  );
}

const openRoles = [
  {
    title: "TGT Mathematics (Grades 6–10)",
    department: "Secondary Academics",
    type: "Full Time",
    experience: "1–3 Years preferred (Fresh postgraduates welcome)",
    qualification: "BSc / MSc Mathematics with B.Ed",
    description:
      "Responsible for developing strong conceptual clarity, problem-solving skills, and preparation for board examinations. Ability to teach with patience and make arithmetic and algebra intuitive.",
  },
  {
    title: "TGT Science / Biological Sciences (Grades 6–10)",
    department: "Secondary Academics",
    type: "Full Time",
    experience: "1–3 Years preferred",
    qualification: "BSc / MSc Botany / Zoology / Chemistry with B.Ed",
    description:
      "Conducting theoretical and practical laboratory sessions. Encouraging students to observe the rich natural ecosystem of Lolab Valley and preparing candidates with early competitive foundations.",
  },
  {
    title: "Arabic Language & Quranic Tajweed Educator",
    department: "Islamic Studies & Language",
    type: "Full Time",
    experience: "Prior experience in recognized Madaris / Islamic Institutions",
    qualification: "Fazil / Alim / MA Arabic with verified Tajweed certification",
    description:
      "Teaching classical Quranic Tajweed, correct phonetic articulation (Makharij), basic conversational Arabic, and Islamic ethics (Akhlaq) to primary and middle grades.",
  },
  {
    title: "Primary & Kindergarten Educator (Foundational Stage)",
    department: "Early Childhood",
    type: "Full Time",
    experience: "Early childhood or primary experience",
    qualification: "Graduate with NTT / D.El.Ed / B.Ed",
    description:
      "Fostering a nurturing, compassionate classroom atmosphere for young learners in Nursery, LKG, and UKG. Focus on phonics, motor skill development, and Islamic manners in daily routine.",
  },
  {
    title: "Administrative Office Coordinator & IT Assistant",
    department: "School Administration",
    type: "Full Time",
    experience: "Familiarity with school office software & document management",
    qualification: "BCA / Graduate with Diploma in Computer Applications (DCA)",
    description:
      "Managing student enrollment records, fee registry, parent communication, circular distribution, and day-to-day administrative coordination at the Sevar Thandipora campus.",
  },
];

const perks = [
  {
    icon: HeartIcon,
    title: "Purpose-Driven Mission",
    body: "Be part of transforming education in North Lolab, mentoring youth who genuinely need passionate teachers and guidance.",
  },
  {
    icon: LightbulbIcon,
    title: "Leadership & Mentorship",
    body: "Work under the direct guidance of Chairman Iftekhar Ul Akbar (MSc, MPhil), an experienced educator across competitive exams.",
  },
  {
    icon: UsersThreeIcon,
    title: "Respectful Community",
    body: "A collaborative, Islamic work environment built on mutual respect, dignified conduct, and appreciative local families.",
  },
  {
    icon: GraduationCapIcon,
    title: "Professional Growth",
    body: "Regular teaching workshops, curriculum planning sessions, and opportunities to lead student houses and co-curricular clubs.",
  },
];

export default async function CareersPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Join Our Faculty</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Teach with purpose in North Lolab.
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          We invite dedicated educators and professionals who believe that teaching is an Amanah—a sacred responsibility to mold the minds, morals, and futures of our children.
        </p>
      </header>

      {/* Open Positions Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Current Vacancies</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Openings for Session 2026–27
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Applications are reviewed on a rolling basis. Shortlisted candidates will be invited for an interaction and classroom demonstration.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {openRoles.map((role) => (
              <article
                key={role.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#f6ebe4] px-2.5 py-1 text-xs font-semibold text-accent uppercase">
                        {role.department}
                      </span>
                      <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-medium text-ink">
                        {role.type}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-3xl tracking-tight text-ink">{role.title}</h3>
                  </div>

                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-ink px-5 text-xs font-semibold text-ink transition hover:bg-ink hover:text-paper"
                  >
                    <PhoneIcon size={14} weight="bold" />
                    <span>Inquire: {site.contact.phoneDisplay}</span>
                  </a>
                </div>

                <div className="mt-5 grid gap-4 border-t border-line/70 pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted">Eligibility & Qualifications:</span>
                    <p className="mt-1 font-medium text-ink">{role.qualification}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted">Experience Level:</span>
                    <p className="mt-1 font-medium text-ink">{role.experience}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{role.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work at Welkin */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Why Join Us</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              A workplace rooted in dignity.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We respect our educators as the heartbeat of the institution, offering an atmosphere where teaching is honored as noble work.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:p-7"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{perk.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="rounded-2xl border border-line bg-white p-8 md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Application Process</span>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-ink md:text-4xl">
                How to submit your credentials
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Interested candidates can apply through either of the following straightforward steps:
              </p>

              <ol className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <strong className="text-ink">Step 1 — Call the Administrative Desk:</strong>
                    <p className="text-sm text-muted">
                      Reach out to our office on <strong className="text-ink">{site.contact.phoneDisplay}</strong> or <strong className="text-ink">{site.contact.phoneAltDisplay}</strong> to express your interest and schedule an interview slot.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <strong className="text-ink">Step 2 — Submit CV at the Campus:</strong>
                    <p className="text-sm text-muted">
                      Drop off your updated resume along with photocopies of academic qualifications and experience certificates at our Sevar Thandipora office.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <strong className="text-ink">Step 3 — Interactive Demonstration:</strong>
                    <p className="text-sm text-muted">
                      Shortlisted teachers will be invited to conduct a brief 15-minute demonstration session in their subject area followed by an interview with the Chairman.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="mist" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Have questions about joining us?</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Speak directly with our administrative team at Sevar Thandipora, Lolab.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              <PhoneIcon size={16} weight="bold" />
              Call {site.contact.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Send a note
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
