export type ProjectCategory = "fullstack" | "web" | "data";

export interface CaseStudy {
  context: string;
  problem: string;
  approach: string;
  features: string[];
  impact: string;
  screenshots: { src: string; alt: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  tags: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
  status?: "ongoing"; // when set, row shows an "Ongoing" tag and no external link is required
  caseStudy?: CaseStudy;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  kind: "education" | "experience";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram";
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  whatsapp: string;
  location: string;
  currently: string;
  resumeUrl: string;
  siteUrl: string;
  socials: SocialLink[];
  stack: string[];
  reading: string;
}
