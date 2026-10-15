import { Photo } from "@/components/photo";
import Link from "next/link";
import { SchoolJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { formatNewsDate } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return {
    ...pageMetadata(site, site.home.title, site.home.description, "/"),
    title: { absolute: site.home.title },
  };
}

export default async function HomePage() {
  const site = await getSite();
  const home = site.home;

  return (
    <main>
      <SchoolJsonLd
        name={site.name}
        url={site.url}
        description={site.description}
        email={site.contact.email}
        telephone={site.contact.phoneDisplay}
        streetAddress={site.contact.addressLines[0]}
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-14">
        <Reveal>
          <p className="text-sm text-accent">{home.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-6xl">
            <span className="block">{home.headline[0]}</span>
            <span className="block">{home.headline[1]}</span>
          </h1>
          <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-muted">
            {home.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={home.primaryCta.href}
              className="inline-flex items-center bg-accent px-5 py-3 text-sm text-white active:scale-[0.98]"
            >
              {home.primaryCta.label}
            </Link>
            <Link
              href={home.secondaryCta.href}
              className="inline-flex items-center border border-ink px-5 py-3 text-sm text-ink active:scale-[0.98]"
            >
              {home.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[16/10] overflow-hidden bg-line">
            <Photo
              src={home.heroImage.src}
              alt={home.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <Reveal>
            <h2 className="max-w-xl font-serif text-3xl leading-[1.15] tracking-tight md:text-5xl">
              {home.intro.title}
            </h2>
            <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">
              {home.intro.body}
            </p>
          </Reveal>
          <dl className="mt-12 grid border-t border-line sm:grid-cols-3">
            {home.facts.map((fact) => (
              <div key={fact.label} className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <dt className="font-serif text-2xl tracking-tight">{fact.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-[#e7edf5]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-16 md:px-8 lg:grid-cols-12">
          {home.paths.map((path, index) => (
            <Link
              key={path.href}
              href={path.href}
              className={`group relative flex min-h-72 flex-col justify-end overflow-hidden bg-deep p-6 text-paper ${
                index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <Photo
                src={path.image}
                alt={path.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
                className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-transparent" />
              <span className="relative">
                <span className="font-serif text-3xl">{path.title}</span>
                <span className="mt-2 block max-w-sm text-sm leading-relaxed text-[#f3eee6]">
                  {path.body}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-line">
            <Photo
              src={home.facilities.image.src}
              alt={home.facilities.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl leading-[1.15] tracking-tight md:text-5xl">
              {home.facilities.title}
            </h2>
            <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">
              {home.facilities.body}
            </p>
            <ul className="mt-8 border-t border-line">
              {home.facilities.items.map((item) => (
                <li key={item} className="border-b border-line py-3 text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{home.newsTitle}</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {site.news.items.map((item) => (
              <li key={item.title}>
                <Link href="/news" className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-serif text-2xl">{item.title}</span>
                  <span className="text-sm text-muted">{formatNewsDate(item.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-deep text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
              {home.contactBand.title}
            </h2>
            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-[#d9d0c6]">
              {home.contactBand.body}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center bg-paper px-5 py-3 text-sm text-ink active:scale-[0.98]"
          >
            {site.contactLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
