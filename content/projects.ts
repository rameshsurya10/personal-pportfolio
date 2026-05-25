import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "acadrix-school-platform",
    title: "Acadrix",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Multi-role K-12 school management platform — 6 user roles, 11 Django apps, 100+ API endpoints, covering admissions, fees, report cards, payroll, leave, messaging, and AI question generation.",
    tags: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Django 5",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
      "JWT",
      "TOTP 2FA",
    ],
    image: "/images/projects/project-7.jpg",
    featured: true,
    status: "ongoing",
    caseStudy: {
      context:
        "Indian K-12 schools manage admissions, fees, grades, certificates, payroll, and parent communication across separate spreadsheets, paper forms, and disconnected SaaS tools. The full lifecycle — from a parent's first inquiry to a graduating student's transfer certificate — has no single source of truth.",
      problem:
        "Six very different user types (Super Admin, Admin, Finance, Principal, Teacher, Student) each need a focused interface and authority boundary. Indian-specific requirements pile on: CBSE / ICSE / State board report card formats, SMS OTP via MSG91 for parent contact, UDISE government compliance reporting, Razorpay for online fee collection, and Indian payroll components (PF, ESI, TDS). Storage backend should be swappable between local disk, S3, R2, B2, or MinIO depending on the school's deployment.",
      approach:
        "Django 5 + DRF backend with 11 domain-bounded apps and a React 18 + Vite + TypeScript front end with role-isolated route groups. Auth supports email/password, email and SMS OTP, Google OAuth2, and TOTP 2FA — with JWT refresh-token rotation and blacklisting. PostgreSQL for source-of-truth, Redis for cache plus SSE event stream plus Celery broker. Celery + Celery Beat handle scheduled announcements and OTP delivery. Pluggable storage (local / S3 / R2 / B2 / MinIO) toggled via env. AI question generation pipeline extracts text from uploaded PDFs and produces 2-mark / 5-mark questions with rubrics. drf-spectacular auto-generates Swagger documentation for all 100+ endpoints.",
      features: [
        "6 role-based dashboards (Super Admin, Admin, Finance, Principal, Teacher, Student) with custom DRF permission classes on every endpoint",
        "Admissions pipeline state machine: pending → verified → approved → finalized, with document verification at each stage",
        "Configurable fee templates per grade per academic year — auto-applied on enrollment, with scholarships, sibling discounts, and merit awards",
        "Report card engine: CBSE / ICSE / State / Custom templates; data snapshot-frozen at generation for audit integrity; status flow draft → final → distributed",
        "Certificate templates (Transfer, Bonafide, Character, Migration) with placeholder rendering and serial-number tracking",
        "AI question generation from uploaded source PDFs — 2-mark + 5-mark + answer keys + rubrics, linkable to teacher assessments",
        "Indian payroll with Basic / HRA / DA / PF / ESI / TDS components, monthly runs with attendance-based calculation",
        "Hardened auth: JWT rotation + blacklisting, rate limiting (5 login/min, 3 password reset/min), TOTP 2FA, audit logging on critical operations",
        "Auto-generated API docs via drf-spectacular at /api/docs/ (Swagger) and /api/schema/ (OpenAPI)",
      ],
      impact:
        "11 Django apps, 100+ API endpoints, 40+ database tables, 35+ frontend pages — all role-scoped end-to-end. UDISE government compliance reporting built in. Currently in active development for deployment to Indian K-12 institutions.",
      screenshots: [{ src: "/images/projects/project-7.jpg", alt: "Acadrix dashboard" }],
    },
  },
  {
    slug: "bigtreat-mlm-platform",
    title: "BigTreat — MLM Community Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Multi-level commission platform with a TikTok-style media feed, admin-gated reactivation workflow, and row-level commission safety — production-deployed on Render at ~300–500 req/sec.",
    tags: ["React", "TypeScript", "Vite", "Redux Toolkit", "Flask", "Postgres", "Redis", "Tailwind"],
    image: "/images/projects/project-11.jpg",
    liveDemo: "https://bigteam.in",
    featured: true,
    caseStudy: {
      context:
        "A production platform combining a TikTok/Instagram-style media feed with an MLM commission engine. Users activate via package purchase, earn commissions through their downline, hit a 2/2 commission cap, and submit reactivation requests to an admin approval queue.",
      problem:
        "The first build had several critical risks: reactivation was self-serve with no admin oversight, letting bad actors cycle through positions to game the chain. Activation history was overwritten on each new cycle, destroying the lifetime audit. The profile page was firing hundreds of API calls per second due to a useEffect dependency bug. The default in-memory token blacklist did nothing across 8 gunicorn workers — log out on worker 3 and worker 5 still accepted the token. Default Flask also exposed the app to clickjacking, MIME sniffing, brute-force auth, and unbounded request bodies.",
      approach:
        "Built a dedicated admin approval workflow with DB-level uniqueness on pending requests, row-level locking and a balance re-check at approval time to prevent double-credit races. Added a JSONB activation_history column with three GIN indexes for fast lifetime queries. Fixed the API flood by correcting the useEffect dependency array. Moved the JWT blacklist to Redis so all 64 concurrent handlers (8 workers × 8 threads) share state. Hardened with strict security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy), CORS allowlist, Flask-Limiter on auth routes, and a 16KB JSON body cap.",
      features: [
        "Admin-gated reactivation workflow with DB-enforced uniqueness on pending requests and row-level locking on approval",
        "JSONB activation history with GIN-indexed lifetime audit — every cycle, package, position, and commission preserved",
        "Redis-backed JWT blacklist for true multi-worker logout consistency across 64 concurrent handlers",
        "Hardened security: CSP, HSTS, X-Frame-Options, Permissions-Policy, brute-force rate limiting, 16KB JSON cap, strict CORS allowlist",
        "Tuned gunicorn deployment — 8 workers × 8 threads, max-requests recycling, --preload — sized for sustained traffic",
        "View Transitions API theme toggle with a circular-reveal animation and graceful fallback",
      ],
      impact:
        "Profile page went from hundreds of API calls per second to exactly one on mount. The tuned deployment sustains roughly 300–500 req/sec on Render's standard plan. Reactivation became auditable, race-safe, and admin-controllable instead of self-serve. Lifetime activation history is fully queryable; no more lost prior cycles.",
      screenshots: [{ src: "/images/projects/project-11.jpg", alt: "BigTreat platform dashboard" }],
    },
  },
  {
    slug: "valoryx-software",
    title: "Valoryx Software",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Multi-tenant retail POS + back-office suite — billing, stock, suppliers, payroll, audit — running offline-first on the counter and syncing to Supabase. Page loads went from 3–9 seconds to 1–20ms.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Flask", "SQLAlchemy", "Supabase", "SQLite", "Redis", "Electron"],
    image: "/images/projects/project-10.jpg",
    liveDemo: "https://valoryx.ryxtech.in",
    featured: true,
    caseStudy: {
      context:
        "Small retailers were juggling a thin billing tool with paper and Excel for every workflow beyond the invoice — pending payments, returns, supplier deliveries, stock movement between branches, expenses, payroll. Month-end audits were painful and the numbers couldn't be trusted.",
      problem:
        "The first version could only create a GST or Non-GST invoice and decrement stock. Every other shop workflow had to happen outside the app. Multi-tenant data isolation was incomplete, internet outages broke the counter entirely, and audits had visible holes — soft-deleted bills were unrecoverable and route-level audit logging was inconsistent. Page loads ran 3–9 seconds because every request hit Supabase over the network.",
      approach:
        "Built a complete multi-tenant POS + back-office on Flask + SQLAlchemy with a Supabase Postgres source-of-truth and a local SQLite mirror for offline operation. Every query is scoped by client_id server-side. The React + TypeScript + Vite + Tailwind front end ships as both a web app and an auto-updating Electron desktop build. Permissions are role + fine-grained (owner / manager / admin / staff / cashier) with TOTP 2FA and full session tracking. Performance moved from live Supabase round-trips to local SQLite plus an in-memory analytics cache.",
      features: [
        "Multi-tenant client_id isolation enforced on every route, query, and view",
        "Offline-first POS — local SQLite mirror keeps billing alive during internet outages, syncs to Supabase in the background",
        "Full back-office: Pending Bills, Returns/Exchanges, Soft-delete Restore, Branch-aware Stock Transfers, Supplier deliveries with file upload, Bulk Stock Orders (auto-numbered POs), Expenses, Payroll, Notes",
        "Audit log with permission-gated views — every create/update/delete recorded with client_id; view_all_bills vs view_own_bills enforced server-side",
        "Role-based permissions (owner / manager / admin / staff / cashier) with fine-grained route checks",
        "Security: TOTP 2FA, forced password change, IP / last-seen tracking, throttled writes, dedicated security regression suite",
        "Cross-platform: web build plus an auto-updating Electron desktop build from one codebase",
      ],
      impact:
        "Page loads went from 3–9 seconds (live Supabase per request) to 1–20ms (local SQLite + in-memory cache) — a 100×+ speed-up on hot paths. A shop owner now runs the entire day inside Valoryx: sale → pending bill → return → supplier delivery → expense → stock transfer → payroll → audit — without ever opening Excel. Database schema is at v16 with full migration history; every mutation is auditable and reversible. The counter keeps billing during internet outages.",
      screenshots: [{ src: "/images/projects/project-10.jpg", alt: "Valoryx dashboard" }],
    },
  },
  {
    slug: "ai-quiz-generator",
    title: "AI-Powered Quiz Generator",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Generates four question types from any PDF / DOCX / TXT using OpenAI, with role-isolated auth (JWT for admins, OTP for teachers and students) and a pluggable storage backend swappable via one env toggle.",
    tags: ["Django", "DRF", "React", "Material-UI", "PostgreSQL", "pgvector", "OpenAI", "Supabase"],
    image: "/images/projects/project-6.jpg",
    github: "https://github.com/rameshsurya10/Quiz-Rework",
    featured: true,
    caseStudy: {
      context:
        "Teachers spend significant time turning course material into assessments. The same platform needed to serve three very different user types — admins managing the platform, teachers creating and sharing quizzes, students taking them — with completely different capabilities and auth flows.",
      problem:
        "Manual quiz writing from PDFs and textbook chapters is slow and repetitive. Admin sessions need long-lived secure password auth; teachers and students need low-friction onboarding without per-user password resets. Storage backend choices (local disk for dev, cloud for production) should not require code changes between environments.",
      approach:
        "Built a Django REST + React monorepo. Document upload triggers an AI pipeline that extracts text from PDF / DOCX / TXT and sends it to the OpenAI API to generate four question types (MCQ, Fill in the Blanks, True/False, One-Line). Dual auth strategy: JWT password login for admins, email OTP for teachers and students. Pluggable storage layer (local file storage / Supabase / AWS S3) toggled via the `USE_SUPABASE_STORAGE` env flag — zero code change to swap. pgvector PostgreSQL extension stores document embeddings for retrieval. drf-yasg auto-generates Swagger and ReDoc documentation.",
      features: [
        "Four question types generated from any PDF, DOCX, or TXT — MCQ, Fill in the Blanks, True/False, One-Line",
        "Dual auth strategy — JWT password for admins, email OTP for teachers and students; isolated flows in code",
        "Pluggable storage backend — local / Supabase / AWS S3 — switched via a single env toggle, no code changes",
        "pgvector PostgreSQL extension for storing document embeddings",
        "Bulk student onboarding via CSV / XLSX templates, organised into departments",
        "Shareable quiz URLs so teachers can distribute without sending invites individually",
        "Auto-generated API docs via drf-yasg (Swagger at /api/docs/, ReDoc at /api/redoc/)",
        "Three role-isolated interfaces from one codebase: Admin (platform), Teacher (create + share), Student (take + score)",
      ],
      impact:
        "Turns hours of manual quiz writing into the time it takes to upload a PDF. Three audiences served by one codebase with role-isolated auth so neither flow leaks into the other. Storage backend swap is a single env toggle — production can move from local to Supabase to S3 without redeploying any code or touching the call sites.",
      screenshots: [{ src: "/images/projects/project-6.jpg", alt: "AI quiz generator interface" }],
    },
  },
  {
    slug: "alumni-career-analysis",
    title: "Alumni Career Analysis",
    category: "data",
    categoryLabel: "Data Analytics",
    summary:
      "SQL-driven analysis of alumni career trends across industry, role, and tenure — surfaced where the placements are, when salary growth actually kicks in, and which cities dominate as job hubs.",
    tags: ["SQL", "MySQL", "PostgreSQL", "Power BI", "Tableau"],
    image: "/images/projects/project-1.jpg",
    github: "https://github.com/rameshsurya10/Alumni-Career-Analysis",
    featured: true,
    caseStudy: {
      context:
        "Institutions want a clear view of where their graduates end up — across industries, roles, and geography.",
      problem:
        "Raw alumni records had the data but no aggregated view — no easy way to answer where placements concentrate, when salary growth kicks in, or which programmes outperform.",
      approach:
        "SQL queries against MySQL / PostgreSQL segment alumni by industry, role, tenure, and city. Power BI and Tableau layer on top for visualization. Re-running against new data is just re-running the queries.",
      features: [
        "SQL-driven analysis — re-runnable on fresh alumni data",
        "Industry, role, and tenure segmentation",
        "Power BI + Tableau dashboards over the SQL output",
      ],
      impact:
        "Surfaced four findings: IT & Finance dominate placements; salary growth becomes significant after 5+ years; Computer Science graduates have higher placement rates than other programmes; major job hubs are Bangalore, Chennai, and Hyderabad.",
      screenshots: [{ src: "/images/projects/project-1.jpg", alt: "Alumni career analysis dashboard" }],
    },
  },
  {
    slug: "uber-supply-demand-analysis",
    title: "Uber Supply-Demand Gap Analysis",
    category: "data",
    categoryLabel: "Data Analytics",
    summary:
      "Python EDA on Uber trip data exposing where and when supply-demand gaps concentrate, and what drives ride cancellations.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    image: "/images/projects/project-4.jpg",
    github: "https://github.com/rameshsurya10/Uber-Supply-Demand-Gap-EDA",
    featured: true,
    caseStudy: {
      context:
        "Ride-hailing services lose trips when cars aren't available where and when riders request them.",
      problem:
        "Raw Uber trip data hinted at supply-demand gaps but didn't show when they were worst, where they concentrated, or why riders cancelled.",
      approach:
        "EDA in Python with Pandas, NumPy, Matplotlib, and Seaborn — segmenting requests by time slot, location, and trip status to expose the gap patterns.",
      features: [
        "Time-slot and trip-status segmentation",
        "Geographic clustering of shortage hotspots",
        "Cancellation-driver analysis",
      ],
      impact:
        "Three concrete findings: demand spikes during rush hours and weekends; airports and business hubs concentrate the shortages; high wait times directly drive cancellations. These are the basis for targeted supply decisions.",
      screenshots: [{ src: "/images/projects/project-4.jpg", alt: "Uber supply-demand analysis charts" }],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
