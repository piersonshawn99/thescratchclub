"use client";

import Link from "next/link";
import { LINKS } from "./links";
import { track } from "@/lib/analytics";

const YEAR = new Date().getFullYear();

const PRIMARY = [
  { label: "Memberships", href: LINKS.memberships },
  { label: "Coaching", href: LINKS.coaching },
  { label: "Courses", href: LINKS.courses },
  { label: "Book a Bay", href: LINKS.bookNow ?? LINKS.memberships ?? LINKS.contact, isCta: true },
];

const SECONDARY = [
  { label: "About", href: LINKS.about },
  { label: "Leagues", href: LINKS.courses },
  { label: "Gift Cards", href: LINKS.courses },
  { label: "Contact", href: LINKS.contact },
];

const LEGAL = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + blurb */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="font-semibold tracking-tight">The Scratch Club</span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Indoor golf, coaching, and leagues—year-round. Bright screens, true ball data, and
              coaches who actually coach.
            </p>
            <div className="mt-4 text-sm text-neutral-700">
              <a className="block hover:text-emerald-700" href="tel:+18018303401">(801) 830-3401</a>
              <a className="block hover:text-emerald-700" href="mailto:info@scratchclubgolf.com">info@scratchclubgolf.com</a>
              <span className="block">Howell, MI</span>
            </div>
          </div>

          {/* Primary */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {PRIMARY.map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className={i.isCta
                      ? "inline-flex items-center rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700"
                      : "hover:text-emerald-700"}
                    onClick={() => track("footer_click", { label: i.label })}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">More</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SECONDARY.map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="hover:text-emerald-700"
                    onClick={() => track("footer_click", { label: i.label })}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Hours</h3>
            <dl className="mt-3 text-sm text-neutral-700 grid grid-cols-2 gap-y-1">
              <dt>Mon–Thu</dt><dd className="text-right">7:00a – 11:00p</dd>
              <dt>Fri</dt><dd className="text-right">7:00a – 12:00a</dd>
              <dt>Sat</dt><dd className="text-right">7:00a – 12:00a</dd>
              <dt>Sun</dt><dd className="text-right">7:00a – 11:00p</dd>
            </dl>
            <p className="mt-3 text-xs text-neutral-500">Holiday hours may vary.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
          <p>© {YEAR} The Scratch Club. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            {LEGAL.map((i) => (
              <Link key={i.label} href={i.href} className="hover:text-emerald-700" onClick={() => track("footer_click", { label: i.label })}>
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15" className="fill-emerald-600" />
      <path d="M10 20c4-2 8-2 12 0" className="stroke-white" strokeWidth="2" fill="none" />
      <circle cx="16" cy="12" r="3" className="fill-white" />
    </svg>
  );
}
