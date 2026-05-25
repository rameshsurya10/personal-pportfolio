interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  index?: number; // optional — when given, renders "0N / Eyebrow"
}

export function SectionHeading({ eyebrow, title, index }: SectionHeadingProps) {
  const label = index !== undefined ? `${String(index).padStart(2, "0")} / ${eyebrow}` : eyebrow;
  return (
    <div className="mb-12">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium text-ink sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
