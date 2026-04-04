export const metadata = {
  title: "Golf + Life | The Scratch Club",
  description:
    "Protect what matters most — relationships, time, and money — while you improve your game year-round at The Scratch Club.",
};

const items = [
  {
    id: "relationships",
    title: "Relationships",
    headline: "Golf that connects — not conflicts",
    pain: "Most golfers lose time with the people who matter.",
    solution: [
      "Couples Nights, Parent–Child Scrambles, and leagues built for connection.",
      "Practice becomes shared time, not solo time.",
      "Golf strengthens relationships when it fits your rhythm — not fights against it.",
    ],
  },
  {
    id: "time",
    title: "Time",
    headline: "Your most valuable resource — used wisely",
    pain: "Golf shouldn’t steal your evenings or weekends.",
    solution: [
      "Play 18 holes in 45 minutes.",
      "No waiting, no lost balls, no weather delays.",
      "Focused sessions mean more improvement in less time — and still home for dinner.",
    ],
  },
  {
    id: "money",
    title: "Money",
    headline: "Spend smart. Play better.",
    pain: "Traditional golf is expensive — especially when you don’t get better.",
    solution: [
      "Simulator training turns guesswork into progress.",
      "Every round becomes data-driven practice that pays off outdoors.",
      "Stop gambling on your game. Start investing in it.",
    ],
  },
  {
    id: "coaching",
    title: "Growth Through Coaching",
    headline: "Every great player has a coach.",
    pain: "Most golfers hit a plateau and never break through.",
    solution: [
      "Personalized coaching for your goals and learning style.",
      "Real feedback, real progress — not just range time.",
      "Coaching builds skill, confidence, and consistency for life.",
    ],
  },
  {
    id: "professional-edge",
    title: "The Professional Edge",
    headline: "Golf better. Lead better. Live better.",
    pain: "Business success often happens off the clock.",
    solution: [
      "Golf sharpens patience, composure, and trust — traits that close deals.",
      "Coaching elevates both your performance and your presence.",
      "When golf improves, everything you touch gains polish.",
    ],
  },
];

function LifeCard({
  title,
  headline,
  pain,
  solution,
}: {
  title: string;
  headline: string;
  pain: string;
  solution: string[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-700/80">
        {title}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-emerald-800 leading-snug">
        {headline}
      </h2>
      <p className="mt-3 text-lg italic text-neutral-600">{pain}</p>
      <ul className="mt-6 space-y-3 text-neutral-700">
        {solution.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-600" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GolfLifePage() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Hero */}
      <section className="bg-emerald-700 px-6 pb-16 pt-24 text-white md:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-100/90">
            Golf + Life
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Protect What Matters Most
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-white/90 sm:text-xl">
            You shouldn’t have to choose between improving your game and living
            your life. At <span className="font-semibold">The Scratch Club</span>,
            golf fits your world — not the other way around.
          </p>
          <div className="mt-8">
            <a
              href="/memberships"
              className="inline-flex items-center rounded-xl bg-amber-400 px-6 py-3 font-semibold text-emerald-950 shadow hover:bg-amber-300 active:translate-y-px transition"
            >
              Explore Memberships
            </a>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <LifeCard
              key={item.id}
              title={item.title}
              headline={item.headline}
              pain={item.pain}
              solution={item.solution}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-2">
          {items.slice(3).map((item) => (
            <LifeCard
              key={item.id}
              title={item.title}
              headline={item.headline}
              pain={item.pain}
              solution={item.solution}
            />
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="bg-neutral-100 px-6 py-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-emerald-800">
            The Scratch Club Promise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
            Protect your priorities — relationships, time, and money. Play
            smarter, live better, and get scratch-ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/memberships"
              className="inline-flex items-center rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-800 active:translate-y-px transition"
            >
              Join Now
            </a>
            <a
              href="/coaching"
              className="inline-flex items-center rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-50 active:translate-y-px transition"
            >
              Explore Coaching
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}