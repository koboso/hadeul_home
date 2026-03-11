import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/careers/:id */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM job_postings WHERE id = ?").get(id);

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

/* PUT /api/careers/:id */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const body = await req.json();
  const { title, department, job_type, location, description, requirements, is_active } = body;

  const existing = db.prepare("SELECT id FROM job_postings WHERE id = ?").get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  db.prepare(`
    UPDATE job_postings
    SET title = ?, department = ?, job_type = ?, location = ?, description = ?, requirements = ?,
        is_active = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(title, department || "", job_type || "정규직", location || "", description || "", requirements || "", is_active ? 1 : 0, id);

  return NextResponse.json({ success: true });
}

/* DELETE /api/careers/:id */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM job_postings WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
