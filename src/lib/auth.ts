import { NextRequest } from "next/server";
import crypto from "crypto";

const ADMIN_USER = process.env.ADMIN_USER || "hadeul";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hadeul2026@!";

/** Generate a session token from username + password */
export function generateToken(username: string, password: string): string | null {
  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) return null;
  const secret = ADMIN_PASSWORD + ADMIN_USER;
  return crypto.createHmac("sha256", secret).update(username).digest("hex");
}

/** Validate Bearer token from request */
export function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const expected = crypto
    .createHmac("sha256", ADMIN_PASSWORD + ADMIN_USER)
    .update(ADMIN_USER)
    .digest("hex");
  return token === expected;
}
