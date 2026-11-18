"use client";

import { Ambulance, Hospital, Phone, TriangleAlert } from "lucide-react";
import { site } from "@/lib/data/site";
import { Reveal } from "./ui/Reveal";

export function EmergencySupport() {
  return (
    <section aria-labelledby="emergency-heading" className="relative pb-20 sm:pb-24">
      <div className="container-px">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border-2 border-accent/30 bg-white shadow-card">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Message */}
              <div className="p-7 sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-deep">
                  <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Emergency Support
                </span>

                <h2
                  id="emergency-heading"
                  className="mt-5 font-serif text-[26px] leading-tight text-ink sm:text-[30px]"
                >
                  In a crisis, please do not wait for an appointment.
                </h2>

                <div className="mt-5 space-y-3.5 text-[13.5px] leading-[1.75] text-muted">
                  <p>
                    Routine consultations and online booking on this website are{" "}
                    <strong className="font-bold text-ink">not a substitute for emergency care</strong>.
                    Appointments are scheduled in advance and are not monitored around the clock.
                  </p>
                  <p>
                    If you or someone near you is in immediate danger, is thinking about suicide or
                    self-harm, or is experiencing a mental health crisis, contact the emergency
                    services straight away or go to the nearest emergency department.
                  </p>
                  <p>
                    If you can, stay with the person, remove anything that could cause harm, and
                    keep talking to them until help arrives.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-center gap-4 border-t border-accent/20 bg-sage-light p-7 sm:p-9 lg:border-l lg:border-t-0">
                <a
                  href={`tel:${site.emergency.number}`}
                  className="group flex items-center gap-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-[28px] leading-none text-ink">
                      {site.emergency.number}
                    </span>
                    <span className="mt-1.5 block text-[11.5px] font-semibold leading-tight text-muted">
                      {site.emergency.label}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-3.5 rounded-2xl border border-ink/5 bg-white p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage">
                    <Hospital className="h-[18px] w-[18px] text-ink" aria-hidden="true" />
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-ink-soft">
                    <strong className="font-bold text-ink">Nearest emergency department</strong>
                    <br />
                    Go directly, or ask someone to take you.
                  </p>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-ink/5 bg-white p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage">
                    <Ambulance className="h-[18px] w-[18px] text-ink" aria-hidden="true" />
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-ink-soft">
                    <strong className="font-bold text-ink">Ambulance &amp; emergency services</strong>
                    <br />
                    Available 24 hours a day, every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
