"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  GraduationCap,
  Languages,
  MonitorSmartphone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { doctors, type Doctor } from "@/lib/data/doctors";
import { useBooking } from "@/lib/booking-context";
import { useLockBodyScroll } from "@/lib/hooks";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { DemoNote, SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DoctorsSection() {
  const { openBooking } = useBooking();
  const [profile, setProfile] = useState<Doctor | null>(null);
  const [showAll, setShowAll] = useState(false);

  useLockBodyScroll(Boolean(profile));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProfile(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Three cards by default; the CTA reveals the full listing in place.
  const visible = showAll ? doctors : doctors.slice(0, 3);

  return (
    <section id="doctors" className="section-y relative overflow-hidden bg-sage-light">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain opacity-60" />

      <div className="container-px">
        <SectionHeading
          eyebrow="Our Specialists"
          title={
            <>
              Meet the Experts{" "}
              <span className="italic text-accent-deep">Who Care.</span>
            </>
          }
          description="Consultant psychiatrists with specialist training across adult, child and adolescent mental health. Choose the clinician whose focus and approach feel right for you."
        />

        <RevealGroup
          stagger={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {visible.map((doctor) => (
              <RevealItem key={doctor.id}>
                <motion.article
                  layout
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/5 bg-white shadow-soft transition-shadow duration-500 ease-premium hover:shadow-lift"
                >
                  {/* Portrait */}
                  <div className="relative overflow-hidden">
                    <Photo
                      src={doctor.image}
                      alt={`Portrait of ${doctor.name}, ${doctor.designation}`}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      ratio="aspect-[4/5]"
                      imgClassName="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.06]"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent"
                    />

                    {/* Specialty badges */}
                    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
                      {doctor.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full bg-white/92 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink shadow-soft backdrop-blur"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Name plate */}
                    <div className="absolute inset-x-5 bottom-4 text-white">
                      <h3 className="font-serif text-[21px] leading-tight text-white">{doctor.name}</h3>
                      <p className="mt-0.5 text-[12px] font-medium text-white/80">{doctor.designation}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <dl className="space-y-2.5 text-[12.5px]">
                      <div className="flex gap-2.5">
                        <dt className="sr-only">Qualifications</dt>
                        <GraduationCap className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <dd className="leading-snug text-ink-soft">{doctor.qualifications}</dd>
                      </div>
                      <div className="flex gap-2.5">
                        <dt className="sr-only">Experience</dt>
                        <BadgeCheck className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <dd className="leading-snug text-ink-soft">{doctor.experience}</dd>
                      </div>
                      <div className="flex gap-2.5">
                        <dt className="sr-only">Languages</dt>
                        <Languages className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <dd className="leading-snug text-ink-soft">{doctor.languages.join(", ")}</dd>
                      </div>
                      <div className="flex gap-2.5">
                        <dt className="sr-only">Consultation type</dt>
                        <MonitorSmartphone className="mt-px h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <dd className="leading-snug text-ink-soft">{doctor.consultationType}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex items-end justify-between border-t border-ink/5 pt-4">
                      <div>
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                          Consultation fee
                        </p>
                        <p className="mt-0.5 font-serif text-[22px] leading-none text-ink">
                          {doctor.fee}
                          <span className="ml-1 text-[11px] font-sans font-medium text-muted">
                            / session
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => setProfile(doctor)}
                        className="btn flex-1 border border-ink/10 bg-white px-4 py-2.5 text-[13px] text-ink hover:border-ink/20 hover:bg-canvas"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => openBooking({ doctorId: doctor.id })}
                        className="btn flex-1 bg-ink px-4 py-2.5 text-[13px] text-white hover:bg-ink-soft"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </AnimatePresence>
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4">
            {!showAll && doctors.length > 3 && (
              <button onClick={() => setShowAll(true)} className="btn-ghost group">
                View All Specialists
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            )}
            <DemoNote className="max-w-xl text-center">
              Sample profiles shown for demonstration. Names, credentials, experience and fees are
              illustrative placeholders until real practitioner details are provided.
            </DemoNote>
          </div>
        </Reveal>
      </div>

      {/* ---------------- Profile modal ---------------- */}
      <AnimatePresence>
        {profile && (
          <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setProfile(null)}
              className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="doctor-profile-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-canvas shadow-lift sm:rounded-[2rem]"
            >
              <button
                onClick={() => setProfile(null)}
                aria-label="Close profile"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              <div className="grid sm:grid-cols-[minmax(0,240px)_1fr]">
                <div className="relative hidden sm:block">
                  <Photo
                    src={profile.image}
                    alt={`Portrait of ${profile.name}`}
                    sizes="240px"
                    className="h-full"
                    ratio="h-full min-h-[320px]"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <span className="eyebrow">
                    <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Sample profile
                  </span>

                  <h3 id="doctor-profile-title" className="mt-4 font-serif text-[30px] leading-tight">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-accent-deep">{profile.designation}</p>

                  <p className="mt-5 text-[14px] leading-relaxed text-muted">{profile.about}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Detail label="Qualifications" value={profile.qualifications} />
                    <Detail label="Experience" value={profile.experience} />
                    <Detail label="Languages" value={profile.languages.join(", ")} />
                    <Detail label="Consultation" value={profile.consultationType} />
                  </div>

                  <div className="mt-6">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Areas of focus
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {profile.focusAreas.map((area) => (
                        <li key={area} className="flex items-start gap-2 text-[13px] text-ink-soft">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-col items-start gap-3 border-t border-ink/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                        Demo fee
                      </p>
                      <p className="font-serif text-[24px] leading-none text-ink">{profile.fee}</p>
                    </div>
                    <button
                      onClick={() => {
                        const id = profile.id;
                        setProfile(null);
                        window.setTimeout(() => openBooking({ doctorId: id }), 260);
                      }}
                      className="btn-primary w-full sm:w-auto"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/5 bg-white p-4">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1.5 text-[13px] font-medium leading-snug text-ink">{value}</p>
    </div>
  );
}
