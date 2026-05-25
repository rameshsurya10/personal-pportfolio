# Ramesh Aravindh — Portfolio

Personal portfolio site for Ramesh Aravindh T — Full-Stack Developer & Data Analyst.

The original static HTML/CSS/JS site has been archived under [`_legacy/`](./_legacy)
and rebuilt as a Next.js application.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with CSS-token theming (`@theme` in [app/globals.css](./app/globals.css))
- **Animation:** `motion` (Framer Motion successor)
- **Theming:** `next-themes` (light / dark, `prefers-reduced-motion` honored)
- **Contact:** Web3Forms + hCaptcha (client-side, no backend)
- **Testing:** Vitest + React Testing Library for unit; Playwright for E2E
- **Hosting:** Vercel

## Repository layout

```
app/                Routes — landing page, /work/[slug] case studies,
                    sitemap, robots, dynamic icon/apple-icon/opengraph-image
components/
  layout/           Header, Footer, PageTransition
  sections/         Hero, About, Skills, Work, ProjectCard, Experience,
                    Contact, Reveal (scroll-reveal helper)
  theme/            ThemeProvider, ThemeToggle
  ui/               Button, Card, Tag, SectionHeading, Toast, SocialIcons
content/            Single source of truth for all displayed content
  site.ts           Name, role, contact info, social links
  projects.ts       11 projects (5 featured with full case studies)
  skills.ts         Skill groups
  experience.ts     Education / experience timeline
  projects.test.ts  Data integrity tests
lib/
  types.ts          Shared TypeScript interfaces
  filter.ts         Project filtering helper (+ test)
  validateContact.ts Contact form validation (+ test)
e2e/                Playwright tests
docs/superpowers/   Design spec and implementation plan
_legacy/            Archived original static site
```

## Content data model

All displayed text and links live in the typed files under [`content/`](./content).
Components are presentational and consume that data. Editing a project means editing
one entry in [`content/projects.ts`](./content/projects.ts); no component code changes.

## Scripts

```bash
npm run dev         # Local dev server on http://localhost:3000
npm run build       # Production build
npm run start       # Run the production build
npm run lint        # ESLint
npm run test        # Vitest unit tests (single run)
npm run test:watch  # Vitest watch mode
npm run test:e2e    # Playwright E2E tests (builds + starts the app)
```

## Deployment

Designed for Vercel.

- `app/sitemap.ts` and `app/robots.ts` produce `/sitemap.xml` and `/robots.txt`.
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` generate branded
  PNGs at build time using Next.js's `ImageResponse` (no external image tools needed).
- `site.siteUrl` in [`content/site.ts`](./content/site.ts) should be updated to the
  real production URL after the first deploy so canonical URLs, the sitemap, and OG
  metadata are correct.

## Accessibility

- Skip-to-content link on every page
- Semantic landmarks (`<header>`, `<main id="main">`, `<footer>`, `<nav aria-label="...">`)
- All form fields labelled with `<label htmlFor>`; errors surfaced via `aria-invalid` and `aria-describedby`
- Work-section filter uses `role="tab"` + `aria-selected` with full arrow-key navigation
- All animations respect `prefers-reduced-motion` (CSS and Framer Motion paths)
- Lighthouse target: 95+ across Performance / Accessibility / Best Practices / SEO

## Original site

The original static HTML/CSS/JS site is preserved in [`_legacy/`](./_legacy) for
reference. It is excluded from the Next.js build and from ESLint via
[`eslint.config.mjs`](./eslint.config.mjs).
