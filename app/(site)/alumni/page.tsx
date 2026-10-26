import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Alumni", "Former students of Welkin International School, Sever Thandipora, Lolab.", "/alumni");
}

export default function AlumniPage() {
  return (
    <PageShell
      title="Alumni"
      lede="Former students can reach the office on 7006384265. A register will be added when the school is ready to collect names."
    />
  );
}
