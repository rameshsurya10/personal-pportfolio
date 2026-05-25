import Image from "next/image";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border py-24 md:py-40"
    >
      {/* Full-bleed background portrait. Grayscale, low opacity so it reads as texture.
          On desktop it sits on the right; on mobile it fills the section so text overlays it. */}
      <div className="absolute inset-y-0 right-0 -z-10 h-full w-full md:w-[65%] lg:w-[55%]">
        <Image
          src="/images/portrait.jpg"
          alt={`Portrait of ${site.name}`}
          fill
          sizes="(min-width: 1024px) 55vw, (min-width: 768px) 65vw, 100vw"
          priority={false}
          className="object-cover object-center grayscale contrast-110 opacity-30 md:opacity-55 lg:opacity-60"
        />
        {/* Left-to-right gradient: surface on the left fades to transparent on the right.
            Keeps text legible on the overlap region, lets the portrait breathe on its outer edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent md:from-surface md:via-surface/70 md:to-transparent"
        />
        {/* Top and bottom feather into the surface so the portrait blends with sibling sections. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index={2} eyebrow="About" title="A note on how I work" />

        {/* Text panel: lives over the portrait, max-w-2xl, with a translucent surface
            and backdrop blur so words stay readable against the photo. */}
        <Reveal>
          <div className="relative max-w-2xl rounded-[var(--radius-card)] border border-border bg-surface/70 p-8 backdrop-blur-md md:p-10">
            {/* Opening sentence in display-serif */}
            <p className="mb-8 font-[family-name:var(--font-display)] text-3xl font-medium leading-snug text-ink md:text-4xl">
              Two tracks, one practice.
            </p>

            {/* Body paragraphs */}
            <p className="mb-6 text-base leading-relaxed text-ink-muted md:text-lg">
              I work across the full stack and across the data lifecycle. On the engineering
              side, I build production web applications with React, Next.js, Python and Flask,
              and care about systems that are fast, accessible, and honest about what they do.
            </p>

            <p className="text-base leading-relaxed text-ink-muted md:text-lg">
              On the analytics side, I clean messy datasets and turn them into clear decisions.
              Recently I have been building multi-tenant platforms, AI-assisted tools, and
              exploratory data projects — the two tracks keep each other sharp.
            </p>

            {/* Key-value strip */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <span>Location · {site.location}</span>
              <span>Email · {site.email}</span>
              <span>Status · Open to work</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
