"use client";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/portfolio";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I Do"
        title={<span className="text-gradient">Services</span>}
        subtitle="From intelligent AI systems to polished full-stack products — end-to-end help taking ideas from prototype to production."
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.title} className="h-full">
            <article className="card-spotlight glass group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] p-6 transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-2xl hover:shadow-[var(--brand)]/10 sm:p-7">
              {/* Subtle border glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-[var(--brand)]/30 transition-opacity duration-300 group-hover:opacity-100"
              />

              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white shadow-lg shadow-[var(--brand)]/20 transition-transform duration-300 group-hover:scale-105">
                <Icon name={service.icon} size={22} />
              </span>

              <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                {service.desc}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
