import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  passwordMatches,
  sessionCookieOptions,
} from "@/lib/auth";

const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.reset > now && current.count >= 8) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a minute and try again." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password ?? "");
  } catch {
    password = "";
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: "Admin login is not configured on this server." },
      { status: 500 },
    );
  }

  if (!passwordMatches(password)) {
    const prev = current && current.reset > now ? current : { count: 0, reset: now + 60_000 };
    attempts.set(ip, { count: prev.count + 1, reset: prev.reset });
    return NextResponse.json({ error: "That password is not right." }, { status: 401 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}
