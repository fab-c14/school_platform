import { NextResponse } from "next/server";
import { notifyOffice } from "@/lib/mail";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const parent = String(body?.parent ?? "").trim();
  const student = String(body?.student ?? "").trim();
  const className = String(body?.className ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const kind = body?.kind === "application" ? "application" : "note";

  if (parent.length < 2 || student.length < 2 || !emailPattern.test(email) || phone.replace(/\D/g, "").length < 8 || message.length < 10) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }
  if (kind === "application" && className.length < 1) {
    return NextResponse.json({ error: "Enter the class you are asking about." }, { status: 400 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json({ stored: false, mailed: false });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("applications").insert({
    kind,
    parent_name: parent.slice(0, 160),
    student_name: student.slice(0, 160),
    class_name: className.slice(0, 80),
    email: email.slice(0, 160),
    phone: phone.slice(0, 40),
    message: message.slice(0, 4000),
  });
  if (error) {
    return NextResponse.json({ error: "The office record could not be saved." }, { status: 503 });
  }

  const mail = await notifyOffice({ kind, parentName: parent, studentName: student, className, email, phone, message });
  return NextResponse.json({ stored: true, mailed: mail.sent });
}
