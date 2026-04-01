"use client";
import Link from "next/link";
import { useState } from "react";

type PlanId = "off-peak" | "standard" | "vip";
type CommitmentMonths = 3 | 6 | 12;

type CommitmentOption = {
  months: CommitmentMonths;
  totalPrice: number;
  badge?: string;
};

type Tier = {
  id: PlanId;
  name: string;
  tagline?: string;
  regularMonthly: number;
  includedHoursMonthly: number;
  overageRate: number;
  features: string[];
  popular?: boolean;
  commitments: CommitmentOption[];
  finePrint?: string;
};

const WALK_IN_RATE = 55;
const MEMBERSHIPS_OPEN =
  process.env.NEXT_PUBLIC_MEMBERSHIPS_OPEN === "true";

const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none";

const TIERS: Tier[] = [
  {
    id: "off-peak",
    name: "Off-Peak",
    tagline: "Weekdays, late nights—quiet time to grind",
    regularMonthly: 129,
    includedHoursMonthly: 4,
    overageRate: 45,
    commitments: [
      { months: 3, totalPrice: 349 },
      { months: 6, totalPrice: 675 },
      { months: 12, totalPrice: 1315, badge: "Best Value" },
    ],
    features: [
      "4 included off-peak hours per month",
      "Additional off-peak hours at $45/hr",
      "Basic performance tracking",
      "Bring 1 guest at member rate",
    ],
    finePrint: "Off-peak hours posted in app and may vary seasonally.",
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Most popular—day, evening, and weekend access",
    regularMonthly: 239,
    includedHoursMonthly: 6,
    overageRate: 40,
    commitments: [
      { months: 3, totalPrice: 645 },
      { months: 6, totalPrice: 1245 },
      { months: 12, totalPrice: 2395, badge: "Best Value" },
    ],
    popular: true,
    features: [
      "6 included hours per month",
      "Additional member hours at $40/hr",
      "Advanced performance tracking & session history",
      "2 guest passes per month",
      "Member pricing on leagues & clinics",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Priority booking, premium perks",
    regularMonthly: 369,
    includedHoursMonthly: 8,
    overageRate: 35,
    commitments: [
      { months: 3, totalPrice: 995 },
      { months: 6, totalPrice: 1925 },
      { months: 12, totalPrice: 3695, badge: "Best Value" },
    ],
    features: [
      "8 included hours per month",
      "Additional member hours at $35/hr",
      "Priority booking window",
      "Coach office hours access",
      "3 guest passes per month",
      "Merch discount & free grip changes (2/yr)",
    ],
  },
];

const FOUNDERS_CLUB = {
  name: "Founders Club",
  price: 7500,
  tagline: "Exclusive one-time lifetime membership",
  cta: "Request Founders Access",
  ctaHref: "/contact?interest=founders-club",
  features: [
    "One-time lifetime membership",
    "VIP booking priority",
    "Name on the Founders wall",
    "Exclusive events + early league invites",
    "Special rates for family add-ons",
  ],
  finePrint: "Limited quantity.",
};

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function commitmentHref(plan: PlanId, months: CommitmentMonths) {
  if (!MEMBERSHIPS_OPEN) {
    return `/contact?interest=membership&plan=${encodeURIComponent(
      plan
    )}&term=${months}`;
  }
  return `/checkout?plan=${encodeURIComponent(plan)}&term=${months}`;
}

export default function MembershipsClient() {
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(8);
  const [compareMonths, setCompareMonths] = useState<CommitmentMonths>(12);

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero / intro */}
        <section className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Founding Member Pricing • Limited launch spots available
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Train Smarter.{" "}
            <span className="text-emerald-700">Play Better.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
            Choose the membership that fits your game, compare it against
            walk-in pricing, and explore our limited{" "}
            <a
              href="#founders-club"
              className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
            >
              Founders Club lifetime option
            </a>{" "}
            below.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-500">
              Not ready to commit? Use the “Book a Bay” button to reserve a walk-in bay at $55/hr.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-xs text-neutral-500">
            Founding Member pricing requires a prepaid 3, 6, or 12 month
            commitment. Longer commitments receive the strongest discount.
          </p>
        </section>

        {/* Membership vs Walk-In */}
        <SavingsSection
          hoursPerMonth={hoursPerMonth}
          setHoursPerMonth={setHoursPerMonth}
          compareMonths={compareMonths}
          setCompareMonths={setCompareMonths}
          tiers={TIERS}
          walkInRate={WALK_IN_RATE}
        />

        {/* Membership cards */}
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border border-neutral-200 bg-white ${
                tier.popular ? "ring-2 ring-emerald-600" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white shadow">
                  Most Popular
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-neutral-900">
                      {tier.name}
                    </div>
                    {tier.tagline && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {tier.tagline}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-neutral-500">
                      Public walk-in
                    </div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {formatCurrency(WALK_IN_RATE)}
                      <span className="text-sm font-normal text-neutral-500">
                        /hr
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                  <div className="text-sm font-medium text-emerald-900">
                    Founding Member commitment options
                  </div>

                  <div className="mt-3 space-y-3">
                    {tier.commitments.map((option) => {
                      const equivalentMonthly = Math.round(
                        option.totalPrice / option.months
                      );

                      return (
                        <div
                          key={option.months}
                          className="rounded-xl border border-neutral-200 bg-white p-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-neutral-900">
                                  {option.months}-Month Commitment
                                </span>
                                {option.badge && (
                                  <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[11px] font-medium text-neutral-950">
                                    {option.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-neutral-500">
                                About {formatCurrency(equivalentMonthly)}/mo
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-semibold text-neutral-900">
                                {formatCurrency(option.totalPrice)}
                              </div>
                              <div className="text-xs text-emerald-700">
                                paid up front
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-neutral-600">
                            <div className="rounded-lg bg-neutral-50 px-3 py-2">
                              <span className="font-medium text-neutral-900">
                                Included:
                              </span>{" "}
                              {tier.includedHoursMonthly} hrs/mo
                            </div>
                            <div className="rounded-lg bg-neutral-50 px-3 py-2">
                              <span className="font-medium text-neutral-900">
                                Extra hours:
                              </span>{" "}
                              {formatCurrency(tier.overageRate)}/hr
                            </div>
                          </div>

                          <div className="mt-3">
                            <Link
                              href={commitmentHref(tier.id, option.months)}
                              className={`${BUTTON_CLASSES} w-full`}
                            >
                              {MEMBERSHIPS_OPEN
                                ? `Choose ${option.months} Months`
                                : `Request ${option.months}-Month Pricing`}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <ul className="mt-5 space-y-2 pl-5 text-sm text-neutral-700">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="list-disc">
                      {feature}
                    </li>
                  ))}
                </ul>

                {tier.finePrint && (
                  <p className="mt-4 text-xs text-neutral-500">
                    {tier.finePrint}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Founders Club */}
        <section
          id="founders-club"
          className="mt-14 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 text-white shadow-xl"
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-neutral-950">
                Exclusive lifetime offer
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                {FOUNDERS_CLUB.name}
              </h2>

              <p className="mt-3 max-w-2xl text-lg text-white/85">
                {FOUNDERS_CLUB.tagline}
              </p>

              <div className="mt-6 flex items-end gap-3">
                <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {formatCurrency(FOUNDERS_CLUB.price)}
                </div>
                <div className="pb-1 text-sm uppercase tracking-[0.16em] text-amber-300">
                  one-time
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {FOUNDERS_CLUB.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <span className="mt-2 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-amber-300" />
                    <span className="leading-7">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-white/65">
                {FOUNDERS_CLUB.finePrint}
              </p>
            </div>

            <div className="flex flex-col justify-between bg-white/5 p-8 sm:p-10 lg:p-12">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">
                  Designed for early believers
                </div>
                <p className="mt-4 text-base leading-7 text-white/85">
                  Founders Club is separate from recurring memberships. It is a
                  premium lifetime membership for those who want to lock in a
                  long-term place in The Scratch Club from day one.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={FOUNDERS_CLUB.ctaHref}
                  className="inline-flex w-full items-center justify-center rounded-md bg-amber-300 px-5 py-3 text-sm font-medium text-neutral-950 hover:bg-amber-200"
                >
                  {FOUNDERS_CLUB.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Banners */}
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

        {/* FAQ */}
        <section className="mt-16 border-t border-neutral-200 pt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Membership FAQ
          </h2>
          <dl className="mt-6 grid gap-6 md:grid-cols-2">
            <QA
              q="Do I have to commit up front?"
              a="Yes. Founding Member pricing is offered as prepaid 3, 6, or 12 month commitments."
            />
            <QA
              q="How do included hours work?"
              a="Each membership includes a set number of hours per month. If you book beyond those included hours, additional time is billed at your tier’s discounted member rate."
            />
            <QA
              q="What if I use more hours than my membership includes?"
              a="You can keep booking additional time at your plan’s discounted member rate. Public walk-in pricing is $55/hr."
            />
            <QA
              q="What is Founders Club?"
              a="Founders Club is a separate one-time lifetime membership with premium priority, recognition, and exclusive perks."
            />
          </dl>
        </section>
      </div>
    </main>
  );
}

function SavingsSection({
  hoursPerMonth,
  setHoursPerMonth,
  compareMonths,
  setCompareMonths,
  tiers,
  walkInRate,
}: {
  hoursPerMonth: number;
  setHoursPerMonth: (v: number) => void;
  compareMonths: CommitmentMonths;
  setCompareMonths: (v: CommitmentMonths) => void;
  tiers: Tier[];
  walkInRate: number;
}) {
  const walkInTotal = hoursPerMonth * walkInRate * compareMonths;
  const hrsPerWeek = (hoursPerMonth / 4).toFixed(1);

  const rows = tiers.map((tier) => {
    const selectedCommitment = tier.commitments.find(
      (c) => c.months === compareMonths
    )!;

    const extraHoursPerMonth = Math.max(
      hoursPerMonth - tier.includedHoursMonthly,
      0
    );

    const extraHoursTotal = extraHoursPerMonth * compareMonths;
    const overageCost = extraHoursTotal * tier.overageRate;
    const membershipTotal = selectedCommitment.totalPrice + overageCost;
    const savings = Math.max(walkInTotal - membershipTotal, 0);
    const equivalentMonthly = Math.round(membershipTotal / compareMonths);

    return {
      tier: tier.name,
      includedHoursMonthly: tier.includedHoursMonthly,
      extraHoursPerMonth,
      membershipTotal,
      equivalentMonthly,
      savings,
    };
  });

  return (
    <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Compare Membership to Walk-In
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            See how founding member pricing compares to paying the public
            walk-in rate. This calculator includes your monthly included hours
            plus any additional hours at your tier’s discounted member rate.
          </p>
        </div>

        <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
          {[3, 6, 12].map((months) => (
            <button
              key={months}
              onClick={() => setCompareMonths(months as CommitmentMonths)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                compareMonths === months
                  ? "bg-emerald-600 text-white"
                  : "text-neutral-700"
              }`}
            >
              {months} Months
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label htmlFor="hours" className="text-sm text-neutral-700">
          Hours / month
        </label>
        <input
          id="hours"
          type="range"
          min={4}
          max={20}
          step={1}
          value={hoursPerMonth}
          onChange={(e) => setHoursPerMonth(Number(e.target.value))}
          className="w-56 accent-emerald-600"
          aria-label="Hours per month"
        />
        <div className="w-10 text-right text-sm font-medium tabular-nums text-neutral-900">
          {hoursPerMonth}
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-600">
        Walk-in at {formatCurrency(walkInRate)}/hr × {hoursPerMonth} hrs/mo for{" "}
        {compareMonths} months (~{hrsPerWeek} hrs/wk) ={" "}
        <span className="font-medium">{formatCurrency(walkInTotal)}</span>.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-700">
            <tr>
              <th className="p-3 text-left">Tier</th>
              <th className="p-3 text-left">Included Hrs / mo</th>
              <th className="p-3 text-left">Extra Hrs / mo</th>
              <th className="p-3 text-left">Member Total</th>
              <th className="p-3 text-left">Effective / mo</th>
              <th className="p-3 text-left">Savings vs Walk-In</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tier} className="border-t border-neutral-200">
                <td className="p-3">{row.tier}</td>
                <td className="p-3">{row.includedHoursMonthly}</td>
                <td className="p-3">{row.extraHoursPerMonth}</td>
                <td className="p-3">{formatCurrency(row.membershipTotal)}</td>
                <td className="p-3">{formatCurrency(row.equivalentMonthly)}</td>
                <td className="p-3 font-medium text-emerald-700">
                  {formatCurrency(row.savings)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-900">
        <p className="text-sm">
          <span className="font-medium">Bottom line:</span> This comparison
          assumes your included hours are used first, and any additional hours
          are billed at your plan’s discounted member rate.
        </p>
      </div>
    </section>
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
        <Link href={href} className={`${BUTTON_CLASSES} shrink-0`}>
          {button}
        </Link>
      </div>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-medium text-neutral-900">{q}</dt>
      <dd className="mt-1 text-sm text-neutral-700">{a}</dd>
    </div>
  );
}