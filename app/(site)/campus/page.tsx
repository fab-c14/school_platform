import { Photo } from "@/components/photo";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.campus.title, site.campus.description, "/campus");
}

export default async function CampusPage() {
  const page = (await getSite()).campus;

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{page.lede}</p>
      </header>

      <section id="places" className="border-t border-line">
        <ul className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-2">
          {page.places.map((place) => (
            <li key={place.title}>
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                <Photo
                  src={place.image}
                  alt={place.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 font-serif text-2xl">{place.title}</h2>
              <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-muted">{place.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-deep text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{page.moreTitle}</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {page.more.map((item) => (
              <li key={item.title}>
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-paper/80">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
