"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Variant = "emerald" | "neutral" | "black";

export type AnnouncementConfig = {
  message: string;              // e.g., "Founder Memberships open now"
  href?: string;                // e.g., "/memberships"
  ctaLabel?: string;            // e.g., "Learn more"
  variant?: Variant;            // color theme
  dismissible?: boolean;        // show an X to dismiss
  startAt?: string;             // ISO date, optional
  endAt?: string;               // ISO date, optional
};

function classesFor(variant: Variant = "emerald") {
  switch (variant) {
    case "black":
      return "bg-black text-white [--link:rgba(255,255,255,0.9)]";
    case "neutral":
      return "bg-neutral-900 text-white [--link:rgba(255,255,255,0.9)]";
    default:
      return "bg-emerald-600 text-white [--link:rgba(255,255,255,0.95)]";
  }
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return String(h);
}

export default function AnnouncementBar({
  config,
}: {
  config: AnnouncementConfig | null;
}) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const key = useMemo(() => {
    if (!config) return null;
    const { message, href = "", ctaLabel = "", variant = "emerald", startAt = "", endAt = "" } = config;
    return `announce:${hashString([message, href, ctaLabel, variant, startAt, endAt].join("|"))}`;
  }, [config]);

  useEffect(() => {
    if (!config) return;

    const now = new Date();
    if (config.startAt && now < new Date(config.startAt)) return;
    if (config.endAt && now > new Date(config.endAt)) return;

    if (config.dismissible && key) {
      const dismissed = localStorage.getItem(key);
      if (dismissed === "1") return;
    }
    setVisible(true);
  }, [config, key]);

  if (!config || !visible) return null;

  const { message, href, ctaLabel = "Learn more", variant = "emerald", dismissible = true } = config;

  // Full announcement (desktop)
  const full = (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
        <div className="flex-1 min-w-0">
          <p className="truncate">{message}</p>
        </div>
        <div className="flex items-center gap-3">
          {href && (
            <Link
              href={href}
              className="inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {ctaLabel}
            </Link>
          )}
          {dismissible && (
            <button
              aria-label="Dismiss announcement"
              className="rounded p-1 hover:bg-white/10"
              onClick={() => {
                if (key) localStorage.setItem(key, "1");
                setVisible(false);
              }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="currentColor" d="M6 6l12 12m0-12L6 18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Collapsed mobile bar
  const mobileCollapsed = (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3 py-2 text-sm">
        <div className="flex-1 min-w-0">
          <p className="truncate">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          {href && (
            <Link href={href} className="text-sm font-semibold underline">
              {ctaLabel}
            </Link>
          )}
          <button
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse announcement" : "Expand announcement"}
            className="rounded p-1 hover:bg-white/10"
            onClick={() => setExpanded((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className={`h-5 w-5 transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
              <path fill="currentColor" d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="pt-2">
          <div className="rounded-md bg-white/5 p-3 text-sm">
            <p className="whitespace-normal">{message}</p>
            {dismissible && (
              <div className="mt-2 text-right">
                <button
                  aria-label="Dismiss announcement"
                  className="rounded p-1 hover:bg-white/10"
                  onClick={() => {
                    if (key) localStorage.setItem(key, "1");
                    setVisible(false);
                  }}
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`${classesFor(variant)} print:hidden`}>
      {/* Mobile: collapsed with toggle */}
      <div className="block sm:hidden">{mobileCollapsed}</div>
      {/* Desktop: full */}
      <div className="hidden sm:block">{full}</div>
    </div>
  );
}
