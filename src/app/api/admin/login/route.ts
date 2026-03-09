import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "계정 정보를 입력해주세요." }, { status: 400 });
  }

  const token = generateToken(username, password);
  if (!token) {
    return NextResponse.json({ error: "계정 정보가 올바르지 않습니다." }, { status: 401 });
  }

  return NextResponse.json({ success: true, token });
}
