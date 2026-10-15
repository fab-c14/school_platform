import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.academics.title, site.academics.description, "/academics");
}

export default async function AcademicsPage() {
  const page = (await getSite()).academics;

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{page.lede}</p>
      </header>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ol>
            {page.stages.map((stage) => (
              <li key={stage.index} className="border-t border-line py-8 first:border-t-0 first:pt-0">
                <p className="text-sm text-accent">{stage.index}</p>
                <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">{stage.title}</h2>
                <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-muted">{stage.body}</p>
              </li>
            ))}
          </ol>
          <div className="relative aspect-[4/3] overflow-hidden bg-line lg:sticky lg:top-24">
            <Photo
              src={page.image.src}
              alt={page.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="week" className="border-t border-line bg-[#e7edf5]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{page.practiceTitle}</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {page.practices.map((item) => (
              <li key={item.title}>
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
