// --- FILE: lib/stripe.ts ---
import Stripe from "stripe";

/**
 * IMPORTANT:
 * - Keep this file ONLY for initializing and exporting a single Stripe instance.
 * - Do NOT create a new Stripe() anywhere else in the codebase.
 * - Always `import { stripe } from "@/lib/stripe";`
 */

// Memoize across hot-reloads in dev so we don’t create multiple clients.
declare global {
  // eslint-disable-next-line no-var
  var __stripe__: Stripe | undefined;
}

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV === "production") {
  // In production we want this to fail fast if misconfigured.
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Set it in your Vercel Environment Variables."
  );
} else if (!secretKey) {
  // During local dev it’s helpful to warn instead of crashing immediately.
  console.warn("[stripe] STRIPE_SECRET_KEY is not set (using undefined).");
}

export const stripe =
  globalThis.__stripe__ ??
  new Stripe((secretKey as string) || "", {
    apiVersion: "2024-06-20",
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__stripe__ = stripe;
}

// Optional helper if you want a safe getter for the webhook secret elsewhere.
export function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing STRIPE_WEBHOOK_SECRET. Set it in your Vercel Environment Variables."
    );
  }
  return (secret as string) || "";
}

export type { Stripe };
