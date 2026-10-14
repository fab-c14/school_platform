import Image, { type ImageProps } from "next/image";

export function Photo({ src, ...props }: ImageProps) {
  const path = typeof src === "string" ? src : "";
  return <Image src={src} {...props} unoptimized={path.startsWith("/api/media/")} />;
}
