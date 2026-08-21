"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Cake,
  MapPin,
  Mail,
  Phone,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { about, profile } from "@/data/portfolio";

/** Icon + optional link resolver, keyed by fact label. */
const factMeta: Record<
  string,
  { icon: LucideIcon; href?: (v: string) => string }
> = {
  Qualification: { icon: GraduationCap },
  "Date of Birth": { icon: Cake },
  Location: { icon: MapPin },
  Email: { icon: Mail, href: (v) => `mailto:${v}` },
  Phone: { icon: Phone, href: (v) => `tel:${v.replace(/\s+/g, "")}` },
  Languages: { icon: Languages },
};

const pillars = [
  {
    icon: "lightbulb",
    label: "Mission",
    text: about.mission,
    accent: "var(--brand-3)",
  },
  {
    icon: "brain",
    label: "Vision",
    text: about.vision,
    accent: "var(--brand-2)",
  },
] as const;

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Me"
        title={
          <>
            Engineering intelligence into{" "}
            <span className="text-gradient">real products</span>
          </>
        }
        subtitle="A snapshot of who I am, what drives me, and the facts behind the work."
      />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: summary + mission / vision */}
        <div className="space-y-7">
          <Reveal direction="left">
            <p className="text-pretty text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="card-spotlight h-full rounded-2xl border border-[var(--border)] p-5 glass"
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)]"
                    style={{ color: pillar.accent }}
                  >
                    <Icon name={pillar.icon} size={22} />
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-tight">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {pillar.text}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right: facts grid */}
        <Reveal direction="right">
          <div className="card-spotlight rounded-3xl border border-[var(--border-strong)] p-6 glass-strong sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-3)]" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Quick Facts
              </h3>
            </div>

            <Stagger className="grid gap-3">
              {about.facts.map((fact) => {
                const meta = factMeta[fact.label];
                const FactIcon = meta?.icon;
                const href = meta?.href?.(fact.value);

                const value = href ? (
                  <a
                    href={href}
                    className="transition-colors hover:text-[var(--brand-3)]"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                );

                return (
                  <StaggerItem key={fact.label}>
                    <motion.dl
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative flex flex-col gap-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      {/* animated accent bar */}
                      <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-[var(--brand-3)] transition-transform duration-300 group-hover:scale-y-100" />
                      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--text-faint)]">
                        {FactIcon && (
                          <FactIcon
                            size={15}
                            className="text-[var(--brand-3)] transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-semibold text-[var(--text)] sm:text-right">
                        {value}
                      </dd>
                    </motion.dl>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
