import prisma from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { membershipId, email } = body;
    if (!membershipId) return new Response(JSON.stringify({ error: 'missing membershipId' }), { status: 400 });

    const membership = await prisma.membership.findUnique({ where: { id: membershipId } });
    if (!membership) return new Response(JSON.stringify({ error: 'membership not found' }), { status: 404 });

    // Find or create user by email when provided
    let user = null;
    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({ data: { email, name: null } });
      }
    }

    // Create a pending purchase record (userId optional)
    const purchase = await prisma.membershipPurchase.create({
      // cast to any because generated Prisma types will be in sync after running `prisma generate`
      data: ({
        userId: user?.id,
        membershipId: membership.id,
        status: 'pending',
      } as any),
    });

    // Build Checkout session
    const successUrl = process.env.MEMBERSHIP_SUCCESS_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/membership/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = process.env.MEMBERSHIP_CANCEL_URL || (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/membership/cancel';

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: membership.name },
            unit_amount: membership.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: { purchaseId: purchase.id, membershipId: membership.id, email: email ?? '' },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

  // Attach stripe session id to the purchase
  await prisma.membershipPurchase.update({ where: { id: purchase.id }, data: { stripeSessionId: session.id } });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    console.error('Checkout error', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
