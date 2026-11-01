import { PageShell } from "@/components/page-shell";
import { listPublicDocuments } from "@/lib/records";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Downloads",
    "Notices, book lists, and forms from Welkin International School will be posted here.",
    "/downloads",
  );
}

export default async function DownloadsPage() {
  const files = await listPublicDocuments();

  return (
    <PageShell
      title="Downloads"
      lede="Book lists, fee notes, and circulars will be added here. Until then, call the office on 7006384265."
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        {files.length === 0 ? (
          <p className="border border-line bg-white px-5 py-6 text-base leading-relaxed">
            No files have been uploaded yet.
          </p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {files.map((file) => (
              <li key={file.id}>
                <a className="block py-4 text-base underline decoration-accent underline-offset-4" href={file.url}>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
