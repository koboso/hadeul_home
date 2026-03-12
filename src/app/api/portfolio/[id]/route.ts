import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/portfolio/:id */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM portfolio p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `).get(id);

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

/* PUT /api/portfolio/:id — update */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const body = await req.json();
  const { category_id, client, title, description, detail, image, video, tech_stack, architecture, target_device } = body;

  const existing = db.prepare("SELECT id FROM portfolio WHERE id = ?").get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  db.prepare(`
    UPDATE portfolio
    SET category_id = ?, client = ?, title = ?, description = ?, detail = ?, image = ?, video = ?,
        tech_stack = ?, architecture = ?, target_device = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(category_id, client, title, description, detail || "", image || "", video || "", tech_stack || "", architecture || "", target_device || "pc", id);

  return NextResponse.json({ success: true });
}

/* DELETE /api/portfolio/:id */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM portfolio WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
