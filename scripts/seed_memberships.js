#!/usr/bin/env node
// Seed script for memberships. Run with: node ./scripts/seed_memberships.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const memberships = [
    { name: 'Monthly Membership', priceCents: 5000, interval: 'monthly' },
    { name: 'Annual Membership', priceCents: 50000, interval: 'yearly' },
    { name: 'Pay-as-you-go', priceCents: 1500, interval: 'one-time' },
  ];

  for (const m of memberships) {
    await prisma.membership.upsert({
      where: { name: m.name },
      update: { priceCents: m.priceCents, interval: m.interval },
      create: m,
    });
    console.log('Upserted membership:', m.name);
  }

  const all = await prisma.membership.findMany();
  console.log('Memberships in DB:', all.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
