"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Quote } from "lucide-react";
import { aboutPoints } from "@/lib/data/site";
import { images } from "@/lib/images";
import { useScrollTo } from "@/lib/hooks";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const scrollTo = useScrollTo();

  return (
    <section id="about" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 top-1/3 h-[28rem] w-[28rem] rounded-full bg-sage/35 blur-[110px]" />
      </div>

      <div className="container-px grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ---------- Imagery ---------- */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative mx-auto w-full max-w-[480px] lg:max-w-none"
          >
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <Photo
                src={images.aboutPrimary}
                alt="Two people sitting across a table, one holding the other's hands in a gesture of support"
                sizes="(max-width: 1024px) 88vw, 44vw"
                ratio="aspect-[4/5]"
              />
            </div>

            {/* Overlapping secondary photo */}
            <motion.div
              initial={{ opacity: 0, y: 28, x: -18 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              className="absolute -bottom-10 -left-3 w-[52%] max-w-[240px] sm:-left-8"
            >
              <div className="overflow-hidden rounded-3xl border-[6px] border-canvas shadow-lift">
                <Photo
                  src={images.aboutSecondary}
                  alt="A psychiatrist in conversation with a patient during a clinic consultation"
                  sizes="(max-width: 640px) 45vw, 240px"
                  ratio="aspect-[4/3]"
                />
              </div>
            </motion.div>

            {/* Quote badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="absolute -right-2 bottom-16 w-[58%] max-w-[230px] sm:-right-6"
            >
              <div className="animate-float-slow rounded-2xl border border-ink/5 bg-white/95 p-4 shadow-card backdrop-blur">
                <Quote className="h-4 w-4 text-accent" aria-hidden="true" />
                <p className="mt-2 font-serif text-[15px] leading-snug text-ink">
                  Care that meets you where you are.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- Copy ---------- */}
        <div className="order-1 lg:order-2">
          <Reveal y={14}>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About MindWell
            </span>
          </Reveal>

          <Reveal y={22} delay={0.06}>
            <h2 className="mt-6 text-display-md text-balance">
              Compassionate Care for a{" "}
              <span className="italic text-accent-deep">Better Tomorrow.</span>
            </h2>
          </Reveal>

          <Reveal y={18} delay={0.12}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-muted text-pretty sm:text-base">
              Every individual&rsquo;s mental health journey is unique. We believe in providing a
              safe, supportive, and understanding environment where professional care meets
              compassion.
            </p>
          </Reveal>

          <RevealGroup as="ul" stagger={0.07} delay={0.1} className="mt-9 space-y-4">
            {aboutPoints.map((point) => (
              <RevealItem as="li" key={point.title} className="flex gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage">
                  <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold text-ink">{point.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">
                    {point.text}
                  </span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={16} delay={0.2}>
            <button onClick={() => scrollTo("services")} className="btn-accent group mt-10">
              Explore Our Approach
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
