import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import getDb from "@/lib/db";
import crypto from "crypto";

/* ─── Rate Limiting (in-memory, per IP) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

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

/* ─── Turnstile verification ─── */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip if not configured

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/* ─── POST /api/inquiry ─── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, phone, email, type, content, privacyConsent, turnstileToken, _hp } = body;

    // 1. Honeypot check
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // 2. Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "too_many_requests" },
        { status: 429 }
      );
    }

    // 3. Turnstile verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ error: "turnstile_required" }, { status: 400 });
      }
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        return NextResponse.json({ error: "turnstile_failed" }, { status: 400 });
      }
    }

    // 4. Validation
    if (!name || !email || !content) {
      return NextResponse.json({ error: "required_fields" }, { status: 400 });
    }
    if (!privacyConsent) {
      return NextResponse.json({ error: "privacy_required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (content.length > 5000) {
      return NextResponse.json({ error: "content_too_long" }, { status: 400 });
    }

    // 5. Save to DB
    const id = crypto.randomUUID();
    const db = getDb();
    db.prepare(
      `INSERT INTO inquiries (id, type, company, name, phone, email, content, privacy_agreed, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(id, type || "", company || "", name, phone || "", email, content, 1, ip);

    // 6. Send email (non-blocking — DB save is primary)
    const typeLabels: Record<string, string> = {
      project: "프로젝트 문의",
      publishing: "퍼블리싱",
      partnership: "파트너십 문의",
      careers: "채용 문의",
      other: "기타 문의",
    };

    try {
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
        to: process.env.INQUIRY_TO || "hellowordc@gmail.com",
        replyTo: email,
        subject: `[문의] ${typeLabels[type] || type || "일반"} - ${name}${company ? ` (${company})` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px;">
              새로운 문의가 접수되었습니다
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 120px;">문의 유형</td>
                <td style="padding: 10px;">${typeLabels[type] || type || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">소속</td>
                <td style="padding: 10px;">${escapeHtml(company || "-")}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">이름</td>
                <td style="padding: 10px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">연락처</td>
                <td style="padding: 10px;">${escapeHtml(phone || "-")}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">이메일</td>
                <td style="padding: 10px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
              </tr>
            </table>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">문의 내용</h3>
              <p style="color: #555; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(content)}</p>
            </div>
            <p style="color: #999; font-size: 12px;">
              발신: HADEUL 웹사이트 문의 폼 | IP: ${ip}
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Email send failed (DB save succeeded):", emailErr);
      // Don't fail — the inquiry is already saved to DB
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
