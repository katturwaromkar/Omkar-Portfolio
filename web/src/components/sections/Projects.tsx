"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, projectFilters } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Project = (typeof projects)[number];

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<Project | null>(null);

  const visible = projects.filter(
    (p) => filter === "all" || p.categories.includes(filter as never),
  );

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title={
          <>
            Featured <span className="text-gradient">Case Studies</span>
          </>
        }
        subtitle="Real projects, end to end — the problem, the approach, and the result. Click any card for the full breakdown."
      />

      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        {projectFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            data-cursor="hover"
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === f.key
                ? "text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)]",
            )}
          >
            {filter === f.key && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.article
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(p)}
              data-cursor="hover"
              className="card-spotlight group glass relative cursor-pointer overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              {p.featured && (
                <span className="absolute right-5 top-5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-3)]">
                  Featured
                </span>
              )}
              <div className="mb-4 flex flex-wrap gap-2">
                {p.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--brand-3)]">
                {p.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[var(--brand-2)]">
                {p.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {p.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-3)]">
                View case study
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Escape to close + lock background scroll while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative my-8 w-full max-w-2xl rounded-3xl p-7 sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <X size={18} />
            </button>

            <div className="mb-2 flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-3)]"
                >
                  {c}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-medium text-[var(--brand-2)]">
              {project.subtitle}
            </p>

            <div className="mt-6 space-y-5">
              <Block label="Problem" text={project.problem} />
              <Block label="Solution" text={project.solution} />

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  Key Features
                </p>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-3)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  Results
                </p>
                <ul className="space-y-1.5">
                  {project.results.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3 py-1 text-xs text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--surface-2)]"
                >
                  <Icon name="github" size={16} /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Live Demo <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </div>
  );
}
