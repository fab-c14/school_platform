import Link from "next/link";
import { ArrowUpRightIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { schoolPhotos } from "@/content/gallery";
import { SchoolJsonLd } from "@/components/json-ld";
import { AuroraWash } from "@/components/aurora-wash";
import { BreezeCut } from "@/components/breeze-cut";
import { HomeGalleryCarousel } from "@/components/home-gallery-carousel";
import { FramedPhoto } from "@/components/framed-photo";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { HomeKinetics } from "@/components/home-kinetics";
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
    <main className="w-full max-w-full overflow-x-clip">
      <HomeKinetics />
      <SchoolJsonLd
        name={site.name}
        url={site.url}
        description={site.description}
        email={site.contact.email}
        telephone={site.contact.phoneDisplay}
        streetAddress={site.contact.addressLines[0]}
      />

      <section className="relative overflow-hidden bg-paper">
        <AuroraWash />
        <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-4.75rem)] max-w-[1400px] items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
          <div className="max-w-xl">
            <p data-hero-reveal className="text-sm text-accent">
              {home.eyebrow}
            </p>
            <h1 data-hero-reveal className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
              <span className="block">{home.headline[0]}</span>
              <span className="block text-accent">{home.headline[1]}</span>
            </h1>
            <p data-hero-reveal className="mt-6 max-w-[38ch] text-base leading-relaxed text-muted md:text-lg">
              {home.lede}
            </p>
            <div data-hero-reveal className="mt-8 flex flex-wrap gap-3">
              <Link
                href={home.primaryCta.href}
                className="inline-flex min-h-12 items-center gap-2 bg-accent px-5 text-sm text-white transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
              >
                {home.primaryCta.label}
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
              <Link
                href={home.secondaryCta.href}
                className="inline-flex min-h-12 items-center border border-ink px-5 text-sm text-ink transition hover:-translate-y-px hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
              >
                {home.secondaryCta.label}
              </Link>
            </div>
            <div data-hero-reveal className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 text-ink hover:text-accent">
                <PhoneIcon size={16} weight="bold" />
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.phoneAltHref} className="inline-flex items-center gap-2 text-ink hover:text-accent">
                <PhoneIcon size={16} weight="bold" />
                {site.contact.phoneAltDisplay}
              </a>
            </div>
          </div>
          <div data-hero-reveal data-kinetic-image className="relative min-h-[22rem] overflow-hidden bg-line lg:min-h-[36rem]">
            <FramedPhoto
              src={home.heroImage.src}
              alt={home.heroImage.alt}
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-[center_58%]"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut tone="mist" variant={0} />
        <AuroraWash quiet />
        <dl className="relative z-10 mx-auto grid max-w-[1400px] sm:grid-cols-3">
          {home.facts.map((fact) => (
            <div key={fact.label} className="border-b border-line px-5 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0">
              <dt className="font-serif text-3xl tracking-tight text-ink md:text-4xl">{fact.value}</dt>
              <dd className="mt-2 max-w-[24ch] text-sm leading-relaxed text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <BreezeCut tone="paper" variant={1} />
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{home.intro.title}</h2>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">{home.intro.body}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {home.paths.map((path, index) => (
              <Link
                key={path.href}
                href={path.href}
                className={`group relative flex min-h-72 items-end overflow-hidden rounded-[1.25rem] bg-deep p-6 text-paper ${
                  index === 0 ? "md:min-h-96" : ""
                }`}
              >
                <Photo
                  src={path.image}
                  alt={path.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
                <span className="relative">
                  <span className="font-serif text-3xl">{path.title}</span>
                  <span className="mt-2 block max-w-sm text-sm leading-relaxed text-paper/90">{path.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut tone="mist" variant={2} />
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-[3/4] overflow-hidden bg-line">
            <FramedPhoto
              src={site.about.story.image.src}
              alt={site.about.story.image.alt}
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{site.about.story.title}</h2>
            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
              {site.about.story.paragraphs[6]}
            </p>
            <p className="mt-6 font-serif text-2xl text-ink">{site.about.leaders[0]?.name}</p>
            <p className="text-sm text-muted">{site.about.leaders[0]?.role}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
              {site.about.title}
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <BreezeCut tone="paper" variant={3} />
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{home.facilities.title}</h2>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">{home.facilities.body}</p>
            </div>
            <Link href="/gallery" className="inline-flex w-fit items-center gap-2 text-sm text-accent">
              Gallery
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
          <div className="mt-8">
            <HomeGalleryCarousel photos={schoolPhotos} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <BreezeCut tone="paper" variant={2} />
        <AuroraWash quiet />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Testimonials</h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{site.about.story.title}</p>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {[site.about.story.paragraphs[6], site.about.story.paragraphs[3], site.about.story.paragraphs[5]].map((quote) => (
              <li key={quote} className="flex flex-col border border-line bg-paper/80 p-6">
                <p className="font-serif text-xl leading-snug text-ink">{quote}</p>
                <p className="mt-6 text-sm text-ink">{site.about.leaders[0]?.name}</p>
                <p className="text-sm text-muted">{site.about.leaders[0]?.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-[#f6ebe4]">
        <BreezeCut tone="mist" variant={0} />
        <span className="breeze breeze-2" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{site.academics.title}</h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">{site.academics.lede}</p>
          <ol className="mt-10 grid gap-px border-y border-line bg-line md:grid-cols-3">
            {site.academics.stages.map((stage) => (
              <li key={stage.title} className="bg-[#f6ebe4] p-6 md:p-8">
                <p className="text-sm text-accent">{stage.index}</p>
                <h3 className="mt-3 font-serif text-2xl">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative bg-paper">
        <BreezeCut tone="paper" variant={1} />
        <span className="breeze breeze-1" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8">
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{home.newsTitle}</h2>
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

      <section className="relative bg-deep text-paper">
        <BreezeCut tone="deep" variant={2} />
        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-24">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-6xl">{home.contactBand.title}</h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-paper/80">{home.contactBand.body}</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 w-fit items-center gap-2 bg-paper px-5 text-sm text-ink active:scale-[0.98]">
            {site.contactLabel}
            <ArrowUpRightIcon size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
