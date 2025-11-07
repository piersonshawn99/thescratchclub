
// ----------------------------------------------
// File: app/api/leagues-interest/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email || typeof name !== "string" || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Basic email sanity check (keep it light; rely on client + ESP later)
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // If Resend env vars exist, send an email to your inbox
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.LEAGUE_SIGNUPS_TO; // e.g., "leagues@thescratchclub.com"
    const FROM = process.env.LEAGUE_SIGNUPS_FROM || "Scratch Club <no-reply@sc-mails.thescratchclub.com>";

    if (RESEND_API_KEY && TO) {
      // Lazy inline call to Resend to avoid adding SDK
      const body = {
        from: FROM,
        to: [TO],
        subject: "New League Interest",
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      };

      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!r.ok) {
        const text = await r.text();
        console.error("Resend error:", text);
        // Fall through to a 202 so users aren't blocked if email vendor is cranky
      }
    } else {
      console.log("[League Interest]", { name, email });
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ----------------------------------------------
// Notes
// 1) Place your AI image at: public/images/leagues-hero.jpg
//    Alt text: "Multiple indoor golf simulator bays in use by 4‑person teams."
// 2) ENV needed (set in Vercel):
//    RESEND_API_KEY=... (optional; logs instead if missing)
//    LEAGUE_SIGNUPS_TO=leagues@thescratchclub.com
//    LEAGUE_SIGNUPS_FROM=Scratch Club <no-reply@sc-mails.thescratchclub.com>
// 3) The page intentionally lists league ideas without locking formats. When you're ready,
//    we can split by league type with separate signup intents + waitlists.
