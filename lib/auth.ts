import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "xyz_admin";

const WEEK = 60 * 60 * 24 * 7;

function secret() {
  return process.env.AUTH_SECRET ?? "";
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("AUTH_SECRET is not set.");
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + WEEK * 1000 }),
  ).toString("base64url");
  const sig = createHmac("sha256", key).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token?: string | null) {
  const key = secret();
  if (!key || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", key).update(payload).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      exp?: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: WEEK,
};
