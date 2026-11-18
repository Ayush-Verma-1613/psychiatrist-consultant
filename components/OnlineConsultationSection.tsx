"use client";

import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Lock, MessageCircleHeart, Video } from "lucide-react";
import { images } from "@/lib/images";
import { useBooking } from "@/lib/booking-context";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    icon: Video,
    title: "Convenient online appointments",
    text: "A secure video room that opens in your browser — no installs, no waiting room.",
  },
  {
    icon: CalendarClock,
    title: "Flexible scheduling",
    text: "Evening slots are reserved for online sessions, so appointments fit around work.",
  },
  {
    icon: Lock,
    title: "Private consultations",
    text: "The same medical confidentiality as an in-person visit, from a space you choose.",
  },
  {
    icon: MessageCircleHeart,
    title: "Follow-up support",
    text: "Session notes shared securely afterwards, with follow-ups booked in a few taps.",
  },
];

export function OnlineConsultationSection() {
  const { openBooking } = useBooking();

  return (
    <section id="online" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-sage/10 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[110px]" />
      </div>

      <div className="container-px relative grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* ---------- Copy ---------- */}
        <div>
          <Reveal y={14}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <Video className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
              Online Consultation
            </span>
          </Reveal>

          <Reveal y={22} delay={0.06}>
            <h2 className="mt-6 text-display-md text-balance text-white">
              Professional Mental Healthcare,{" "}
              <span className="italic text-accent-soft">Wherever You Are.</span>
            </h2>
          </Reveal>

          <Reveal y={18} delay={0.12}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-white/65 text-pretty sm:text-base">
              Connect with mental health professionals from the comfort and privacy of your home.
            </p>
          </Reveal>

          <RevealGroup as="ul" stagger={0.08} delay={0.08} className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <RevealItem as="li" key={title} className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <Icon className="h-[17px] w-[17px] text-accent-soft" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold leading-snug text-white">{title}</span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-white/55">{text}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={16} delay={0.2}>
            <button
              onClick={() => openBooking({ mode: "online" })}
              className="btn mt-10 bg-white px-7 py-3.5 text-ink shadow-soft hover:bg-sage hover:shadow-lift"
            >
              <Video className="h-4 w-4" aria-hidden="true" />
              Book Online Consultation
            </button>
          </Reveal>
        </div>

        {/* ---------- Imagery ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <Photo
              src={images.online}
              alt="A person attending a video consultation on a laptop from a bright, comfortable room at home"
              sizes="(max-width: 1024px) 90vw, 46vw"
              ratio="aspect-[5/4]"
            />
          </div>

          {/* Live session chip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="absolute -left-3 top-6 sm:-left-6"
          >
            <div className="animate-float rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-ink">Secure session</p>
                  <p className="text-[11px] text-muted">End-to-end encrypted</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Confirmation chip */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="absolute -bottom-5 right-2 sm:-right-5"
          >
            <div className="animate-float-slow rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden="true" />
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-ink">Evening slots</p>
                  <p className="text-[11px] text-muted">Available online</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
