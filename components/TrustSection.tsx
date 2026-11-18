"use client";

import { Award, HeartHandshake, ShieldCheck, Video } from "lucide-react";
import { trustStats } from "@/lib/data/site";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { DemoNote } from "./ui/SectionHeading";

const ICONS = {
  shield: ShieldCheck,
  award: Award,
  video: Video,
  heart: HeartHandshake,
} as const;

export function TrustSection() {
  return (
    <section id="trust" aria-label="Why people choose MindWell" className="relative">
      <div className="container-px -mt-2 pb-4 sm:-mt-4">
        <RevealGroup
          stagger={0.09}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-ink/5 bg-ink/5 shadow-card sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustStats.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <RevealItem
                key={stat.label}
                className="group relative bg-white p-7 transition-colors duration-500 hover:bg-sage-light sm:p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:bg-white">
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                </span>

                <p className="mt-5 font-serif text-[26px] leading-none text-ink">{stat.value}</p>
                <p className="mt-2.5 text-[13.5px] font-bold text-ink-soft">{stat.label}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{stat.caption}</p>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-accent/40 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                />
              </RevealItem>
            );
          })}
        </RevealGroup>

        <DemoNote className="mt-4 text-center">
          Demo labels shown for layout purposes. No patient numbers or clinic achievements are
          claimed — verified figures will replace these before launch.
        </DemoNote>
      </div>
    </section>
  );
}
