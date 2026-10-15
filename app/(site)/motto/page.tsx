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
      lede="This is the motto of Welkin International School, Sevar Thandipora, Lolab. It sits under the school crest."
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <p className="text-base leading-relaxed text-muted">
          The crest shows an open book and a graduate’s cap, with the words Welkin International School around the rim and Sevar Lolab beneath it. The school can replace this note with the full meaning of the motto when it is ready.
        </p>
      </div>
    </PageShell>
  );
}
