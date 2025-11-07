export const metadata = {
  title: "Golf + Life | The Scratch Club",
  description:
    "Protect what matters most — relationships, time, and money — while you improve your game year-round at The Scratch Club.",
};

export default function GolfLifePage() {
  return (
    <div className="bg-white text-neutral-800">
      {/* Hero Section */}
      <section id="hero" className="text-center py-20 bg-emerald-700 text-white">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Golf + Life: Protect What Matters Most
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          You shouldn’t have to choose between improving your game and living your life. At
          <span className="font-semibold"> The Scratch Club</span>, golf fits your world — not the other way around.
        </p>
        <a
          href="/memberships"
          className="inline-block bg-amber-400 text-emerald-950 font-semibold py-3 px-6 rounded-xl shadow hover:bg-amber-300 active:translate-y-px transition"
        >
          Explore Memberships
        </a>
      </section>

      {/* Solutions Grid */}
      <section
        id="solutions"
        className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {[
          {
            id: "relationships",
            title: "Relationships",
            headline: "Golf that connects — not conflicts",
            pain: "Most golfers lose time with the people who matter.",
            solution: [
              "Couples Nights, Parent–Child Scrambles, and Leagues built for connection.",
              "Practice becomes shared time, not solo time.",
              "Golf strengthens relationships when it’s built into your rhythm — not competing with it.",
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
              "Focused, efficient sessions mean more improvement in less time — and still home for dinner.",
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
        ].map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition bg-white"
          >
            <p className="text-xs uppercase tracking-widest text-emerald-700/80 mb-2">
              {item.title}
            </p>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2 leading-snug">
              {item.headline}
            </h2>
            <p className="text-neutral-600 italic mb-4">{item.pain}</p>
            <ul className="list-disc list-inside space-y-2">
              {item.solution.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Promise Section */}
      <section id="promise" className="text-center py-16 bg-neutral-100">
        <h2 className="text-3xl font-semibold text-emerald-700 mb-4">
          The Scratch Club Promise
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Protect your priorities — Relationships. Time. Money. Play smarter, live better, and
          get scratch-ready.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/memberships"
            className="inline-block bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-emerald-800 active:translate-y-px transition"
          >
            Join Now
          </a>
          <a
            href="/coaching"
            className="inline-block border border-emerald-700 text-emerald-800 font-semibold py-3 px-6 rounded-xl hover:bg-emerald-50 active:translate-y-px transition"
          >
            Explore Coaching
          </a>
        </div>
      </section>
    </div>
  );
}
