import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Careers", "Work at Welkin International School, Sever Thandipora, Lolab.", "/careers");
}

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      lede="Open roles will be listed here. To ask about teaching or office work, call 7006384265."
    />
  );
}
