"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * One element, multiple personalities. Editorial luxury wants restraint —
 * the idle cursor is a 14px hairline ring that almost disappears against
 * the page. As you hover anything interactive, it morphs:
 *
 *   default        →  hairline ring (tiny, quiet)
 *   internal link  →  scales up + shows "→"
 *   external link  →  scales up + shows "↗"
 *   image/figure   →  scales up + shows "VIEW" label
 *   text input     →  shrinks to a thin vertical line (I-beam vibe)
 *
 * mix-blend-difference is what makes the same pure-white element readable
 * on every backdrop (dark page, light theme, photo, button). The element
 * literally inverts whatever's behind it.
 */

type Variant = "default" | "link" | "external" | "image" | "text";

interface VariantStyle {
  width: number;
  height: number;
  borderWidth: number;
  label: string;
  fontSize: number;
}

const VARIANTS: Record<Variant, VariantStyle> = {
  default:  { width: 14, height: 14, borderWidth: 1, label: "",      fontSize: 0 },
  link:     { width: 52, height: 52, borderWidth: 1, label: "→",     fontSize: 18 },
  external: { width: 60, height: 60, borderWidth: 1, label: "↗",     fontSize: 18 },
  image:    { width: 76, height: 76, borderWidth: 1, label: "VIEW",  fontSize: 10 },
  text:     { width: 2,  height: 24, borderWidth: 0, label: "",      fontSize: 0 },
};

interface Pulse {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const variantRef = useRef<Variant>("default");
  const detectedRef = useRef(false);
  const pulseIdRef = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Spring tuned for "quietly precise" — fast enough to feel attached, slow
  // enough that the morph from default → expanded reads as smooth.
  const cx = useSpring(x, { stiffness: 280, damping: 32, mass: 0.45 });
  const cy = useSpring(y, { stiffness: 280, damping: 32, mass: 0.45 });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (detectedRef.current) return;
      detectedRef.current = true;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const fineCursor = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.innerWidth >= 768;
      if (!isTouch && fineCursor && wideEnough) setEnabled(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function detect(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      let next: Variant = "default";
      if (t) {
        // Order matters: most specific first.
        if (t.closest('input, textarea, [contenteditable="true"]')) {
          next = "text";
        } else if (t.closest('a[target="_blank"]')) {
          next = "external";
        } else if (t.closest('a, button, [role="button"], [role="tab"], summary, label, [data-cursor-link]')) {
          next = "link";
        } else if (t.closest('img, picture, [data-cursor-image]')) {
          next = "image";
        }
      }
      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariant(next);
      }
    }

    function click(e: MouseEvent) {
      // Each click spawns a pulse at its exact origin; multiple rapid clicks
      // each get their own ring so they don't visually cancel each other.
      const id = ++pulseIdRef.current;
      setPulses((p) => [...p, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setPulses((p) => p.filter((pulse) => pulse.id !== id));
      }, 500);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", detect);
    window.addEventListener("mousedown", click);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", detect);
      window.removeEventListener("mousedown", click);
      document.body.style.cursor = "";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const v = VARIANTS[variant];
  // The "text" variant is rectangular — keep its corner radius low so it reads
  // as a caret-ish line. Everything else is a circle.
  const radius = variant === "text" ? "1px" : "9999px";

  return (
    <>
      {/* Main cursor — the contextual ring */}
      <motion.div
        aria-hidden="true"
        style={{ x: cx, y: cy, borderRadius: radius }}
        animate={{
          width: v.width,
          height: v.height,
          borderWidth: v.borderWidth,
        }}
        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border-white bg-transparent mix-blend-difference"
      >
        {v.label && (
          <motion.span
            key={variant}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="select-none font-mono font-medium uppercase tracking-widest text-white"
            style={{ fontSize: v.fontSize }}
          >
            {v.label}
          </motion.span>
        )}
      </motion.div>

      {/* Click pulses — each click drops a ring at its exact origin and it
          expands outward as it fades. Pinned to clientX/Y, NOT the spring
          position, so the pulse stays put even as the main cursor moves. */}
      <AnimatePresence>
        {pulses.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden="true"
            initial={{ opacity: 0.6, scale: 0.4 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pointer-events-none fixed z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
