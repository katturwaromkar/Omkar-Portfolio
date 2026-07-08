"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  Check,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Errors = { name?: string; email?: string; message?: string };

const projectTypes = [
  "Freelance project",
  "Full-time role",
  "Collaboration",
  "Just saying hi",
] as const;

/** Pre-filled brief so a freelance client can send a scoped request in one tap. */
const freelanceBrief =
  "Hi Omkar, I'd like to hire you for a freelance project.\n\n" +
  "• Project: \n" +
  "• Scope / features: \n" +
  "• Budget: \n" +
  "• Timeline: \n\n" +
  "Looking forward to working with you!";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    projectType: projectTypes[0] as (typeof projectTypes)[number],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.SyntheticEvent) {
    ev.preventDefault();
    if (!validate()) return;
    // No backend yet: compose a prefilled email so the message is never lost.
    const subject = encodeURIComponent(
      `[${form.projectType}] from ${form.name}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})\nEnquiry type: ${form.projectType}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const inputCls =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--brand-2)]";

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-gradient">together</span>
          </>
        }
        subtitle="Open to roles, freelance projects and collaborations. Send a message or reach out directly — I usually reply within a day."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: direct contact + resume center */}
        <Reveal direction="right" className="space-y-4">
          {/* Freelance hire CTA — direct, scoped channel for clients */}
          <div className="card-spotlight glass relative overflow-hidden rounded-2xl border border-[var(--brand-2)]/40 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white">
                <Briefcase size={19} />
              </span>
              <div>
                <p className="text-sm font-bold">Have a project in mind?</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Available for freelance — let&apos;s scope it out.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={`https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent(
                  freelanceBrief,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              >
                Hire me for a project <ArrowRight size={15} />
              </a>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  "Freelance project enquiry",
                )}&body=${encodeURIComponent(freelanceBrief)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--surface-2)]"
              >
                <Mail size={15} /> Email brief
              </a>
            </div>
          </div>

          <ContactRow
            icon={<Mail size={18} />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactRow
            icon={<Phone size={18} />}
            label="Phone"
            value={profile.phone}
            href={`tel:+${profile.phoneRaw}`}
          />
          <ContactRow
            icon={<MapPin size={18} />}
            label="Location"
            value={profile.location}
          />

          <a
            href={`https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent(
              "Hi Omkar, I found your portfolio and would like to connect.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3.5 text-sm font-semibold transition-colors hover:border-green-500/50 hover:text-green-400"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-green-500/15 text-green-400">
              <WhatsAppGlyph />
            </span>
            Chat on WhatsApp
          </a>

          <div className="card-spotlight glass rounded-2xl p-5">
            <p className="text-sm font-semibold">Resume / CV</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Grab the full PDF — skills, experience and projects.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={profile.resumePdf}
                download
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={15} /> Download PDF
              </a>
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--surface-2)]"
              >
                View
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal direction="left">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card-spotlight glass space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <Field label="I'm reaching out about">
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => {
                  const active = form.projectType === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, projectType: t })}
                      aria-pressed={active}
                      className={
                        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
                        (active
                          ? "border-transparent bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white"
                          : "border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-muted)] hover:border-[var(--brand-2)]/50")
                      }
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Name" error={errors.name}>
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                aria-invalid={!!errors.name}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                className={inputCls}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role or project…"
                aria-invalid={!!errors.message}
              />
            </Field>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]"
            >
              {sent ? (
                <>
                  <Check size={17} /> Opening your mail app…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>
            <p className="text-center text-xs text-[var(--text-faint)]">
              Your message opens in your email client — nothing is stored.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3.5 transition-colors hover:border-[var(--brand-2)]/50">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-white">
        {icon}
      </span>
      <div>
        <p className="text-xs text-[var(--text-faint)]">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block" data-cursor="hover">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.957zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
