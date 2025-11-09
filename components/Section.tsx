"use client";
import Image from "next/image";
import { ReactNode } from "react";

type Tint = "emerald" | "neutral" | "gold" | "dusk" | "none";

const TINTS: Record<Tint, string> = {
  emerald: "bg-emerald-900/45",
  neutral: "bg-neutral-900/35",
  gold: "bg-yellow-900/25",
  dusk: "bg-cyan-950/45",
  none: "bg-black/0",
};

export default function Section({
  bg,
  tint = "neutral",
  children,
  className,
  priority = false,
  blur = "backdrop-blur-[1px]",
}: {
  bg?: string;               // e.g. "/images/bg/hero-bay.jpg"
  tint?: Tint;               // overlay color + opacity
  children: ReactNode;
  className?: string;
  priority?: boolean;        // only true for the hero
  blur?: string;             // tweak per section if needed
}) {
  return (
    <section className={`relative isolate overflow-hidden ${className ?? ""}`}>
      {bg && (
        <Image
          src={bg}
          alt="" // decorative
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center [filter:contrast(1.05)_saturate(0.9)]"
        />
      )}
      <div className={`absolute inset-0 ${TINTS[tint]} ${blur} pointer-events-none`} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {children}
      </div>
    </section>
  );
}
