import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { featuredProjects, getProjectBySlug } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";
import { DemoFrame } from "@/components/sections/DemoFrame";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;

  return (
    <>
      <ScrollProgress />
      <Header />

      <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Back link — top */}
          <Link
            href="/#work"
            className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to all work
          </Link>

          {/* Eyebrow */}
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
            {project.categoryLabel}
          </p>

          {/* Title */}
          <h1
            className="font-[family-name:var(--font-display)] text-4xl font-medium text-ink sm:text-5xl md:text-6xl mb-6"
            style={{ viewTransitionName: `project-title-${slug}` } as React.CSSProperties}
          >
            {project.title}
          </h1>

          {/* Summary */}
          <p className="text-lg text-ink-muted leading-relaxed mb-8">
            {project.summary}
          </p>

          {/* Tags — mono caption joined with · */}
          {project.tags.length > 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-8">
              {project.tags.join(" · ")}
            </p>
          )}

          {/* CTA links */}
          <div className="flex flex-wrap gap-6 mb-20">
            {project.github && (
              <Button href={project.github} variant="primary" external>
                View on GitHub
              </Button>
            )}
            {project.liveDemo && (
              <Button href={project.liveDemo} variant="secondary" external>
                Live Demo
              </Button>
            )}
          </div>

          {/* Demo frame — browser chrome mock */}
          {(project.liveDemo || project.github) && (
            <Reveal>
              <div className="mb-20">
                {project.liveDemo ? (
                  <DemoFrame
                    url={project.liveDemo}
                    posterImage={project.image}
                    posterAlt={`${project.title} live demo preview`}
                    isLive={true}
                  />
                ) : project.github ? (
                  <DemoFrame
                    url={project.github}
                    posterImage={project.image}
                    posterAlt={`${project.title} GitHub repository preview`}
                    isLive={false}
                  />
                ) : null}
              </div>
            </Reveal>
          )}

          {/* Context */}
          <Reveal>
            <div className="py-10 border-t border-border">
              <SectionHeading eyebrow="Background" title="Context" />
              <p className="text-ink-muted leading-relaxed">{cs.context}</p>
            </div>
          </Reveal>

          {/* Problem */}
          <Reveal delay={0.05}>
            <div className="py-10 border-t border-border">
              <SectionHeading eyebrow="Challenge" title="The problem" />
              <p className="text-ink leading-relaxed">{cs.problem}</p>
            </div>
          </Reveal>

          {/* Approach */}
          <Reveal delay={0.05}>
            <div className="py-10 border-t border-border">
              <SectionHeading eyebrow="Solution" title="My approach" />
              <p className="text-ink leading-relaxed">{cs.approach}</p>
            </div>
          </Reveal>

          {/* Key features */}
          <Reveal delay={0.05}>
            <div className="py-10 border-t border-border">
              <SectionHeading eyebrow="Highlights" title="Key features" />
              <ul className="space-y-3 text-ink-muted">
                {cs.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <span
                      className="font-mono text-xs text-ink-muted shrink-0 mt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Impact */}
          <Reveal delay={0.05}>
            <div className="py-10 border-t border-border border-b">
              <SectionHeading eyebrow="Outcome" title="Impact" />
              <p className="text-ink leading-relaxed">{cs.impact}</p>
            </div>
          </Reveal>

          {/* Back to all work */}
          <div className="mt-16">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
            >
              ← Back to all work
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
