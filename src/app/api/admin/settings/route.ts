import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/admin/settings */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  for (const row of rows) settings[row.key] = row.value;

  return NextResponse.json({ data: settings });
}

/* PUT /api/admin/settings */
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const body = await req.json();

  const upsert = db.prepare(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );

  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(body)) {
      upsert.run(key, String(value));
    }
  });
  tx();

  return NextResponse.json({ success: true });
}
