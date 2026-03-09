import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/portfolio?category=slug&featured=1 */
export async function GET(req: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let sql = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM portfolio p
    JOIN categories c ON p.category_id = c.id
  `;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (category && category !== "all") {
    conditions.push("c.slug = ?");
    params.push(category);
  }
  if (featured === "1") {
    conditions.push("p.is_featured = 1");
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY p.sort_order ASC, p.created_at DESC";

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
  const { category_id, client, title, description, detail, image, year, month, is_featured, sort_order } = body;

  if (!category_id || !client || !title || !description) {
    return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, category_id, client, title, description, detail || "", image || "", year || 0, month || 0, is_featured ? 1 : 0, sort_order || 0);

  return NextResponse.json({ success: true, id });
}
