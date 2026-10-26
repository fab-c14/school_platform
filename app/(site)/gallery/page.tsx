import { Photo } from "@/components/photo";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

const photos = [
  { src: "/images/gathering.jpg", alt: "Students and teachers outdoors with mountains behind them" },
  { src: "/images/girls-yard.jpg", alt: "Girls lined up in the school yard" },
  { src: "/images/campus-group.jpg", alt: "Younger students outside the school building" },
  { src: "/images/assembly.jpg", alt: "Students at an outdoor gathering" },
  { src: "/images/class-one.jpg", alt: "A class standing against a blue wall" },
  { src: "/images/class-two.jpg", alt: "Girls and boys seated and standing in class" },
  { src: "/images/class-three.jpg", alt: "A larger primary class in uniform" },
  { src: "/images/boys-outing.jpg", alt: "Boys in uniform on an outing" },
  { src: "/images/chairman.jpg", alt: "Iftekhar Ul Akbar, Chairman" },
];

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Gallery", "Photographs from Welkin International School.", "/gallery");
}

export default function GalleryPage() {
  return (
    <PageShell
      title="Gallery"
      lede="Photographs sent by Welkin International School, Sever Thandipora, Lolab."
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
