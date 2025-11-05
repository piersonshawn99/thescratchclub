"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "./links";
import { track } from "@/lib/analytics";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();

  const nav = [
    { label: "About", href: LINKS.about },
    { label: "Memberships", href: LINKS.memberships },
    { label: "Coaching", href: LINKS.coaching },
    { label: "Courses", href: LINKS.courses },
    { label: "Contact", href: LINKS.contact },          // ← added
    { label: "Golf + Life", href: LINKS.golfAndLife },  // ← optional
    { label: "Sign In", href: LINKS.signIn },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold tracking-tight">The Scratch Club</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "hover:text-emerald-700",
                    isActive && "text-emerald-700 font-medium"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            {/* bookNow is an external URL; <a> is safer than <Link> */}
            <a
              href={LINKS.bookNow}
              onClick={() => track("book_now_clicked", { location: "header" })}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              Book Now
            </a>
          </div>

          <a
            href={LINKS.bookNow}
            onClick={() => track("book_now_clicked", { location: "header-mobile" })}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium shadow-sm"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="h-6 w-6 text-emerald-700"
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 32c6-6 12-10 19-13 2-.7 5-1 7 1" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="36" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}
