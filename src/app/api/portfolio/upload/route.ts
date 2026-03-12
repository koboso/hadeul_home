import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "portfolio");

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "파일을 선택해주세요." }, { status: 400 });
  }

  // Validate file type
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/webm"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "JPG, PNG, WebP, GIF, WebM 파일만 업로드 가능합니다." }, { status: 400 });
  }

  // Max 20MB for video, 5MB for images
  const maxSize = file.type.startsWith("video/") ? 60 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: `파일 크기는 최대 ${file.type.startsWith("video/") ? "60" : "5"}MB입니다.` }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${uuid()}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const url = `/uploads/portfolio/${filename}`;
  return NextResponse.json({ success: true, url });
}
