import Link from "next/link";
import { ArrowUpRightIcon, ImagesIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { schoolPhotos } from "@/content/gallery";
import { BreezeCut } from "@/components/breeze-cut";
import { GalleryGrid } from "@/components/gallery-grid";
import { HomeGalleryCarousel } from "@/components/home-gallery-carousel";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "School Photo Gallery",
    "Photographs of classrooms, campus grounds, student assemblies, and outdoor activities at Welkin International School, Sevar Thandipora, Lolab.",
    "/gallery",
  );
}

export default async function GalleryPage() {
  const site = await getSite();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Visual Archive</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          School Photo Gallery
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Authentic moments from Welkin International School, Sevar Thandipora, Lolab. Discover our classrooms, campus life, student gatherings, and field excursions.
        </p>
      </header>

      {/* Featured Carousel Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Highlights</span>
              <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">Featured Moments</h2>
            </div>
            <p className="text-sm text-muted">Swipe or click arrows to explore the carousel</p>
          </div>
          <div className="mt-8">
            <HomeGalleryCarousel photos={schoolPhotos} />
          </div>
        </div>
      </section>

      {/* Full Categorized Gallery Grid */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Browse All Media</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Photographs by Category
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Select any category filter below to view classrooms, campus facilities, gatherings, and excursions.
            </p>
          </div>

          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">See our school for yourself.</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              We welcome prospective parents and students to visit our campus in Sevar Thandipora, meet our faculty, and experience our community firsthand.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Apply for admission
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              <PhoneIcon size={16} weight="bold" />
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
