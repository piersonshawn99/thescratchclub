import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const memberships = await prisma.membership.findMany({ orderBy: { priceCents: 'asc' } });
    return new Response(JSON.stringify({ memberships }), { status: 200 });
  } catch (err) {
    console.error('Error fetching memberships', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
