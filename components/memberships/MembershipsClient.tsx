"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  bestFor: string;
  emoji: string;
};

const WALK_IN_RATE = 55;
const MEMBERSHIPS_OPEN = process.env.NEXT_PUBLIC_MEMBERSHIPS_OPEN === "true";

const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none transition-colors";

const TIERS: Tier[] = [
  {
    id: "off-peak",
    name: "Off-Peak",
    tagline: "Weekdays, late nights—quiet time to grind",
    bestFor: "Flexible schedule, early mornings or weekday evenings",
    emoji: "🌙",
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
    bestFor: "Golfers who want consistent weekly practice any time",
    emoji: "⛳",
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
    bestFor: "Serious golfers who want maximum time and top access",
    emoji: "🏆",
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
    return `/contact?interest=membership&plan=${encodeURIComponent(plan)}&term=${months}`;
  }
  return `/checkout?plan=${encodeURIComponent(plan)}&term=${months}`;
}

type QuizAnswers = {
  schedule: "flexible" | "anytime" | "serious" | null;
  frequency: "light" | "moderate" | "heavy" | null;
  goal: "fun" | "improve" | "compete" | null;
};

function getRecommendation(answers: QuizAnswers): PlanId | null {
  const { schedule, frequency, goal } = answers;
  if (!schedule || !frequency || !goal) return null;

  const score = { "off-peak": 0, standard: 0, vip: 0 };

  if (schedule === "flexible") score["off-peak"] += 2;
  if (schedule === "anytime") score["standard"] += 2;
  if (schedule === "serious") score["vip"] += 2;

  if (frequency === "light") score["off-peak"] += 2;
  if (frequency === "moderate") score["standard"] += 2;
  if (frequency === "heavy") score["vip"] += 2;

  if (goal === "fun") score["off-peak"] += 1;
  if (goal === "improve") score["standard"] += 2;
  if (goal === "compete") score["vip"] += 2;

  const top = (Object.keys(score) as PlanId[]).reduce((a, b) =>
    score[a] >= score[b] ? a : b
  );
  return top;
}

export default function MembershipsClient() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    schedule: null,
    frequency: null,
    goal: null,
  });
  const [quizDone, setQuizDone] = useState(false);
  const [recommended, setRecommended] = useState<PlanId | null>(null);
  const [selectedTier, setSelectedTier] = useState<PlanId>("standard");
  const [selectedMonths, setSelectedMonths] = useState<CommitmentMonths>(12);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(8);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (quizDone) {
      const rec = getRecommendation(quizAnswers);
      setRecommended(rec);
      if (rec) setSelectedTier(rec);
    }
  }, [quizDone, quizAnswers]);

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(t);
  }, [selectedTier, selectedMonths, hoursPerMonth]);

  const activeTier = TIERS.find((t) => t.id === selectedTier)!;
  const activeCommitment = activeTier.commitments.find(
    (c) => c.months === selectedMonths
  )!;

  const extraHoursPerMonth = Math.max(
    hoursPerMonth - activeTier.includedHoursMonthly,
    0
  );
  const overageCost =
    extraHoursPerMonth * selectedMonths * activeTier.overageRate;
  const memberTotal = activeCommitment.totalPrice + overageCost;
  const walkInTotal = hoursPerMonth * WALK_IN_RATE * selectedMonths;
  const savings = Math.max(walkInTotal - memberTotal, 0);
  const savingsPct =
    walkInTotal > 0 ? Math.round((savings / walkInTotal) * 100) : 0;

  function handleQuizAnswer(field: keyof QuizAnswers, value: string) {
    const updated = { ...quizAnswers, [field]: value } as QuizAnswers;
    setQuizAnswers(updated);
    if (updated.schedule && updated.frequency && updated.goal) {
      setQuizDone(true);
    }
  }

  return (
    <main className="pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="pt-10 pb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Founding Member Pricing · Limited launch spots available
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Find Your{" "}
            <span className="text-emerald-700">Perfect Membership</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-neutral-500 text-sm">
            Answer 3 quick questions and we&apos;ll point you to the right tier. Then see exactly how much you save vs. walk-in pricing.
          </p>
        </section>

        {/* Step 1: Quiz */}
        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-semibold">
              1
            </div>
            <h2 className="font-semibold text-neutral-900">Quick Fit Quiz</h2>
            {quizDone && (
              <span className="ml-auto text-sm text-emerald-700 font-medium">
                ✓ Recommendation ready
              </span>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <QuizQuestion
              label="When do you typically golf?"
              options={[
                { value: "flexible", label: "🌙 Early mornings / weekdays" },
                { value: "anytime", label: "☀️ Anytime — days & weekends" },
                { value: "serious", label: "🏆 I want priority access" },
              ]}
              selected={quizAnswers.schedule}
              onSelect={(v) => handleQuizAnswer("schedule", v)}
            />
            <QuizQuestion
              label="How many hours per month?"
              options={[
                { value: "light", label: "🏌️ 1–4 hrs (casual)" },
                { value: "moderate", label: "⛳ 5–8 hrs (regular)" },
                { value: "heavy", label: "💪 8+ hrs (serious grind)" },
              ]}
              selected={quizAnswers.frequency}
              onSelect={(v) => handleQuizAnswer("frequency", v)}
            />
            <QuizQuestion
              label="What is your main goal?"
              options={[
                { value: "fun", label: "😄 Stay in the game / have fun" },
                { value: "improve", label: "📈 Lower my handicap" },
                { value: "compete", label: "🎯 Compete & track data" },
              ]}
              selected={quizAnswers.goal}
              onSelect={(v) => handleQuizAnswer("goal", v)}
            />
          </div>

          {recommended && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm text-emerald-800 font-medium">
                  🎯 We recommend:{" "}
                  <span className="text-lg font-semibold">
                    {TIERS.find((t) => t.id === recommended)?.name}
                  </span>
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  {TIERS.find((t) => t.id === recommended)?.bestFor}
                </p>
              </div>
              <button
                onClick={() => {
                  setQuizAnswers({ schedule: null, frequency: null, goal: null });
                  setQuizDone(false);
                  setRecommended(null);
                }}
                className="ml-auto text-xs text-emerald-700 underline underline-offset-2"
              >
                Reset quiz
              </button>
            </div>
          )}
        </section>

        {/* Step 2: Tier Selector */}
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-semibold">
              2
            </div>
            <h2 className="font-semibold text-neutral-900">Choose Your Tier</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {TIERS.map((tier) => {
              const isActive = selectedTier === tier.id;
              const isRec = recommended === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                    isActive
                      ? "border-emerald-600 bg-emerald-50 shadow-md"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                  }`}
                >
                  {isRec && (
                    <span className="absolute -top-3 left-4 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-medium text-neutral-900">
                      ✓ Recommended for you
                    </span>
                  )}
                  {tier.popular && !isRec && (
                    <span className="absolute -top-3 left-4 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Most Popular
                    </span>
                  )}
                  <div className="text-2xl mb-2">{tier.emoji}</div>
                  <div className="font-semibold text-neutral-900">{tier.name}</div>
                  <p className="text-xs text-neutral-500 mt-1">{tier.tagline}</p>
                  <div className="mt-3 text-sm font-medium text-emerald-700">
                    {tier.includedHoursMonthly} hrs/mo included
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Extra hours: {formatCurrency(tier.overageRate)}/hr
                  </div>
                </button>
              );
            })}
          </div>

          {/* Commitment toggle */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">Commitment length:</span>
            <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
              {([3, 6, 12] as CommitmentMonths[]).map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedMonths(months)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedMonths === months
                      ? "bg-emerald-600 text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {months} months
                  {months === 12 && (
                    <span className="ml-1.5 text-[10px] opacity-80">best</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Prefer no commitment?{" "}
            <Link
              href="/contact?interest=membership&plan=month-to-month"
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Month-to-month is available
            </Link>{" "}
            at $129 / $239 / $369 per month depending on tier — contact us to get started.
          </p>
        </section>

        {/* Step 3: Savings Spotlight */}
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-semibold">
              3
            </div>
            <h2 className="font-semibold text-neutral-900">See Your Savings</h2>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            {/* Hours slider */}
            <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm text-neutral-700 font-medium">
                  How many hours/month will you use?
                </label>
                <div className="flex items-center gap-3 flex-1 min-w-48">
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={hoursPerMonth}
                    onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                    className="flex-1 accent-emerald-600"
                    aria-label="Hours per month"
                  />
                  <span className="w-16 text-center rounded-lg bg-neutral-100 py-1 text-sm font-semibold tabular-nums text-neutral-900">
                    {hoursPerMonth} hrs
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-600">
                Walk-in rate: {formatCurrency(WALK_IN_RATE)}/hr · That&apos;s{" "}
                {formatCurrency(hoursPerMonth * WALK_IN_RATE)}/month, or{" "}
                {formatCurrency(walkInTotal)} over {selectedMonths} months at walk-in prices.
              </p>
            </div>

            {/* Big numbers */}
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
              <div className="px-6 py-6 text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Walk-in Total
                </p>
                <p className="mt-2 text-3xl font-semibold text-neutral-800 tabular-nums">
                  {formatCurrency(walkInTotal)}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  over {selectedMonths} months
                </p>
              </div>
              <div className="px-6 py-6 text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Member Total
                </p>
                <p
                  className={`mt-2 text-3xl font-semibold text-emerald-700 tabular-nums transition-all duration-300 ${
                    animate ? "scale-110" : "scale-100"
                  }`}
                >
                  {formatCurrency(memberTotal)}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatCurrency(activeCommitment.totalPrice)} membership
                  {overageCost > 0 &&
                    ` + ${formatCurrency(overageCost)} extra hrs`}
                </p>
              </div>
              <div className="px-6 py-6 text-center bg-emerald-50">
                <p className="text-xs font-medium uppercase tracking-widest text-emerald-600">
                  You Save
                </p>
                <p
                  className={`mt-2 text-3xl font-bold text-emerald-700 tabular-nums transition-all duration-300 ${
                    animate ? "scale-110" : "scale-100"
                  }`}
                >
                  {formatCurrency(savings)}
                </p>
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  {savingsPct}% less than walk-in
                </p>
              </div>
            </div>

            {/* Summary bar */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
                <span>
                  <span className="font-medium text-neutral-900">
                    {activeTier.name}
                  </span>{" "}
                  · {selectedMonths}-month plan
                </span>
                <span>
                  <span className="font-medium text-neutral-900">
                    {activeTier.includedHoursMonthly} hrs/mo
                  </span>{" "}
                  included
                </span>
                {extraHoursPerMonth > 0 && (
                  <span>
                    <span className="font-medium text-neutral-900">
                      {extraHoursPerMonth} extra hrs/mo
                    </span>{" "}
                    @ {formatCurrency(activeTier.overageRate)}/hr
                  </span>
                )}
                <span className="ml-auto font-medium text-emerald-700">
                  ≈ {formatCurrency(Math.round(memberTotal / selectedMonths))}/mo effective
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA for selected plan */}
        <section className="mt-6 rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6 flex flex-wrap items-center gap-5">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900 text-lg">
              {activeTier.emoji} {activeTier.name} · {selectedMonths}-Month Commitment
            </p>
            <p className="text-sm text-emerald-700 mt-0.5">
              {formatCurrency(activeCommitment.totalPrice)} paid up front ·{" "}
              {activeTier.includedHoursMonthly} hrs/mo included · extra hours{" "}
              {formatCurrency(activeTier.overageRate)}/hr
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {activeTier.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-emerald-800"
                >
                  <span className="text-emerald-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              href={commitmentHref(activeTier.id, selectedMonths)}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm"
            >
              {MEMBERSHIPS_OPEN ? "Join Now" : "Request This Plan"} →
            </Link>
            <p className="text-center text-xs text-emerald-600">
              No walk-ins needed · Members only access
            </p>
          </div>
        </section>

        {/* Full tier comparison */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 mb-1">
            Compare All Tiers
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            All prices are founding member rates — locked in for your commitment period.
          </p>

          <div className="grid gap-5 lg:grid-cols-3">
            {TIERS.map((tier) => {
              const isActive = selectedTier === tier.id;
              const isRec = recommended === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col rounded-2xl border bg-white transition-all ${
                    isActive
                      ? "border-emerald-600 shadow-md ring-1 ring-emerald-600"
                      : "border-neutral-200"
                  }`}
                >
                  {isRec && !isActive && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-[11px] font-medium text-neutral-900 whitespace-nowrap">
                      Recommended for you
                    </div>
                  )}
                  {tier.popular && !isRec && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-[11px] font-medium text-white whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xl">{tier.emoji}</span>
                        <div className="mt-1 text-lg font-semibold text-neutral-900">
                          {tier.name}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {tier.tagline}
                        </p>
                      </div>
                      <div className="text-right text-xs text-neutral-400">
                        Walk-in
                        <br />
                        <span className="text-base font-semibold text-neutral-700">
                          {formatCurrency(WALK_IN_RATE)}/hr
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {tier.commitments.map((option) => {
                        const monthly = Math.round(
                          option.totalPrice / option.months
                        );
                        const isSelected =
                          isActive && selectedMonths === option.months;
                        return (
                          <button
                            key={option.months}
                            onClick={() => {
                              setSelectedTier(tier.id);
                              setSelectedMonths(option.months);
                            }}
                            className={`w-full rounded-xl border p-3 text-left transition-all ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-neutral-200 hover:border-neutral-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-neutral-900">
                                  {option.months} months
                                </span>
                                {option.badge && (
                                  <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-medium text-neutral-900">
                                    {option.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-base font-semibold text-neutral-900">
                                  {formatCurrency(option.totalPrice)}
                                </span>
                                <span className="text-xs text-neutral-400 ml-1">
                                  total
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              ≈ {formatCurrency(monthly)}/mo
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {tier.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-neutral-700"
                        >
                          <span className="mt-0.5 text-emerald-500 shrink-0">
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {tier.finePrint && (
                      <p className="mt-3 text-xs text-neutral-400">
                        {tier.finePrint}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto p-5 pt-0">
                    <Link
                      href={commitmentHref(tier.id, selectedMonths)}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`${BUTTON_CLASSES} w-full`}
                    >
                      {MEMBERSHIPS_OPEN
                        ? `Choose ${tier.name}`
                        : `Request ${tier.name}`}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
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
                  className="inline-flex w-full items-center justify-center rounded-md bg-amber-300 px-5 py-3 text-sm font-medium text-neutral-950 hover:bg-amber-200 transition-colors"
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
            body="Ping us and we'll help match the right tier."
            href="/contact"
            button="Contact Us"
          />
          <BannerCTA
            title="Team, league, or corporate?"
            body="We'll tailor a package for your crew."
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
              a="Each membership includes a set number of hours per month. If you book beyond those included hours, additional time is billed at your tier's discounted member rate."
            />
            <QA
              q="What if I use more hours than my membership includes?"
              a="You can keep booking additional time at your plan's discounted member rate. Public walk-in pricing is $55/hr."
            />
            <QA
              q="What is Founders Club?"
              a="Founders Club is a separate one-time lifetime membership with premium priority, recognition, and exclusive perks."
            />
            <QA
              q="Can I change my tier later?"
              a="Contact us and we'll work with you on upgrades. Founding Member pricing is locked for your current commitment period."
            />
            <QA
              q="Who are founding member prices for?"
              a="Anyone who joins during our launch period. These rates are lower than what future members will pay — locking them in now is the advantage."
            />
          </dl>
        </section>
      </div>
    </main>
  );
}

function QuizQuestion({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-800 mb-3">{label}</p>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
              selected === opt.value
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-300 bg-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
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