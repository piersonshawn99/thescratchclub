// app/coaching/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coaching | The Scratch Club",
  description: "Meet our coaches — real humans who turn practice into progress.",
  openGraph: {
    title: "Coaching | The Scratch Club",
    description: "Meet our coaches — real humans who turn practice into progress.",
    type: "website",
  },
};

type Coach = {
  id: string;
  name: string;
  role?: string;
  image: string;
  bio: string;
  specialties?: string[];
  links?: { label: string; href: string }[];
};

const COACHES: Coach[] = [
  {
    id: "coach-alan",
    name: "Future PGA Coach",
    role: "Performance & Advanced Player Development",
    image: "/images/coaches/alan.jpg",
    bio: "We're seeking a high-level PGA Professional to lead advanced player development and performance training. This coach should bring proven experience working with competitive golfers—combining data-driven insight, precise swing analysis, and practical on-course strategy. If you’re passionate about turning strong swings into scoring results and thrive on helping players reach their next level, we’d love to meet you.",
    specialties: ["Elite player development", "Course management", "Performance routines", "Trackman data integration"],
  },
  {
    id: "coach-sarah",
    name: "Future LPGA / PGA Instructor",
    role: "Women & Junior Golf Development",
    image: "/images/coaches/sarah.jpg",
    bio: "We’re looking for an instructor who connects deeply with players and creates an environment of confidence and fun. Ideal candidates bring LPGA or PGA certification and a strong record of teaching women, juniors, and families. You’ll help new and returning golfers build strong fundamentals and a lifelong love for the game—right here in our community.",
    specialties: ["Women & junior development", "Beginner fundamentals", "Short game confidence", "Swing consistency"],
  },
  {
    id: "coach-mark",
    name: "Future PGA Coach",
    role: "Technology & Data-Driven Training",
    image: "/images/coaches/mark.jpg",
    bio: "We’re searching for a coach who thrives on precision and performance data. A Trackman-certified or analytics-minded PGA instructor who knows how to translate numbers into results. You’ll help golfers understand their swings through measurable feedback, efficient movement patterns, and training programs that carry from simulator to course.",
    specialties: ["Trackman data analysis", "Swing efficiency", "Performance tracking", "Advanced ball-flight control"],
  },
];

export default function CoachingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              Coaching
            </h1>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Coaching that travels from the bay to the course. Real feedback,
              real reps, real results.
            </p>
          </div>
          <Link
            href="/booking"
            className="hidden sm:inline-flex items-center rounded-xl border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            Book a session
          </Link>
        </div>
      </header>

      <p className="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
        Our coaching team blends tour-level insight with a community feel. Every
        session is built around your goals—real feedback, structured reps, and
        tools that travel from the bay to the course. Whether you're just
        finding your swing or chasing scratch, you'll train smarter and play
        better with coaches who live the game.
      </p>

      <section className="space-y-8 mt-8">
        {COACHES.map((coach) => (
          <article
            key={coach.id}
            className="rounded-2xl border border-neutral-200 bg-white/70 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 items-center">
              <div className="md:col-span-2">
                <div className="aspect-[5/4] w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={coach.image}
                    alt={`${coach.name} headshot`}
                    width={960}
                    height={720}
                    className="h-full w-full object-contain object-center"
                    priority={false}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                      {coach.name}
                    </h2>
                    {coach.role && (
                      <p className="mt-0.5 text-sm text-emerald-800">
                        {coach.role}
                      </p>
                    )}
                  </div>

                  {coach.links && coach.links.length > 0 && (
                    <div className="flex shrink-0 items-center gap-3">
                      {coach.links.map((l) => (
                        <Link
                          key={`${coach.id}-${l.href}`}
                          href={l.href}
                          className="text-sm text-emerald-800 hover:underline"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {coach.specialties && coach.specialties.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {coach.specialties.map((tag) => (
                      <li
                        key={`${coach.id}-${tag}`}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-neutral-700 leading-relaxed whitespace-pre-line">
                  {coach.bio}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-16 rounded-2xl border border-neutral-200 bg-emerald-50 p-6 text-center">
        <h3 className="text-xl font-semibold text-neutral-900">
          Interested in Coaching at The Scratch Club?
        </h3>
        <p className="mt-2 max-w-2xl mx-auto text-neutral-700">
          We’re building a team of instructors who love the game, live for
          progress, and bring out the best in every golfer they meet. If that
          sounds like you, we’d like to connect.
        </p>
        <Link
          href="/contact"
          className="inline-flex mt-4 rounded-xl bg-emerald-700 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        >
          Contact Us
        </Link>
      </div>

      <div className="sm:hidden mt-10">
        <Link
          href="/booking"
          className="block w-full text-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        >
          Book a session
        </Link>
      </div>
    </main>
  );
}
