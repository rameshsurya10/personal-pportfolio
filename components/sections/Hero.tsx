"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import TextType from "@/components/ui/TextType";
import { BlurText } from "@/components/ui/BlurText";
import { site } from "@/content/site";

// Soft repeating pulse for the ↳ arrow — adds a sign of life to the
// otherwise-static eyebrow rows without competing for attention.
const arrowPulse = {
  initial: { opacity: 0.4 },
  animate: { opacity: [0.4, 1, 0.4] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const eyebrowJSX = (
    <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
      <motion.span {...arrowPulse} className="mr-1 inline-block">↳</motion.span>
      <BlurText delay={0.1}>
        {` Available for new work · Based in ${site.location}`}
      </BlurText>
    </p>
  );

  const currentlyJSX = (
    <p className="mb-8 font-mono text-xs uppercase tracking-widest text-ink-muted">
      <motion.span {...arrowPulse} className="mr-1 inline-block">↳</motion.span>
      <BlurText delay={0.25} emphasize="Acadrix">
        {` Currently · ${site.currently}`}
      </BlurText>
    </p>
  );

  const nameJSX = (
    <h1 className="font-[family-name:var(--font-display)] text-6xl font-medium leading-[0.95] text-ink sm:text-7xl md:text-8xl lg:text-9xl">
      {site.name}
    </h1>
  );

  // Typewriter rotates through honest descriptors of the role.
  // The tagline below it stays static so the reader has a stable anchor.
  const roleJSX = (
    <div className="mt-10 max-w-3xl space-y-2">
      <TextType
        as="p"
        text={[
          "Full-Stack Developer",
          "Data Analyst",
          "Building multi-tenant platforms",
          "Open to new work",
        ]}
        className="text-lg text-ink md:text-xl"
        typingSpeed={60}
        deletingSpeed={30}
        pauseDuration={1800}
        cursorCharacter="_"
        cursorClassName="text-accent"
        cursorBlinkDuration={0.6}
      />
      <p className="text-base text-ink-muted md:text-lg leading-relaxed">
        {site.tagline}
      </p>
    </div>
  );

  const credentialsJSX = (
    <p className="mt-6 max-w-3xl text-base text-ink-muted md:text-lg">
      I ship full-stack web applications across React, Next.js, Python and Flask, and run
      analytics work that turns raw data into clear decisions. Recently building multi-tenant
      platforms, AI-assisted tools, and exploratory data projects.
    </p>
  );

  const ctaJSX = (
    <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
      <Button href="#work" variant="primary">View work</Button>
      <Button href={site.resumeUrl} variant="secondary" download>Download CV</Button>
    </div>
  );

  // Explicit delays: eyebrow 0, currently 0.05, name 0.1, role 0.2, credentials 0.3, cta 0.4
  const items: { el: React.ReactNode; delay: number }[] = [
    { el: eyebrowJSX, delay: 0 },
    { el: currentlyJSX, delay: 0.05 },
    { el: nameJSX, delay: 0.1 },
    { el: roleJSX, delay: 0.2 },
    { el: credentialsJSX, delay: 0.3 },
    { el: ctaJSX, delay: 0.4 },
  ];

  return (
    <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
        {/* Left column — staggered text */}
        <div>
          {items.map(({ el, delay }, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay }
              }
            >
              {el}
            </motion.div>
          ))}
        </div>

        {/* Right column — portrait with parallax */}
        <motion.div
          ref={imageRef}
          style={prefersReducedMotion ? undefined : { y }}
          className="flex justify-center md:justify-end"
        >
          <Image
            src="/images/portrait.jpg"
            alt={`Portrait of ${site.name}`}
            width={520}
            height={650}
            priority
            className="w-full h-auto max-w-[420px] mx-auto md:mx-0 rounded-[var(--radius-card)] border border-border grayscale contrast-110 transition-all duration-700 ease-out hover:grayscale-0 hover:contrast-100"
          />
        </motion.div>
      </div>
    </section>
  );
}
