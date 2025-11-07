// --- FILE: app/api/memberships/route.ts ---
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";        // Prisma requires Node runtime
export const dynamic = "force-dynamic"; // don't cache this route

export async function GET() {
  try {
    // In envs without a DB URL (local builds, preview w/o secrets), don't touch Prisma.
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ memberships: [] }, { status: 200 });
    }

    const memberships = await prisma.membership.findMany({
      orderBy: { priceCents: "asc" },
    });

    return NextResponse.json({ memberships }, { status: 200 });
  } catch (err) {
    console.error("[/api/memberships] error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
