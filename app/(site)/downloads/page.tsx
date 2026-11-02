import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  FilePdfIcon,
  FolderOpenIcon,
  PhoneIcon,
  PrinterIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { BreezeCut } from "@/components/breeze-cut";
import { listPublicDocuments } from "@/lib/records";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Downloads & School Circulars",
    "Download admission forms, syllabus split-up, book lists, and official circulars from Welkin International School, Sevar Thandipora, Lolab.",
    "/downloads",
  );
}

const standardDocuments = [
  {
    title: "School Prospectus & Admission Guide 2026-27",
    category: "Admissions",
    size: "2.4 MB",
    type: "PDF",
    description: "Detailed overview of academic programs, Islamic studies curriculum, faculty, fee schedule, and campus facilities.",
    fileUrl: "/apply#application",
  },
  {
    title: "Printable Student Admission Application Form",
    category: "Forms",
    size: "1.1 MB",
    type: "PDF",
    description: "Standard physical form for parents wishing to submit their application directly to the school administrative desk.",
    fileUrl: "/apply#application",
  },
  {
    title: "Annual Academic Calendar & Holiday Schedule 2026",
    category: "Academics",
    size: "820 KB",
    type: "PDF",
    description: "Term assessment dates, parent-teacher meetings, summer and winter vacations, and national/Islamic holiday observances.",
    fileUrl: "#",
  },
  {
    title: "Grade-Wise Prescribed Book List (Nursery to 10th)",
    category: "Curriculum",
    size: "950 KB",
    type: "PDF",
    description: "Complete list of prescribed textbooks, notebooks, and reference materials for all grades for the current academic session.",
    fileUrl: "#",
  },
  {
    title: "School Uniform & Dress Code Circular (Summer & Winter)",
    category: "Policy",
    size: "640 KB",
    type: "PDF",
    description: "Specifications for formal uniform, physical education (P.E.) house tracksuits, winter blazers, sweaters, and headgear.",
    fileUrl: "#",
  },
  {
    title: "Medical Record & Emergency Undertaking Form",
    category: "Forms",
    size: "480 KB",
    type: "PDF",
    description: "Required emergency medical authorization, blood group declaration, and allergy notification form for admitted students.",
    fileUrl: "#",
  },
  {
    title: "Transfer Certificate (TC) Application Procedure",
    category: "Administration",
    size: "390 KB",
    type: "PDF",
    description: "Guidelines and application format for requesting student migration or school leaving certificates.",
    fileUrl: "#",
  },
];

export default async function DownloadsPage() {
  const site = await getSite();
  const uploadedFiles = await listPublicDocuments();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-8 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Resource Center</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight md:text-7xl">
          Downloads & Documents
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted md:text-xl">
          Official forms, circulars, book lists, and administrative documents for students and parents of Welkin International School, Sevar Thandipora, Lolab.
        </p>
      </header>

      {/* Official Circulars Section */}
      <section className="relative overflow-hidden bg-[#f6ebe4]">
        <BreezeCut from="paper" to="mist" variant="wave-flow" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Official Publications</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight md:text-5xl">
              Forms & Guidelines
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Click to download or view any document. Physical printed copies are also available free of charge at the main school office.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {standardDocuments.map((doc) => (
              <div
                key={doc.title}
                className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-block rounded-md bg-[#f6ebe4] px-2.5 py-1 text-xs font-semibold text-accent uppercase">
                      {doc.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-muted">
                      <FilePdfIcon size={16} className="text-accent" />
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl tracking-tight text-ink">{doc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{doc.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                  <span className="text-xs text-muted">Official Document</span>
                  <a
                    href={doc.fileUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    <span>Download / Open</span>
                    <ArrowDownIcon size={15} weight="bold" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Uploaded Office Documents (if any uploaded by admin) */}
          {uploadedFiles.length > 0 ? (
            <div className="mt-14">
              <h3 className="font-serif text-2xl text-ink">Recently Uploaded Notices from Office</h3>
              <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white shadow-sm">
                {uploadedFiles.map((file) => (
                  <li key={file.id} className="flex items-center justify-between p-5 md:px-7">
                    <div className="flex items-center gap-3">
                      <FilePdfIcon size={24} weight="duotone" className="text-accent" />
                      <div>
                        <p className="font-serif text-lg text-ink">{file.name}</p>
                        <p className="text-xs text-muted">Uploaded circular</p>
                      </div>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-ink transition hover:bg-[#f6ebe4] hover:text-accent"
                    >
                      <span>View File</span>
                      <ArrowUpRightIcon size={14} weight="bold" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Printing & Verification Notice */}
      <section className="relative overflow-hidden bg-paper">
        <BreezeCut from="mist" to="paper" variant="slant-right" />
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <PrinterIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Physical Copies</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Families who do not have access to a printer may collect physical paper sets of all forms and book lists directly from the school office desk during working hours.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <ShieldCheckIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Authentication & Stamp</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Transfer certificates, marks sheets, and bonafide student certificates must be stamped with the official school seal and signed by the Principal to be valid for official verification.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-[#f6ebe4] text-accent">
                <PhoneIcon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-ink">Document Assistance</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Need clarification regarding syllabus editions or required admission paperwork? Call our office team directly at{" "}
                <span className="font-semibold text-ink">{site.contact.phoneDisplay}</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-deep text-paper">
        <BreezeCut from="paper" to="deep" variant="wave-flow" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-18">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Ready to apply?</h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              You can also complete the admissions application directly online without downloading any forms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.98]"
            >
              Fill online application
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink active:scale-[0.98]"
            >
              Contact the office
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
