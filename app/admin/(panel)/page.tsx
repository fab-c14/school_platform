import { Suspense } from "react";
import { Editor } from "@/components/admin/editor";
import { readSiteForAdmin } from "@/lib/site-store";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading the editor…</p>}>
      <EditorLoader />
    </Suspense>
  );
}

async function EditorLoader() {
  const content = await readSiteForAdmin();
  return (
    <main>
      <h1 className="font-serif text-4xl tracking-tight">Edit the site</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Change the text, then save. Use Replace photo on any picture. JPG, PNG, and WebP up to 5 MB.
      </p>
      <div className="mt-8">
        <Editor initial={content} />
      </div>
    </main>
  );
}
