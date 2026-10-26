import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/metadata";
import { getSite } from "@/lib/site-store";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata(
    site,
    "Online registration",
    "How to start an enquiry at Welkin International School, Sever Thandipora, Lolab.",
    "/register",
  );
}

export default function RegisterPage() {
  return (
    <PageShell
      title="Online registration"
      lede="Registration for Welkin International School starts with the office. Call 7006384265 or send a note from the admissions page."
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <Link href="/admissions" className="inline-flex bg-accent px-5 py-3 text-sm text-white">
          Admissions
        </Link>
      </div>
    </PageShell>
  );
}
