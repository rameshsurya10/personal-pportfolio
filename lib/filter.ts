import type { Project, ProjectCategory } from "@/lib/types";

export type FilterValue = "all" | ProjectCategory;

export function filterProjects(projects: Project[], filter: FilterValue): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.category === filter);
}
