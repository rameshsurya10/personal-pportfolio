import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContact } from "@/lib/validateContact";

interface VerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) {
    // Dev mode — accept the hCaptcha test token. Production MUST set the secret.
    if (token === "10000000-aaaa-bbbb-cccc-000000000001") return true;
    return false;
  }
  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = (await res.json()) as VerifyResponse;
  return data.success === true;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, subject, message, captchaToken } = (body ?? {}) as Record<string, string>;

  // Validate the contact fields server-side too — never trust the client
  const errors = validateContact({ name, email, subject, message });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, error: "Validation failed", errors }, { status: 400 });
  }

  if (!captchaToken) {
    return NextResponse.json({ success: false, error: "Captcha required" }, { status: 400 });
  }

  const captchaOk = await verifyCaptcha(captchaToken);
  if (!captchaOk) {
    return NextResponse.json({ success: false, error: "Captcha verification failed" }, { status: 400 });
  }

  // SMTP env — required in production
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass || !to) {
    console.error("SMTP credentials missing — set SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO");
    return NextResponse.json(
      { success: false, error: "Email service not configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("SMTP send failed:", err);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
