// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — The Scratch Club",
  description:
    "The story, mission, and people behind The Scratch Club — a locally owned, technology-forward golf club built on community, coaching, and measurable progress.",
  openGraph: {
    title: "About — The Scratch Club",
    description:
      "The story, mission, and people behind The Scratch Club — locally owned, tech-forward, community-driven.",
    type: "website",
    url: "https://scratchclubgolf.com/about",
    images: [
      {
        url: "/og/about.png",
        width: 1200,
        height: 630,
        alt: "The Scratch Club — About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — The Scratch Club",
    description:
      "Locally owned, tech-forward, community-driven golf club in Livingston County.",
    images: ["/og/about.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-medium tracking-wide text-emerald-700">Locally owned in Livingston County</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">About The Scratch Club</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-600">
          We’re building a place where golfers of every level can train smarter, play better, and belong — year‑round.
        </p>
      </section>

      {/* Founders */}
      <section className="mt-16 grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200">
          {/* PLACE IMAGE FILES IN /public/images/about/  */}
          {/* Example path: /public/images/about/founders.jpg */}
          <Image
            src="/images/about/founders.jpg"
            alt="Julie and Shawn Pierson standing together by the water — the founders of The Scratch Club"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Meet the Founders</h2>
          <p className="text-neutral-700">
            We’re Julie &amp; Shawn Pierson. Golf has been our shared language for growth — a mix of patience, feedback,
            and a little healthy competition. The Scratch Club is our way of giving that back to the community we love.
          </p>
          <div className="grid gap-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <h3 className="font-medium">Julie Pierson</h3>
              <p className="mt-2 text-neutral-700">
                Connection and hospitality are Julie’s superpowers. She makes sure the space feels personal and welcoming —
                from your first visit to your favorite league night.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <h3 className="font-medium">Shawn Pierson</h3>
              <p className="mt-2 text-neutral-700">
                [Short credential line: e.g., “Decades in business leadership, lifelong student of performance and applied learning.”]
                Around here, that means simple systems, measurable progress, and coaches who actually coach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why we built this */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Why We Built This</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <ValueCard title="Train Smarter" desc="Data should remove guesswork. Every swing tells a story — we help you read it and improve faster." />
          <ValueCard title="Play Better" desc="Serious tech, relaxed vibe. Practice that feels like play keeps you coming back (and getting better)." />
          <ValueCard title="Belong Here" desc="This is a community, not a lab. From first‑timers to scratch, everyone’s progress matters." />
        </div>
      </section>

      {/* Mission */}
      <section className="mt-16 rounded-2xl bg-emerald-50 p-8 ring-1 ring-emerald-100">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="mt-3 max-w-3xl text-neutral-800">
          Make golf more accessible, personal, and rewarding by blending world‑class technology with real human coaching and a
          community that roots for each other.
        </p>
      </section>

      {/* Community / Local */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Community First</h2>
        <p className="mt-3 max-w-3xl text-neutral-700">
          We’re proud to build The Scratch Club right here in Livingston County. We partner with local coaches, support local
          events, and keep our doors open to players of every level — juniors, weekend warriors, and
          those chasing their personal best.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">1</span>
            <span>Year‑round leagues and skills challenges</span>
          </li>
          <li className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">2</span>
            <span>Coaching that meets you where you are</span>
          </li>
          <li className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">3</span>
            <span>Tech that makes progress visible and fun</span>
          </li>
          <li className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">4</span>
            <span>Locally owned & operated</span>
          </li>
        </ul>
      </section>

      {/* Credibility strip (optional logos) */}
      <section className="mt-16 border-t border-neutral-200 pt-10">
        <p className="text-sm uppercase tracking-wider text-neutral-500">Proud to work with</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-80">
          {/* Replace with small monochrome logo svgs if desired */}
          <span className="text-neutral-500">Trackman</span>
          <span className="text-neutral-500">Local PGA Coaches</span>
          <span className="text-neutral-500">Community Partners</span>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-2xl bg-neutral-50 p-8 ring-1 ring-neutral-200">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Train Smarter = Play Better</h2>
            <p className="mt-2 max-w-2xl text-neutral-700">
              Come see the space, hit a few balls, and talk goals with us. First session’s about clarity.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/booking" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700">
              Book a Visit
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-neutral-900 hover:bg-neutral-50">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-neutral-700">{desc}</p>
    </div>
  );
}
