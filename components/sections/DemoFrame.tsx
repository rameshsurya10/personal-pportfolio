"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface DemoFrameProps {
  url: string;
  posterImage: string;
  posterAlt: string;
  isLive: boolean; // true → "Open live demo"; false → "Open on GitHub"
}

export function DemoFrame({ url, posterImage, posterAlt, isLive }: DemoFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const displayUrl = url.replace(/^https?:\/\//, "");
  const cta = isLive ? "Open live demo →" : "Open on GitHub →";

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-raised shadow-[var(--shadow-soft)]"
      aria-label={`${cta} — ${posterAlt}`}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar pill */}
        <div className="flex-1 truncate rounded-md border border-border bg-surface px-3 py-1 text-center font-mono text-xs text-ink-muted">
          {displayUrl}
        </div>
      </div>

      {/* Poster */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100"
        />
        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-surface/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-surface/40 group-hover:opacity-100 group-hover:backdrop-blur-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-ink">
            {cta}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
