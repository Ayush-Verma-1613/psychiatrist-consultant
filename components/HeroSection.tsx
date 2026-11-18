"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Lock, MonitorSmartphone, Sparkles, Stethoscope, UserRound } from "lucide-react";
import { images } from "@/lib/images";
import { useBooking } from "@/lib/booking-context";
import { useScrollTo } from "@/lib/hooks";
import { Photo } from "./ui/Photo";

const EASE = [0.22, 1, 0.36, 1] as const;

const trustIndicators = [
  { icon: Lock, label: "Confidential Consultations" },
  { icon: Stethoscope, label: "Experienced Professionals" },
  { icon: HeartHandshake, label: "Personalized Care" },
];

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const child = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function HeroSection() {
  const { openBooking } = useBooking();
  const scrollTo = useScrollTo();

  return (
    <section id="home" className="relative overflow-hidden pt-[var(--nav-h)]">
      {/* Soft background architecture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-light via-canvas to-canvas" />
        <div className="absolute -left-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-sage/50 blur-[90px]" />
        <div className="absolute -right-32 top-44 h-[30rem] w-[30rem] rounded-full bg-accent-soft/35 blur-[100px]" />
        <div className="absolute inset-0 grain opacity-[0.55]" />
      </div>

      <div className="container-px grid items-center gap-14 pb-20 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-32 lg:pt-20">
        {/* ---------------- Left ---------------- */}
        <motion.div variants={parent} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={child}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Your Mental Wellness Matters
            </span>
          </motion.div>

          <motion.h1 variants={child} className="mt-7 text-display-xl text-balance">
            Your Mind Deserves{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-accent-deep">Care</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 }}
                className="absolute bottom-[0.12em] left-0 right-0 -z-0 h-[0.22em] origin-left rounded-full bg-accent-soft/60"
              />
            </span>
            , Understanding &amp; Support.
          </motion.h1>

          <motion.p
            variants={child}
            className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted text-pretty sm:text-[17px]"
          >
            Take the first step towards a healthier, happier you. Connect with experienced mental
            health professionals who listen, understand, and guide you through your journey.
          </motion.p>

          <motion.div variants={child} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={() => openBooking()} className="btn-primary group w-full sm:w-auto">
              Book Your Consultation
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button onClick={() => scrollTo("doctors")} className="btn-ghost group w-full sm:w-auto">
              <UserRound className="h-4 w-4 text-accent" aria-hidden="true" />
              Meet Our Psychiatrists
            </button>
          </motion.div>

          <motion.ul
            variants={child}
            className="mt-11 grid gap-x-6 gap-y-3.5 border-t border-ink/5 pt-8 sm:grid-cols-3"
          >
            {trustIndicators.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage">
                  <Icon className="h-[15px] w-[15px] text-ink" aria-hidden="true" />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-ink-soft">{label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------------- Right ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          {/* Decorative frame offset behind the photo */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-4 h-full w-full rounded-[2.5rem] border border-accent/20 sm:-bottom-6 sm:-right-6"
          />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-light shadow-lift">
            <Photo
              src={images.hero}
              alt="A mental health professional smiling in a calm, light-filled consultation room"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 46vw"
              priority
              ratio="aspect-[4/5]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/22 via-transparent to-transparent"
            />
          </div>

          {/* Floating card — top left */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
            className="absolute -left-2 top-8 sm:-left-7 sm:top-12"
          >
            <div className="animate-float rounded-2xl border border-ink/5 bg-white/92 px-4 py-3 shadow-card backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sage">
                  <MonitorSmartphone className="h-[17px] w-[17px] text-ink" aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-ink">Online &amp; In-Person</p>
                  <p className="text-[11px] text-muted">Sessions, your choice</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating card — right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            className="absolute -right-2 top-1/2 sm:-right-8"
          >
            <div className="animate-float-slow rounded-2xl border border-ink/5 bg-white/92 px-4 py-3 shadow-card backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft/55">
                  <HeartHandshake className="h-[17px] w-[17px] text-accent-deep" aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-ink">Personalized Care</p>
                  <p className="text-[11px] text-muted">Built around you</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating card — bottom */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
            className="absolute -bottom-6 left-1/2 w-[86%] max-w-[320px] -translate-x-1/2"
          >
            <div className="rounded-2xl border border-ink/5 bg-white px-5 py-4 text-center shadow-lift">
              <p className="font-serif text-[17px] leading-snug text-ink">
                Your Wellness Journey Starts Here
              </p>
              <p className="mt-1 text-[11.5px] font-medium tracking-wide text-muted">
                Confidential · Compassionate · Professional
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
