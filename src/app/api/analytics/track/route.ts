import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

/* POST /api/analytics/track — record page view */
export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { path, referrer } = body;

    if (!path) {
      return NextResponse.json({ error: "path required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    db.prepare(
      "INSERT INTO page_views (path, referrer, user_agent, ip) VALUES (?, ?, ?, ?)"
    ).run(path, referrer || "", userAgent, ip);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "tracking failed" }, { status: 500 });
  }
}
