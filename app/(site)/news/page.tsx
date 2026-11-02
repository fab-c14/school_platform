import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { formatNewsDate } from "@/content/site";
import { BreezeCut } from "@/components/breeze-cut";
import { NewBadge } from "@/components/new-badge";
import { Photo } from "@/components/photo";
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
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm text-accent">School updates</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          News and notices
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">{site.news.lede}</p>
      </header>

      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          {site.news.items[0] ? (
            <article className="grid overflow-hidden border border-line bg-[#f6ebe4] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[18rem] bg-line lg:min-h-[26rem]">
                <Photo
                  src="/images/gathering.jpg"
                  alt="Students and teachers gathered at Welkin International School"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[center_45%]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10 lg:p-14">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-accent">Latest notice</p>
                  {site.news.items[0].isNew ? <NewBadge /> : null}
                </div>
                <time dateTime={site.news.items[0].date} className="mt-5 text-sm text-muted font-mono">
                  {formatNewsDate(site.news.items[0].date)}
                </time>
                <h2 className="mt-3 max-w-[16ch] font-serif text-4xl leading-[1.04] tracking-tight md:text-5xl">
                  {site.news.items[0].title}
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted">{site.news.items[0].body}</p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition hover:text-ink"
                >
                  Ask the office
                  <ArrowUpRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </article>
          ) : null}

          <div className="mt-16 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <h2 className="max-w-[10ch] font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                More from the school
              </h2>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted">
                Keep this page close for school dates, celebrations, circulars, and updates from the administrative desk.
              </p>
            </div>
            <ul className="border-t border-line">
              {site.news.items.slice(1).map((item) => (
                <li key={item.title} className="border-b border-line py-6">
                  <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
                    <time dateTime={item.date} className="text-sm text-accent font-medium">
                      {formatNewsDate(item.date)}
                    </time>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <p className="font-serif text-2xl tracking-tight">{item.title}</p>
                        {item.isNew ? <NewBadge /> : null}
                      </div>
                      <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
