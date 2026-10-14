import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site-store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
