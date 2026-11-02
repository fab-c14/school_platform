import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";

type CutImage = { src: string; alt: string };

const cuts = ["breeze-band-a", "breeze-band-b", "breeze-band-c", "breeze-band-d"];
const positions = ["object-[center_35%]", "object-[center_45%]", "object-[center_30%]", "object-[center_42%]"];

export function BreezeBand({
  images,
  className = "",
}: {
  images: CutImage[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-1.5 md:grid-cols-4 ${className}`} aria-hidden>
      {images.map((image, index) => (
        <Reveal
          key={`${image.src}-${index}`}
          delay={index * 0.05}
          className={`relative min-h-[8.5rem] overflow-hidden bg-line md:min-h-[12rem] ${cuts[index % cuts.length]}`}
        >
          <Photo
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className={`object-cover ${positions[index % positions.length]}`}
          />
          <span className="absolute inset-0 bg-deep/5" aria-hidden />
        </Reveal>
      ))}
    </div>
  );
}
