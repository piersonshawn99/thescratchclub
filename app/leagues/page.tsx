// File: app/leagues/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function LeaguesPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/leagues-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Thanks! We'll email you as soon as leagues open.");
        setName("");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Could not submit right now. Try again later.");
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Replace the src below with your AI-rendered image once exported to /public/images/leagues-hero.jpg */}
          <Image
            src="/images/leagues-hero.jpg"
            alt="Multiple indoor golf simulator bays in use by 4‑person teams"
            fill
            priority
            // show the top of the image (faces) by anchoring the object position to the top
            className="object-cover object-top"
          />
          {/* Emerald brand overlay for consistency */}
          <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/90 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl text-white drop-shadow-md">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Golf’s more fun with a little competition.</h1>
            <p className="mt-4 text-lg sm:text-xl text-white/90">
              Stay tuned for upcoming league announcements. Want first dibs when leagues open? Drop your name below.
            </p>
          </div>
        </div>
      </section>

      {/* Interest form / content band */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">Get on the list</h2>
                <p className="mt-2 text-neutral-600">
                  We’ll email you league formats, schedules, and early-bird pricing as soon as we launch.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Smith"
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-60"
                  >
                    {status === "loading" ? "Submitting…" : "Notify me"}
                  </button>

                  {status !== "idle" && (
                    <p className={`text-sm mt-2 ${status === "success" ? "text-emerald-700" : status === "error" ? "text-red-600" : "text-neutral-600"}`}>
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* “What we’re planning” card to tease formats without locking in */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold tracking-tight">What we’re planning</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Social League", desc: "9‑hole weekly rounds, rotating partners, easy vibe." },
                  { title: "Competitive League", desc: "Handicap‑based matches, standings, playoffs." },
                  { title: "Skills League", desc: "Trackman Combine / Approach / Long Drive points." },
                  { title: "Corporate League", desc: "Company teams, weekday evenings, networking." },
                  { title: "Couples / Mixed", desc: "Two‑person teams, best ball or alt‑shot." },
                  { title: "Junior / Family", desc: "Shorter formats, coaching‑friendly scoring." },
                ].map((item) => (
                  <li key={item.title} className="rounded-2xl border border-neutral-200 p-4 shadow-sm">
                    <div className="font-medium">{item.title}</div>
                    <div className="mt-1 text-sm text-neutral-600">{item.desc}</div>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-neutral-500">
                Formats subject to change based on interest. Tell us what you’d like to play when you sign up.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}