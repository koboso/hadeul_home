import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/careers?active=1 */
export async function GET(req: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const active = searchParams.get("active");

  let sql = "SELECT * FROM job_postings";
  if (active === "1") sql += " WHERE is_active = 1";
  sql += " ORDER BY created_at DESC";

  const rows = db.prepare(sql).all();
  return NextResponse.json({ data: rows });
}

/* POST /api/careers */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const body = await req.json();
  const { title, department, job_type, location, description, requirements, is_active } = body;

  if (!title) return NextResponse.json({ error: "직무명을 입력해주세요." }, { status: 400 });

  const id = uuid();
  db.prepare(`
    INSERT INTO job_postings (id, title, department, job_type, location, description, requirements, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, title, department || "", job_type || "정규직", location || "", description || "", requirements || "", is_active !== undefined ? (is_active ? 1 : 0) : 1);

  return NextResponse.json({ success: true, id });
}
