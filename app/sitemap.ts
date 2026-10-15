import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site-store";

const paths = [
  "",
  "/about",
  "/motto",
  "/academics",
  "/downloads",
  "/admissions",
  "/register",
  "/campus",
  "/alumni",
  "/careers",
  "/gallery",
  "/students",
  "/news",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const lastModified = new Date("2026-10-14T00:00:00.000Z");

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
