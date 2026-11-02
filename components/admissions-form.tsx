"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  FilePdfIcon,
  ImageIcon,
  PhoneIcon,
  UploadSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useRef, useState, type FormEvent } from "react";
import { DOCUMENT_SLOTS as DOCUMENTS, type DocumentKey, type DocumentSlot } from "@/lib/admissions";

const GRADES = [
  "Nursery",
  "LKG",
  "UKG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const REFERRAL_SOURCES = [
  "Website or search engine",
  "Social media",
  "Friend or family",
  "Advertisement",
  "Walk-in",
  "Other",
];

type Errors = Record<string, string>;
type UploadedDocument = {
  id: string;
  slot: string;
  label: string;
  name: string;
  bucket: string;
  path: string;
  type: string;
  size: number;
  url?: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fieldValue(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

export function AdmissionsForm({
  schoolName,
  phoneDisplay,
  phoneHref,
}: {
  schoolName: string;
  phoneDisplay: string;
  phoneHref: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<Partial<Record<DocumentKey, File>>>({});
  const [fileErrors, setFileErrors] = useState<Partial<Record<DocumentKey, string>>>({});
  const [health, setHealth] = useState({ medical: "no", allergies: "no", support: "no" });
  const [localGuardian, setLocalGuardian] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const [tcAvailable, setTcAvailable] = useState("available");
  const [declared, setDeclared] = useState(false);
  const [agrees, setAgrees] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [stored, setStored] = useState(false);

  function pickFile(config: DocumentSlot, file: File | undefined) {
    if (!file) return;
    if (!config.types.includes(file.type)) {
      setFiles((current) => {
        const next = { ...current };
        delete next[config.key];
        return next;
      });
      setFileErrors((current) => ({ ...current, [config.key]: "Choose a file in the format listed above." }));
      return;
    }
    if (file.size > config.max) {
      setFiles((current) => {
        const next = { ...current };
        delete next[config.key];
        return next;
      });
      setFileErrors((current) => ({
        ...current,
        [config.key]: `This file is ${formatBytes(file.size)}. Keep it under ${formatBytes(config.max)}.`,
      }));
      return;
    }
    setFiles((current) => ({ ...current, [config.key]: file }));
    setFileErrors((current) => {
      const next = { ...current };
      delete next[config.key];
      return next;
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[config.key];
      return next;
    });
  }

  function removeFile(key: DocumentKey) {
    setFiles((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};

    const firstName = fieldValue(data, "firstName");
    const lastName = fieldValue(data, "lastName");
    const dob = fieldValue(data, "dob");
    const grade = fieldValue(data, "grade");
    const fatherName = fieldValue(data, "fatherName");
    const fatherPhone = fieldValue(data, "fatherPhone");
    const motherName = fieldValue(data, "motherName");
    const motherPhone = fieldValue(data, "motherPhone");
    const currentAddress = fieldValue(data, "currentAddress");
    const permanentAddress = fieldValue(data, "permanentAddress");
    const guardianName = fieldValue(data, "guardianName");
    const guardianPhone = fieldValue(data, "guardianPhone");
    const healthNotes = fieldValue(data, "healthNotes");

    if (firstName.length < 2) next.firstName = "Enter the student's first name.";
    if (lastName.length < 2) next.lastName = "Enter the student's last name.";
    if (!dob) next.dob = "Choose the date of birth.";
    if (!grade) next.grade = "Choose the class you are applying for.";
    if (fatherName.length < 2) next.fatherName = "Enter the father's name.";
    if (fatherPhone.replace(/\D/g, "").length < 8) next.fatherPhone = "Enter a contact number.";
    if (motherPhone && motherPhone.replace(/\D/g, "").length < 8) next.motherPhone = "Check this number.";
    if (currentAddress.length < 6) next.currentAddress = "Enter the current address.";
    if (!sameAddress && permanentAddress.length < 6) next.permanentAddress = "Enter the permanent address.";
    if (localGuardian) {
      if (guardianName.length < 2) next.guardianName = "Enter the local guardian's name.";
      if (guardianPhone.replace(/\D/g, "").length < 8) next.guardianPhone = "Enter the guardian's contact number.";
    }
    if (health.medical === "yes" || health.allergies === "yes" || health.support === "yes") {
      if (healthNotes.length < 4) next.healthNotes = "Tell the school what support or condition to note.";
    }
    if (!declared) next.declared = "Tick the declaration before submitting.";
    if (!agrees) next.agrees = "Tick the school rules box before submitting.";
    for (const config of DOCUMENTS) {
      if (config.required && !files[config.key]) {
        next[config.key] = `Attach the ${config.label.toLowerCase()}.`;
      }
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("error");
      setNotice("Check the highlighted fields and try again.");
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        first?.focus();
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setErrors({});
    setStatus("submitting");
    setNotice("");

    const uploaded: UploadedDocument[] = [];
    for (const config of DOCUMENTS) {
      const file = files[config.key];
      if (!file) continue;
      const body = new FormData();
      body.set("file", file);
      body.set("slot", config.key);
      const response = await fetch("/api/admissions/document", { method: "POST", body });
      const result = (await response.json().catch(() => null)) as
        | { document?: UploadedDocument; skipped?: boolean; error?: string }
        | null;
      if (!response.ok && !result?.skipped) {
        setStatus("error");
        setNotice(result?.error || "A document could not be uploaded. Call the office and we will take the details by phone.");
        return;
      }
      if (result?.document) uploaded.push(result.document);
    }

    const response = await fetch("/api/admissions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        dob,
        grade,
        previousSchool: fieldValue(data, "previousSchool"),
        leavingReason: fieldValue(data, "leavingReason"),
        tcAvailable,
        fatherName,
        fatherQualification: fieldValue(data, "fatherQualification"),
        fatherOccupation: fieldValue(data, "fatherOccupation"),
        fatherIncome: fieldValue(data, "fatherIncome"),
        fatherPhone,
        fatherAadhar: fieldValue(data, "fatherAadhar"),
        motherName,
        motherQualification: fieldValue(data, "motherQualification"),
        motherOccupation: fieldValue(data, "motherOccupation"),
        motherIncome: fieldValue(data, "motherIncome"),
        motherPhone,
        motherAadhar: fieldValue(data, "motherAadhar"),
        localGuardian,
        guardianName,
        guardianPhone,
        currentAddress,
        sameAddress,
        permanentAddress,
        health,
        healthNotes,
        referral: fieldValue(data, "referral"),
        sibling: fieldValue(data, "sibling"),
        photoConsent,
        documents: uploaded,
      }),
    });

    const result = (await response.json().catch(() => null)) as { stored?: boolean; error?: string } | null;
    if (!response.ok) {
      setStatus("error");
      setNotice(result?.error || "The application could not be sent. Call the office and we will take the details by phone.");
      return;
    }
    setStored(Boolean(result?.stored));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-[1.25rem] border border-line bg-white p-6 md:p-10">
        <CheckCircleIcon size={44} weight="duotone" className="text-accent" />
        <h3 className="mt-5 font-serif text-3xl tracking-tight">
          {stored ? "Application received." : "Application checked."}
        </h3>
        <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">
          {stored
            ? `The office has the application and will call the number you gave. Keep ${phoneDisplay} saved if you need to add anything.`
            : "This copy of the site is not connected to the office database yet, so the application was not saved. Call the office and they will take the details by phone."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:-translate-y-px active:scale-[0.98]"
          >
            <PhoneIcon size={16} weight="bold" />
            Call {phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setStored(false);
              setErrors({});
              setFiles({});
              setFileErrors({});
              setHealth({ medical: "no", allergies: "no", support: "no" });
              setLocalGuardian(false);
              setSameAddress(true);
              setTcAvailable("available");
              setDeclared(false);
              setAgrees(false);
              setPhotoConsent(false);
            }}
            className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium text-ink transition hover:bg-ink hover:text-paper active:scale-[0.98]"
          >
            Start another application
          </button>
        </div>
        <p className="mt-6 text-sm text-muted">{schoolName}, Sevar Thandipora, Lolab.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={() => {
        if (status === "error" && notice) {
          setStatus("idle");
          setNotice("");
        }
      }}
      noValidate
      className="grid gap-0"
    >
      {status === "error" && notice ? (
        <div role="alert" className="mb-8 border border-[#e7b8aa] bg-[#fbeee9] px-4 py-3 text-sm leading-relaxed text-[#8f2f1c]">
          {notice}
        </div>
      ) : null}

      <Section number="1" title="Student information">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="firstName" label="First name" autoComplete="given-name" required error={errors.firstName} />
          <TextField name="lastName" label="Last name" autoComplete="family-name" required error={errors.lastName} />
          <TextField name="dob" label="Date of birth" type="date" required error={errors.dob} />
          <SelectField name="grade" label="Grade applying for" required error={errors.grade} defaultValue="">
            <option value="">Select grade</option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </SelectField>
        </div>
      </Section>

      <Section number="2" title="Previous school details">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="previousSchool" label="Previous school name" autoComplete="organization" />
          <TextField name="leavingReason" label="Reason for leaving" />
        </div>
        <RadioGroup
          name="tcChoice"
          legend="Transfer certificate availability"
          value={tcAvailable}
          onChange={setTcAvailable}
          options={[
            { value: "available", label: "Yes, available" },
            { value: "later", label: "No, to be submitted later" },
          ]}
        />
      </Section>

      <Section number="3" title="Parent or guardian information">
        <div className="grid gap-5 lg:grid-cols-2">
          <fieldset className="border border-line bg-[#f8efe9] p-4 md:p-5">
            <legend className="px-2 font-serif text-xl">Father&rsquo;s details</legend>
            <div className="grid gap-4">
              <TextField name="fatherName" label="Name" autoComplete="name" required error={errors.fatherName} />
              <TextField name="fatherQualification" label="Qualification" />
              <TextField name="fatherOccupation" label="Occupation" autoComplete="organization-title" />
              <TextField name="fatherIncome" label="Annual income" inputMode="numeric" />
              <TextField name="fatherPhone" label="Contact number" type="tel" inputMode="tel" autoComplete="tel" required error={errors.fatherPhone} />
              <TextField name="fatherAadhar" label="Aadhar number" inputMode="numeric" />
            </div>
          </fieldset>
          <fieldset className="border border-line bg-[#f8efe9] p-4 md:p-5">
            <legend className="px-2 font-serif text-xl">Mother&rsquo;s details</legend>
            <div className="grid gap-4">
              <TextField name="motherName" label="Name" />
              <TextField name="motherQualification" label="Qualification" />
              <TextField name="motherOccupation" label="Occupation" />
              <TextField name="motherIncome" label="Annual income" inputMode="numeric" />
              <TextField name="motherPhone" label="Contact number" type="tel" inputMode="tel" error={errors.motherPhone} />
              <TextField name="motherAadhar" label="Aadhar number" inputMode="numeric" />
            </div>
          </fieldset>
        </div>
        <div className="mt-5">
          <Checkbox
            name="localGuardian"
            checked={localGuardian}
            onChange={setLocalGuardian}
            label="Add local guardian details (if applicable)"
          />
          {localGuardian ? (
            <div className="mt-4 grid gap-5 border border-line p-4 sm:grid-cols-2 md:p-5">
              <TextField name="guardianName" label="Local guardian name" error={errors.guardianName} />
              <TextField name="guardianPhone" label="Local guardian contact number" type="tel" inputMode="tel" error={errors.guardianPhone} />
            </div>
          ) : null}
        </div>
      </Section>

      <Section number="4" title="Contact and address details">
        <TextAreaField name="currentAddress" label="Current address" rows={3} required error={errors.currentAddress} />
        <div className="mt-5">
          <Checkbox
            name="sameAddress"
            checked={sameAddress}
            onChange={setSameAddress}
            label="Permanent address is the same as the current address"
          />
          {!sameAddress ? (
            <div className="mt-4">
              <TextAreaField name="permanentAddress" label="Permanent address" rows={3} required error={errors.permanentAddress} />
            </div>
          ) : null}
        </div>
      </Section>

      <Section number="5" title="Health and special requirements">
        <div className="grid gap-5">
          <RadioGroup
            name="medical"
            legend="Does the child have any pre-existing medical condition?"
            value={health.medical}
            onChange={(value) => setHealth((current) => ({ ...current, medical: value }))}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroup
            name="allergies"
            legend="Does the child have any allergies?"
            value={health.allergies}
            onChange={(value) => setHealth((current) => ({ ...current, allergies: value }))}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroup
            name="support"
            legend="Does the child need any special educational support?"
            value={health.support}
            onChange={(value) => setHealth((current) => ({ ...current, support: value }))}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {health.medical === "yes" || health.allergies === "yes" || health.support === "yes" ? (
            <TextAreaField
              name="healthNotes"
              label="Tell the school what to note"
              hint="Medication, allergies, or the support the child needs."
              rows={3}
              error={errors.healthNotes}
            />
          ) : null}
        </div>
      </Section>

      <Section number="6" title="Document upload">
        <p className="max-w-[62ch] text-sm leading-relaxed text-muted">
          Attach clear scans or photographs. Birth certificate, passport photo, and father photograph are needed with the application. The Aadhar card can follow.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {DOCUMENTS.map((config) => (
            <UploadTile
              key={config.key}
              config={config}
              file={files[config.key]}
              error={fileErrors[config.key] || errors[config.key]}
              onPick={(file) => pickFile(config, file)}
              onRemove={() => removeFile(config.key)}
            />
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Files are kept with the application for the office. The site does not publish them.
        </p>
      </Section>

      <Section number="7" title="Additional information">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField name="referral" label="How did you hear about the school?" defaultValue="">
            <option value="">Select an option</option>
            {REFERRAL_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </SelectField>
          <TextField name="sibling" label="Sibling studying here (if any)" placeholder="Name and grade" />
        </div>
      </Section>

      <div className="mt-10 border border-line bg-[#f8efe9] p-5 md:p-7">
        <h3 className="font-serif text-2xl tracking-tight">Declaration</h3>
        <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted">
          I declare that the information above is true and correct to the best of my knowledge. I understand that false information may lead to the cancellation of admission.
        </p>
        <div className="mt-4 grid gap-3">
          <Checkbox
            name="declared"
            checked={declared}
            onChange={(value) => {
              setDeclared(value);
              setErrors((current) => {
                const next = { ...current };
                delete next.declared;
                return next;
              });
            }}
            label="I agree to the declaration above."
            error={errors.declared}
          />
          <Checkbox
            name="agrees"
            checked={agrees}
            onChange={(value) => {
              setAgrees(value);
              setErrors((current) => {
                const next = { ...current };
                delete next.agrees;
                return next;
              });
            }}
            label={`I agree to abide by the rules and regulations of ${schoolName}.`}
            error={errors.agrees}
          />
          <Checkbox
            name="photoConsent"
            checked={photoConsent}
            onChange={setPhotoConsent}
            label="I consent to the use of my child's photographs or videos for school promotional purposes."
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          The office may call to confirm a detail. Keep {phoneDisplay} saved.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending application…" : "Submit application"}
          <ArrowRightIcon size={16} weight="bold" />
        </button>
      </div>
    </form>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-serif text-2xl text-accent">{number}.</span>
        <h3 className="font-serif text-2xl tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function FieldShell({
  htmlFor,
  label,
  required,
  hint,
  error,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs leading-relaxed text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs leading-relaxed text-[#8f2f1c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-11 w-full border border-line bg-white px-3 py-2.5 text-base text-ink outline-none transition placeholder:text-[#8b98a2] focus:border-accent focus:ring-2 focus:ring-accent/15 aria-invalid:border-[#b23c24]";

function TextField({
  name,
  label,
  type = "text",
  required,
  hint,
  error,
  autoComplete,
  inputMode,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric" | "decimal" | "email";
  placeholder?: string;
}) {
  return (
    <FieldShell htmlFor={name} label={label} required={required} hint={hint} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
    </FieldShell>
  );
}

function TextAreaField({
  name,
  label,
  rows = 4,
  required,
  hint,
  error,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <FieldShell htmlFor={name} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputClass} resize-y`}
      />
    </FieldShell>
  );
}

function SelectField({
  name,
  label,
  required,
  error,
  defaultValue,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <FieldShell htmlFor={name} label={label} required={required} error={error}>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      >
        {children}
      </select>
    </FieldShell>
  );
}

function RadioGroup({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string;
  legend: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-[var(--accent)]"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Checkbox({
  name,
  checked,
  onChange,
  label,
  error,
}: {
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  error?: string;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={name} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${name}-error`} className="pl-7 text-xs leading-relaxed text-[#8f2f1c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function UploadTile({
  config,
  file,
  error,
  onPick,
  onRemove,
}: {
  config: DocumentSlot;
  file?: File;
  error?: string;
  onPick: (file: File | undefined) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = config.key === "passportPhoto" ? ImageIcon : FilePdfIcon;

  return (
    <div className="grid gap-2">
      <input
        ref={inputRef}
        id={config.key}
        type="file"
        accept={config.accept}
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => onPick(event.target.files?.[0])}
      />
      <div
        className={`flex min-h-28 flex-col justify-between border border-dashed p-4 transition ${
          file ? "border-accent bg-[#fdf3ee]" : "border-[#b9c5cd] bg-white hover:border-accent"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <Icon size={26} weight="duotone" className={file ? "text-accent" : "text-muted"} />
          {file ? <CheckCircleIcon size={20} weight="fill" className="text-accent" /> : null}
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-ink">
            {config.label}
            {config.required ? <span className="ml-1 text-accent">*</span> : null}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{file ? `${file.name} · ${formatBytes(file.size)}` : config.hint}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              inputRef.current?.click();
            }}
            aria-label={`${file ? "Replace" : "Choose"} ${config.label}`}
            aria-describedby={error ? `${config.key}-error` : undefined}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink underline decoration-accent underline-offset-4 hover:text-accent"
          >
            <UploadSimpleIcon size={14} weight="bold" />
            {file ? "Replace file" : "Choose file"}
          </button>
          {file ? (
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
                onRemove();
              }}
              aria-label={`Remove ${config.label}`}
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent"
            >
              <XIcon size={12} weight="bold" />
              Remove
            </button>
          ) : null}
        </div>
      </div>
      {error ? (
        <p id={`${config.key}-error`} className="text-xs leading-relaxed text-[#8f2f1c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
