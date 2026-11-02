import Link from "next/link";
import { ArrowUpRightIcon, BookOpenIcon, CompassIcon, GraduationCapIcon, SparkleIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "School Motto: Excel with Purpose",
    "The motto, vision, and core educational philosophy of Welkin International School, Sevar Thandipora, Lolab.",
    "/motto",
  );
}

const pillars = [
  {
    icon: CompassIcon,
    title: "Spiritual Grounding & Akhlaq",
    subtitle: "Character before accomplishment",
    body: "Knowledge without character is empty. We cultivate sincerity (Ikhlas), humility, and moral discipline through daily Quranic teachings, respectful conduct, and compassion toward all creations.",
  },
  {
    icon: BookOpenIcon,
    title: "Academic Rigor & Intellectual Depth",
    subtitle: "Modern education without compromise",
    body: "Our syllabus combines CBSE and state-aligned academic curricula with conceptual mastery. Students are encouraged to read deeply, question thoughtfully, and master mathematics, sciences, and literature.",
  },
  {
    icon: TrophyIcon,
    title: "Competitive Readiness for North Lolab",
    subtitle: "Aiming for NEET, JEE & Civil Services",
    body: "Founded with a mission to mentor youth from North Lolab who have historically lacked guidance, the school instills the work ethic and analytical skills required for high-stakes national examinations.",
  },
  {
    icon: SparkleIcon,
    title: "Community Stewardship & Leadership",
    subtitle: "Service to humanity as a duty",
    body: "True success is measured by the benefit one brings to their community. We encourage our students to be compassionate stewards of their homeland, uplifting Lolab Valley and contributing to the wider world.",
  },
];

const emblemSymbols = [
  {
    title: "The Open Book (Al-Ilm)",
    description:
      "Symbolizes both divine revelation and universal human knowledge. It signifies that learning is an Amanah—a sacred trust to be pursued with sincerity from childhood onward.",
  },
  {
    title: "The Scholar's Cap (Tamkin)",
    description:
      "Represents intellectual attainment, academic distinction, and the aspiration of every child in Lolab to reach top universities and leadership roles across the nation.",
  },
  {
    title: "The Valley & Pines of Lolab",
    description:
      "Anchors the school in Sevar Thandipora, reminding students that no matter how high they soar, their roots remain tied to the soil and people of North Lolab.",
  },
];

export default async function MottoPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-14 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">School Philosophy</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Excel with Purpose<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          The guiding motto of Welkin International School, Sevar Thandipora, Lolab. A call for every child to unite intellect, character, and faith into a life of meaningful achievement.
        </p>
      </header>

      {/* Pillars Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our Guiding Pillars</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              What purposeful excellence means in practice.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We do not measure excellence purely by marks on a report card, but by the whole formation of the young human being.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="relative rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                      <Icon size={24} weight="duotone" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">Pillar 0{index + 1}</span>
                      <h3 className="font-serif text-2xl tracking-tight text-ink">{pillar.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-medium text-accent">{pillar.subtitle}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{pillar.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emblem Section */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line bg-[#f6ebe4] p-8 shadow-sm">
            <div className="relative flex size-full flex-col items-center justify-center text-center">
              <div className="grid size-28 place-items-center rounded-full bg-deep text-paper shadow-md">
                <GraduationCapIcon size={52} weight="duotone" />
              </div>
              <p className="mt-6 font-serif text-3xl text-ink">Welkin Crest</p>
              <p className="mt-2 text-sm text-muted">Sevar Thandipora, Lolab</p>
              <span className="mt-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
                Excel with Purpose
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Iconography & Meaning</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              The anatomy of the school crest.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every detail woven into the school insignia embodies the mission entrusted to us by the families of North Lolab.
            </p>

            <ul className="mt-8 space-y-6">
              {emblemSymbols.map((symbol) => (
                <li key={symbol.title} className="border-l-2 border-accent pl-5">
                  <h3 className="font-serif text-2xl text-ink">{symbol.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{symbol.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Chairman Quote Band */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="rounded-2xl border border-line bg-white p-8 md:p-12 lg:p-16">
            <blockquote className="max-w-4xl">
              <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
                &ldquo;We want students who are academically proficient, morally grounded, and spiritually enriched. Able to contribute to society with compassion, integrity, and justice, and equipped for both this life and the Hereafter. Here, you matter, no matter where you have come from.&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="size-14 overflow-hidden rounded-full border border-line bg-line">
                  <Photo
                    src="/images/chairman.jpg"
                    alt="Iftekhar Ul Akbar"
                    width={56}
                    height={56}
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic font-serif text-xl font-medium text-ink">Iftekhar Ul Akbar</cite>
                  <p className="text-sm text-muted">Chairman, Welkin International School (MSc, MPhil, Botany)</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="mist" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Experience our community.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Discover how our holistic approach to schooling builds strong minds and noble hearts. Admissions are open for Nursery through Grade 10.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Apply for admission
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Visit our campus
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
