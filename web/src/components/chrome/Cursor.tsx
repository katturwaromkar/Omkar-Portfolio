"use client";

import { useEffect, useRef } from "react";

/** Two-element custom cursor: instant dot + lagging ring that grows over links. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0,
      raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
      // Grow ring when over interactive elements
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, [data-cursor='hover'], input, textarea",
      );
      ring.current?.classList.toggle("hovering", !!interactive);
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
