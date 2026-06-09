"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      // Motion serializes `opacity: 0` differently between SSR (number) and
      // client (string), which triggers a hydration warning even though the
      // visual output is identical. suppressHydrationWarning lets React
      // accept the discrepancy for this single element.
      suppressHydrationWarning
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      // POSITIVE bottom margin extends the IntersectionObserver root below
      // the viewport, so elements that are still 160px below the visible
      // area already count as "in view" and start animating. The reveal is
      // already in motion by the time the user actually scrolls to it.
      viewport={{ once: true, margin: "0px 0px 160px 0px" }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98], delay }
      }
    >
      {children}
    </motion.div>
  );
}
