"use client";

import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { certifications } from "@/data/portfolio";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Credentials"
        title={
          <>
            Licenses &amp; <span className="text-gradient">Certifications</span>
          </>
        }
        subtitle="Verified coursework and professional learning programs in AI, development and core software skills."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <StaggerItem key={cert.name}>
            <article className="card-spotlight glass group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-2)]/50 hover:shadow-xl">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white shadow-[var(--shadow-glow)]">
                    <Award size={20} />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>

                <h3 className="text-base font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--brand-3)]">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                  {cert.org}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--text-faint)]">
                <span>Credential Proof</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[var(--brand-2)] group-hover:underline">
                  Verified <ExternalLink size={12} />
                </span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
