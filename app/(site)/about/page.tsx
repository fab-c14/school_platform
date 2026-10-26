import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.about.title, site.about.description, "/about");
}

export default async function AboutPage() {
  const about = (await getSite()).about;

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {about.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{about.lede}</p>
      </header>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-[1.15] tracking-tight md:text-5xl">
              {about.story.title}
            </h2>
            <div className="mt-6 grid gap-4">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[65ch] text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-line">
            <Photo
              src={about.story.image.src}
              alt={about.story.image.alt}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{about.valuesTitle}</h2>
          <ol className="mt-8 border-t border-line">
            {about.values.map((value, index) => (
              <li key={value.title} className="grid gap-3 border-b border-line py-6 md:grid-cols-[6rem_1fr]">
                <span className="font-serif text-2xl text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl">{value.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-muted">{value.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="leadership" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{about.leadershipTitle}</h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">{about.leadershipNote}</p>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:max-w-xl">
            {about.leaders.map((leader) => (
              <li key={leader.role} className="bg-paper p-6">
                <p className="text-sm text-muted">{leader.role}</p>
                <p className="mt-3 font-serif text-2xl">{leader.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
