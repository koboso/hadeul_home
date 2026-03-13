import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import getDb from "@/lib/db";

/* GET /api/admin/inquiries — list all inquiries */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const isRead = searchParams.get("is_read");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 50));
  const offset = (page - 1) * limit;

  const db = getDb();

  let where = "";
  const params: (string | number)[] = [];
  if (isRead === "0" || isRead === "1") {
    where = "WHERE is_read = ?";
    params.push(Number(isRead));
  }

  const total = (db.prepare(`SELECT COUNT(*) as cnt FROM inquiries ${where}`).get(...params) as { cnt: number }).cnt;
  const rows = db.prepare(`SELECT * FROM inquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);
  const unreadCount = (db.prepare("SELECT COUNT(*) as cnt FROM inquiries WHERE is_read = 0").get() as { cnt: number }).cnt;

  return NextResponse.json({ data: rows, total, unreadCount, page, limit });
}
