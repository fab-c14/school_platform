import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BusIcon,
  ChalkboardTeacherIcon,
  FlaskIcon,
  MapPinIcon,
  MoonStarsIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SoccerBallIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "School Facilities & Campus",
    "Explore the campus facilities, classrooms, labs, library, and play grounds at Welkin International School, Sevar Thandipora, Lolab.",
    "/campus",
  );
}

const facilityCards = [
  {
    icon: ChalkboardTeacherIcon,
    title: "Well-Ventilated Classrooms",
    tagline: "Focused, comfortable learning spaces",
    description:
      "Bright and spacious rooms designed for optimal natural light and airflow. Featuring carpeted flooring, ergonomic student desks, and climate-conscious heating arrangements during winter months.",
    image: "/images/class-two.jpg",
    alt: "Students studying in a classroom at Welkin International School",
  },
  {
    icon: FlaskIcon,
    title: "Science & Discovery Labs",
    tagline: "Hands-on observation and experiment",
    description:
      "Practical science apparatus covering physics, chemistry, and biology fundamentals. Students observe plant specimens native to Lolab Valley, learn basic laboratory safety, and develop an empirical mindset.",
    image: "/images/lab.jpg",
    alt: "Science laboratory equipment and students at Welkin International School",
  },
  {
    icon: BookOpenIcon,
    title: "Library & Resource Center",
    tagline: "Rich collection across faiths and disciplines",
    description:
      "A peaceful reading room stocked with curriculum reference books, historical biographies, Islamic studies literature, English and Urdu classics, and children's storybooks that spark lifelong curiosity.",
    image: "/images/library.jpg",
    alt: "School library shelves with books",
  },
  {
    icon: MoonStarsIcon,
    title: "Tahfeez & Spiritual Hall",
    tagline: "A sanctuary for Tajweed and reflection",
    description:
      "Dedicated clean, carpeted space where students practice the art of Quranic recitation with proper Makharij, attend moral instruction circles, and gather for congregational prayers during school hours.",
    image: "/images/class-three.jpg",
    alt: "Students in Quranic recitation hall",
  },
  {
    icon: SoccerBallIcon,
    title: "Spacious Playground & Assembly Yard",
    tagline: "Physical vitality against the Lolab hills",
    description:
      "An open sports yard where students line up for morning assemblies, physical drills, cricket matches, badminton, and team athletics under the clear skies and fresh breeze of the valley.",
    image: "/images/life/maroon-yard.jpg",
    alt: "Students gathered in the outdoor playground with mountain backdrop",
  },
  {
    icon: BusIcon,
    title: "Safe Student Transport Fleet",
    tagline: "Connecting Sevar Thandipora and surrounding villages",
    description:
      "Supervised transport vans linking Lolab hamlets directly to the school campus, ensuring students arrive safely and punctually in all seasons with experienced, vetted local drivers.",
    image: "/images/campus.jpg",
    alt: "Welkin school campus grounds and transport access",
  },
];

const campusFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Student Safety & Campus Security",
    body: "Fully enclosed perimeter with dedicated supervision during arrival, recess, and departure. First-aid trained staff are present on-site at all hours.",
  },
  {
    icon: MapPinIcon,
    title: "Pristine Natural Surroundings",
    body: "Situated away from highway congestion in Sevar Thandipora, the school provides clean mountain air, scenic serenity, and a pollution-free atmosphere.",
  },
  {
    icon: BookOpenIcon,
    title: "Separate Facilities & Hygiene",
    body: "Maintained with meticulous care, including modern hygienic restrooms with separate wings for boys and girls and continuous clean mountain water supply.",
  },
];

export default async function CampusPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Campus & Infrastructure</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Designed for learning, built for character.
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Welkin International School offers a safe, inspiring environment in Sevar Thandipora, Lolab, where modern scholastic facilities meet peaceful mountain serenity.
        </p>
      </header>

      {/* Facilities Grid */}
      <section id="places" className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Key Facilities</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Where our students spend their day.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every space on our campus has been intentionally arranged to encourage focus, cleanliness, collaborative play, and personal reflection.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilityCards.map((facility) => {
              const Icon = facility.icon;
              return (
                <article
                  key={facility.title}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
                    <Photo
                      src={facility.image}
                      alt={facility.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center gap-3 text-accent">
                      <span className="grid size-9 place-items-center rounded-lg bg-[#f6ebe4]">
                        <Icon size={20} weight="duotone" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {facility.tagline}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl tracking-tight text-ink">{facility.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{facility.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety & Environment */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Safety & Health</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Nurturing well-being in every corner.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We take the physical and emotional safety of every student with utmost seriousness. Parents can rest assured their children are in compassionate, watchful hands.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {campusFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:shadow-md md:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Location Band */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">Visit In Person</span>
              <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
                Come see the campus in Sevar Thandipora.
              </h2>
              <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-paper/80">
                The best way to understand Welkin is to walk the grounds, observe the classrooms, and meet our teachers and students. We welcome families throughout the academic session.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
                  Get directions & timings
                  <ArrowUpRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-paper/15 bg-paper/5 p-6 md:p-8">
              <h3 className="font-serif text-2xl text-paper">Campus Overview</h3>
              <dl className="mt-6 space-y-4 text-sm divide-y divide-paper/10">
                <div className="flex justify-between pt-3">
                  <dt className="text-paper/60">Location</dt>
                  <dd className="font-medium text-paper">Sevar Thandipora, Lolab</dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt className="text-paper/60">District</dt>
                  <dd className="font-medium text-paper">Kupwara, Jammu & Kashmir</dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt className="text-paper/60">Affiliation & Levels</dt>
                  <dd className="font-medium text-paper">Nursery to Grade 10</dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt className="text-paper/60">School Hours</dt>
                  <dd className="font-medium text-paper">8:00 AM – 3:30 PM (Mon–Fri)</dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt className="text-paper/60">Admissions Desk</dt>
                  <dd className="font-medium text-accent">Active for 2026-27</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
