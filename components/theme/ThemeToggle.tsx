"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Some browsers expose `startViewTransition` only as a non-standard method on document.
// Narrow it locally rather than reaching for the global type.
type DocumentWithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Idiomatic next-themes hydration guard — synchronous setState is required here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  function flip() {
    const next = isDark ? "light" : "dark";
    const doc = document as DocumentWithViewTransition;

    // Honor reduced-motion: skip the View Transition flourish, set theme directly.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || prefersReduced) {
      setTheme(next);
      return;
    }

    // Compute the click origin so the reveal radiates from the toggle button.
    const btn = buttonRef.current;
    const rect = btn?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );
    document.documentElement.style.setProperty("--theme-x", `${cx}px`);
    document.documentElement.style.setProperty("--theme-y", `${cy}px`);
    document.documentElement.style.setProperty("--theme-r", `${maxRadius}px`);

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    // Clean up the temp custom properties after the transition is over.
    transition.ready.finally(() => {
      window.setTimeout(() => {
        document.documentElement.style.removeProperty("--theme-x");
        document.documentElement.style.removeProperty("--theme-y");
        document.documentElement.style.removeProperty("--theme-r");
      }, 700);
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle color theme"
      onClick={flip}
      className="font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      [{mounted ? (isDark ? "dark" : "light") : "dark"}]
    </button>
  );
}
