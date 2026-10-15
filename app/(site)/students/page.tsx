import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(site, "Student Corner", "News and student life at Welkin International School.", "/students");
}

export default function StudentsPage() {
  return (
    <PageShell
      title="Student Corner"
      lede="Notices for students, and a place for school events. The first real notices will replace this note."
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <Link href="/news" className="text-accent underline underline-offset-4">
          News
        </Link>
      </div>
    </PageShell>
  );
}
