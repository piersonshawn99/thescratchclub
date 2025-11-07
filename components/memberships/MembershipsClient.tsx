"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

type PlanId = "off-peak" | "standard" | "vip";
type TierId = PlanId | "founders";

type Tier = {
  id: TierId;
  name: string;
  tagline?: string;
  priceMonthly: number;
  priceYearly?: number;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  features: string[];
  finePrint?: string;
};

const TIERS: Tier[] = [
  {
    id: "off-peak",
    name: "Off-Peak",
    tagline: "Weekdays, late nights—quiet time to grind",
    priceMonthly: 99,
    priceYearly: 999,
    cta: "Get Off-Peak",
    ctaHref: "/checkout?plan=off-peak",
    features: [
      "Access to Trackman bays during off-peak hours",
      "Member rates on practice balls (included in sim)",
      "Basic performance tracking",
      "Bring 1 guest at member rate",
    ],
    finePrint: "Off-peak hours posted in app and may vary seasonally.",
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
      "Prime + off-peak hour access",
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
      "Unlimited off-peak + generous prime access",
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
      "Special rates for family add-ons",
    ],
    finePrint: "Invite-only. Limited quantity.",
  },
];

export default function MembershipsClient() {
  const [annual, setAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const tiers = useMemo(() => TIERS, []);

  async function startCheckout(plan: PlanId) {
    try {
      setLoadingPlan(plan);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const { error } = (await res.json().catch(() => null)) || {};
        throw new Error(error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url; // redirect to Stripe
    } catch (e) {
      console.error("[checkout] error:", e);
      alert(e instanceof Error ? e.message : "We couldn’t start checkout. Please try again.");
      setLoadingPlan(null);
    }
  }

  return (
    <main>
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Memberships now open
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
          Train Smarter. <span className="text-emerald-700">Play Better.</span>
        </h1>
        <p className="mt-3 text-neutral-600 max-w-2xl mx-auto">
          Pick the tier that fits your rhythm—casual reps, after-work rounds, or all-in performance. Upgrade anytime.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-2 py-1">
          <button
            onClick={() => setAnnual(false)}
            className={`px-3 py-1.5 rounded-full text-sm ${!annual ? "bg-emerald-600 text-white" : "text-neutral-700"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-3 py-1.5 rounded-full text-sm ${annual ? "bg-emerald-600 text-white" : "text-neutral-700"}`}
          >
            Annual <span className="ml-1 opacity-75">(save)</span>
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => {
          const isFounders = tier.id === "founders";
          const isLoading = loadingPlan === tier.id;

          return (
            <div
              key={tier.id}
              className={`relative flex flex-col border border-neutral-200 rounded-2xl bg-white ${tier.popular ? "ring-2 ring-emerald-600" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white shadow">
                  Most Popular
                </div>
              )}

              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{tier.name}</div>
                    {tier.tagline && <p className="mt-1 text-sm text-neutral-600">{tier.tagline}</p>}
                  </div>
                  <Price annual={annual} monthly={tier.priceMonthly} yearly={tier.priceYearly} />
                </div>
              </div>

              <div className="p-4 mt-auto">
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  {tier.features.map((f, i) => (
                    <li key={i} className="text-sm text-neutral-700">
                      {f}
                    </li>
                  ))}
                </ul>
                {tier.finePrint && <p className="mt-3 text-xs text-neutral-500">{tier.finePrint}</p>}
              </div>

              <div className="p-4">
                {isFounders ? (
                  <Link href={tier.ctaHref} className="w-full">
                    <PrimaryButton className="w-full">{tier.cta}</PrimaryButton>
                  </Link>
                ) : (
                  <PrimaryButton
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => startCheckout(tier.id as PlanId)}
                    aria-busy={isLoading}
                  >
                    {isLoading ? "Starting checkout..." : tier.cta}
                  </PrimaryButton>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        <BannerCTA
          title="Just looking to try it?"
          body="Grab a day pass or book a bay à la carte."
          href="/booking"
          button="Book a Bay"
        />
        <BannerCTA
          title="Questions before joining?"
          body="Ping us and we’ll help match the right tier."
          href="/contact"
          button="Contact Us"
        />
        <BannerCTA
          title="Team, league, or corporate?"
          body="We’ll tailor a package for your crew."
          href="/leagues"
          button="Leagues & Events"
        />
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Membership FAQ</h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          <QA q="Can I upgrade or downgrade later?" a="Yes. You can change tiers anytime; proration applies based on your billing cycle." />
          <QA q="How do guests work?" a="Each tier includes guest allowances; beyond that, guests are welcome at the member guest rate." />
          <QA q="Do sessions expire?" a="Unused included hours (if any) don’t roll over, but you can always book at member rates." />
          <QA q="Coaching add-ons?" a="Yes—book 1:1 coaching or clinics at member pricing. VIP includes office hours access." />
        </dl>
      </section>
    </main>
  );
}

function Price({ annual, monthly, yearly }: { annual: boolean; monthly: number; yearly?: number }) {
  if (annual && yearly) {
    return (
      <div className="text-right">
        <div className="text-2xl font-semibold text-neutral-900">
          ${yearly}
          <span className="text-sm text-neutral-500">/yr</span>
        </div>
        <div className="text-xs text-emerald-700">Save vs monthly</div>
      </div>
    );
  }
  return (
    <div className="text-right">
      <div className="text-2xl font-semibold text-neutral-900">
        ${monthly}
        <span className="text-sm text-neutral-500">/mo</span>
      </div>
    </div>
  );
}

function BannerCTA({
  title,
  body,
  href,
  button,
}: {
  title: string;
  body: string;
  href: string;
  button: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-medium text-neutral-900">{title}</div>
          <p className="text-sm text-neutral-700">{body}</p>
        </div>
        <Link href={href} className="shrink-0">
          <PrimaryButton>{button}</PrimaryButton>
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

/** Minimal local button (replaces shadcn/ui import) */
function PrimaryButton({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        "bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none " +
        className
      }
      {...props}
    />
  );
}
