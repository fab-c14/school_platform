import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdminSession } from "@/lib/admin-session";
import { readNoteForAdmin, type StoredNote } from "@/lib/records";

type SubmissionProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export default function SubmissionPage(props: SubmissionProps) {
  return (
    <main>
      <Suspense fallback={<p className="admin-surface" role="status">Loading submission…</p>}>
        <Submission {...props} />
      </Suspense>
    </main>
  );
}

async function Submission({ params, searchParams }: SubmissionProps) {
  await requireAdminSession();
  const [{ id }, { page }] = await Promise.all([params, searchParams]);
  const back = typeof page === "string" && /^[1-9]\d{0,6}$/.test(page) ? `/admin/office?page=${page}` : "/admin/office";
  let note: StoredNote | null;
  try {
    note = await readNoteForAdmin(id);
  } catch {
    return (
      <div className="admin-surface">
        <Link href={back} className="admin-button admin-button-secondary">Back to Office Desk</Link>
        <p className="admin-message admin-error" role="alert">This submission could not be loaded. Refresh the page to try again.</p>
      </div>
    );
  }
  if (!note) notFound();

  const submittedOn = Number.isFinite(Date.parse(note.createdAt))
    ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(note.createdAt))
    : "";

  return (
    <>
      <header className="admin-page-header">
        <Link href={back} className="admin-button admin-button-secondary mb-5">Back to Office Desk</Link>
        <h1 className="admin-title break-words">{note.studentName || "Student submission"}</h1>
        <p>{note.kind === "application" ? "Admission application" : "School enquiry"}{submittedOn && <> · <time dateTime={note.createdAt}>{submittedOn}</time></>}</p>
      </header>
      <div className="grid gap-4">
        <DetailsSection title="Submission" rows={[
          ["Grade", note.className], ["Parent or guardian", note.parentName], ["Phone", note.phone],
          ["Email", note.email], ["Status", note.status],
          ["Message", note.kind === "note" || !Object.keys(note.details).length ? note.message : ""],
        ]} />
        {note.kind === "application" ? <ApplicationFields details={note.details} /> : null}
        {note.kind === "application" ? (
          <section className="admin-surface">
            <h2 className="admin-section-title">Attachments</h2>
            {note.documents.length ? (
              <ul className="flex flex-wrap gap-3">
                {note.documents.map((document, index) => (
                  <li key={`${document.url}-${index}`}>
                    <a className="admin-button admin-button-secondary" href={document.url} target="_blank" rel="noreferrer" title={document.name || undefined}>
                      {document.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted">No attachments were submitted.</p>}
          </section>
        ) : null}
      </div>
    </>
  );
}

type DetailRow = readonly [label: string, value: unknown];

function DetailsSection({ title, rows }: { title: string; rows: DetailRow[] }) {
  const populated = rows.flatMap(([label, value]) => {
    if (typeof value === "boolean") return [{ label, text: value ? "Yes" : "No" }];
    if (typeof value === "string" && value.trim()) return [{ label, text: value }];
    return [];
  });
  if (!populated.length) return null;
  return (
    <section className="admin-surface">
      <h2 className="admin-section-title">{title}</h2>
      <dl className="grid gap-4 sm:grid-cols-2">
        {populated.map(({ label, text }) => (
          <div key={label} className="min-w-0">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 whitespace-pre-wrap wrap-anywhere font-medium">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ApplicationFields({ details }: { details: StoredNote["details"] }) {
  const health = details.health && typeof details.health === "object" ? details.health as Record<string, unknown> : {};
  return (
    <>
      <DetailsSection title="Student and previous school" rows={[
        ["First name", details.firstName], ["Last name", details.lastName], ["Date of birth", details.dob],
        ["Previous school", details.previousSchool], ["Reason for leaving", details.leavingReason],
        ["Transfer certificate", details.tcAvailable === "later" ? "To be submitted later" : details.tcAvailable === "available" ? "Available" : ""],
      ]} />
      <DetailsSection title="Father’s details" rows={[
        ["Name", details.fatherName], ["Phone", details.fatherPhone], ["Qualification", details.fatherQualification],
        ["Occupation", details.fatherOccupation], ["Income", details.fatherIncome], ["Aadhaar number", details.fatherAadhar],
      ]} />
      <DetailsSection title="Mother’s details" rows={[
        ["Name", details.motherName], ["Phone", details.motherPhone], ["Qualification", details.motherQualification],
        ["Occupation", details.motherOccupation], ["Income", details.motherIncome], ["Aadhaar number", details.motherAadhar],
      ]} />
      <DetailsSection title="Guardian and addresses" rows={[
        ["Local guardian", details.localGuardian], ["Guardian’s name", details.guardianName], ["Guardian’s phone", details.guardianPhone],
        ["Current address", details.currentAddress], ["Permanent address", details.sameAddress === true ? "Same as current address" : details.permanentAddress],
      ]} />
      <DetailsSection title="Health and support" rows={[
        ["Medical condition", health.medical], ["Allergies", health.allergies], ["Additional support needs", health.support], ["Health notes", details.healthNotes],
      ]} />
      <DetailsSection title="Other responses and consents" rows={[
        ["How the family heard about the school", details.referral], ["Sibling details", details.sibling],
        ["Photo consent", details.photoConsent], ["Declaration accepted", details.declared], ["School rules accepted", details.agrees],
      ]} />
    </>
  );
}
