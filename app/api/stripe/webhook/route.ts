import Stripe from 'stripe';
import prisma from '@/lib/prisma';

// @ts-ignore - runtime only; stripe types vary
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: process.env.STRIPE_API_VERSION || '2025-10-29' });

export const runtime = 'edge';

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') || '';
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  try {
    const event = stripe.webhooks.constructEvent(payload, sig, secret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchaseId = session.metadata?.purchaseId as string | undefined;
      const email = session.customer_details?.email;

      if (purchaseId) {
        // update purchase status
        await prisma.membershipPurchase.update({ where: { id: purchaseId }, data: { status: 'completed' } as any });
      }

      // Optionally create or update user record
      if (email) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (!existing) {
          await prisma.user.create({ data: { email, name: session.customer_details?.name ?? null } });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error('Stripe webhook error', err);
    return new Response(JSON.stringify({ error: 'invalid event' }), { status: 400 });
  }
}
