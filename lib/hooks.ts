"use client";

import { useCallback, useEffect, useState } from "react";

/** True once the viewport has scrolled past `offset` pixels. */
export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * Scroll-spy: returns the id of the section currently occupying the
 * reading area of the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const probe = window.innerHeight * 0.32;
      let current = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top - probe <= 0) current = id;
      }

      // Pin the final section once the page is scrolled to the bottom.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }

      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids]);

  return active;
}

/** Smooth-scrolls to a section, accounting for the sticky navbar height. */
export function useScrollTo() {
  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 76;
    const top = el.getBoundingClientRect().top + window.scrollY - navH + 1;

    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);
}

/** Locks body scroll while a modal is open, without layout shift. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [locked]);
}

/** Mirrors the user's reduced-motion preference. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
