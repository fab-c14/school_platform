import Link from "next/link";
import { ArrowUpRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { schoolPhotos } from "@/content/gallery";
import { BreezeBand } from "@/components/breeze-band";
import { SchoolJsonLd } from "@/components/json-ld";
import { HomeHero } from "@/components/home-hero";
import { HomeGalleryCarousel } from "@/components/home-gallery-carousel";
import { Photo } from "@/components/photo";
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
  const storyImage = site.about.story.image;
  const classroomCut = home.paths[1];

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <SchoolJsonLd
        name={site.name}
        url={site.url}
        description={site.description}
        email={site.contact.email}
        telephone={site.contact.phoneDisplay}
        streetAddress={site.contact.addressLines[0]}
      />

      <HomeHero
        eyebrow={home.eyebrow}
        headline={home.headline}
        lede={home.lede}
        primaryCta={home.primaryCta}
        secondaryCta={home.secondaryCta}
        heroImage={home.heroImage}
        heroGallery={home.heroGallery}
        phoneDisplay={site.contact.phoneDisplay}
        phoneHref={site.contact.phoneHref}
        location={site.contact.addressLines.join(", ")}
      />

      <section className="bg-[#f6ebe4]">
        <dl className="mx-auto grid max-w-[1400px] md:grid-cols-3">
          {home.facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 0.06}
              className="border-b border-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="px-5 py-8 md:px-8 md:py-10">
                <span className="block h-px w-8 bg-accent" aria-hidden />
                <dt className="mt-5 font-serif text-3xl tracking-tight text-ink md:text-4xl">{fact.value}</dt>
                <dd className="mt-2 max-w-[26ch] text-sm leading-relaxed text-muted">{fact.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <h2 className="max-w-[13ch] font-serif text-4xl leading-[1.04] tracking-[-0.045em] text-ink md:text-6xl">
                {home.intro.title}
              </h2>
              <p className="max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">{home.intro.body}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[17rem_17rem]">
            {home.paths.map((path, index) => {
              const featured = index === 0;
              const wide = index === 3;
              return (
                <Reveal
                  key={path.href}
                  delay={index * 0.06}
                  className={`h-full ${featured ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""} ${
                    wide ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <Link
                    href={path.href}
                    className={`group relative flex h-full min-h-[17rem] items-end overflow-hidden rounded-[1.25rem] bg-deep p-6 text-paper ${
                      featured ? "min-h-[26rem] lg:min-h-0" : ""
                    }`}
                  >
                    <Photo
                      src={path.image}
                      alt={path.alt}
                      fill
                      sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
                      className="object-cover object-[center_38%] transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/35 to-deep/5" aria-hidden />
                    <span className="relative z-10 flex w-full items-end justify-between gap-4">
                      <span>
                        <span className={`block font-serif tracking-tight ${featured ? "text-4xl md:text-5xl" : "text-3xl"}`}>
                          {path.title}
                        </span>
                        <span className="mt-2 block max-w-sm text-sm leading-relaxed text-paper/85">{path.body}</span>
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-paper/35 bg-paper/10 transition duration-300 group-hover:bg-paper group-hover:text-ink">
                        <ArrowUpRightIcon size={17} weight="bold" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <BreezeBand images={schoolPhotos.slice(12, 16)} className="mt-14 md:mt-20" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]">
              <div className="breeze-cut-story absolute inset-y-0 left-0 right-[18%] overflow-hidden bg-line">
                <Photo
                  src={storyImage.src}
                  alt={storyImage.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover object-top"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-deep/20 via-transparent to-transparent" aria-hidden />
              </div>
              <div className="breeze-cut-small absolute bottom-[7%] right-0 h-[38%] w-[47%] bg-paper p-1.5 shadow-[0_26px_54px_-34px_rgb(29_43_56_/_0.55)]">
                <div className="relative size-full overflow-hidden bg-line">
                  <Photo
                    src={classroomCut.image}
                    alt={classroomCut.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover object-[center_35%]"
                  />
                </div>
              </div>
              <span className="absolute -left-3 top-[12%] h-[72%] w-[5px] -rotate-3 bg-accent/90" aria-hidden />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h2 className="max-w-[14ch] font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-5xl">
                {site.about.story.title}
              </h2>
              <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
                {site.about.story.paragraphs[5]}
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
                {site.about.story.paragraphs[6]}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-line pt-5">
                <div>
                  <p className="font-serif text-2xl text-ink">{site.about.leaders[0]?.name}</p>
                  <p className="mt-1 text-sm text-muted">{site.about.leaders[0]?.role}</p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-ink"
                >
                  {site.about.title}
                  <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="max-w-[15ch] font-serif text-4xl tracking-[-0.045em] md:text-5xl">{home.facilities.title}</h2>
                <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">{home.facilities.body}</p>
              </div>
              <Link
                href="/gallery"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition hover:text-ink"
              >
                View gallery
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <HomeGalleryCarousel photos={schoolPhotos} />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]">
              <div className="breeze-cut-story absolute inset-y-0 left-0 right-[15%] overflow-hidden bg-line">
                <Photo
                  src={site.academics.image.src}
                  alt={site.academics.image.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
              <div className="breeze-cut-small absolute bottom-[6%] right-0 h-[34%] w-[43%] bg-paper p-1.5 shadow-[0_26px_54px_-34px_rgb(29_43_56_/_0.55)]">
                <div className="relative size-full overflow-hidden bg-line">
                  <Photo
                    src={classroomCut.image}
                    alt={classroomCut.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 42vw"
                    className="object-cover object-[center_42%]"
                  />
                </div>
              </div>
              <span className="absolute -right-3 top-[14%] h-[70%] w-[5px] rotate-3 bg-accent/90" aria-hidden />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="max-w-[13ch] font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-5xl">
                {site.academics.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">{site.academics.lede}</p>
            </Reveal>
            <ol className="mt-8 border-t border-line">
              {site.academics.stages.map((stage, index) => (
                <li key={stage.title} className="border-b border-line">
                  <Reveal delay={index * 0.05} className="grid gap-3 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline">
                    <span className="text-sm font-medium uppercase tracking-[0.16em] text-accent">{stage.index}</span>
                    <div>
                      <h3 className="font-serif text-2xl tracking-tight">{stage.title}</h3>
                      <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">{stage.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal delay={0.12}>
              <Link
                href="/academics"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-ink"
              >
                How we teach
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-4xl tracking-[-0.045em] md:text-5xl">{home.newsTitle}</h2>
              <Link href="/news" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition hover:text-ink">
                All news
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <ul className="mt-8 border-t border-line">
            {site.news.items.map((item, index) => (
              <li key={item.title} className="border-b border-line">
                <Reveal delay={index * 0.05}>
                  <Link
                    href="/news"
                    className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline"
                  >
                    <span className="text-sm text-muted">{formatNewsDate(item.date)}</span>
                    <span className="font-serif text-2xl tracking-tight transition group-hover:text-accent">{item.title}</span>
                    <ArrowUpRightIcon
                      size={17}
                      weight="bold"
                      className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="relative isolate overflow-hidden bg-deep text-paper">
        <Photo
          src="/images/campus.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_42%] opacity-35"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-deep via-deep/92 to-deep/35" aria-hidden />
        <span className="breeze-cut-cta absolute -right-20 top-0 h-full w-[44%] bg-accent/15" aria-hidden />

        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal>
            <h2 className="max-w-[15ch] font-serif text-4xl leading-[1.02] tracking-[-0.045em] md:text-6xl">
              {home.contactBand.title}
            </h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-paper/85 md:text-base">{home.contactBand.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.contact.phoneHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:scale-[0.98]"
              >
                <PhoneIcon size={16} weight="bold" aria-hidden />
                Call {site.contact.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-5 text-sm font-medium text-paper transition hover:-translate-y-0.5 hover:border-paper hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:scale-[0.98]"
              >
                {site.contactLabel}
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2">
              <div className="bg-deep/85 p-5">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-paper/55">
                  <PhoneIcon size={14} weight="bold" aria-hidden />
                  Office
                </dt>
                <dd className="mt-3 text-lg">{site.contact.phoneDisplay}</dd>
                <dd className="mt-1 text-sm text-paper/70">{site.contact.phoneAltDisplay}</dd>
              </div>
              <div className="bg-deep/85 p-5">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-paper/55">
                  <MapPinIcon size={14} weight="bold" aria-hidden />
                  Visit
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-paper/85">{site.contact.addressLines.join(", ")}</dd>
              </div>
              <div className="bg-deep/85 p-5 sm:col-span-2">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-paper/55">
                  <ClockIcon size={14} weight="bold" aria-hidden />
                  School hours
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-paper/85">{site.contact.hours}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
