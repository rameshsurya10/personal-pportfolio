"use client";
import { useState } from "react";
import { projects } from "@/content/projects";
import { filterProjects } from "@/lib/filter";
import type { ProjectCategory } from "@/lib/types";
import { ProjectRow } from "./ProjectRow";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: "Full-Stack", value: "fullstack" },
  { label: "Data Analytics", value: "data" },
];

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory>("fullstack");
  const visible = filterProjects(projects, filter);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index={1} eyebrow="Selected Work" title="Recent projects" />

        <div role="tablist" aria-label="Filter projects" className="mb-12 flex gap-8 border-b border-border pb-4">
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.value)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul role="list" className="divide-y divide-border border-t border-b border-border">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
