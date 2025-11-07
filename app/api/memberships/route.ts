import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Guard: during local builds or environments without a database URL set,
    // avoid initializing Prisma which would throw. Return an empty list so the
    // build can proceed. In production (with DATABASE_URL set) this will hit
    // the real database.
    if (!process.env.DATABASE_URL) {
      return new Response(JSON.stringify({ memberships: [] }), { status: 200 });
    }
    const memberships = await prisma.membership.findMany({ orderBy: { priceCents: 'asc' } });
    return new Response(JSON.stringify({ memberships }), { status: 200 });
  } catch (err) {
    console.error('Error fetching memberships', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
