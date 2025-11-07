import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

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

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL || `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${origin}/memberships`,
      subscription_data: {},
    } as any);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("/api/checkout", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
