import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";

const tileBase =
  "rounded-[var(--radius-card)] border border-border bg-surface-raised p-6 transition-colors hover:bg-surface-raised/80";

async function getGitHubStats(): Promise<{
  repos: number;
  year: number;
} | null> {
  try {
    const res = await fetch("https://api.github.com/users/rameshsurya10", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      repos: d.public_repos ?? 0,
      year: new Date(d.created_at).getFullYear(),
    };
  } catch {
    return null;
  }
}

export async function Bento() {
  const stats = await getGitHubStats();

  return (
    <section id="bento" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index={5}
          eyebrow="Snapshot"
          title="Where I am right now"
        />

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tile 1: Currently — col-span-2 row-span-1, top-left */}
            <div className={`${tileBase} col-span-2 row-span-1`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                Currently
              </p>
              <p className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink leading-snug md:text-3xl">
                {site.currently}
              </p>
            </div>

            {/* Tile 2: GitHub stats — col-span-1 row-span-2, tall */}
            <div className={`${tileBase} col-span-1 row-span-2 flex flex-col`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                GitHub
              </p>
              {stats ? (
                <>
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-display)] text-5xl font-medium text-ink md:text-6xl">
                      {stats.repos}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mt-2">
                      Public repos
                    </p>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted pt-4 border-t border-border">
                    Shipping since {stats.year}
                  </p>
                </>
              ) : (
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-display)] text-5xl font-medium text-ink md:text-6xl">
                    —
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mt-2">
                    Public repos
                  </p>
                </div>
              )}
            </div>

            {/* Tile 3: Hire CTA — col-span-1 row-span-1 */}
            <div className={`${tileBase} col-span-1 row-span-1`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                Status · Open to work
              </p>
              <a
                href="#contact"
                className="font-[family-name:var(--font-display)] text-xl font-medium text-ink hover:opacity-70 transition-opacity leading-snug"
              >
                Start a project →
              </a>
            </div>

            {/* Tile 4: Stack — col-span-1 row-span-1 */}
            <div className={`${tileBase} col-span-1 row-span-1`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                Stack
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {site.stack.join(" · ")}
              </p>
            </div>

            {/* Tile 5: Time / GMT — col-span-1 row-span-1 */}
            <div className={`${tileBase} col-span-1 row-span-1`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                Timezone
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink leading-relaxed">
                {site.location} · IST
                <br />
                GMT +5:30
              </p>
            </div>

            {/* Tile 6: Reading — col-span-2 row-span-1 */}
            <div className={`${tileBase} col-span-2 row-span-1`}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                Reading
              </p>
              <p className="font-[family-name:var(--font-display)] text-2xl font-medium italic text-ink leading-snug md:text-3xl">
                {site.reading}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
