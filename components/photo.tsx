import Image, { type ImageProps } from "next/image";

export function Photo({ src, alt, ...props }: ImageProps) {
  const path = typeof src === "string" ? src : "";
  const direct =
    path.startsWith("/images/") ||
    path.startsWith("/brand/") ||
    path.startsWith("/uploads/") ||
    path.startsWith("/api/media/");
  return <Image src={src} alt={alt} {...props} unoptimized={direct} />;
}
