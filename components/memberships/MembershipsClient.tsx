"use client";
import Link from "next/link";
import { useState } from "react";
import { PLANS, TERMS, Term, membershipDestination } from "@/lib/membership-config";

export default function MembershipsClient() {
  const [term, setTerm] = useState<Term>("3");
  const flexible = term === "flex";
  return (
    <div className="min-h-screen bg-[#F8F5EC] text-[#143029]">
      <section className="bg-[#143029] px-5 py-16 text-center text-[#F8F5EC] sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DBB158]">The Pursuit of Better Golf</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl sm:text-6xl">Find Your Place at The Scratch Club</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#F8F5EC]/85 sm:text-lg">Practice With Purpose. Play With Confidence.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16" aria-labelledby="plans-title">
        <div className="text-center">
          <h2 id="plans-title" className="font-serif text-3xl sm:text-4xl">Choose Your Membership</h2>
          <p className="mt-3 text-[#143029]/75">Three ways to pursue better golf.</p>
        </div>
        <fieldset className="mx-auto mt-9 max-w-3xl">
          <legend className="mb-3 text-center text-sm font-semibold">Membership term</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {TERMS.map((option) => (
              <label key={option.id} className={`cursor-pointer rounded-md border px-4 py-3 text-sm font-medium focus-within:ring-2 focus-within:ring-[#143029] focus-within:ring-offset-2 ${term === option.id ? "border-[#143029] bg-[#143029] text-white" : "border-[#143029]/30 bg-white text-[#143029]"}`}>
                <input type="radio" name="membership-term" className="sr-only" value={option.id} checked={term === option.id} onChange={() => setTerm(option.id)} />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <article key={plan.id} className={`flex flex-col border bg-white p-7 shadow-sm ${plan.popular ? "border-[#B48A39] md:-translate-y-2" : "border-[#143029]/15"}`}>
              <div className="min-h-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#846321]">{plan.popular ? "Most Popular" : "\u00a0"}</div>
              <h3 className="mt-3 font-serif text-3xl">{plan.name}</h3>
              <p className="mt-2 text-sm font-semibold">{plan.tagline}</p>
              <p className="mt-4 min-h-16 text-sm leading-6 text-[#143029]/75">{plan.description}</p>
              <p className="mt-7 font-serif text-4xl" aria-label={`${flexible ? plan.flexible : plan.commitment} dollars per month`}>${flexible ? plan.flexible : plan.commitment}<span className="ml-1 font-sans text-sm text-[#143029]/70">/ month</span></p>
              <p className="mt-2 text-xs text-[#143029]/70">{flexible ? "Flexible monthly" : `${term}-month commitment`}</p>
              <Link href={membershipDestination(plan.id, term)} className="mt-8 block bg-[#143029] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#285247] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143029]">Inquire About {plan.name}</Link>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-6 text-[#143029]/75">Commitment membership pricing is the same monthly rate for 3-, 6-, and 12-month terms. Membership inclusions and purchase links will be confirmed before online enrollment opens.</p>
        <div className="mt-16 border-t border-[#143029]/20 pt-10 text-center">
          <h2 className="font-serif text-3xl">A Club Built Around Better Golf</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#143029]/80">Purposeful practice, Trackman feedback, coaching pathways, and a community of golfers who share the pursuit of improvement.</p>
          <Link href="/contact?interest=membership" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">Questions about membership? Contact us</Link>
        </div>
      </section>
    </div>
  );
}
