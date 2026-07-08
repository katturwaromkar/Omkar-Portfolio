"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas constellation — drifting nodes that link when near and
 * gently react to the cursor. No external 3D library, ~60fps, respects
 * reduced-motion and pauses when offscreen.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0,
      h = 0,
      raf = 0,
      running = true;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number };
    let parts: P[] = [];

    const brand = "99,102,241"; // --brand rgb

    function resize() {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 16000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // subtle cursor attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          p.x += dx * 0.0006;
          p.y += dy * 0.0006;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${brand},0.65)`;
        ctx!.fill();
      }

      // link nearby nodes
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i],
            b = parts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${brand},${0.16 * (1 - dist / 120)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Pause when the hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !reduced;
        if (running) {
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseout", onLeave);

    if (reduced) {
      // draw one static frame
      running = true;
      frame();
      running = false;
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
