import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects content", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every featured project has a case study", () => {
    for (const p of projects.filter((p) => p.featured)) {
      expect(p.caseStudy, `${p.slug} must have a caseStudy`).toBeDefined();
    }
  });

  it("has a small, curated set of featured projects (4-8)", () => {
    const count = projects.filter((p) => p.featured).length;
    expect(count).toBeGreaterThanOrEqual(4);
    expect(count).toBeLessThanOrEqual(8);
  });

  it("every project has at least one destination — case study, github, or live demo", () => {
    for (const p of projects) {
      const hasDestination = Boolean(p.caseStudy || p.github || p.liveDemo);
      expect(hasDestination, `${p.slug} needs at least a case study, github, or liveDemo`).toBe(true);
    }
  });
});
