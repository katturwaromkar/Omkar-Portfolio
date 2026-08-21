"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title={
          <>
            The <span className="text-gradient">academic foundation</span>
          </>
        }
        subtitle="A steady climb from school to an AI-focused engineering degree."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[18px] top-2 w-px bg-gradient-to-b from-[var(--brand)] via-[var(--border-strong)] to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <ol className="space-y-8">
          {education.map((item, i) => (
            <li key={item.degree} className="relative">
              <Reveal delay={i * 0.08}>
                <div className="relative flex items-start gap-5 sm:gap-0">
                  {/* Dot */}
                  <span className="relative z-10 mt-5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--brand-3)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <GraduationCap size={18} aria-hidden />
                  </span>

                  {/* Card — alternates side on desktop */}
                  <div
                    className={
                      i % 2 === 0
                        ? "w-full sm:w-1/2 sm:pr-12"
                        : "w-full sm:ml-auto sm:w-1/2 sm:pl-12"
                    }
                  >
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="card-spotlight rounded-2xl border border-[var(--border)] p-5 glass sm:p-6"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                          {item.period}
                        </span>
                        <span className="rounded-full bg-[var(--brand)]/15 px-3 py-1 text-xs font-bold text-[var(--brand-3)]">
                          {item.score}
                        </span>
                      </div>

                      <h3 className="mt-4 text-base font-bold leading-snug tracking-tight sm:text-lg">
                        {item.degree}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.institute}
                      </p>
                    </motion.article>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
