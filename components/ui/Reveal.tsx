"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export function staggerParent(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  once?: boolean;
  amount?: number;
};

/** Scroll-triggered entrance wrapper used across every section. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
  once = true,
  amount = 0.25,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its `<RevealItem>` children into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
