"use client";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Career"
        title={<span className="text-gradient">Professional Journey</span>}
        subtitle="A track record of shipping real products — from AI systems and full-stack apps to ERP delivery and client success."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical gradient timeline line */}
        <span
          aria-hidden
          className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand)] via-[var(--brand-2)] to-transparent sm:left-4"
        />

        <ol className="space-y-10">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className="relative pl-12 sm:pl-16">
              {/* Timeline dot */}
              <span className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center sm:left-1">
                {job.current ? (
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-400" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] bg-green-500" />
                  </span>
                ) : (
                  <span className="h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--brand-2)]" />
                )}
              </span>

              <Reveal direction="up" delay={i * 0.08}>
                <article className="card-spotlight glass rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-snug text-[var(--text)] sm:text-xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                        <span className="text-[var(--brand-3)]">{job.company}</span>
                        <span className="text-[var(--text-faint)]"> · {job.location}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-1.5 sm:items-end">
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          Current
                        </span>
                      )}
                      <span className="font-mono text-xs tracking-wide text-[var(--text-muted)]">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-sm leading-relaxed text-[var(--text-muted)]"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-2)]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--text-muted)]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
