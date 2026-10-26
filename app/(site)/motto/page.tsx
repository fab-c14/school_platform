import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Motto", "Excel with Purpose, the motto of Welkin International School.", "/motto");
}

export default function MottoPage() {
  return (
    <PageShell
      title="Excel with Purpose"
      lede="Excel with Purpose is the motto on the crest of Welkin International School, Sever Thandipora, Lolab."
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <p className="text-base leading-relaxed text-muted">
          The crest shows an open book and a graduate's cap. Around it are the words Welkin International School, and beneath it, Sevar Lolab. The Chairman asks that every child grow with purpose: intellect, character, and faith together. He calls that duty an Amanah, a sacred trust.
        </p>
      </div>
    </PageShell>
  );
}
