"use client";
import { useEffect, useState } from "react";

/**
 * Bigger sibling of the header's LocalClock. Lives inside the Bento "Local time"
 * tile and ticks every second, pinned to Asia/Kolkata so every viewer sees the
 * owner's actual local time (not their own browser time).
 */
export function BentoLiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    function tick() {
      const t = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-4xl font-medium tabular-nums text-ink leading-none md:text-5xl">
        {time}
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
        India · IST · GMT +5:30
      </p>
    </div>
  );
}
