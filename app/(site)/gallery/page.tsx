import { schoolPhotos } from "@/content/gallery";
import { BreezeCut } from "@/components/breeze-cut";
import { HomeGalleryCarousel } from "@/components/home-gallery-carousel";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Gallery", "Photographs from Welkin International School.", "/gallery");
}

export default function GalleryPage() {
  return (
    <PageShell title="Gallery" lede="Photographs sent by Welkin International School, Sevar Thandipora, Lolab.">
      <div className="relative bg-paper">
        <BreezeCut tone="paper" variant={3} />
        <span className="breeze breeze-4" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 md:px-8">
          <HomeGalleryCarousel photos={schoolPhotos} />
        </div>
      </div>
    </PageShell>
  );
}
