export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContact } from "@/lib/mailer";

const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  // honeypot field (bot trap). Add a hidden input named "company" in the form if desired.
  company: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    // very light anti-spam: if honeypot present and filled, drop
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    await sendContact({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      message: parsed.data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
