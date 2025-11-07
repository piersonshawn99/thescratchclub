// --- FILE: lib/stripe.ts ---
import Stripe from "stripe";

/**
 * Single Stripe instance for the whole app.
 * Always: import { stripe } from "@/lib/stripe";
 */

declare global {
  // eslint-disable-next-line no-var
  var __stripe__: Stripe | undefined;
}

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV === "production") {
  throw new Error("Missing STRIPE_SECRET_KEY. Set it in your Vercel Environment Variables.");
} else if (!secretKey) {
  console.warn("[stripe] STRIPE_SECRET_KEY is not set (using undefined).");
}

export const stripe =
  globalThis.__stripe__ ??
  new Stripe((secretKey as string) || "");

if (process.env.NODE_ENV !== "production") {
  globalThis.__stripe__ = stripe;
}

// Optional helper
export function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET. Set it in your Vercel Environment Variables.");
  }
  return (secret as string) || "";
}

export type { Stripe };
