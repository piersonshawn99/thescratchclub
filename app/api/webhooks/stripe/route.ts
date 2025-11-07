// --- FILE: app/api/webhooks/stripe/route.ts ---
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export const config = { api: { bodyParser: false } } as const; // harmless in app router; kept for clarity


export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });


    const payload = await req.text();


    let event;
    try {
    event = await stripe.webhooks.constructEventAsync(payload, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            // TODO: mark user membership active in your DB. Example fields:
            // session.customer (string | null), session.subscription (string | null), session.client_reference_id
            break;
        }
        case "invoice.payment_failed": {
            // TODO: flag delinquent membership / email user
            break;
        }
        case "customer.subscription.deleted": {
            // TODO: cancel membership in your system
            break;
        }
        default:
            // console.log(`Unhandled event type ${event.type}`);
            break;
        }
    } catch (err) {
    console.error("Webhook handler error", err);
    return NextResponse.json({ received: true, handled: false });
    }

return NextResponse.json({ received: true });
}