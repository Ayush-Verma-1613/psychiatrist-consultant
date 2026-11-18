"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { articles, type Article } from "@/lib/data/resources";
import { useBooking } from "@/lib/booking-context";
import { useLockBodyScroll } from "@/lib/hooks";
import { Photo } from "./ui/Photo";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ResourcesSection() {
  const [open, setOpen] = useState<Article | null>(null);
  const { openBooking } = useBooking();

  useLockBodyScroll(Boolean(open));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="resources" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-36 bottom-10 h-[26rem] w-[26rem] rounded-full bg-sage/35 blur-[110px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow="Resources"
          title={
            <>
              Explore Mental <span className="italic text-accent-deep">Wellness.</span>
            </>
          }
          description="Plain-language articles written to be genuinely useful — whether you are considering a consultation or simply want to understand things better."
        />

        <RevealGroup stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <RevealItem key={article.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/5 bg-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <Photo
                    src={article.image}
                    alt={`Editorial photograph illustrating the article “${article.title}”`}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    ratio="aspect-[16/10]"
                    imgClassName="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.07]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink shadow-soft backdrop-blur">
                    {article.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {article.readingTime}
                  </span>

                  <h3 className="mt-3 font-serif text-[20px] leading-snug text-ink">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => setOpen(article)}
                    className="group/btn mt-5 inline-flex w-fit items-center gap-1.5 text-[13px] font-bold text-accent-deep"
                    aria-label={`Read the full article: ${article.title}`}
                  >
                    Read More
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* ---------------- Article modal ---------------- */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(null)}
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-title"
              initial={{ opacity: 0, y: 44, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-canvas shadow-lift sm:rounded-[2rem]"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close article"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              <Photo
                src={open.image}
                alt={`Editorial photograph for “${open.title}”`}
                sizes="(max-width: 768px) 100vw, 672px"
                ratio="aspect-[16/9]"
              />

              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-sage px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink">
                    {open.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {open.readingTime}
                  </span>
                </div>

                <h3 id="article-title" className="mt-4 font-serif text-[30px] leading-tight text-balance">
                  {open.title}
                </h3>

                <div className="mt-6 space-y-5">
                  {open.body.map((paragraph, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.8] text-muted text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-ink/5 bg-sage-light p-5">
                  <p className="text-[12.5px] leading-relaxed text-muted">
                    This article is general information, not medical advice, and it cannot diagnose
                    you. For guidance on your own situation, speak with a qualified psychiatrist.
                  </p>
                  <button
                    onClick={() => {
                      setOpen(null);
                      window.setTimeout(() => openBooking(), 260);
                    }}
                    className="btn-primary mt-4 w-full sm:w-auto"
                  >
                    Book a Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
