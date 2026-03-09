import { NextResponse } from "next/server";
import getDb from "@/lib/db";

/* GET /api/maintenance — check maintenance mode (public, no auth) */
export async function GET() {
  try {
    const db = getDb();
    const row = db.prepare("SELECT value FROM settings WHERE key = 'maintenance_mode'").get() as
      | { value: string }
      | undefined;
    return NextResponse.json({ maintenance: row?.value === "on" });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}
