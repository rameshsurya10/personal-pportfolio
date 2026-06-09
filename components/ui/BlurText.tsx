"use client";

import { motion, useReducedMotion } from "motion/react";

interface Props {
  children: string;
  delay?: number;
  perCharDelay?: number;
  className?: string;
  /** Optional substring to render in stronger color for emphasis (e.g. "Acadrix"). Case-insensitive match. */
  emphasize?: string;
}

/**
 * BlurText — premium-feeling per-character entrance.
 *
 * Each character animates from blurred + lifted + transparent to crisp, with a
 * short stagger between characters. Used in the hero eyebrows so the static
 * caption lines reveal themselves on viewport-entry instead of just appearing.
 *
 * Reduced-motion users get the plain string immediately. Screen readers get the
 * full word via aria-label on the outer span; the per-character spans are
 * marked aria-hidden so they don't get read character-by-character.
 */
export function BlurText({
  children,
  delay = 0,
  perCharDelay = 0.015,
  className = "",
  emphasize,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const chars = Array.from(children);
  const emphasisLower = emphasize?.toLowerCase();
  const emphasisStart = emphasisLower
    ? children.toLowerCase().indexOf(emphasisLower)
    : -1;
  const emphasisEnd =
    emphasisStart !== -1 && emphasisLower
      ? emphasisStart + emphasisLower.length
      : -1;

  return (
    <span className={className} aria-label={children}>
      {chars.map((ch, i) => {
        const isEmphasized = i >= emphasisStart && i < emphasisEnd;
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: delay + i * perCharDelay,
            }}
            style={{
              display: "inline-block",
              whiteSpace: ch === " " ? "pre" : "normal",
              color: isEmphasized ? "var(--color-ink)" : undefined,
            }}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}
