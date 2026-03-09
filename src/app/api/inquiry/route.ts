import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Rate Limiting (in-memory, per IP) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // max requests
const RATE_WINDOW = 60 * 60 * 1000; // per 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ─── POST /api/inquiry ─── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, type, message, _hp } = body;

    // 1. Honeypot check — bots fill hidden fields
    if (_hp) {
      // Pretend success to not tip off the bot
      return NextResponse.json({ success: true });
    }

    // 2. Rate limit check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "너무 많은 요청입니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    // 3. Validation
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "내용이 너무 깁니다. (최대 5000자)" },
        { status: 400 }
      );
    }

    const typeLabels: Record<string, string> = {
      project: "프로젝트 문의",
      partnership: "파트너십",
      careers: "채용 문의",
      other: "기타",
    };

    // 4. Send email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HADEUL 문의" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.INQUIRY_TO || "ydg@hadeul.com",
      replyTo: email,
      subject: `[문의] ${typeLabels[type] || type} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px;">
            새로운 문의가 접수되었습니다
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 120px;">문의 유형</td>
              <td style="padding: 10px;">${typeLabels[type] || type}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">이름 / 회사</td>
              <td style="padding: 10px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">이메일</td>
              <td style="padding: 10px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">내용</h3>
            <p style="color: #555; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #999; font-size: 12px;">
            발신: HADEUL 웹사이트 문의 폼 | IP: ${ip}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
