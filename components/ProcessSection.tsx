"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, MessagesSquare, Search, Sprout } from "lucide-react";
import { useRef } from "react";
import { processSteps } from "@/lib/data/process";
import { useBooking } from "@/lib/booking-context";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = {
  search: Search,
  calendar: CalendarDays,
  message: MessagesSquare,
  sprout: Sprout,
} as const;

export function ProcessSection() {
  const { openBooking } = useBooking();
  const trackRef = useRef<HTMLDivElement>(null);

  // The connecting line draws itself as the section scrolls into view.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-sage/30 blur-[120px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Your Journey to Better Mental Wellness{" "}
              <span className="italic text-accent-deep">Starts Here.</span>
            </>
          }
          description="Four straightforward steps between where you are now and care that fits your life. No referral needed, and nothing is decided without you."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Horizontal connector — desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[38px] hidden h-px bg-ink/10 lg:block"
          >
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full w-full origin-left bg-gradient-to-r from-accent/70 via-accent to-accent/70"
            />
          </div>

          {/* Vertical connector — mobile / tablet */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[27px] top-10 w-px bg-ink/10 lg:hidden"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent/70 via-accent to-accent/70"
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                  className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <span className="grid h-[54px] w-[54px] place-items-center rounded-2xl border border-ink/5 bg-white shadow-soft transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-card">
                      <Icon className="h-[21px] w-[21px] text-ink" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-[10px] font-bold text-white shadow-soft">
                      {step.number}
                    </span>
                  </div>

                  <div className="pb-1 lg:mt-6">
                    <h3 className="font-serif text-[20px] leading-snug text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted lg:mx-auto lg:max-w-[250px]">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 text-center">
            <button onClick={() => openBooking()} className="btn-primary">
              Start Step One
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
