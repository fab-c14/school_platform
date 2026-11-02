import Link from "next/link";
import {
  ArrowUpRightIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartIcon,
  LightbulbIcon,
  PhoneIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Alumni Network & Mentorship",
    "Connecting past students, higher education pathways, and community mentorship at Welkin International School, Sevar Thandipora, Lolab.",
    "/alumni",
  );
}

const alumniPillars = [
  {
    icon: GraduationCapIcon,
    title: "Higher Education Mentorship",
    description:
      "Alumni studying medicine, engineering, civil services, commerce, and humanities return to share strategic roadmaps, book recommendations, and exam strategies with high school students.",
  },
  {
    icon: HandshakeIcon,
    title: "The Lolab Giving-Back Pledge",
    description:
      "Our alumni embody the motto 'Excel with Purpose'. Wherever their careers take them, they stay connected with North Lolab, initiating scholarships and local social initiatives.",
  },
  {
    icon: UsersThreeIcon,
    title: "Annual Alumni Homecoming",
    description:
      "Every year during the summer session, former students assemble on the campus grounds in Sevar Thandipora to reconnect with their teachers, share memories, and inspire current cohorts.",
  },
  {
    icon: LightbulbIcon,
    title: "Career & Vocational Guidance",
    description:
      "One-on-one counsel for Class 10 graduates choosing higher secondary streams (Medical, Non-Medical, Arts, Commerce), vocational diplomas, or college admissions.",
  },
];

export default async function AlumniPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our Graduates</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Welkin Alumni Network
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Carrying the light of intellect and moral purpose beyond the valley. Once a Welkinian, always a pillar of our community.
        </p>
      </header>

      {/* Vision Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">A Lasting Bond</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              An Amanah that extends across generations.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Chairman Iftekhar Ul Akbar founded Welkin with the driving conviction that North Lolab possesses brilliant minds waiting to be nurtured. Our alumni are the living proof of that conviction—scholars, aspirants, and professionals who lead with character.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {alumniPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alumni Registration Card */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Stay Connected</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
                Register in the Alumni Directory.
              </h2>
              <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-muted">
                Are you a former student of Welkin International School? We want to celebrate your journey, invite you to mentorship sessions, and keep you informed about school developments.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <SparkleIcon size={20} weight="fill" className="mt-1 text-accent shrink-0" />
                  <p className="text-sm text-ink">
                    <strong>Career Updates:</strong> Let us know which college, university, or profession you have progressed into.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <SparkleIcon size={20} weight="fill" className="mt-1 text-accent shrink-0" />
                  <p className="text-sm text-ink">
                    <strong>Guest Sessions:</strong> Speak to current 8th–10th graders about competitive exam preparation (NEET, JEE, JKSSB).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <SparkleIcon size={20} weight="fill" className="mt-1 text-accent shrink-0" />
                  <p className="text-sm text-ink">
                    <strong>Homecoming Invites:</strong> Receive personal invitations for our Annual Day celebrations and alumni dinners.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm md:p-8">
              <h3 className="font-serif text-2xl text-ink">How to Register</h3>
              <p className="mt-2 text-sm text-muted">
                Simply call or send a WhatsApp message to the administrative desk with:
              </p>
              <ul className="mt-4 space-y-2 rounded-xl bg-[#f6ebe4]/50 p-4 text-sm text-ink font-mono">
                <li>1. Full Name & Batch / Year of Passing</li>
                <li>2. Current College / University / Occupation</li>
                <li>3. Phone Number & Current City</li>
                <li>4. Area of Interest for Mentorship</li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:-translate-y-px active:scale-[0.98]"
                >
                  <PhoneIcon size={16} weight="bold" />
                  Call Office: {site.contact.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper active:scale-[0.98]"
                >
                  Send via Contact Form
                  <ArrowUpRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Alumni Mentorship Program</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Join hands with Chairman Iftekhar Ul Akbar to mentor the next generation of students from North Lolab.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Contact the office
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Back to Home
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
