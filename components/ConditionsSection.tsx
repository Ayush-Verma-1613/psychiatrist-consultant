"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CloudRain,
  Flame,
  Heart,
  Moon,
  Repeat,
  Shield,
  Unlink,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { conditions, type Condition } from "@/lib/data/conditions";
import { useBooking } from "@/lib/booking-context";
import { useLockBodyScroll } from "@/lib/hooks";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = {
  wind: Wind,
  "cloud-rain": CloudRain,
  flame: Flame,
  moon: Moon,
  repeat: Repeat,
  activity: Activity,
  zap: Zap,
  shield: Shield,
  unlink: Unlink,
  heart: Heart,
} as const;

export function ConditionsSection() {
  const [open, setOpen] = useState<Condition | null>(null);
  const { openBooking } = useBooking();

  useLockBodyScroll(Boolean(open));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="conditions" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-20 h-[26rem] w-[26rem] rounded-full bg-accent-soft/25 blur-[110px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow="Conditions We Support"
          title={
            <>
              Understanding What{" "}
              <span className="italic text-accent-deep">You&rsquo;re Going Through.</span>
            </>
          }
          description="Clear, non-judgemental information about the conditions our psychiatrists see most often. These summaries are educational — only a clinician can assess or diagnose."
        />

        <RevealGroup
          stagger={0.05}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {conditions.map((condition) => {
            const Icon = ICONS[condition.icon];
            return (
              <RevealItem key={condition.id}>
                <button
                  onClick={() => setOpen(condition)}
                  className="group flex h-full w-full flex-col rounded-[1.5rem] border border-ink/5 bg-white p-5 text-left shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-accent/25 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage-light transition-colors duration-500 group-hover:bg-sage">
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.7} aria-hidden="true" />
                  </span>

                  <h3 className="mt-4 font-serif text-[18px] leading-snug text-ink">
                    {condition.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted">
                    {condition.blurb}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-bold text-accent-deep">
                    Learn More
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-ink/5 bg-sage-light px-5 py-4 text-center text-[12.5px] leading-relaxed text-muted">
            This information is educational and cannot diagnose you. If any of it feels familiar,
            a consultation with a qualified psychiatrist is the right next step.
          </p>
        </Reveal>
      </div>

      {/* ---------------- Condition modal ---------------- */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(null)}
              className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="condition-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-canvas p-6 shadow-lift sm:rounded-[2rem] sm:p-8"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-soft transition-colors hover:bg-sage-light"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              {(() => {
                const Icon = ICONS[open.icon];
                return (
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage">
                    <Icon className="h-5.5 w-5.5 text-ink" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                );
              })()}

              <h3 id="condition-title" className="mt-5 font-serif text-[27px] leading-tight">
                {open.title}
              </h3>

              <p className="mt-4 text-[14px] leading-relaxed text-muted">{open.detail}</p>

              <div className="mt-6 rounded-2xl border border-ink/5 bg-white p-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                  Things people often notice
                </p>
                <ul className="mt-3 space-y-2">
                  {open.signs.map((sign) => (
                    <li key={sign} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-[12px] italic leading-relaxed text-muted/90">
                This list is not a diagnostic checklist. Experiencing some of these does not mean
                you have this condition — only a qualified clinician can assess that properly.
              </p>

              <button
                onClick={() => {
                  setOpen(null);
                  window.setTimeout(() => openBooking(), 260);
                }}
                className="btn-primary mt-6 w-full"
              >
                Speak With a Psychiatrist
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
