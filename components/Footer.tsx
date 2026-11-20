import Link from "next/link";
import Image from "next/image";
import ClientLink from "./ClientLink";
import { LINKS } from "./links";

const YEAR = new Date().getFullYear();

const PRIMARY = [
  { label: "Coaching", href: LINKS.coaching },
  { label: "Courses", href: LINKS.courses },
  { label: "Leagues", href: "/leagues" },
  { label: "Memberships", href: LINKS.memberships },
  { label: "Gift Cards", href: LINKS.giftCards },
  
];

const SECONDARY = [
  { label: "About", href: LINKS.about },
  { label: "Contact", href: LINKS.contact },
  { label: "Explore Memberships", href: LINKS.memberships, isCta: true },
  
];

const LEGAL = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + blurb */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/scratch-club-golfer-green.png"
                alt="The Scratch Club logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-xl font-semibold tracking-tight text-neutral-900">
                The Scratch Club
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Indoor golf, coaching, and leagues—year-round. Bright screens, true ball data, and
              coaches who actually coach.
            </p>
            <div className="mt-4 text-sm text-neutral-700">
              <a className="block hover:text-[#143029]" href="mailto:info@scratchclubgolf.com">info@scratchclubgolf.com</a>
              <p>9588 Chilson Commons Circle</p>
              <span className="block">Hamburg, MI 48169</span>
            </div>
          </div>

          {/* Primary */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {PRIMARY.map((i) => (
                <li key={i.label}>
                  <ClientLink
                    href={i.href}
                    className="hover:text-[#143029]"
                    trackEvent="footer_click"
                    trackPayload={{ label: i.label }}
                  >
                    {i.label}
                  </ClientLink>
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
                  <ClientLink href={i.href} className="hover:text-[#143029]" trackEvent="footer_click" trackPayload={{ label: i.label }}>
                    {i.label}
                  </ClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand philosophy */}
          <div className="space-y-3 text-sm text-neutral-700">
            <h3 className="font-serif text-xl text-[#143029]">The Pursuit of Better Golf.</h3>
            <p>Practice With Purpose. Play With Confidence.</p>
            <p className="text-xs">Contact the club for current access and opening information.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
          <p>© {YEAR} The Scratch Club. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            {LEGAL.map((i) => (
              <ClientLink key={i.label} href={i.href} className="hover:text-[#143029]" trackEvent="footer_click" trackPayload={{ label: i.label }}>
                {i.label}
              </ClientLink>
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
      <circle cx="16" cy="16" r="15" className="fill-[#143029]" />
      <path d="M10 20c4-2 8-2 12 0" className="stroke-white" strokeWidth="2" fill="none" />
      <circle cx="16" cy="12" r="3" className="fill-white" />
    </svg>
  );
}
