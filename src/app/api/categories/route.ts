import { NextResponse } from "next/server";
import getDb from "@/lib/db";

/* GET /api/categories */
export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all();
  return NextResponse.json({ data: rows });
}
