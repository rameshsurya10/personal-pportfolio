import { timeline } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/sections/Reveal";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index={4} eyebrow="Journey" title="Experience & education" />

        <Reveal>
          <div>
            {timeline.map((entry, i) => (
              <div
                key={`${entry.title}-${entry.period}`}
                className={`grid grid-cols-1 md:grid-cols-4 gap-6 py-8 border-t border-border${
                  i === timeline.length - 1 ? " border-b" : ""
                }`}
              >
                {/* Left: period */}
                <div className="md:col-span-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {entry.period}
                  </span>
                </div>

                {/* Right: title + organization */}
                <div className="md:col-span-3">
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-ink font-medium">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{entry.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
