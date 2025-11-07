#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.membership.count();
  console.log('memberships count:', count);
  if (count === 0) {
    console.error('No memberships found');
    process.exit(2);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
