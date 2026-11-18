"use client";

import {
  Baby,
  Building2,
  CalendarCheck,
  ClipboardList,
  Clock,
  Moon,
  Pill,
  RefreshCw,
  Stethoscope,
  Video,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { useBooking } from "@/lib/booking-context";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ICONS = {
  stethoscope: Stethoscope,
  video: Video,
  building: Building2,
  clipboard: ClipboardList,
  pill: Pill,
  refresh: RefreshCw,
  baby: Baby,
  moon: Moon,
} as const;

export function ServicesSection() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="section-y relative overflow-hidden bg-sage-light">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain opacity-60" />

      <div className="container-px">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Care That <span className="italic text-accent-deep">Understands You.</span>
            </>
          }
          description="From a first assessment through to ongoing follow-up, every service is delivered by a consultant psychiatrist and shaped around what you actually need."
        />

        <RevealGroup stagger={0.06} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <RevealItem key={service.id}>
                <article
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift",
                    service.featured
                      ? "border border-ink/10 bg-ink text-white"
                      : "border border-ink/5 bg-white",
                  ].join(" ")}
                >
                  {/* Sheen on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-accent-sheen transition-transform duration-[1200ms] ease-premium group-hover:translate-x-full"
                  />

                  <span
                    className={[
                      "grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 ease-premium group-hover:-translate-y-0.5",
                      service.featured ? "bg-white/10" : "bg-sage",
                    ].join(" ")}
                  >
                    <Icon
                      className={service.featured ? "h-5 w-5 text-sage" : "h-5 w-5 text-ink"}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <h3
                    className={[
                      "mt-5 font-serif text-[19px] leading-snug",
                      service.featured ? "text-white" : "text-ink",
                    ].join(" ")}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={[
                      "mt-2.5 flex-1 text-[13px] leading-relaxed",
                      service.featured ? "text-white/70" : "text-muted",
                    ].join(" ")}
                  >
                    {service.description}
                  </p>

                  <div
                    className={[
                      "mt-5 flex items-center gap-1.5 text-[11.5px] font-semibold",
                      service.featured ? "text-white/60" : "text-muted",
                    ].join(" ")}
                  >
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {service.duration}
                  </div>

                  <button
                    onClick={() =>
                      openBooking(
                        service.id === "online-consultation"
                          ? { mode: "online" }
                          : service.id === "in-person"
                          ? { mode: "in-person" }
                          : {}
                      )
                    }
                    className={[
                      "btn mt-5 w-full px-4 py-2.5 text-[12.5px]",
                      service.featured
                        ? "bg-white text-ink hover:bg-sage"
                        : "border border-ink/10 bg-canvas text-ink hover:border-ink/25 hover:bg-white",
                    ].join(" ")}
                  >
                    <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Book This Service
                  </button>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
