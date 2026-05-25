import { site } from "@/content/site";

// Social label abbreviations for the re-birth footer
const SOCIAL_LABELS: Record<string, string> = {
  github: "GH",
  linkedin: "LI",
  instagram: "IG",
  twitter: "TW",
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Top row: three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left: name + tagline */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
              {site.name}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
              Full-Stack · Data Analytics
            </p>
          </div>

          {/* Middle: email */}
          <div className="flex items-start">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              {site.email}
            </p>
          </div>

          {/* Right: social text labels */}
          <div className="flex items-start gap-6 md:justify-end">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
              >
                {SOCIAL_LABELS[s.icon] ?? s.label} →
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright + credit */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-mono text-xs text-ink-muted">
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs text-ink-muted">
            Designed and built by RA
          </p>
        </div>
      </div>
    </footer>
  );
}
