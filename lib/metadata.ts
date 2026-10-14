import type { Metadata } from "next";

type MetaSite = { name: string; url: string; ogImage: string };

export function pageMetadata(
  site: MetaSite,
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [site.ogImage],
    },
  };
}
