import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/news?published=1 */
export async function GET(req: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");

  let sql = "SELECT * FROM news";
  if (published === "1") sql += " WHERE is_published = 1";
  sql += " ORDER BY published_at DESC";

  const rows = db.prepare(sql).all();
  return NextResponse.json({ data: rows });
}

/* POST /api/news */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const body = await req.json();
  const { title, summary, content, category, image, is_published, published_at, source_url, source_name } = body;

  if (!title || !summary) return NextResponse.json({ error: "제목과 요약을 입력해주세요." }, { status: 400 });

  const id = uuid();
  db.prepare(`
    INSERT INTO news (id, title, summary, content, category, image, is_published, published_at, source_url, source_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, title, summary, content || "", category || "", image || "", is_published !== undefined ? (is_published ? 1 : 0) : 1, published_at || new Date().toISOString().slice(0, 10), source_url || "", source_name || "");

  return NextResponse.json({ success: true, id });
}
