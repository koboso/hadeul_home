import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/news/:id */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM news WHERE id = ?").get(id);

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

/* PUT /api/news/:id */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const body = await req.json();
  const { title, summary, content, category, image, is_published, published_at, source_url, source_name } = body;

  const existing = db.prepare("SELECT id FROM news WHERE id = ?").get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  db.prepare(`
    UPDATE news
    SET title = ?, summary = ?, content = ?, category = ?, image = ?,
        is_published = ?, published_at = ?, source_url = ?, source_name = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(title, summary, content || "", category || "", image || "", is_published ? 1 : 0, published_at || new Date().toISOString().slice(0, 10), source_url || "", source_name || "", id);

  return NextResponse.json({ success: true });
}

/* DELETE /api/news/:id */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM news WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
