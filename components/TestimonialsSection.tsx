"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { DemoNote, SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 70 : -70, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -70 : 70, scale: 0.98 }),
};

export function TestimonialsSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  const goTo = useCallback(
    (next: number) => setState(([i]) => [next, next > i ? 1 : -1]),
    []
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, paginate, reduceMotion]);

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section-y relative overflow-hidden bg-sage-light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain opacity-60" />

      <div className="container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Stories of Care and <span className="italic text-accent-deep">Support.</span>
            </>
          }
          description="Illustrative examples of the experiences people describe after consulting a psychiatrist at MindWell."
        />

        <Reveal delay={0.08}>
          <div
            className="relative mx-auto mt-14 max-w-3xl"
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
          >
            {/* Oversized decorative quote */}
            <Quote
              className="pointer-events-none absolute -top-7 left-1/2 h-16 w-16 -translate-x-1/2 text-accent/15"
              aria-hidden="true"
            />

            <div className="relative min-h-[330px] sm:min-h-[290px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={active.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: EASE }}
                  className="rounded-[2rem] border border-ink/5 bg-white p-7 text-center shadow-card sm:p-10"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-center gap-1" aria-label={`${active.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < active.rating
                            ? "h-4 w-4 fill-accent text-accent"
                            : "h-4 w-4 text-ink/15"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="mt-6">
                    <p className="font-serif text-[20px] leading-[1.55] text-ink text-balance sm:text-[24px]">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                  </blockquote>

                  <figcaption className="mt-7 flex flex-col items-center gap-2.5">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-serif text-[17px] text-ink">
                      {active.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-ink">{active.name}</span>
                      <span className="mt-0.5 block text-[12px] text-muted">{active.context}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-soft transition-all duration-300 hover:-translate-x-0.5 hover:border-ink/25 hover:shadow-card"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group grid h-6 place-items-center px-0.5"
                  >
                    <span
                      className={[
                        "block h-1.5 rounded-full transition-all duration-500 ease-premium",
                        i === index
                          ? "w-7 bg-accent"
                          : "w-1.5 bg-ink/15 group-hover:bg-ink/30",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-soft transition-all duration-300 hover:translate-x-0.5 hover:border-ink/25 hover:shadow-card"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <DemoNote className="mt-8 text-center">
              Sample testimonials — illustrative demo content written to show how patient feedback
              would appear. These are not genuine patient reviews.
            </DemoNote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
