"use client";

import AnnouncementBar from "./AnnouncementBar";
import { announcement } from "@/lib/site-config";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "./links";
import { track } from "@/lib/analytics";
import { useState, useEffect, useRef } from "react";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/scratchclubgolf", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/scratchclubgolf", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com/@scratchclubgolf", icon: YoutubeIcon },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false); // close on route change
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      // ignore clicks on the menu button so toggling works without immediate close
      if (menuButtonRef.current && menuButtonRef.current.contains(target)) return;
      if (!menuRef.current.contains(target)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const nav = [
    { label: "About", href: LINKS.about },
    { label: "Memberships", href: LINKS.memberships },
    { label: "Coaching", href: LINKS.coaching },
    { label: "Courses", href: LINKS.courses },
    { label: "Contact", href: LINKS.contact },
  ];

  const ctaHref = LINKS.bookNow ?? LINKS.memberships ?? LINKS.contact;

 return (
  <>
  
  <AnnouncementBar config={announcement} />

  <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-fi
lter]:bg-white/70 border-t-0">                                                                                                 {/* Utility strip */}
      <div className="hidden md:block border-b border-neutral-200/70 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-9 items-center justify-between text-xs text-neutral
-600">                                                                                                                             <div className="flex items-center gap-4">
            <span className="hidden lg:inline">Open daily • 7am–11pm</span>
            <a href="tel:+18018303401" className="hover:text-emerald-700">Call: (801) 830-3401</a>
            <span className="hidden sm:inline">•</span>
            <Link href={LINKS.contact} className="hidden sm:inline hover:text-emerald-700">Pinckney, MI</Link>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-1 rounded hover:text-emerald-700"
                onClick={() => track("social_click", { label, location: "header_top" })}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="flex h-12 md:h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => track("nav_logo_click")}
          >
            <Logo />
            <span className="font-semibold tracking-tight">The Scratch Club</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "transition-colors hover:text-emerald-700",
                    active && "text-emerald-700 font-medium"
                  )}
                  onClick={() => track("nav_click", { label: item.label })}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm f
ont-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"                                                                                                                              onClick={() => track("cta_click", { label: "Book a Bay", location: "header" })}
            >
              Book a Bay
            </Link>
          </div>

          {/* Mobile toggles */}
          <button
            ref={menuButtonRef}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral
-100"                                                                                                                                aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={cx(
          "md:hidden border-t border-neutral-200 bg-white shadow-lg transition-all",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded hover:bg-neutral-100"
                  onClick={() => track("social_click", { label, location: "header_mobile" })}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-xl border border-emerald-600 bg-emerald-600 px-3 py-2 text-sm f
ont-semibold text-white hover:bg-emerald-700"                                                                                          onClick={() => track("cta_click", { label: "Book a Bay", location: "header_mobile" })}
            >
              Book a Bay
            </Link>
          </div>
          <nav className="mt-4 grid gap-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "rounded-lg px-3 py-2 text-sm hover:bg-neutral-100",
                    active && "bg-neutral-100 font-medium text-emerald-700"
                  )}
                  onClick={() => track("nav_click", { label: item.label, location: "header_mobile" })}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  </>
  );
}

/** ---------- Icons (inline, no external deps) ---------- */
function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6" {...props}>
      <circle cx="16" cy="16" r="15" className="fill-emerald-600" />
      <path d="M10 20c4-2 8-2 12 0" className="stroke-white" strokeWidth="2" fill="none" />
      <circle cx="16" cy="12" r="3" className="fill-white" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3
 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10m6.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>                                                                                                      </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M13 3h4a1 1 0 0 1 1 1v4h-3a2 2 0 0 0-2 2v3h5l-1 4h-4v6h-4v-6H6v-4h3V9a5 5 0 0 1 5-5Z"/
>                                                                                                                            </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M23 12s0-3.4-.4-4.9c-.2-.8-.8-1.5-1.6-1.7C19 4 12 4 12 4s-7 0-9 .4c-.8.2-1.4.9-1.6 1.7
C1 8.6 1 12 1 12s0 3.4.4 4.9c.2.8.8 1.5 1.6 1.7C5 20 12 20 12 20s7 0 9-.4c.8-.2 1.4-.9 1.6-1.7.4-1.5.4-4.9.4-4.9ZM10 15.5v-7l6 3.5-6 3.5Z"/>                                                                                                          </svg>
  );
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
    </svg>
  );
}
