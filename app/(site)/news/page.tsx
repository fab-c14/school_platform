import { formatNewsDate } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, site.news.title, site.news.description, "/news");
}

export default async function NewsPage() {
  const site = await getSite();
  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {site.news.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{site.news.lede}</p>
      </header>

      <section className="border-t border-line">
        <ul className="mx-auto max-w-3xl px-5 py-12 md:px-8">
          {site.news.items.map((item) => (
            <li key={item.title} className="border-b border-line py-10">
              <time dateTime={item.date} className="text-sm text-accent">
                {formatNewsDate(item.date)}
              </time>
              <h2 className="mt-3 font-serif text-3xl tracking-tight">{item.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
