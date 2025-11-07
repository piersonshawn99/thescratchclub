"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Variant = "emerald" | "neutral" | "black";

export type AnnouncementConfig = {
  message: string;
  href?: string;
  ctaLabel?: string;
  variant?: Variant;
  dismissible?: boolean;
  startAt?: string;
  endAt?: string;
};

export const DEFAULT_ANNOUNCEMENT: AnnouncementConfig = {
  message: "📍 Pinckney–Lakeland location opening early 2026!",
  variant: "emerald",
  dismissible: false,
};

function classesFor(variant: Variant = "emerald") {
  switch (variant) {
    case "black":
      return "bg-black text-white [--link:rgba(255,255,255,0.9)]";
    case "neutral":
      return "bg-neutral-900 text-white [--link:rgba(255,255,255,0.9)]";
    default:
      return "bg-emerald-700 text-white [--link:rgba(255,255,255,0.95)]";
  }
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return String(h);
}

export default function AnnouncementBar({
  config = DEFAULT_ANNOUNCEMENT,
}: {
  config?: AnnouncementConfig | null;
}) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const key = useMemo(() => {
    if (!config) return null;
    const {
      message,
      href = "",
      ctaLabel = "",
      variant = "emerald",
      startAt = "",
      endAt = "",
    } = config;
    return `announce:${hashString(
      [message, href, ctaLabel, variant, startAt, endAt].join("|")
    )}`;
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

  const {
    message,
    href,
    ctaLabel = "Learn more",
    variant = "emerald",
    dismissible = false,
  } = config;

  const pinIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-amber-400 mr-2 inline-block"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );

  // Desktop full banner
  const full = (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b-2 border-amber-400/80">
      <div className="flex items-center justify-center gap-4 py-2.5 text-sm font-medium tracking-wide">
        <div className="flex items-center text-center">
          {pinIcon}
          <p className="truncate">{message}</p>
        </div>
        {href && (
          <Link
            href={href}
            className="ml-3 inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );

  // Mobile collapsed bar
  const mobileCollapsed = (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-amber-400/70">
      <div className="flex items-center justify-center gap-2 py-1 text-xs font-medium tracking-wide">
        {pinIcon}
        <p className="truncate">{message}</p>
      </div>
    </div>
  );

  return (
    <div className={`${classesFor(variant)} print:hidden`}>
      <div className="hidden sm:block">{full}</div>
      <div className="block sm:hidden">{mobileCollapsed}</div>
    </div>
  );
}
