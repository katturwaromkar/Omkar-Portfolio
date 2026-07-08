"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/portfolio";

/** Animate an integer from 0 → target once the element scrolls into view. */
function useCountUp(target: number, durationMs = 1600): {
  ref: React.RefObject<HTMLDivElement | null>;
  value: number;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutCubic for a premium settle
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, durationMs]);

  return { ref, value };
}

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, value: count } = useCountUp(value);

  return (
    <Reveal direction="up" delay={delay}>
      <div
        ref={ref}
        className="card-spotlight glass flex flex-col items-center justify-center rounded-2xl px-4 py-8 text-center"
      >
        <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-gradient">{count}</span>
          <span className="text-[var(--brand-3)]">{suffix}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">{label}</p>
      </div>
    </Reveal>
  );
}

export function Stats() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="By the Numbers"
        title={<span className="text-gradient">Key Achievements</span>}
      />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            delay={i * 0.1}
          />
        ))}
      </div>
    </Section>
  );
}
