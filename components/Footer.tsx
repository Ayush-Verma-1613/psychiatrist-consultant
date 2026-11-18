"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/data/navigation";
import { services } from "@/lib/data/services";
import { site } from "@/lib/data/site";
import { useBooking } from "@/lib/booking-context";
import { useLockBodyScroll, useScrollTo } from "@/lib/hooks";
import { Logo } from "./ui/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
} as const;

type LegalKey = "privacy" | "terms" | "disclaimer";

const LEGAL: Record<LegalKey, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "This is placeholder policy text for a demonstration website. It must be replaced with a reviewed privacy policy before the site is used by real patients.",
      "A published policy should explain what personal and health information is collected, the lawful basis for processing it, how long it is retained, who it is shared with, how it is secured, and how a person can request access to or deletion of their data.",
      "It should also name a point of contact for privacy questions and set out how complaints are handled, in line with the Digital Personal Data Protection Act, 2023 and any applicable medical records regulations.",
      "No information submitted through this demonstration site is transmitted, stored or processed. All forms operate entirely within your browser.",
    ],
  },
  terms: {
    title: "Terms and Conditions",
    body: [
      "This is placeholder terms text for a demonstration website and carries no legal effect. It must be replaced with reviewed terms before launch.",
      "Published terms should cover the scope of services offered, appointment booking and cancellation rules, fees and payment, the responsibilities of both the clinic and the patient, limitations of liability, and the governing law and jurisdiction.",
      "Where telemedicine consultations are offered, terms should also reflect the Telemedicine Practice Guidelines applicable to registered medical practitioners in India.",
      "All doctor profiles, availability, pricing and testimonials shown on this site are sample content for demonstration purposes only.",
    ],
  },
  disclaimer: {
    title: "Medical Disclaimer",
    body: [
      "The content on this website is provided for general information and education. It is not medical advice, and it is not a substitute for consultation with a qualified healthcare professional.",
      "Nothing on this site can diagnose a condition. Descriptions of conditions and the lists of common experiences are educational summaries only — recognising yourself in them does not mean you have that condition, and not recognising yourself does not mean you do not.",
      "Never disregard professional medical advice, or delay seeking it, because of something you have read here. Always speak to a qualified psychiatrist or physician about your own circumstances.",
      "This website does not provide emergency services. If you are in immediate danger or experiencing a mental health crisis, call 112 or go to the nearest emergency department.",
      "Doctor profiles, credentials, availability, pricing and testimonials shown here are illustrative demo content and do not describe real practitioners or real patients.",
    ],
  },
};

export function Footer() {
  const scrollTo = useScrollTo();
  const { openBooking } = useBooking();
  const [legal, setLegal] = useState<LegalKey | null>(null);
  const year = new Date().getFullYear();

  useLockBodyScroll(Boolean(legal));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLegal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <footer className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-sage/8 blur-[110px]" />
          <div className="absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-accent/12 blur-[110px]" />
        </div>

        <div className="container-px relative">
          {/* Top */}
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr] lg:gap-8">
            {/* Brand */}
            <div className="max-w-sm">
              <Logo tone="invert" />
              <p className="mt-5 text-[13.5px] leading-[1.75] text-white/55">
                {site.description}
              </p>

              <div className="mt-6 flex gap-2.5">
                {site.social.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              <button onClick={() => openBooking()} className="btn mt-7 bg-white px-6 py-3 text-ink hover:bg-sage">
                Book Consultation
              </button>
            </div>

            {/* Navigate */}
            <nav aria-label="Footer navigation">
              <FooterHeading>Navigate</FooterHeading>
              <ul className="mt-5 space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="group inline-flex items-center gap-1.5 text-[13px] text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav aria-label="Services">
              <FooterHeading>Services</FooterHeading>
              <ul className="mt-5 space-y-2.5">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => scrollTo("services")}
                      className="group inline-flex items-start gap-1.5 text-left text-[13px] leading-snug text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      <span className="mt-2 h-px w-0 shrink-0 bg-accent transition-all duration-300 group-hover:w-3" />
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-5 space-y-4 text-[13px] text-white/55">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
                  <span className="leading-relaxed">
                    {site.contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
                  <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                    {site.contact.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-soft">
                  Emergency
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">
                  For a crisis, call{" "}
                  <a href="tel:112" className="font-bold text-white underline underline-offset-2">
                    112
                  </a>{" "}
                  or visit the nearest emergency department.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-7 sm:flex-row">
            <p className="text-center text-[12px] text-white/40 sm:text-left">
              © {year} {site.name}. Demonstration website — all content is sample material.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {(Object.keys(LEGAL) as LegalKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setLegal(key)}
                  className="text-[12px] text-white/45 transition-colors duration-300 hover:text-white"
                >
                  {LEGAL[key].title}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTo("home")}
              aria-label="Back to top"
              className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-white"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>

      {/* ---------------- Legal modal ---------------- */}
      <AnimatePresence>
        {legal && (
          <div className="fixed inset-0 z-[140] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLegal(null)}
              className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-title"
              initial={{ opacity: 0, y: 44, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-canvas p-6 shadow-lift sm:rounded-[2rem] sm:p-8"
            >
              <button
                onClick={() => setLegal(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-soft transition-colors hover:bg-sage-light"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              <h3 id="legal-title" className="pr-12 font-serif text-[26px] leading-tight text-ink">
                {LEGAL[legal].title}
              </h3>

              <div className="mt-5 space-y-4">
                {LEGAL[legal].body.map((paragraph, i) => (
                  <p key={i} className="text-[13.5px] leading-[1.75] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <button onClick={() => setLegal(null)} className="btn-primary mt-7 w-full">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">{children}</p>
  );
}
