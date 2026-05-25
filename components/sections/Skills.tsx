"use client";

import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index={3} eyebrow="Stack" title="What I work with" />

        <Reveal>
          <div>
            {skillGroups.map((group, i) => (
              <div
                key={group.name}
                className={`grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-t border-border${
                  i === skillGroups.length - 1 ? " border-b" : ""
                }`}
              >
                {/* Left: group name */}
                <div className="md:col-span-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {group.name}
                  </span>
                </div>

                {/* Right: skills with individual hover */}
                <div className="md:col-span-3">
                  <div className="flex flex-wrap items-center text-ink text-lg">
                    {group.skills.map((s, idx) => (
                      <span key={s} className="inline-flex items-center">
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-ink-muted/40 mx-3">·</span>
                        )}
                        <motion.span
                          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="inline-block cursor-default"
                        >
                          {s}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
