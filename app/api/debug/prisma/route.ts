import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  // Protect this route: only enable when PRISMA_DEBUG=true in env
  if (process.env.PRISMA_DEBUG !== 'true') {
    return new Response(JSON.stringify({ error: 'disabled' }), { status: 403 });
  }

  try {
    const memberships = await prisma.membership.findMany({ orderBy: { createdAt: 'desc' } });
    const usersCount = await prisma.user.count();
    return new Response(JSON.stringify({ memberships, usersCount }), { status: 200 });
  } catch (err) {
    console.error('Prisma debug error', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  // Allow creating a membership via POST body { name, priceCents, interval }
  if (process.env.PRISMA_DEBUG !== 'true') {
    return new Response(JSON.stringify({ error: 'disabled' }), { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, priceCents, interval } = body;
    if (!name || !priceCents) {
      return new Response(JSON.stringify({ error: 'invalid' }), { status: 400 });
    }
    const membership = await prisma.membership.create({ data: { name, priceCents: Number(priceCents), interval: interval ?? 'one-time' } });
    return new Response(JSON.stringify({ membership }), { status: 201 });
  } catch (err) {
    console.error('Prisma debug POST error', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
