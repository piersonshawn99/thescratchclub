import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trackman Bays | The Scratch Club",
  description:
    "4 Trackman iO bays powered by radar, infrared, and high-speed imaging. Real data. Real improvement. Real results on the course.",
  openGraph: {
    title: "Trackman Bays | The Scratch Club",
    description:
      "4 Trackman iO bays powered by radar, infrared, and high-speed imaging. Real data. Real improvement. Real results on the course.",
    type: "website",
  },
};

const DATA_POINTS = [
  {
    stat: "Ball Speed",
    description:
      "How fast the ball leaves the face. The single biggest driver of distance — and the first thing to optimize.",
    icon: "💨",
  },
  {
    stat: "Club Path",
    description:
      "The direction the clubhead is traveling at impact. This tells you exactly why the ball curves — and how to fix it.",
    icon: "🎯",
  },
  {
    stat: "Face Angle",
    description:
      "Where your clubface is pointing when it strikes the ball. The #1 factor in starting direction.",
    icon: "📐",
  },
  {
    stat: "Spin Rate & Axis",
    description:
      "How much the ball is spinning and in which direction. Explains hooks, slices, and why some shots balloon.",
    icon: "🌀",
  },
  {
    stat: "Launch Angle",
    description:
      "The angle the ball launches off the face. Too low or too high costs you distance and consistency.",
    icon: "📈",
  },
  {
    stat: "Smash Factor",
    description:
      "How efficiently you're transferring energy from club to ball. A number coaches use to measure pure contact quality.",
    icon: "⚡",
  },
];

const SESSION_STEPS = [
  {
    step: "01",
    title: "Walk In & Warm Up",
    body: "Your bay is reserved and ready. Scan in with the app, tee it up on real turf, and start swinging. No waiting, no crowds — just you and the screen.",
  },
  {
    step: "02",
    title: "Every Shot, Measured",
    body: "The moment you make contact, Trackman captures 26+ data points. Ball speed, spin, path, face angle — all on screen in real time. You'll know more about that shot than you ever have before.",
  },
  {
    step: "03",
    title: "See the Clubface at Impact",
    body: "High-speed imaging captures your clubhead striking the ball at the exact moment of impact. You'll see things you've never been able to see — face angle, contact point, path — all in slow motion.",
  },
  {
    step: "04",
    title: "Understand the Pattern",
    body: "One shot is interesting. Ten shots is a pattern. Trackman shows you your tendencies so you stop guessing and start fixing the right thing.",
  },
  {
    step: "05",
    title: "Review & Take It Outside",
    body: "Your session data is saved in the app. Review it later, share it with your coach, and watch your numbers improve over time. What you train here shows up on the course.",
  },
];

const BAY_FEATURES = [
  {
    title: "4 Private Bays",
    body: "Four fully equipped Trackman iO bays — each with its own screen, real turf hitting surface, and ceiling-mounted sensor. Members can reserve any bay through the app.",
    icon: "🏌️",
  },
  {
    title: "Real Turf Surface",
    body: "Hit off real turf, not a mat. Your body learns the correct mechanics and builds genuine muscle memory — the kind that holds up when you step on the first tee.",
    icon: "🌿",
  },
  {
    title: "Ceiling-Mounted Trackman iO",
    body: "The sensor is out of your way and out of your head. No tripods, no setup — just walk in and swing. The iO captures your data from above with zero interference.",
    icon: "📡",
  },
  {
    title: "Members: 5am–1am Access",
    body: "Members get extended hours — early mornings before work, late nights after dinner. Your schedule shouldn't decide how often you practice.",
    icon: "🕐",
  },
];

export default function TrackmanBaysPage() {
  return (
    <main className="pb-24">

      {/* Hero */}
      <section className="relative bg-neutral-950 text-white overflow-hidden">
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-neutral-900 to-neutral-950 opacity-90" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            4 Trackman iO Bays · Hamburg, MI
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            This Isn&apos;t Just a Simulator.{" "}
            <span className="text-emerald-400">It&apos;s Where Your Game Changes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            Powered by Trackman iO — the same technology used by tour players and their coaches — our bays give you real data on every swing. Not estimates. Not approximations. Actual numbers that explain exactly what your club and ball are doing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://portal.trackmangolf.com"
              target="_blank"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              Book a Bay
            </Link>
            <Link
              href="/memberships"
              className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore Memberships
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Bay features */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            The Bays
          </h2>
          <p className="mt-2 text-neutral-500 max-w-2xl">
            Four private, fully equipped Trackman bays — each one built to give you the best possible practice environment.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {BAY_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholder image band */}
        <section className="mt-16 rounded-3xl bg-neutral-100 border border-neutral-200 overflow-hidden">
          <div className="h-72 flex items-center justify-center text-neutral-400">
            <div className="text-center">
              <div className="text-5xl mb-3">📸</div>
              <p className="text-sm font-medium">Bay photos coming soon</p>
              <p className="text-xs mt-1">Your actual space — real turf, real screens, real Trackman</p>
            </div>
          </div>
        </section>

        {/* What a session looks like */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            What a Session Looks Like
          </h2>
          <p className="mt-2 text-neutral-500 max-w-2xl">
            From the moment you walk in to reviewing your data later — here&apos;s what to expect.
          </p>

          <div className="mt-8 space-y-4">
            {SESSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The data */}
        <section className="mt-16">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 text-white p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 mb-6">
              📊 26+ data points per swing
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Know Exactly What Your Club and Ball Are Doing
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
              Most golfers spend years guessing why their shots go wrong. Trackman ends the guessing. Every swing gives you real numbers — and real numbers lead to real fixes.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DATA_POINTS.map((point) => (
                <div
                  key={point.stat}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-2xl mb-2">{point.icon}</div>
                  <div className="font-semibold text-white">{point.stat}</div>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Turf & Muscle Memory */}
        <section className="mt-16 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Real Turf. Real Muscle Memory.
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              There&apos;s a reason we use real turf instead of mats. When you hit off a mat, your body gets away with mistakes — the mat slides under the club and hides fat shots. Real turf doesn&apos;t lie.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Hitting off real turf trains your body to strike the ball first, then the ground — the same way you&apos;d play on a real course. Your mechanics improve because they have to. And that improvement sticks.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Muscle memory isn&apos;t built in one session — it&apos;s built through consistent, correct repetition. The more you train here, the more your body knows what to do when it matters.
            </p>
          </div>
          <div className="rounded-3xl bg-neutral-100 border border-neutral-200 h-72 flex items-center justify-center text-neutral-400">
            <div className="text-center">
              <div className="text-5xl mb-3">🌿</div>
              <p className="text-sm font-medium">Turf photo coming soon</p>
            </div>
          </div>
        </section>

        {/* How coaches use it */}
        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            How Our Coaches Use Trackman
          </h2>
          <p className="mt-4 text-neutral-700 leading-relaxed max-w-3xl">
            A good coach watches you swing and gives you a feel. A great coach watches you swing, looks at your data, and gives you the one change that fixes three things at once.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-neutral-900">Spot the Pattern</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Your coach sees your numbers across multiple shots and identifies the root cause — not just the symptom. No more band-aid fixes.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-neutral-900">Give You One Cue</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Too many swing thoughts wreck your game. Your coach uses the data to find the single adjustment that moves the needle — and lets you feel it work immediately.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold text-neutral-900">Track Your Progress</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Session data is saved. Your coach can compare your numbers week over week — seeing real improvement in the data, not just feeling it.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/coaching"
              className="inline-flex items-center rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-medium text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              Meet our coaches →
            </Link>
          </div>
        </section>

        {/* The App */}
        <section className="mt-16 grid gap-8 lg:grid-cols-2 items-center">
          <div className="rounded-3xl bg-neutral-100 border border-neutral-200 h-72 flex items-center justify-center text-neutral-400 order-last lg:order-first">
            <div className="text-center">
              <div className="text-5xl mb-3">📱</div>
              <p className="text-sm font-medium">App screenshot coming soon</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              The App: Your Game, In Your Pocket
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              The Trackman app is where your practice life lives. Book your bay, review your session data, track your progress over time, and share stats with your coach — all from your phone.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Reserve any of our 4 bays from anywhere",
                "Review every shot from your last session",
                "Track key stats over weeks and months",
                "Share your data directly with your coach",
                "Unlock your door with Bluetooth on arrival",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="mt-0.5 text-emerald-500 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* App store buttons */}
            <div className="mt-8">
              <p className="text-xs text-neutral-500 mb-3 font-medium uppercase tracking-widest">
                Download before your first visit
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://apps.apple.com/us/app/trackman-golf/id1245413916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-black px-4 py-2.5 text-white hover:bg-neutral-800 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none opacity-70">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=dk.Trackman.Range"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-black px-4 py-2.5 text-white hover:bg-neutral-800 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18-2.61-2.62-10.85 9.66zM.53 1.6C.2 1.96 0 2.5 0 3.22v17.56c0 .72.2 1.26.54 1.62l.08.08 9.84-9.84v-.23L.61 1.52l-.08.08zM20.8 10.7l-2.79-1.61-2.93 2.93 2.93 2.93 2.8-1.61c.8-.46.8-1.21-.01-1.64zM3.18.24l12.47 7.18-2.61 2.62L2.19.38C2.5.2 2.88.07 3.18.24z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none opacity-70">Get it on</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Club Fittings */}
        <section className="mt-16 rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700 mb-4">
                🏌️ Coming Soon
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Club Fittings
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                The right clubs make a real difference — and Trackman data makes fittings more accurate than anything else available. We&apos;re partnering with a premier pro shop group to offer full club fittings right here in the bays.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                A proper fitting uses your actual swing data — ball speed, launch angle, spin rate, path — to match you with equipment built for how you actually swing. Not how you wish you swung.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Iron gapping using real launch data",
                  "Driver fitting for maximum distance and accuracy",
                  "Shaft flex and weight matched to your swing speed",
                  "Equipment recommendations backed by numbers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                    <span className="mt-0.5 text-amber-500 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/contact?interest=club-fitting"
                  className="inline-flex items-center rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Join the interest list →
                </Link>
              </div>
            </div>
            <div className="bg-neutral-50 border-l border-neutral-200 flex items-center justify-center p-10 min-h-64">
              <div className="text-center text-neutral-400">
                <div className="text-5xl mb-3">🏷️</div>
                <p className="text-sm font-medium">Pro shop partner coming soon</p>
                <p className="text-xs mt-1 max-w-48 mx-auto">
                  We&apos;re partnering with a premier equipment brand to bring full fittings to the bays
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The payoff */}
        <section className="mt-16 text-center rounded-3xl border border-neutral-800 bg-neutral-950 text-white p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
            Everything You Practice Here Shows Up Out There
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-white/70 leading-relaxed">
            The goal was never to be good in the bay. It was always to play better golf on the course. Trackman data turns practice time into progress — and progress into lower scores.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="https://portal.trackmangolf.com"
              target="_blank"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Book a Bay
            </Link>
            <Link
              href="/memberships"
              className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Memberships
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/40">
            Powered by Trackman iO · Radar + Infrared + High-Speed Imaging ·{" "}
            <a
              href="https://www.trackman.com/golf/launch-monitors/trackman-io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/60"
            >
              Learn about the technology
            </a>
          </p>
        </section>

      </div>
    </main>
  );
}