"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(false);
  const detectedRef = useRef(false);

  // Mouse position motion values
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.5 });

  // Capability detection on mount — wrapped in rAF so it's a callback, not synchronous
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (detectedRef.current) return;
      detectedRef.current = true;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const fineCursor = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.innerWidth >= 768;
      if (!isTouch && fineCursor && wideEnough) {
        setEnabled(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Event wiring — only when enabled
  useEffect(() => {
    if (!enabled) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function checkHover(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        t?.closest('a, button, [role="button"], [role="tab"], input, textarea, summary, label')
      );
      if (isInteractive !== hoveringRef.current) {
        hoveringRef.current = isInteractive;
        setHovering(isInteractive);
      }
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
      document.body.style.cursor = "";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — tracks mouse exactly. Pure white + mix-blend-difference
          inverts the backdrop, giving strong contrast on both light and dark themes. */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        animate={{ opacity: hovering ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Outer ring — spring-smoothed, pure white border for the same reason */}
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white mix-blend-difference"
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
