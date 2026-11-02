import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  ClockIcon,
  FlagIcon,
  HandHeartIcon,
  PaintBrushIcon,
  SparkleIcon,
  TrophyIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Student Corner & School Life",
    "House system, co-curricular clubs, daily assembly, sports, and student activities at Welkin International School, Sevar Thandipora, Lolab.",
    "/students",
  );
}

const houses = [
  {
    name: "Iqbal House",
    color: "bg-blue-600",
    textCol: "text-blue-700",
    lightBg: "bg-blue-50 border-blue-200",
    motto: "Vision & Spiritual Aspiration (Khudi)",
    patron: "Allama Muhammad Iqbal",
    description:
      "Encourages students to cultivate self-worth, poetic vision, philosophical contemplation, and soaring intellectual ambition for the upliftment of the community.",
  },
  {
    name: "Razi House",
    color: "bg-emerald-600",
    textCol: "text-emerald-700",
    lightBg: "bg-emerald-50 border-emerald-200",
    motto: "Inquiry, Medicine & Empirical Reason",
    patron: "Abu Bakr al-Razi (Rhazes)",
    description:
      "Instills the spirit of scientific observation, empirical experimentation, clinical curiosity, and service to those suffering from physical distress.",
  },
  {
    name: "Sina House",
    color: "bg-rose-700",
    textCol: "text-rose-800",
    lightBg: "bg-rose-50 border-rose-200",
    motto: "Intellect, Logic & Polymath Mastery",
    patron: "Ibn Sina (Avicenna)",
    description:
      "Champions mathematical precision, systematic reasoning, philosophical rigor, and deep mastery across diverse disciplines.",
  },
  {
    name: "Farabi House",
    color: "bg-amber-600",
    textCol: "text-amber-700",
    lightBg: "bg-amber-50 border-amber-200",
    motto: "Ethics, Civic Harmony & Wisdom",
    patron: "Abu Nasr al-Farabi",
    description:
      "Focuses on moral philosophy, virtuous citizenship, cooperative teamwork, and understanding the social duties of an educated human being.",
  },
];

const clubs = [
  {
    icon: SparkleIcon,
    name: "Science & Eco Club",
    summary:
      "Hands-on scientific models, botany field surveys in Lolab Valley, eco-conservation awareness, and participation in regional science talent searches.",
  },
  {
    icon: BookOpenIcon,
    name: "Tajweed & Seerat Circle",
    summary:
      "Advanced Quranic pronunciation (Huroof & Makharij), memorization circles, Seerat-un-Nabi quiz preparation, and annual Naat competitions.",
  },
  {
    icon: PaintBrushIcon,
    name: "Calligraphy & Islamic Art",
    summary:
      "Traditional Arabic and Urdu calligraphy (Khatt-e-Nastaliq & Naskh), geometric pattern design, and campus exhibition curation.",
  },
  {
    icon: UsersThreeIcon,
    name: "Debate & Literary Society",
    summary:
      "Public speaking, declamation, and bilingual debate in English, Urdu, and Kashmiri, building eloquence and confident expression.",
  },
  {
    icon: TrophyIcon,
    name: "Athletics & Sports Club",
    summary:
      "Cricket leagues, badminton tournaments, endurance cross-country running along safe valley trails, and physical stamina drills.",
  },
  {
    icon: HandHeartIcon,
    name: "Community Service & Khidmah",
    summary:
      "Student-led social welfare initiatives, campus cleanliness drives, and mentorship of junior students in reading and arithmetic.",
  },
];

const dailySchedule = [
  { time: "08:00 AM", title: "Campus Arrival & Morning Greeting", note: "Supervised arrival via school transport and local walking groups." },
  { time: "08:20 AM", title: "Morning Assembly & Tilawat", note: "Recitation of Surah Al-Fatiha, morning supplication, national anthem, and student thought of the day." },
  { time: "08:45 AM", title: "Academic Session 1 (Core STEM & Math)", note: "Focused conceptual instruction when minds are sharpest." },
  { time: "10:45 AM", title: "Language & Literature Periods", note: "English, Urdu, and Arabic grammar, reading, and comprehension." },
  { time: "12:15 PM", title: "Recess, Lunch & Midday Assembly", note: "Nutritious meal break, outdoor socialization, and supervised yard recreation." },
  { time: "01:00 PM", title: "Congregational Zuhr Prayer", note: "Daily prayer in the campus spiritual hall fostering brotherhood and reflection." },
  { time: "01:30 PM", title: "Qur'an, Tajweed & Islamic Studies", note: "Direct instruction in recitation, memorization, and ethical values." },
  { time: "02:30 PM", title: "Co-curricular Clubs, Sports & Mentorship", note: "House competitions, library reading, laboratory practicals, and athletics." },
  { time: "03:30 PM", title: "Supervised Dismissal & Departure", note: "Orderly boarding of school transport and departure under teacher supervision." },
];

export default async function StudentsPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Student Life</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Student Corner
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          School life at Welkin International School is vibrant, purposeful, and joyful. From the morning assembly in the Lolab breeze to academic clubs and sports competitions, our students discover their distinct gifts every single day.
        </p>
      </header>

      {/* House System */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">House System</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Four Houses, One Community.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every student from Grade 1 to 10 is sorted into one of four historic Houses named after luminaries of intellect and character. The House system builds camaraderie, healthy competition, and peer mentorship.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {houses.map((house) => (
              <article
                key={house.name}
                className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className={`size-4 rounded-full ${house.color}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Named after {house.patron}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-3xl tracking-tight text-ink">{house.name}</h3>
                <div className="mt-2 inline-block rounded-md border border-line bg-[#f6ebe4]/60 px-3 py-1 text-xs font-medium text-accent">
                  Motto: {house.motto}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{house.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Activities */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Co-Curricular Exploration</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Activity clubs & societies.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Education flourishes when classroom learning is reinforced by creative clubs. Every Wednesday and Saturday afternoon, students dive into self-chosen societies.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => {
              const Icon = club.icon;
              return (
                <div
                  key={club.name}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-7"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{club.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{club.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A Day in the Life Schedule */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-crest" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Daily Rhythm</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              A day in the life at Welkin.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Structure creates calm and focus. Here is how a typical school day unfolds for our students.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <ol className="divide-y divide-line">
              {dailySchedule.map((item, index) => (
                <li
                  key={item.time}
                  className="grid gap-3 p-5 sm:grid-cols-[10rem_1fr] sm:items-baseline md:px-8 md:py-6"
                >
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-accent">
                    <ClockIcon size={16} weight="bold" />
                    <span>{item.time}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Photo Highlights / Moments */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-left" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Moments</span>
              <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">Life on campus.</h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              View full gallery
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
              <Photo
                src="/images/life/maroon-yard.jpg"
                alt="Assembly in the school yard"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
              <Photo
                src="/images/life/khaki-class.jpg"
                alt="Boys with their teacher"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
              <Photo
                src="/images/life/boys-garden.jpg"
                alt="Students outdoors in nature"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line">
              <Photo
                src="/images/gathering.jpg"
                alt="Annual school gathering"
                fill
                sizes="25vw"
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
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Join our student community.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Admissions for Session 2026-27 are now open for Nursery through Grade 10. Start your child&rsquo;s journey with Welkin today.
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
              href="/news"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              School notices
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
