// --- FILE: lib/stripe.ts ---
import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
	if (_stripe) return _stripe;
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) {
		// Avoid constructing the Stripe client at build-time when env vars aren't set
		// (Next.js collects page data during build). Throwing here would break builds
		// if env vars are missing, so instead delay the throw until runtime when
		// the endpoint is actually invoked.
		throw new Error("STRIPE_SECRET_KEY is not configured");
	}
	_stripe = new Stripe(key, { apiVersion: "2024-06-20" } as any);
	return _stripe;
}
