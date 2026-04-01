"use client";
import { LINKS } from "@/components/links";
import { track } from "@/lib/analytics";
import Image from "next/image";
import Section from "@/components/Section";

/** Shared card sizing so Features + Formula match */
const CARD_BASE =
  "rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md";
const CARD_SIZE =
  "min-h-[200px] md:min-h-[220px] flex flex-col justify-between";

const BOOK_BAY_URL = "https://portal.trackmangolf.com/";

export default function ScratchClubLandingPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-emerald-200/60">
      <Hero />
      <FoundingMembershipsBand />

      {/* ABOUT / FEATURES — banded with features.jpg */}
      <Section bg="/images/bg/features.jpg" tint="neutral" blur="backdrop-blur-[2px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Your Home Base for Better Golf
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Trackman bays, expert coaching, and a community designed for golfers
            who want to play their best year-round.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Trackman Bays"
            body="Precision practice that makes every swing count."
            icon={IconTarget}
          />
          <FeatureCard
            title="Coaching"
            body="PGA-level insight that fits your pace and goals."
            icon={IconWhistle}
          />
          <FeatureCard
            title="Community"
            body="Leagues, lessons, and laughs that outlast the round."
            icon={IconUsers}
          />
        </div>

        {/* Trackman Bays CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={BOOK_BAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("book_bay_clicked", { location: "features" })}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            Book a Bay
          </a>
          <a
            href="/trackman-bays"
            onClick={() => track("view_bay_clicked", { location: "features" })}
            className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-white/90 px-5 py-3 text-neutral-900 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            View a Bay
          </a>
        </div>
      </Section>

      {/* FORMULA — banded with formula.jpg (Learn · Train · Play) */}
      <Section bg="/images/bg/formula.jpg" tint="neutral" blur="backdrop-blur-[1.5px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            The Scratch Club Formula: Learn · Train · Play
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Data turns into insight. Insight turns into confidence. Confidence
            wins rounds.
          </p>
        </div>

        {/* Three cards, same size as Features, ordered Learn → Train → Play */}
        <ol className="mt-12 grid gap-6 sm:grid-cols-3 list-none pl-0">
          <FlowItem
            index={1}
            title="Learn"
            body="Coaching insight: turn metrics into moves with practical, personalized cues."
          />
          <FlowItem
            index={2}
            title="Train"
            body="Trackman data: know your numbers — speed, face, path, launch, spin."
          />
          <FlowItem
            index={3}
            title="Play"
            body="Course confidence: take it outside. Hit the shots you trained for."
          />
        </ol>

        <div className="mt-12 text-center">
          <a
            href={LINKS.memberships}
            onClick={() =>
              track("view_membership_plans_clicked", { location: "formula" })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            View Membership Plans <ArrowRight />
          </a>
        </div>
      </Section>

      {/* COURSES — banded */}
      <div id="courses">
        <Section bg="/images/bg/courses.jpg" tint="neutral">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Train Indoors. Shine Outdoors.
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Explore Michigan favorites and plan your next round. Your
                simulator work pays off where it counts.
              </p>
              <ul className="mt-8 space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <Bullet />
                  Pinckney · Brighton · Dexter · Whitmore Lake — curated nearby
                  courses
                </li>
                <li className="flex items-start gap-3">
                  <Bullet />
                  Clickable course cards with distance & tee-time links
                </li>
                <li className="flex items-start gap-3">
                  <Bullet />
                  Member events, leagues, and on-course meetups
                </li>
              </ul>
              <a
                href={LINKS.courses}
                onClick={() =>
                  track("view_courses_clicked", { location: "courses" })
                }
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                View Partner Courses <ArrowRight />
              </a>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-inner">
              <Image
                src="/images/courses/timbertrace2.jpg"
                alt="Michigan golf courses"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Section>
      </div>

      {/* GOLF + LIFE */}
      <section
        id="golf-life"
        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-1 shadow-md">
          <div className="rounded-[22px] bg-white p-8 sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Golf + Life
                </h2>
                <p className="mt-4 text-lg text-neutral-700">
                  Golf shouldn’t compete with what matters — it should connect you
                  to it. Sharpen your game and your balance: more time with family,
                  smarter spending, less rush, and a better way to unwind.
                </p>
                <a
                  href="/golf-and-life"
                  onClick={() =>
                    track("golf_life_read_more_clicked", {
                      location: "golf_life",
                    })
                  }
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                >
                  Learn how to keep your priorities straight <ArrowRight />
                </a>
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-inner">
                <Image
                  src="/images/hero/family.jpg"
                  alt="Golfer enjoying simulator and lifestyle balance"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate">
      <div className="grid h-[72vh] min-h-[520px] w-full grid-cols-1 md:grid-cols-2">
        {/* Left: Simulator */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/hero/sim.jpg"
            alt="Trackman bay at The Scratch Club"
            fill
            priority
            className="object-cover object-[30%_50%]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Right: Course */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/hero/course.jpg"
            alt="Michigan golf course fairway"
            fill
            priority
            className="object-cover object-[40%_50%]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent md:from-black/20" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/40 md:block" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl">
            Train Smarter. Play Better.
          </h1>
          <p className="mt-4 text-lg text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] sm:text-xl">
            Powered by Trackman and real coaching, The Scratch Club turns
            practice into confidence that carries onto the course.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BOOK_BAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("book_bay_clicked", { location: "hero" })}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              Book a Bay
            </a>
            <a
              href={LINKS.memberships}
              onClick={() =>
                track("explore_memberships_clicked", { location: "hero" })
              }
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/90 px-6 py-3 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              Explore Memberships
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundingMembershipsBand() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/founding/founding-band-background.png"
          alt="Misty tree-lined golf landscape background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Light veil over background */}
      <div className="absolute inset-0 bg-white/6" />
      <div className="relative mx-auto max-w-[1500px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="relative min-h-[620px]">
          {/* Left simulator image */}
          <div className="absolute left-0 top-[54%] z-10 hidden w-[58%] -translate-y-1/2 lg:block">
            <Image
              src="/images/founding/iO-sim.png"
              alt="Golfer practicing in a Trackman iO bay"
              width={1366}
              height={768}
              quality={100}
              className="h-auto w-full object-cover shadow-2xl"
            />
          </div>

          {/* Right founders info box */}
          <div className="absolute right-[2%] top-[50%] z-20 hidden w-[47%] max-w-[640px] -translate-y-1/2 lg:block">
            <div className="relative">
              <Image
                src="/images/founding/founders-box-info.png"
                alt="Founding memberships information panel"
                width={626}
                height={812}
                quality={100}
                className="h-auto w-full object-cover shadow-2xl"
              />

              {/* Real clickable button overlay */}
              <a
                href={LINKS.memberships}
                onClick={() =>
                  track("join_interest_list_clicked", {
                    location: "founding_memberships_band",
                  })
                }
                className="absolute left-[5.2%] top-[76%] inline-flex h-[8.8%] w-[42%] items-center justify-center rounded-[16px] bg-transparent text-transparent focus:outline-none focus:ring-2 focus:ring-amber-300/50"
                aria-label="Join the Interest List"
                title="Join the Interest List"
              >
                Join the Interest List
              </a>
            </div>
          </div>

          {/* Mobile stacked version */}
          <div className="space-y-6 lg:hidden">
            <Image
              src="/images/founding/iO-sim.png"
              alt="Golfer practicing in a Trackman iO bay"
              width={1366}
              height={768}
              quality={100}
              className="h-auto w-full object-cover shadow-2xl"
            />

            <div className="relative mx-auto max-w-[640px]">
              <Image
                src="/images/founding/founders-box-info.png"
                alt="Founding memberships information panel"
                width={626}
                height={812}
                quality={100}
                className="h-auto w-full object-cover shadow-2xl"
              />

              <a
                href={LINKS.memberships}
                onClick={() =>
                  track("join_interest_list_clicked", {
                    location: "founding_memberships_band",
                  })
                }
                className="absolute left-[4.8%] top-[76%] z-30 inline-flex h-[10.2%] w-[43.5%] items-center justify-center rounded-[18px] bg-transparent text-transparent focus:outline-none focus:ring-2 focus:ring-amber-300/50"
                aria-label="Join the Interest List"
                title="Join the Interest List"
              >
                Join the Interest List
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* Cards + icons (sizes unified) */
function FeatureCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className={`${CARD_BASE} ${CARD_SIZE}`}>
      <div>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-neutral-600">{body}</p>
      </div>
    </div>
  );
}

function FlowItem({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <li className={`${CARD_BASE} ${CARD_SIZE} relative`}>
      <div className="absolute -top-3 left-6 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-emerald-600 px-2 text-sm font-semibold text-white">
        {index}
      </div>
      <div>
        <h4 className="mt-2 text-base font-semibold tracking-tight">{title}</h4>
        <p className="mt-2 text-neutral-600">{body}</p>
      </div>
    </li>
  );
}

/* Icons */
function IconTarget(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function IconWhistle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" {...props}>
      <path
        d="M15 7H9a6 6 0 100 12h2a6 6 0 006-6V9l3-1V5l-5 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="9" cy="13" r="2" fill="currentColor" />
    </svg>
  );
}

function IconUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" {...props}>
      <circle
        cx="8"
        cy="8"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="16"
        cy="10"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M3 20a5 5 0 019-3M12 20a5 5 0 019-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...props}>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bullet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 h-4 w-4 flex-none text-emerald-300"
      {...props}
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}