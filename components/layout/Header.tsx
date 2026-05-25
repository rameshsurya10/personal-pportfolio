"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// ---------------------------------------------------------------------------
// GMTClock — SSR-safe: initializes to placeholder, ticks every 1 s client-side
// ---------------------------------------------------------------------------
function GMTClock() {
  const [time, setTime] = useState<string>("--:--:-- GMT");

  useEffect(() => {
    function tick() {
      const now = new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(`${now} GMT`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs tabular-nums text-ink-muted">
      {time}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Nav items
// ---------------------------------------------------------------------------
const NAV = [
  { label: "Index", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Header — plain fixed top bar (no floating pill, no mobile overlay)
// ---------------------------------------------------------------------------
export function Header() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-6 py-4 lg:px-8">
        {/* Left: wordmark */}
        <Link
          href="#home"
          className="font-[family-name:var(--font-display)] text-lg font-medium text-ink tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Ramesh Aravindh — home"
        >
          RA — Portfolio
        </Link>

        {/* Center: nav links (hidden on mobile) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {NAV.map((item) => (
            <motion.span
              key={item.href}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-block"
            >
              <Link
                href={item.href}
                className="text-sm text-ink-muted hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            </motion.span>
          ))}
        </nav>

        {/* Right: clock · theme toggle */}
        <div className="flex items-center gap-3">
          <GMTClock />
          <span className="text-ink-muted/40" aria-hidden="true">·</span>
          <ThemeToggle />
        </div>

        {/* Mobile-only: nav links stacked below in a flex-wrap row */}
        <nav
          aria-label="Mobile navigation"
          className="flex md:hidden w-full flex-wrap items-center gap-x-6 gap-y-1 pt-3"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
