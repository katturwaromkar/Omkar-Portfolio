"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { skillGroups } from "@/data/portfolio";

/** A single skill row with a progress bar that fills on scroll-into-view. */
function SkillBar({
  name,
  level,
  index,
}: {
  name: string;
  level: number;
  index: number;
}) {
  return (
    <li>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--text)]">{name}</span>
        <span className="font-semibold tabular-nums text-[var(--text-muted)]">
          {level}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]"
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--brand-2))]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 1.1,
            delay: 0.15 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Tech Stack"
        title={<span className="text-gradient">Skills &amp; Expertise</span>}
        subtitle="A versatile toolkit spanning AI, backend, frontend and data — the building blocks behind every project I ship."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.category} delay={groupIndex * 0.08}>
            <article className="card-spotlight glass group h-full rounded-2xl border border-[var(--border)] p-6 transition-transform duration-300 will-change-transform hover:-translate-y-1.5 sm:p-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white shadow-lg shadow-[var(--brand)]/20">
                  <Icon name={group.icon} size={22} />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-4">
                {group.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
