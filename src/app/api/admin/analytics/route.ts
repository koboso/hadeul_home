import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { checkAuth } from "@/lib/auth";

/* GET /api/admin/analytics?days=7 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") || "7");

  // Total views
  const total = db.prepare(
    "SELECT COUNT(*) as cnt FROM page_views WHERE created_at >= datetime('now', ?)"
  ).get(`-${days} days`) as { cnt: number };

  // Views by day
  const byDay = db.prepare(`
    SELECT date(created_at) as date, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', ?)
    GROUP BY date(created_at)
    ORDER BY date ASC
  `).all(`-${days} days`) as { date: string; views: number }[];

  // Views by page
  const byPage = db.prepare(`
    SELECT path, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', ?)
    GROUP BY path
    ORDER BY views DESC
    LIMIT 20
  `).all(`-${days} days`) as { path: string; views: number }[];

  // Today vs yesterday
  const today = db.prepare(
    "SELECT COUNT(*) as cnt FROM page_views WHERE date(created_at) = date('now')"
  ).get() as { cnt: number };

  const yesterday = db.prepare(
    "SELECT COUNT(*) as cnt FROM page_views WHERE date(created_at) = date('now', '-1 day')"
  ).get() as { cnt: number };

  // Unique IPs (approximate visitors)
  const uniqueVisitors = db.prepare(`
    SELECT COUNT(DISTINCT ip) as cnt
    FROM page_views
    WHERE created_at >= datetime('now', ?)
  `).get(`-${days} days`) as { cnt: number };

  // Top referrers
  const topReferrers = db.prepare(`
    SELECT referrer, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', ?) AND referrer != ''
    GROUP BY referrer
    ORDER BY views DESC
    LIMIT 10
  `).all(`-${days} days`) as { referrer: string; views: number }[];

  return NextResponse.json({
    data: {
      total: total.cnt,
      today: today.cnt,
      yesterday: yesterday.cnt,
      uniqueVisitors: uniqueVisitors.cnt,
      byDay,
      byPage,
      topReferrers,
    },
  });
}
