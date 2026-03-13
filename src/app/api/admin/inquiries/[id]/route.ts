import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import getDb from "@/lib/db";

/* PATCH /api/admin/inquiries/:id — mark as read/unread */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const db = getDb();

  if (typeof body.is_read === "number") {
    db.prepare("UPDATE inquiries SET is_read = ? WHERE id = ?").run(body.is_read, id);
  }

  return NextResponse.json({ success: true });
}

/* DELETE /api/admin/inquiries/:id */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM inquiries WHERE id = ?").run(id);

  return NextResponse.json({ success: true });
}
