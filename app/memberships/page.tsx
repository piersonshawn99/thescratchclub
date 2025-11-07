import MembershipsClient from '@/components/memberships/MembershipsClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- CONFIG ---
// If you later wire Stripe/checkout, point `ctaHref` to your checkout/session route
// e.g. `/api/checkout?plan=` or an external Stripe Payment Link.
// Colors are Tailwind emerald/gold-ish that match the site palette.

type Tier = {
  id: string;
  name: string;
  tagline?: string;
  priceMonthly: number;
  priceYearly?: number; // optional discounted annual price
  cta: string;
  ctaHref: string;
  popular?: boolean;
  features: string[];
  finePrint?: string;
};

const TIERS: Tier[] = [
  {
    id: "off-peak",
    name: "Off‑Peak",
    tagline: "Weekdays, late nights—quiet time to grind",
    priceMonthly: 99,
    priceYearly: 999,
    cta: "Get Off‑Peak",
    ctaHref: "/checkout?plan=off-peak",
    features: [
      "Access to Trackman bays during off‑peak hours",
      "Member rates on practice balls (included in sim)",
      "Basic performance tracking",
      "Bring 1 guest at member rate",
    ],
    finePrint: "Off‑peak hours posted in app and may vary seasonally.",
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Most popular—day, evening, and weekend access",
    priceMonthly: 179,
    priceYearly: 1799,
    cta: "Get Standard",
    ctaHref: "/checkout?plan=standard",
    popular: true,
    features: [
      "Prime + off‑peak hour access",
      "Advanced performance tracking & session history",
      "2 free guest passes / mo",
      "Member pricing on leagues & clinics",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Priority booking, premium perks",
    priceMonthly: 279,
    priceYearly: 2799,
    cta: "Get VIP",
    ctaHref: "/checkout?plan=vip",
    features: [
      "Priority booking window",
      "Unlimited off‑peak + generous prime access",
      "Coach office hours access",
      "3 free guest passes / mo",
      "Merch discount & free grip changes (2/yr)",
    ],
  },
  {
    id: "founders",
    name: "Founders Club",
    tagline: "Limited—lifetime perks for early believers",
    priceMonthly: 0,
    priceYearly: undefined,
    cta: "Apply for Founders",
    ctaHref: "/founders",
    features: [
      "Name on Founders wall",
      "VIP booking priority",
      "Exclusive events + early league invites",
      "Special rates for family add‑ons",
    ],
    finePrint: "Invite-only. Limited quantity.",
  },
];

export const metadata = {
  title: "Memberships | The Scratch Club",
  description: "Train Smarter. Play Better. Choose an indoor golf membership tier that fits your game.",
};

export default function MembershipsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <MembershipsClient />
    </main>
  );
}

function Price({ annual, monthly, yearly }: { annual: boolean; monthly: number; yearly?: number }) {
  if (annual && yearly) {
    return (
      <div className="text-right">
        <div className="text-2xl font-semibold text-neutral-900">${yearly}<span className="text-sm text-neutral-500">/yr</span></div>
        <div className="text-xs text-emerald-700">Save vs monthly</div>
      </div>
    );
  }
  return (
    <div className="text-right">
      <div className="text-2xl font-semibold text-neutral-900">${monthly}<span className="text-sm text-neutral-500">/mo</span></div>
    </div>
  );
}

function BannerCTA({ title, body, href, button }: { title: string; body: string; href: string; button: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-medium text-neutral-900">{title}</div>
          <p className="text-sm text-neutral-700">{body}</p>
        </div>
        <Link href={href} className="shrink-0">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">{button}</Button>
        </Link>
      </div>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-medium text-neutral-900">{q}</dt>
      <dd className="mt-1 text-neutral-700 text-sm">{a}</dd>
    </div>
  );
}
