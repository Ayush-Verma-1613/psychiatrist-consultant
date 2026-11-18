"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactValues } from "@/lib/booking";
import { site } from "@/lib/data/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
} as const;

const SUBJECTS = [
  "General enquiry",
  "Booking an appointment",
  "Rescheduling or cancelling",
  "Billing question",
  "Feedback",
  "Something else",
];

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" },
  });

  const onSubmit = async () => {
    setStatus("sending");
    try {
      // Demo submission — no backend is connected, nothing leaves the browser.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setStatus("success");
      reset();
      window.setTimeout(() => setStatus("idle"), 7000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-16 h-[28rem] w-[28rem] rounded-full bg-sage/35 blur-[110px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              We&rsquo;re Here to <span className="italic text-accent-deep">Help.</span>
            </>
          }
          description="Questions about booking, our psychiatrists or what to expect? Send a message and the clinic team will get back to you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ---------------- Details ---------------- */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-[1.75rem] border border-ink/5 bg-white p-6 shadow-soft sm:p-7">
                <ul className="space-y-6">
                  <ContactRow icon={MapPin} label="Clinic address">
                    {site.contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </ContactRow>

                  <ContactRow icon={Phone} label={site.contact.phoneLabel}>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-ink">
                      {site.contact.phone}
                    </a>
                  </ContactRow>

                  <ContactRow icon={Mail} label={site.contact.emailLabel}>
                    <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
                      {site.contact.email}
                    </a>
                  </ContactRow>

                  <ContactRow icon={Clock3} label="Working hours">
                    {site.contact.hours.map((h) => (
                      <span key={h.days} className="flex flex-wrap justify-between gap-x-4">
                        <span>{h.days}</span>
                        <span className="font-semibold text-ink">{h.time}</span>
                      </span>
                    ))}
                  </ContactRow>
                </ul>

                <div className="mt-7 border-t border-ink/5 pt-5">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted">
                    Follow MindWell
                  </p>
                  <div className="mt-3 flex gap-2.5">
                    {site.social.map((s) => {
                      const Icon = SOCIAL_ICONS[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}
                          className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-canvas text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white hover:text-accent-deep hover:shadow-soft"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-ink/5 bg-sage-light shadow-soft">
                <div aria-hidden="true" className="absolute inset-0 opacity-70">
                  <svg className="h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0H0v40" fill="none" stroke="#C3DDD1" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="400" height="260" fill="url(#map-grid)" />
                    <path d="M0 150 Q 110 110 190 165 T 400 120" fill="none" stroke="#C3DDD1" strokeWidth="9" />
                    <path d="M150 0 L170 260" fill="none" stroke="#C3DDD1" strokeWidth="7" />
                    <rect x="38" y="38" width="62" height="48" rx="6" fill="#DCECE5" />
                    <rect x="268" y="178" width="78" height="54" rx="6" fill="#DCECE5" />
                  </svg>
                </div>

                <div className="relative grid min-h-[190px] place-items-center p-6 text-center">
                  <div>
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-card">
                      <Navigation className="h-5 w-5 text-accent" aria-hidden="true" />
                    </span>
                    <p className="mt-3.5 font-serif text-[17px] text-ink">Map integration placeholder</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                      An interactive map will be embedded here once the clinic address is confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------------- Form ---------------- */}
          <Reveal delay={0.08}>
            <div className="rounded-[1.75rem] border border-ink/5 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-serif text-[22px] leading-snug text-ink">Send us a message</h3>
              <p className="mt-1.5 text-[12.5px] text-muted">
                Please keep medical details for your consultation rather than this form.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
                <FormField label="Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="field"
                    aria-invalid={Boolean(errors.name)}
                  />
                </FormField>

                <FormField label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    className="field"
                    aria-invalid={Boolean(errors.email)}
                  />
                </FormField>

                <FormField label="Phone (optional)" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 00000 00000"
                    className="field"
                    aria-invalid={Boolean(errors.phone)}
                  />
                </FormField>

                <FormField label="Subject" error={errors.subject?.message}>
                  <select
                    {...register("subject")}
                    className="field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718078' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                    }}
                    aria-invalid={Boolean(errors.subject)}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Message" error={errors.message?.message} className="sm:col-span-2">
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="How can we help?"
                    className="field resize-none"
                    aria-invalid={Boolean(errors.message)}
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Status */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    role="status"
                    className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                  >
                    <CheckCircle2 className="mt-px h-4.5 w-4.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <p className="text-[12.5px] leading-relaxed text-emerald-900">
                      <strong className="font-bold">Thank you — your message was received.</strong>{" "}
                      This is a demo form, so nothing was actually sent. With a backend connected,
                      the clinic team would reply within one working day.
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                  >
                    <AlertCircle className="mt-px h-4.5 w-4.5 shrink-0 text-red-600" aria-hidden="true" />
                    <p className="text-[12.5px] leading-relaxed text-red-900">
                      <strong className="font-bold">Something went wrong.</strong> Please try again,
                      or reach the clinic by phone.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage">
        <Icon className="h-[17px] w-[17px] text-ink" aria-hidden={true} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
        <div className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-ink-soft">{children}</div>
      </div>
    </li>
  );
}

function FormField({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22 }}
            role="alert"
            className="mt-1.5 text-[11.5px] font-semibold text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
