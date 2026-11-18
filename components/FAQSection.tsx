"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessagesSquare, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/data/faq";
import { useBooking } from "@/lib/booking-context";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { openBooking } = useBooking();

  return (
    <section id="faq" className="section-y relative overflow-hidden bg-sage-light">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain opacity-60" />

      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                <>
                  Frequently Asked{" "}
                  <span className="italic text-accent-deep">Questions.</span>
                </>
              }
              description="The things people most often want to know before booking a first appointment."
            />

            <Reveal delay={0.16}>
              <div className="mt-8 rounded-[1.5rem] border border-ink/5 bg-white p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage">
                  <MessagesSquare className="h-5 w-5 text-ink" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <p className="mt-4 font-serif text-[18px] leading-snug text-ink">
                  Still have a question?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Ask anything you need to before booking — there is no such thing as a question
                  that is too small.
                </p>
                <button onClick={() => openBooking()} className="btn-primary mt-5 w-full">
                  Book a Consultation
                </button>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <RevealGroup stagger={0.05} className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <RevealItem key={faq.question}>
                  <div
                    className={[
                      "overflow-hidden rounded-2xl border bg-white transition-all duration-500 ease-premium",
                      isOpen ? "border-accent/30 shadow-card" : "border-ink/5 shadow-soft hover:border-ink/15",
                    ].join(" ")}
                  >
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span
                          className={[
                            "text-[14.5px] font-bold leading-snug transition-colors duration-300 sm:text-[15.5px]",
                            isOpen ? "text-ink" : "text-ink-soft",
                          ].join(" ")}
                        >
                          {faq.question}
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className={[
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
                            isOpen ? "bg-accent text-white" : "bg-sage text-ink",
                          ].join(" ")}
                        >
                          <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-button-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.42, ease: EASE },
                            opacity: { duration: 0.3, ease: EASE },
                          }}
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                            <div className="hairline mb-4" />
                            <p className="text-[13.5px] leading-[1.75] text-muted text-pretty">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
