export function Tag({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
      {children}
    </span>
  );
}
