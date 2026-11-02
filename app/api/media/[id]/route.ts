import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getSupabase, publicObjectUrl, supabaseConfigured } from "@/lib/supabase";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id) || !supabaseConfigured()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const supabase = getSupabase();
  const { data } = await supabase.from("documents").select("bucket,path").eq("id", id).maybeSingle();
  if (!data?.bucket || !data.path) return new NextResponse("Not found", { status: 404 });

  // Identity papers are kept in a private bucket. Only a signed-in office user
  // can open them, and the link expires shortly after it is created.
  if (data.bucket === "admissions") {
    const jar = await cookies();
    if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) {
      return new NextResponse("Not found", { status: 404 });
    }
    const signed = await supabase.storage.from(String(data.bucket)).createSignedUrl(String(data.path), 300);
    if (signed.error || !signed.data?.signedUrl) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.redirect(signed.data.signedUrl);
  }

  return NextResponse.redirect(publicObjectUrl(String(data.bucket), String(data.path)));
}
