"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import React from "react";

type ClientLinkProps = React.ComponentProps<typeof Link> & {
  trackEvent?: string;
  trackPayload?: Record<string, any>;
};

export default function ClientLink({ trackEvent, trackPayload, onClick, ...props }: ClientLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    try {
      if (trackEvent) track(trackEvent, trackPayload ?? {});
    } catch {}
    if (onClick) onClick(e as any);
  }

  // next/link accepts className and other props
  return <Link {...(props as any)} onClick={handleClick} />;
}
