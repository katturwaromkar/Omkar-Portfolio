import Link from "next/link";
import { profile, socials, navLinks } from "@/data/portfolio";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] py-14">
      <div className="aurora left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-[var(--brand)]/30" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-sm font-black text-white">
              {profile.initials}
            </span>
            {profile.shortName}
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
            {profile.tagline}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-faint)]">
            Navigate
          </h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-faint)]">
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--brand-2)] hover:text-[var(--brand-2)]"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-t border-[var(--border)] px-5 pt-6 text-xs text-[var(--text-faint)] sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with Next.js, TypeScript &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
