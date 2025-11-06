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
    id: "coach-1",
    name: "Coach Alan",
    role: "PGA Coach",
    image: "/images/coaches/coach-1.jpg",
    bio:
      "Bob has been a PGA coach for 30 years.  He anchors on results,technique, and . Example: I focus on simple keys that travel from the bay to the course—tempo, start line, and strike. We’ll build a routine you can trust under pressure and a practice plan you’ll actually use.]",
    specialties: ["Full-swing", "Wedge play", "On-course strategy"],
  },
  {
    id: "coach-2",
    name: "Coach Two",
    role: "Performance Coach",
    image: "/images/coaches/coach-2.jpg",
    bio:
      "[Write your bio here. Mention any certifications (TPI, Trackman, etc.), your coaching philosophy, and a quick proof (handicap improvements, juniors to college, etc.).]",
    specialties: ["Putting", "Short game", "Speed training"],
  },
  {
    id: "coach-3",
    name: "Coach Three",
    role: "Junior & Adult Programs",
    image: "/images/coaches/coach-3.jpg",
    bio:
      "[Write your bio here. Keep it human. Why you coach, what lights you up, and how you measure progress—beyond ball speed.]",
    specialties: ["Juniors", "Beginners to Break 90", "League prep"],
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

      <section className="space-y-8">
        {COACHES.map((coach) => (
          <article
            key={coach.id}
            className="rounded-2xl border border-neutral-200 bg-white/70 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 items-center">
              <div className="md:col-span-2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={coach.image}
                    alt={`${coach.name} headshot`}
                    width={960}
                    height={720}
                    className="h-full w-full object-cover"
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

                <div className="mt-6">
                  <Link
                    href="/booking"
                    className="inline-flex items-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  >
                    Work with {coach.name.split(" ")[0]}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

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
