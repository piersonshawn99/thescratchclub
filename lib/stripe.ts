// --- FILE: lib/stripe.ts ---
import Stripe from "stripe";

/**
 * Single Stripe instance for the whole app.
 * Always: import { stripe } from "@/lib/stripe";
 * NOTE: We do NOT throw at import time. Missing keys are warned,
 * and actual API calls will fail at runtime if unconfigured.
 */

declare global {
  // eslint-disable-next-line no-var
  var __stripe__: Stripe | undefined;
}

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // Don't crash builds; just warn. Real calls will 401 at runtime if unconfigured.
  console.warn("[stripe] STRIPE_SECRET_KEY is not set. Stripe calls will fail at runtime.");
}

export const stripe =
  globalThis.__stripe__ ??
  // It's okay to pass an empty string here; Stripe SDK defers auth until a call.
  new Stripe((secretKey as string) || "");

if (process.env.NODE_ENV !== "production") {
  globalThis.__stripe__ = stripe;
}

export type { Stripe };
