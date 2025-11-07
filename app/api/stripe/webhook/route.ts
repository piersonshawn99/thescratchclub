// This route was previously a duplicate webhook handler that imported Prisma and
// constructed a Stripe client at module-evaluation time, which caused build-time
// failures when environment variables weren't present and Prisma tried to run in
// an unsupported runtime. The canonical webhook handler lives at
// /app/api/webhooks/stripe/route.ts. Keep this stub here to avoid duplicate
// route collisions; it intentionally returns 404.

export async function POST() {
  return new Response(JSON.stringify({ error: 'disabled' }), { status: 404 });
}
