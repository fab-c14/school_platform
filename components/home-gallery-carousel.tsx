"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FramedPhoto } from "@/components/framed-photo";
import "swiper/css";

type Slide = {
  src: string;
  alt: string;
};

export function HomeGalleryCarousel({ photos }: { photos: Slide[] }) {
  const reduce = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (photos.length === 0) return null;

  if (!ready) {
    return (
      <ul className="flex gap-4" aria-label="School photographs">
        {photos.slice(0, 3).map((photo) => (
          <li key={photo.src} className="relative aspect-[4/3] w-[84%] shrink-0 overflow-hidden bg-line sm:w-[48%] lg:w-[34%]">
            <FramedPhoto src={photo.src} alt={photo.alt} sizes="(min-width: 1024px) 34vw, 84vw" className="object-cover object-[center_35%]" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {index + 1} / {photos.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className="grid size-11 place-items-center border border-ink text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Previous photograph"
          >
            <ArrowLeftIcon size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className="grid size-11 place-items-center border border-ink text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Next photograph"
          >
            <ArrowRightIcon size={18} weight="bold" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[A11y, Autoplay, Keyboard]}
        a11y={{ enabled: true }}
        keyboard={{ enabled: true }}
        slidesPerView={1.12}
        spaceBetween={16}
        loop={photos.length > 2}
        speed={reduce ? 0 : 650}
        autoplay={reduce === false ? { delay: 5600, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        breakpoints={{
          640: { slidesPerView: 2.05 },
          1024: { slidesPerView: 2.7 },
        }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setIndex(instance.realIndex)}
        aria-label="School photographs"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.src}>
            <div className="relative aspect-[4/3] overflow-hidden bg-line">
              <FramedPhoto
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width: 1024px) 34vw, 84vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
