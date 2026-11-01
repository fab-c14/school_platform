import { NextResponse } from "next/server";
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

  return NextResponse.redirect(publicObjectUrl(String(data.bucket), String(data.path)));
}
