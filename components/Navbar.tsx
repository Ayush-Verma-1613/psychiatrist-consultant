"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, LogIn, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, sectionIds } from "@/lib/data/navigation";
import { useActiveSection, useLockBodyScroll, useScrolled, useScrollTo } from "@/lib/hooks";
import { useBooking } from "@/lib/booking-context";
import { Logo } from "./ui/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Maps nav links to the section that should light them up while scrolling. */
const OWNS: Record<string, string[]> = {
  home: ["home", "trust"],
  about: ["about"],
  doctors: ["doctors"],
  conditions: ["conditions"],
  services: ["services", "process"],
  pricing: ["online", "pricing"],
  resources: ["testimonials", "resources", "faq"],
  contact: ["contact"],
};

export function Navbar() {
  const scrolled = useScrolled(16);
  const activeSection = useActiveSection(sectionIds);
  const scrollTo = useScrollTo();
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  useLockBodyScroll(menuOpen);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeNavId =
    navItems.find((item) => OWNS[item.id]?.includes(activeSection))?.id ?? "home";

  const go = (id: string) => {
    setMenuOpen(false);
    // Let the menu close before scrolling so the motion reads cleanly.
    window.setTimeout(() => scrollTo(id), menuOpen ? 220 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[90]"
      >
        <div
          className={[
            "transition-all duration-500 ease-premium",
            scrolled
              ? "border-b border-ink/5 bg-canvas/85 backdrop-blur-xl shadow-[0_1px_24px_-12px_rgba(38,59,53,0.25)]"
              : "border-b border-transparent bg-transparent",
          ].join(" ")}
        >
          <nav
            aria-label="Primary"
            className="container-px flex h-[var(--nav-h)] items-center justify-between gap-4"
          >
            <button
              onClick={() => go("home")}
              className="group rounded-xl py-1 pr-2 transition-opacity hover:opacity-80"
              aria-label="MindWell — back to top"
            >
              <Logo />
            </button>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const isActive = activeNavId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      ].join(" ")}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-sage"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Desktop actions <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-muted transition-colors duration-300 hover:text-ink"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Login
              </button>*/}
            <div className="hidden items-center gap-2 lg:flex">
              
              <button
                onClick={() => openBooking()}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-white shadow-soft transition-all duration-300 ease-premium hover:bg-ink-soft hover:shadow-lift"
              >
                <CalendarCheck
                  className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-6"
                  aria-hidden="true"
                />
                Book Consultation
              </button>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/80 backdrop-blur transition-colors hover:border-ink/20 lg:hidden"
            >
              <span className="relative block h-[14px] w-[20px]">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute left-0 top-0 block h-[1.8px] w-full rounded-full bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[6px] block h-[1.8px] w-full rounded-full bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute bottom-0 left-0 block h-[1.8px] w-full rounded-full bg-ink"
                />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[88] bg-ink/25 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="fixed inset-x-0 top-0 z-[89] max-h-[92dvh] overflow-y-auto rounded-b-[2rem] bg-canvas pb-7 pt-[calc(var(--nav-h)+10px)] shadow-lift lg:hidden"
            >
              <div className="container-px">
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } } }}
                  className="flex flex-col"
                >
                  {navItems.map((item) => {
                    const isActive = activeNavId === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: -14 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                        }}
                      >
                        <button
                          onClick={() => go(item.id)}
                          className={[
                            "flex w-full items-center justify-between border-b border-ink/5 py-4 text-left transition-colors",
                            isActive ? "text-ink" : "text-muted",
                          ].join(" ")}
                        >
                          <span className="font-serif text-[22px]">{item.label}</span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                        </button>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.5, ease: EASE }}
                  className="mt-6 flex flex-col gap-2.5"
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      window.setTimeout(() => openBooking(), 240);
                    }}
                    className="btn-primary w-full"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Book Consultation
                  </button>
                  {/* <button onClick={() => go("contact")} className="btn-ghost w-full">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Login
                  </button> */}
                  <a
                    href="tel:112"
                    className="mt-1.5 inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold text-muted"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Emergency? Call 112
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
