// --- FILE: app/api/webhooks/stripe/route.ts ---
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";        // ensures Node crypto support
export const dynamic = "force-dynamic"; // webhook routes should never be cached

// Optional: respond to HEAD requests (Stripe sometimes pings this)
export async function HEAD() {
  return new Response(null, { status: 200 });
}

export async function POST(req: Request) {
  const signature = headers().get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("[stripe.webhook] signature verification failed:", err?.message || err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: Activate membership in your database
        // e.g., session.customer, session.subscription, session.client_reference_id
        break;
      }

      case "invoice.payment_failed": {
        // TODO: Flag delinquent membership or email user
        break;
      }

      case "customer.subscription.deleted": {
        // TODO: Cancel membership in your system
        break;
      }

      default: {
        // Unhandled event type is fine — just acknowledge receipt
        break;
      }
    }
  } catch (err) {
    console.error("[stripe.webhook] handler error:", err);
    // Return 200 so Stripe doesn't retry endlessly if your logic throws
    return NextResponse.json({ received: true, handled: false });
  }

  return NextResponse.json({ received: true });
}
