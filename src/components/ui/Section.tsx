"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Consistent section shell: id anchor, padding, max-width container. */
export function Section({
  id,
  children,
  className,
  container = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("section-pad relative", className)}>
      {container ? (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/** Eyebrow label + gradient heading + optional subtitle, centered or left. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-3)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-5 h-1 w-20 rounded-full bg-linear-to-r from-brand via-brand-3 to-brand-2",
          align === "center" ? "mx-auto" : "",
        )}
      />
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
