// --- FILE: app/api/portal/route.ts ---
// OPTIONAL: if you later store the Stripe customer ID, you can offer a self-serve portal.
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export async function POST(req: NextRequest) {
try {
const { customerId } = await req.json();
if (!customerId) return NextResponse.json({ error: "Missing customerId" }, { status: 400 });


const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


const portal = await stripe.billingPortal.sessions.create({
customer: customerId,
return_url: `${origin}/account`,
});


return NextResponse.json({ url: portal.url });
} catch (err: any) {
console.error("/api/portal", err);
return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
}
}