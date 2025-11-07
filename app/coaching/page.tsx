// Final clean coaching page
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "@/components/CopyEmailButton";

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

function mailtoForRole(role?: string) {
  const subject = `Coaching Application – ${role ?? "The Scratch Club"}`;
  const lines = [
    "Hi Scratch Club team:",
    "",
    role ? `I'd like to apply for the role: ${role}.` : "My name is [Your Name]. I'm interested in coaching at The Scratch Club.",
    "",
    "Highlights:",
    "• Certifications: [PGA/LPGA, TPI, Trackman]",
    "• Coaching focus: [e.g., women & juniors, advanced player development]",
    "• Availability: [e.g., evenings/weekends]",
    "",
    "Resume attached.",
    "",
    "Thanks!",
    "[Your Name]",
    "[Phone]",
  ];

  return `mailto:coaching@scratchclubgolf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\r\n")
  )}`;
}

export default function CoachingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">Coaching</h1>
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
        {COACHES.map((coach) => {
          const isFuture = coach.name.startsWith("Future");
          return (
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
                      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">{coach.name}</h2>
                      {coach.role && <p className="mt-0.5 text-sm text-emerald-800">{coach.role}</p>}
                    </div>

                    {coach.links && coach.links.length > 0 && (
                      <div className="flex shrink-0 items-center gap-3">
                        {coach.links.map((l) => (
                          <Link key={`${coach.id}-${l.href}`} href={l.href} className="text-sm text-emerald-800 hover:underline">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mt-16 rounded-2xl border border-neutral-200 bg-emerald-50 p-6">
        <h3 className="text-center text-xl font-semibold text-neutral-900">
          Interested in Coaching at The Scratch Club?
        </h3>
        <p className="mt-2 max-w-2xl mx-auto text-neutral-700 text-center">
          We're building a team of instructors who love the game, live for progress, and
          bring out the best in every golfer they meet. If that sounds like you, send us your
          resume and a quick note.
        </p>

        <div className="mt-4 mx-auto max-w-xl text-left text-sm text-neutral-700">
          <p className="font-medium">Include:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>PDF resume with coaching history and certifications (PGA/LPGA, TPI, Trackman, etc.)</li>
            <li>1–2 paragraphs on your coaching approach and ideal player</li>
            <li>Any public links (website, Instagram, CoachNow, tournament record)</li>
            <li>General availability (evenings/weekends, seasonal)</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:coaching@scratchclubgolf.com?subject=${encodeURIComponent("Coaching Application – The Scratch Club")}&body=${encodeURIComponent("Hi Scratch Club team,%0D%0A%0D%0AMy name is [Your Name]. I'm interested in coaching at The Scratch Club.%0D%0A%0D%0AHighlights:%0D%0A• Certifications: [PGA/LPGA, TPI, Trackman]%0D%0A• Coaching focus: [e.g., women & juniors, advanced player development]%0D%0A• Availability: [e.g., evenings/weekends]%0D%0A%0D%0AResume attached.%0D%0A%0D%0AThanks!%0D%0A[Your Name]%0D%0A[Phone]")}`}
            className="inline-flex rounded-xl bg-emerald-700 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            Email Your Resume
          </a>
          <Link
            href="/contact"
            className="inline-flex rounded-xl border border-emerald-700 px-6 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            Questions? Contact Us
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-neutral-700">
          Or email us at
          <span className="mx-1 font-medium select-all">coaching@scratchclubgolf.com</span>
          <CopyEmailButton email="coaching@scratchclubgolf.com" />
        </div>
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
