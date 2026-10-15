import { Photo } from "@/components/photo";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

const photos = [
  { src: "/images/campus.jpg", alt: "School courtyard" },
  { src: "/images/classroom.jpg", alt: "Classroom" },
  { src: "/images/lab.jpg", alt: "Science laboratory" },
  { src: "/images/library.jpg", alt: "Library" },
  { src: "/images/sports.jpg", alt: "Sports ground" },
  { src: "/images/art.jpg", alt: "Art room" },
];

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Gallery", "Photographs from Welkin International School.", "/gallery");
}

export default function GalleryPage() {
  return (
    <PageShell
      title="Gallery"
      lede="A first set of photographs. The school can replace these with pictures from Sevar Thandipora."
    >
      <ul className="mx-auto grid max-w-7xl gap-4 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.src} className="relative aspect-[4/3] overflow-hidden bg-line">
            <Photo src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
