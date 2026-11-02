import { NextResponse } from "next/server";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

type DocumentRecord = {
  id: string;
  slot: string;
  label: string;
  name: string;
  bucket: string;
  path: string;
  type: string;
  size: number;
  url: string;
};

function text(value: unknown, max = 240) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function yesNo(value: unknown) {
  return value === "yes" ? "yes" : "no";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "The application could not be read." }, { status: 400 });
  }

  const firstName = text(body.firstName, 80);
  const lastName = text(body.lastName, 80);
  const dob = text(body.dob, 20);
  const grade = text(body.grade, 40);
  const fatherName = text(body.fatherName, 120);
  const fatherPhone = text(body.fatherPhone, 40);
  const currentAddress = text(body.currentAddress, 500);

  if (
    firstName.length < 2 ||
    lastName.length < 2 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dob) ||
    !grade ||
    fatherName.length < 2 ||
    fatherPhone.replace(/\D/g, "").length < 8 ||
    currentAddress.length < 6
  ) {
    return NextResponse.json({ error: "Check the required fields and try again." }, { status: 400 });
  }

  const documents: DocumentRecord[] = Array.isArray(body.documents)
    ? body.documents
        .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
        .slice(0, 4)
        .map((item) => {
          const id = text(item.id, 40);
          if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
          return {
            id,
            slot: text(item.slot, 40),
            label: text(item.label, 80),
            name: text(item.name, 160),
            bucket: "admissions",
            path: text(item.path, 300),
            type: text(item.type, 80),
            size: Number(item.size) || 0,
            url: `/api/media/${id}`,
          };
        })
        .filter((item): item is DocumentRecord => Boolean(item?.path))
    : [];

  const details = {
    firstName,
    lastName,
    dob,
    grade,
    previousSchool: text(body.previousSchool),
    leavingReason: text(body.leavingReason),
    tcAvailable: body.tcAvailable === "later" ? "later" : "available",
    fatherName,
    fatherQualification: text(body.fatherQualification),
    fatherOccupation: text(body.fatherOccupation),
    fatherIncome: text(body.fatherIncome),
    fatherPhone,
    fatherAadhar: text(body.fatherAadhar),
    motherName: text(body.motherName),
    motherQualification: text(body.motherQualification),
    motherOccupation: text(body.motherOccupation),
    motherIncome: text(body.motherIncome),
    motherPhone: text(body.motherPhone),
    motherAadhar: text(body.motherAadhar),
    localGuardian: Boolean(body.localGuardian),
    guardianName: text(body.guardianName),
    guardianPhone: text(body.guardianPhone),
    currentAddress,
    sameAddress: Boolean(body.sameAddress),
    permanentAddress: text(body.permanentAddress, 500),
    health: {
      medical: yesNo((body.health as Record<string, unknown> | undefined)?.medical),
      allergies: yesNo((body.health as Record<string, unknown> | undefined)?.allergies),
      support: yesNo((body.health as Record<string, unknown> | undefined)?.support),
    },
    healthNotes: text(body.healthNotes, 1000),
    referral: text(body.referral),
    sibling: text(body.sibling),
    photoConsent: Boolean(body.photoConsent),
  };

  if (!supabaseConfigured()) {
    return NextResponse.json({ stored: false, mailed: false });
  }

  const parentParts = [fatherName, details.motherName, details.localGuardian ? details.guardianName : ""].filter(Boolean);
  const supabase = getSupabase();
  const { error } = await supabase.from("applications").insert({
    kind: "application",
    parent_name: parentParts.join(" / ").slice(0, 200),
    student_name: `${firstName} ${lastName}`.slice(0, 160),
    class_name: grade,
    email: text(body.email, 160),
    phone: (fatherPhone || details.guardianPhone).slice(0, 40),
    message: `Application for ${grade}. ${details.healthNotes ? details.healthNotes.slice(0, 500) : "No health notes."}`,
    details,
    documents,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: "The application could not be saved. Call the office on the number on this page." }, { status: 503 });
  }

  return NextResponse.json({ stored: true, mailed: false });
}
