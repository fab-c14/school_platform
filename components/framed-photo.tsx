"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Photo } from "@/components/photo";

type FramedPhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function FramedPhoto({ src, alt, sizes, className, priority }: FramedPhotoProps) {
  return (
    <div className="photo-frame absolute inset-0">
      <Zoom zoomMargin={24} wrapElement="div" a11yNameButtonZoom={`Open ${alt}`}>
        <div className="relative h-full w-full">
          <Photo src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />
        </div>
      </Zoom>
    </div>
  );
}
