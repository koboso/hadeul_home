import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* DELETE /api/portfolio — bulk delete */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const body = await req.json();
  const { ids } = body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "삭제할 항목을 선택해주세요." }, { status: 400 });
  }

  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM portfolio WHERE id IN (${placeholders})`).run(...ids);
  return NextResponse.json({ success: true, deleted: ids.length });
}

/* GET /api/portfolio?category=slug */
export async function GET(req: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let sql = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM portfolio p
    JOIN categories c ON p.category_id = c.id
  `;
  const params: unknown[] = [];

  if (category && category !== "all") {
    sql += " WHERE c.slug = ?";
    params.push(category);
  }
  sql += " ORDER BY p.updated_at DESC";

  const rows = db.prepare(sql).all(...params);
  return NextResponse.json({ data: rows });
}

/* POST /api/portfolio — create */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const body = await req.json();
  const { category_id, client, title, description, detail, image, video, tech_stack, architecture, target_device, frame_enabled, no_image } = body;

  if (!category_id || !client || !title || !description) {
    return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO portfolio (id, category_id, client, title, description, detail, image, video, tech_stack, architecture, target_device, frame_enabled, no_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, category_id, client, title, description, detail || "", image || "", video || "", tech_stack || "", architecture || "", target_device || "pc", frame_enabled ?? 1, no_image ?? 0);

  return NextResponse.json({ success: true, id });
}
