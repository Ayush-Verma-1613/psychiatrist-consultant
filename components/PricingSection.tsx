"use client";

import { Check, Clock, Sparkles } from "lucide-react";
import { plans } from "@/lib/data/pricing";
import { useBooking } from "@/lib/booking-context";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { DemoNote, SectionHeading } from "./ui/SectionHeading";

export function PricingSection() {
  const { openBooking } = useBooking();

  return (
    <section id="pricing" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-sage/35 blur-[120px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Transparent Consultation{" "}
              <span className="italic text-accent-deep">Options.</span>
            </>
          }
          description="Clear session lengths and no hidden charges. You will always know what an appointment costs before you book it."
        />

        <RevealGroup stagger={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <RevealItem key={plan.id}>
              <article
                className={[
                  "relative flex h-full flex-col rounded-[1.75rem] p-7 transition-all duration-500 ease-premium sm:p-8",
                  plan.highlighted
                    ? "border border-ink/10 bg-ink text-white shadow-lift lg:-translate-y-3"
                    : "border border-ink/5 bg-white shadow-soft hover:-translate-y-1.5 hover:shadow-card",
                ].join(" ")}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white shadow-soft">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Most Flexible
                  </span>
                )}

                <h3
                  className={[
                    "font-serif text-[23px] leading-tight",
                    plan.highlighted ? "text-white" : "text-ink",
                  ].join(" ")}
                >
                  {plan.name}
                </h3>

                <p
                  className={[
                    "mt-2 text-[13px] leading-relaxed",
                    plan.highlighted ? "text-white/60" : "text-muted",
                  ].join(" ")}
                >
                  {plan.summary}
                </p>

                <div
                  className={[
                    "mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold",
                    plan.highlighted ? "bg-white/10 text-white/75" : "bg-sage-light text-ink-soft",
                  ].join(" ")}
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {plan.duration}
                </div>

                <div className={`mt-6 ${plan.highlighted ? "border-white/10" : "border-ink/5"} border-t pt-6`}>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={[
                        "font-serif text-[40px] leading-none",
                        plan.highlighted ? "text-white" : "text-ink",
                      ].join(" ")}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={[
                        "text-[12.5px] font-medium",
                        plan.highlighted ? "text-white/50" : "text-muted",
                      ].join(" ")}
                    >
                      {plan.cadence}
                    </span>
                  </div>
                  <p
                    className={[
                      "mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]",
                      plan.highlighted ? "text-accent-soft" : "text-accent-deep",
                    ].join(" ")}
                  >
                    Demo price
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className={[
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                          plan.highlighted ? "bg-white/10" : "bg-sage",
                        ].join(" ")}
                      >
                        <Check
                          className={plan.highlighted ? "h-3 w-3 text-sage" : "h-3 w-3 text-ink"}
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className={[
                          "text-[13px] leading-snug",
                          plan.highlighted ? "text-white/75" : "text-ink-soft",
                        ].join(" ")}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    openBooking({
                      planId: plan.id,
                      mode: plan.id === "online" ? "online" : undefined,
                    })
                  }
                  className={[
                    "btn mt-8 w-full px-6 py-3.5",
                    plan.highlighted
                      ? "bg-white text-ink hover:bg-sage"
                      : "bg-ink text-white hover:bg-ink-soft",
                  ].join(" ")}
                >
                  Book Now
                </button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <DemoNote className="mx-auto mt-10 max-w-2xl text-center">
            Demo pricing shown for demonstration purposes only. These are configurable placeholder
            figures, not actual clinic fees — real pricing will be confirmed before launch.
          </DemoNote>
        </Reveal>
      </div>
    </section>
  );
}
