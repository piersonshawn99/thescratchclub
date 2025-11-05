"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/components/links";
import { track } from "@/lib/analytics";
import Image from "next/image";

export default function ScratchClubLandingPage(){
  return (<main className="min-h-screen bg-white text-neutral-900 selection:bg-emerald-200/60">
    <Header/>
    <Hero/>
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Your Home Base for Better Golf</h2>
        <p className="mt-4 text-lg text-neutral-600">Trackman bays, expert coaching, and a community designed for golfers who want to play their best year-round.</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard title="Trackman Bays" body="Precision practice that makes every swing count." icon={IconTarget}/>
        <FeatureCard title="Coaching" body="PGA-level insight that fits your pace and goals." icon={IconWhistle}/>
        <FeatureCard title="Community" body="Leagues, lessons, and laughs that outlast the round." icon={IconUsers}/>
      </div>
    </section>
    <section className="bg-neutral-50 border-y border-neutral-200 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">The Scratch Club Formula: Train · Learn · Play</h2>
          <p className="mt-4 text-lg text-neutral-600">Data turns into insight. Insight turns into confidence. Confidence wins rounds.</p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          <FlowItem index={1} title="Trackman Data" body="Know your numbers — speed, face, path, launch, spin."/>
          <FlowItem index={2} title="Coaching Insight" body="Turn metrics into moves with practical, personalized cues."/>
          <FlowItem index={3} title="Course Confidence" body="Take it outside. Hit the shots you trained for."/>
        </ol>
        <div className="mt-12 text-center">
          <a href={LINKS.memberships} onClick={()=>track('view_membership_plans_clicked',{location:'formula'})} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30">View Membership Plans<ArrowRight/></a>
        </div>
      </div>
    </section>
    <section id="memberships" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-inner">
          <Image
            src="/images/hero/memberships.jpg"
            alt="Member practicing in a Trackman bay"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Make Practice a Habit — Not a Hassle</h2>
          <p className="mt-4 text-lg text-neutral-600">Memberships give you consistent access, exclusive rates, and progress that sticks. Add coaching for a personal touch that accelerates everything.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={LINKS.bookNow} onClick={()=>track('book_now_clicked',{location:'memberships'})} className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30">Book Simulator Time</a>
            <a href={LINKS.coaching} onClick={()=>track('meet_coaches_clicked',{location:'memberships'})} className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-neutral-900 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30">Meet the Coaches</a>
          </div>
        </div>
      </div>
    </section>
    <section id="courses" className="bg-neutral-50 border-y border-neutral-200 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Train Indoors. Shine Outdoors.</h2>
            <p className="mt-4 text-lg text-neutral-600">Explore Michigan favorites and plan your next round. Your simulator work pays off where it counts.</p>
            <ul className="mt-8 space-y-4 text-neutral-700">
              <li className="flex items-start gap-3"><Bullet/>Brighton · Howell · Ann Arbor · Novi — curated nearby courses</li>
              <li className="flex items-start gap-3"><Bullet/>Clickable course cards with distance & tee-time links</li>
              <li className="flex items-start gap-3"><Bullet/>Member events, leagues, and on-course meetups</li>
            </ul>
            <a href={LINKS.courses} onClick={()=>track('view_courses_clicked',{location:'courses'})} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30">View Partner Courses<ArrowRight/></a>
          </div>
          <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-neutral-200 to-neutral-100 shadow-inner"><div className="flex h-full items-center justify-center text-neutral-500">Map / Carousel Placeholder</div></div>
        </div>
      </div>
    </section>
    <section id="golf-life" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-1 shadow-md">
        <div className="rounded-[22px] bg-white p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Golf + Life</h2>
              <p className="mt-4 text-lg text-neutral-700">Golf shouldn’t compete with what matters — it should connect you to it. Sharpen your game and your balance: more time with family, smarter spending, less rush, and a better way to unwind.</p>
              <a href="/golf-and-life" onClick={()=>track('golf_life_read_more_clicked',{location:'golf_life'})} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/20">Learn how to keep your priorities straight<ArrowRight/></a>
            </div>
            <div className="aspect-[4/3] w-full rounded-3xl bg-neutral-100"><div className="flex h-full items-center justify-center text-neutral-500">Image Placeholder</div></div>
          </div>
        </div>
      </div>
    </section>
  </main>);
}

function Hero() {
  return (
    <section className="relative isolate">
      {/* Split visual */}
      <div className="grid h-[72vh] min-h-[520px] w-full grid-cols-1 md:grid-cols-2">
        {/* Left: Simulator */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/hero/sim.jpg"
            alt="Trackman bay at The Scratch Club"
            fill
            priority
            className="object-cover object-[30%_50%]" // <-- nudge focus left photo
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          {/* scrim to improve text contrast on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Right: Course */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/hero/course.jpg"
            alt="Michigan golf course fairway"
            fill
            priority
            className="object-cover object-[55%_50%]" // <-- center-right focus
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          {/* scrim to balance brightness on right */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent md:from-black/20" />
        </div>
      </div>

      {/* Vertical seam (hidden on mobile) */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/40 md:block" />

      {/* Copy overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Train Smarter. Play Better.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            Powered by Trackman and real coaching, The Scratch Club turns
            practice into confidence that carries onto the course.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={LINKS.bookNow}
              onClick={() => track('book_now_clicked', { location: 'hero' })}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              Book Simulator Time
            </a>
            <a
              href={LINKS.memberships}
              onClick={() => track('explore_memberships_clicked', { location: 'hero' })}
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



function FeatureCard({title,body,icon:Icon}:{title:string;body:string;icon:React.FC<React.SVGProps<SVGSVGElement>>}){
  return (<div className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Icon className="h-6 w-6"/></div>
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    <p className="mt-2 text-neutral-600">{body}</p>
  </div>);
}
function FlowItem({index,title,body}:{index:number;title:string;body:string}){
  return (<li className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="absolute -top-3 left-6 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-emerald-600 px-2 text-sm font-semibold text-white">{index}</div>
    <h4 className="mt-2 text-base font-semibold tracking-tight">{title}</h4>
    <p className="mt-2 text-neutral-600">{body}</p>
  </li>);
}
function IconTarget(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 24 24" className="h-6 w-6" {...props}><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.75"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>);}
function IconWhistle(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 24 24" className="h-6 w-6" {...props}><path d="M15 7H9a6 6 0 100 12h2a6 6 0 006-6V9l3-1V5l-5 2z" fill="none" stroke="currentColor" strokeWidth="1.75"/><circle cx="9" cy="13" r="2" fill="currentColor"/></svg>);}
function IconUsers(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 24 24" className="h-6 w-6" {...props}><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.75"/><circle cx="16" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.75"/><path d="M3 20a5 5 0 019-3M12 20a5 5 0 019-3" fill="none" stroke="currentColor" strokeWidth="1.75"/></svg>);}
function ArrowRight(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 24 24" className="h-4 w-4" {...props}><path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function Bullet(props:React.SVGProps<SVGSVGElement>){return (<svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 flex-none text-emerald-700" {...props}><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>);}
