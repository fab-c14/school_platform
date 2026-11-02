import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CompassIcon,
  FlaskIcon,
  GraduationCapIcon,
  PhoneIcon,
  SparkleIcon,
  TranslateIcon,
  TrophyIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Academics & Curriculum",
    "Holistic curriculum combining modern sciences, Quranic Tajweed, Arabic language, and board examination preparation at Welkin International School, Sevar Thandipora, Lolab.",
    "/academics",
  );
}

const curriculumStages = [
  {
    stage: "Foundational Stage",
    grades: "Nursery, LKG & UKG (Ages 3–6)",
    focus: "Joyful Discovery, Phonics & Good Habits",
    description:
      "Play-based sensory learning, early literacy in English and Urdu, basic numeracy, fine motor coordination, and daily immersion in Islamic manners (Adab), short Duas, and kindness.",
    subjects: ["English Phonics", "Urdu Alphabet", "Sensory Numeracy", "General Awareness", "Noorani Qaida & Basic Duas", "Creative Art & Play"],
  },
  {
    stage: "Primary Stage",
    grades: "Grades 1 to 5 (Ages 6–11)",
    focus: "Conceptual Foundations & Reading Fluency",
    description:
      "Transition into formal subject disciplines with emphasis on mental arithmetic, environmental science, expressive writing, and proper Tajweed rules with Quranic Nazra.",
    subjects: ["English Language & Literature", "Mathematics", "Environmental Studies (EVS)", "Urdu & Kashmiri", "Arabic Language", "Quranic Tajweed & Islamic Studies"],
  },
  {
    stage: "Middle Stage",
    grades: "Grades 6 to 8 (Ages 11–14)",
    focus: "Analytical Inquiry, Science Labs & Languages",
    description:
      "Students engage in laboratory experiments in integrated science, algebraic problem-solving, advanced grammar, historical analysis, and conversational Arabic.",
    subjects: ["General Science (Physics, Chemistry, Biology)", "Advanced Mathematics", "Social Science (History, Civics, Geography)", "English Literature", "Urdu Language", "Arabic & Seerat-un-Nabi Studies"],
  },
  {
    stage: "Secondary Stage",
    grades: "Grades 9 & 10 (Ages 14–16)",
    focus: "Board Excellence & Competitive Aspirations",
    description:
      "Rigorous preparation aligned with CBSE and state board requirements. Mentored by Chairman Iftekhar Ul Akbar with an early orientation toward NEET, JEE, and competitive exams.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Social Sciences", "Urdu", "Information Technology / AI Basics"],
  },
];

const pillarsOfLearning = [
  {
    icon: FlaskIcon,
    title: "Modern Sciences & Mathematics",
    body: "Practical laboratory demonstrations, mathematical logic, and scientific inquiry taught to cultivate analytical minds capable of competing at national levels.",
  },
  {
    icon: BookOpenIcon,
    title: "Qur'an with Authentic Tajweed",
    body: "Integrated directly into the daily schedule rather than an afterthought. Certified Qaris teach proper articulation (Makharij), rules of Tajweed, and reflective understanding.",
  },
  {
    icon: TranslateIcon,
    title: "Multilingual Proficiency",
    body: "Fluency in English for global horizons, Arabic for spiritual and classical comprehension, Urdu for regional literature, and Kashmiri for cultural identity.",
  },
  {
    icon: CompassIcon,
    title: "Moral Formation & Akhlaq",
    body: "Character education is interwoven across all periods. Honesty, respect for parents and teachers, environmental cleanliness, and empathy guide student conduct.",
  },
];

export default async function AcademicsPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Academic Framework</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Intellect, character, and faith together.
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          A balanced education designed by Chairman Iftekhar Ul Akbar: modern scientific rigor paired with the eternal light of Islamic studies, serving the children of North Lolab.
        </p>
      </header>

      {/* Core Educational Pillars */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Educational Model</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              The Dual-Excellence Approach
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We reject the false dichotomy between worldly education and religious faith. At Welkin, both walk hand-in-hand to produce complete human beings.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillarsOfLearning.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Stages Breakdown */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Academic Progression</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Curriculum Stages & Learning Outcomes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every phase of development has tailored cognitive goals and mentorship.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {curriculumStages.map((stage, index) => (
              <article
                key={stage.stage}
                className="overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Stage 0{index + 1} • {stage.grades}
                    </span>
                    <h3 className="mt-1 font-serif text-3xl tracking-tight text-ink">{stage.stage}</h3>
                  </div>
                  <span className="rounded-full bg-[#f6ebe4] px-4 py-1 text-xs font-semibold text-accent">
                    {stage.focus}
                  </span>
                </div>

                <p className="mt-4 text-base leading-relaxed text-muted">{stage.description}</p>

                <div className="mt-6 border-t border-line/70 pt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Core Subjects & Modules:</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stage.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="rounded-lg border border-line bg-[#f6ebe4]/40 px-3 py-1.5 text-xs font-medium text-ink"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The School Week & Classroom Practice */}
      <section id="week" className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Classroom Experience</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
                A week of focused growth.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Our classrooms in Sevar Thandipora are calm, structured, and warm. Students sit on clean carpeted floors or ergonomic desks, with attentive teachers guiding every step.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 text-accent shrink-0" />
                  <div>
                    <strong className="text-ink">Daily Assembly & Qira'at:</strong>
                    <p className="text-sm text-muted">Every morning begins with recitation of the Holy Qur'an, supplications for knowledge, and brief student reflections.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 text-accent shrink-0" />
                  <div>
                    <strong className="text-ink">Continuous Formative Assessment:</strong>
                    <p className="text-sm text-muted">Regular chapter-end tests and personalized teacher feedback ensure no child falls behind unnoticed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon size={22} weight="fill" className="mt-0.5 text-accent shrink-0" />
                  <div>
                    <strong className="text-ink">Dedicated Remedial Support:</strong>
                    <p className="text-sm text-muted">Special afternoon doubt-clearing sessions for students requiring extra guidance in mathematics, English grammar, or Urdu writing.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-line shadow-sm">
              <Photo
                src="/images/class-one.jpg"
                alt="Students inside a classroom at Welkin International School"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="mist" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Give your child the Welkin advantage.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Admissions for Session 2026-27 are currently underway. Speak with our academic coordinators to understand our syllabus and grade placement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Apply online
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              <PhoneIcon size={16} weight="bold" />
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
