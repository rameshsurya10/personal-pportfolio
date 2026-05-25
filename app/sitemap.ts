import type { MetadataRoute } from "next";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.siteUrl, priority: 1 },
    ...featuredProjects.map((p) => ({
      url: `${site.siteUrl}/work/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
