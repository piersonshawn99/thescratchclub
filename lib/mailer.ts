// lib/mailer.ts
import nodemailer from "nodemailer";
import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const TO = process.env.CONTACT_TO!;                       // required
const FROM = process.env.CONTACT_FROM || "noreply@scratchclub.app";

const RESEND_KEY = process.env.RESEND_API_KEY;            // optional
const SMTP_HOST = process.env.SMTP_HOST;                  // optional
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

export async function sendContact(payload: ContactPayload) {
  // 1) Prefer Resend if configured
    if (RESEND_KEY) {
    const resend = new Resend(RESEND_KEY);
    const { error } = await resend.emails.send({
        from: FROM,
        to: [TO],
        subject: `New contact form: ${payload.name}`,
        html: renderHtml(payload),
        reply_to: payload.email,   // <-- change this line
        });
    if (error) throw new Error(error.message);
    return { ok: true as const, provider: "resend" as const };
    }

  // 2) Fallback to SMTP (Office 365)
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject: `New contact form: ${payload.name}`,
      html: renderHtml(payload),
      replyTo: payload.email,
    });

    return { ok: true as const, provider: "smtp" as const };
  }

  throw new Error("No email provider configured. Set RESEND_API_KEY or SMTP_* env vars.");
}

function renderHtml({ name, email, phone, message }: ContactPayload) {
  const esc = (s: string) =>
    s.replaceAll("&", "&amp;")
     .replaceAll("<", "&lt;")
     .replaceAll(">", "&gt;")
     .replaceAll('"', "&quot;")
     .replaceAll("'", "&#039;");

  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5;padding:12px">
      <h2 style="margin:0 0 12px">The Scratch Club — Contact Form</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,Menlo,Consolas,monospace">${esc(message)}</pre>
      <hr style="margin:16px 0" />
      <p style="font-size:12px;color:#667">Time: ${new Date().toLocaleString()}</p>
    </div>
  `;
}
