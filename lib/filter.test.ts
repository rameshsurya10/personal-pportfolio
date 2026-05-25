import { describe, it, expect } from "vitest";
import { filterProjects } from "./filter";
import { projects } from "@/content/projects";

describe("filterProjects", () => {
  it("returns all projects for the 'all' filter", () => {
    expect(filterProjects(projects, "all")).toHaveLength(projects.length);
  });

  it("returns only data projects for the 'data' filter", () => {
    const result = filterProjects(projects, "data");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "data")).toBe(true);
  });

  it("returns only fullstack projects for the 'fullstack' filter", () => {
    const result = filterProjects(projects, "fullstack");
    expect(result.every((p) => p.category === "fullstack")).toBe(true);
  });

});
