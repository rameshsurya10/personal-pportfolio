"use client";
import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";

export function ProjectRow({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const href = project.caseStudy ? `/work/${project.slug}` : project.liveDemo ?? project.github;
  const isExternal = !project.caseStudy;

  if (!href) return null;

  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const inner = (
    <div className="group grid grid-cols-1 items-end gap-6 py-8 md:grid-cols-[1.5fr_1fr_auto] md:gap-12 md:py-12">
      <div className="flex items-baseline gap-4">
        <motion.h3
          whileHover={prefersReducedMotion ? undefined : { x: 6 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-[family-name:var(--font-display)] text-3xl font-medium text-ink md:text-5xl lg:text-6xl"
          style={{ viewTransitionName: `project-title-${project.slug}` } as React.CSSProperties}
        >
          {project.title}
        </motion.h3>
        {project.status === "ongoing" && (
          <span className="hidden shrink-0 rounded-full border border-border bg-surface-raised px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted md:inline-block">
            <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px animate-pulse rounded-full bg-emerald-500" />
            Ongoing
          </span>
        )}
      </div>

      <div className="space-y-2 text-ink-muted">
        <p className="text-sm leading-relaxed md:text-base">{project.summary}</p>
        <p className="font-mono text-xs uppercase tracking-wider">
          {project.tags.join(" · ")}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="hidden text-2xl text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-ink md:block"
      >
        →
      </span>
    </div>
  );

  return isExternal ? (
    <a href={href} {...linkProps} className="block">
      {inner}
    </a>
  ) : (
    <Link href={href} className="block">{inner}</Link>
  );
}
