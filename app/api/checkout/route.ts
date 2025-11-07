// --- FILE: app/api/checkout/route.ts ---
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRICE_MAP: Record<string, string | undefined> = {
  "off-peak": process.env.STRIPE_PRICE_OFFPEAK,
  standard: process.env.STRIPE_PRICE_STANDARD,
  vip: process.env.STRIPE_PRICE_VIP,
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const priceId = PRICE_MAP[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url:
        process.env.STRIPE_SUCCESS_URL ||
        `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        process.env.STRIPE_CANCEL_URL || `${origin}/memberships`,
      // Optionally set client_reference_id or customer_email if you have them
      // client_reference_id: userId
      // customer_email: userEmail
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
