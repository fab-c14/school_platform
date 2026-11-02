import Link from "next/link";
import { ArrowUpRightIcon, CheckCircleIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "About Welkin: Story & Leadership",
    "Chairman Iftekhar Ul Akbar's vision, leadership, and moral founding principles of Welkin International School, Sevar Thandipora, Lolab.",
    "/about",
  );
}

const keyPrinciples = [
  {
    title: "An Amanah (Sacred Trust)",
    body: "Education is not a commercial enterprise; it is a profound trust placed in our hands by parents and by Allah (SWT). We carry this duty with total sincerity and transparency.",
  },
  {
    title: "Formation, Not Just Information",
    body: "In an era where facts are easily searchable, our focus is character formation: instilling critical thinking, emotional resilience, ethical manners (Akhlaq), and spiritual insight.",
  },
  {
    title: "Uplifting North Lolab",
    body: "Dedicated to solving the historical lack of competitive mentors in our valley, enabling students from rural villages to qualify for top medical, engineering, and civil service roles.",
  },
  {
    title: "Dual Heritage: Modern & Islamic",
    body: "Equipping children with strong English, mathematical, and scientific competence while simultaneously nurturing authentic Quranic recitation, Tajweed, and Islamic pride.",
  },
];

const leadershipTeam = [
  {
    role: "Chairman & Founder",
    credentials: "MSc, MPhil (Botany)",
    name: "Iftekhar Ul Akbar",
    bio: "Educator and mentor with years of experience guiding candidates from school to NEET, JKSSB, and Civil Services (IAS/KAS). Driven by the vision to see Lolab's youth lead across the nation.",
  },
  {
    role: "Academic Coordinator",
    credentials: "MSc, B.Ed",
    name: "Senior Academic Head",
    bio: "Overseeing syllabus integration, teacher training, student performance monitoring, and compliance with modern pedagogical standards.",
  },
  {
    role: "Head of Quranic & Islamic Studies",
    credentials: "Fazil, Certified Qari",
    name: "Department of Tajweed",
    bio: "Directing authentic Tajweed pronunciation, Nazra, and moral character instruction across all grade levels.",
  },
  {
    role: "Student Welfare & Administration",
    credentials: "BSc, Administrative Desk",
    name: "Office of Student Affairs",
    bio: "Managing student safety, transport logistics, parent communication, and pastoral care throughout the academic session.",
  },
];

export default async function AboutPage() {
  const site = await getSite();
  const about = site.about;

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our Story</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          About Welkin International School
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Founded in Sevar Thandipora, Lolab, to bridge the gap between world-class modern education and authentic spiritual values.
        </p>
      </header>

      {/* Chairman's Letter Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">From the Chairman</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl">
              {about.story.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {about.story.paragraphs.slice(0, 5).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-line shadow-md">
              <Photo
                src={about.story.image.src}
                alt={about.story.image.alt}
                fill
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-2xl font-medium text-ink">{about.leaders[0]?.name}</p>
              <p className="text-sm text-accent">{about.leaders[0]?.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman message continuation & Vision */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <blockquote className="rounded-2xl border-l-4 border-accent bg-[#f6ebe4]/50 p-6 md:p-8">
              <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
                &ldquo;{about.story.paragraphs[5]}&rdquo;
              </p>
              <p className="mt-4 font-serif text-xl text-accent">
                &ldquo;{about.story.paragraphs[6]}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Guiding Principles Grid */}
          <div className="mt-16">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Core Convictions</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              What the school is for.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {keyPrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-serif text-2xl text-ink">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Faculty Section */}
      <section id="leadership" className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Academic Leadership</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              People who steer our school.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Dedicated educators committed to maintaining academic excellence and personal mentorship for every student in Sevar Thandipora.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadershipTeam.map((leader) => (
              <div
                key={leader.role}
                className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md bg-[#f6ebe4] px-2.5 py-1 text-xs font-semibold text-accent uppercase">
                    {leader.role}
                  </span>
                  <span className="font-mono text-xs text-muted">{leader.credentials}</span>
                </div>
                <h3 className="mt-3 font-serif text-3xl tracking-tight text-ink">{leader.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Legacy */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-left" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our Setting</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
                Rooted in Sevar Thandipora, Lolab Valley.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Known historically as the &ldquo;Valley of Love and Learning&rdquo;, Lolab offers a tranquil mountain environment free from the noise and distractions of large towns. Here, surrounded by alpine forests and clean mountain air, young minds find the peace necessary for intense study and spiritual contemplation.
              </p>
              <div className="mt-8 flex items-center gap-3 text-ink">
                <MapPinIcon size={20} weight="fill" className="text-accent shrink-0" />
                <span className="font-medium text-sm">Sevar Thandipora, Lolab, District Kupwara, Jammu & Kashmir</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-line shadow-sm">
              <Photo
                src="/images/campus.jpg"
                alt="Welkin International School campus against the mountains of Lolab"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Join our community.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              We invite you to be part of this transformative endeavor in North Lolab. Admissions are open for Session 2026-27.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Apply now
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
