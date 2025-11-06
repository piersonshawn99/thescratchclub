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
    name: "Alan Reynolds",
    role: "PGA Coach | Top 100 National Player",
    image: "/images/coaches/alan.jpg",
    bio: "Ranked among the top 100 players nationally, Alan brings two decades of tour-level insight to every lesson. A Campbell University PGA Golf Management graduate, he helps serious golfers refine mechanics, sequencing, and course strategy. His sessions blend data with feel—turning practice into performance that holds up under pressure. Students say he makes complex moves simple and brings out their best golf every time.",
    specialties: ["Full-swing optimization", "Course management", "Performance routines", "Trackman data integration"],
  },
  {
    id: "coach-sarah",
    name: "Sarah Jennings",
    role: "PGA & LPGA Certified Instructor",
    image: "/images/coaches/sarah.jpg",
    bio: "A PGA and LPGA-certified instructor, Sarah brings 15 years of coaching experience and a lifetime of love for the game. A former University of Michigan golfer and mother of two, she’s known for creating a welcoming environment that builds skill and confidence—especially for women and juniors finding their voice in the sport. Sarah blends patience with precision, using proven methods to help players move from hesitant swings to consistent ball flight. Whether you’re a beginner or working toward breaking 80, she makes golf feel both possible and personal.",
    specialties: ["Women & junior development", "Beginner fundamentals", "Short game confidence", "Swing consistency"],
  },
  {
    id: "coach-mark",
    name: "Mark Dalton",
    role: "PGA Coach | Trackman & TPI Certified",
    image: "/images/coaches/mark.jpg",
    bio: "With more than 25 years in coaching and player development, Mark combines traditional fundamentals with modern analytics to deliver measurable progress. A Trackman Level 2 and TPI-certified coach, he’s guided state champions, college players, and weekend golfers who want to train like the pros. Known for his direct yet encouraging style, Mark helps players understand their numbers, optimize impact, and build swings that travel seamlessly from simulator to course.",
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
