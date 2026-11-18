"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "default" | "invert";
  children?: ReactNode;
}) {
  const centered = align === "center";
  const invert = tone === "invert";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal y={14}>
          <span
            className={
              invert
                ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
                : "eyebrow"
            }
          >
            <span className={invert ? "h-1.5 w-1.5 rounded-full bg-accent-soft" : "h-1.5 w-1.5 rounded-full bg-accent"} />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal y={20} delay={0.06}>
        <h2
          className={[
            "mt-5 text-display-md text-balance",
            invert ? "text-white" : "text-ink",
          ].join(" ")}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal y={18} delay={0.12}>
          <p
            className={[
              "mt-5 text-[15px] leading-relaxed text-pretty sm:text-base",
              invert ? "text-white/70" : "text-muted",
              centered ? "mx-auto max-w-2xl" : "",
            ].join(" ")}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children && <Reveal delay={0.18}>{children}</Reveal>}
    </div>
  );
}

/** Small italic note used to label demo / sample content honestly. */
export function DemoNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs italic leading-relaxed text-muted/80 ${className}`}>{children}</p>
  );
}
