import Link from "next/link";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";
import { BentoLiveClock } from "./BentoLiveClock";

// Shared tile chrome — kept identical so the grid reads as a unified system
// rather than a collection of cards. Variations come from CONTENT inside,
// not from divergent borders/shadows.
const tile =
  "rounded-[var(--radius-card)] border border-border bg-surface-raised p-6 flex flex-col justify-between transition-colors";

// Pulsing live-status dot used in two tiles. The outer halo ping-fades while
// the inner core stays solid — same trick GitHub uses for online indicators.
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </span>
  );
}

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
    <section id="bento" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index={5}
          eyebrow="Snapshot"
          title="Where I am right now"
        />

        <Reveal>
          {/* 4-column grid on desktop, 2-column on mobile. auto-rows-[140px]
              gives every cell the same visual height so tile spans (col-span-N,
              row-span-N) compose into a clean rhythm. */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[160px]">
            {/* Tile 1 — Currently (2 cols) */}
            <div className={`${tile} col-span-2 row-span-1`}>
              <div className="flex items-center gap-2">
                <PulseDot />
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Currently
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-ink md:text-3xl">
                {site.currently}
              </p>
            </div>

            {/* Tile 2 — GitHub stats (1 col, 2 rows tall) */}
            <div className={`${tile} col-span-1 row-span-2`}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                GitHub
              </p>
              <div>
                <p className="font-[family-name:var(--font-display)] text-6xl font-medium leading-none text-ink md:text-7xl">
                  {stats?.repos ?? "—"}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Public repos
                </p>
              </div>
              <p className="border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
                {stats ? `Shipping since ${stats.year}` : "github.com/rameshsurya10"}
              </p>
            </div>

            {/* Tile 3 — Local time (1 col, live ticking clock) */}
            <div className={`${tile} col-span-1 row-span-1`}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Local time
              </p>
              <BentoLiveClock />
            </div>

            {/* Tile 4 — Reading (2 cols) */}
            <div className={`${tile} col-span-2 row-span-1`}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Currently reading
              </p>
              <p className="font-[family-name:var(--font-display)] text-xl font-medium italic leading-snug text-ink md:text-2xl">
                {site.reading}
              </p>
            </div>

            {/* Tile 5 — Open to work (1 col) */}
            <div className={`${tile} col-span-1 row-span-1`}>
              <div className="flex items-center gap-2">
                <PulseDot />
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Status
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-ink">
                Open to work
              </p>
            </div>

            {/* Tile 6 — Daily stack (3 cols) */}
            <div className={`${tile} col-span-2 row-span-1 md:col-span-3`}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Daily stack
              </p>
              <p className="text-base leading-relaxed text-ink md:text-lg">
                {site.stack.join(" · ")}
              </p>
            </div>

            {/* Tile 7 — Start a project (1 col, INVERTED — accent fill so it
                reads as the primary CTA in the grid) */}
            <Link
              href="#contact"
              className="group col-span-2 row-span-1 flex flex-col justify-between rounded-[var(--radius-card)] border border-ink bg-ink p-6 transition-opacity hover:opacity-90 md:col-span-1"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-surface/70">
                Start a project
              </p>
              <p className="font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-surface transition-transform group-hover:translate-x-1">
                Let&apos;s talk →
              </p>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
