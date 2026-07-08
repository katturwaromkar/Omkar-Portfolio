"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_10px_30px_-10px_var(--glow)] bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] hover:shadow-[0_16px_40px_-10px_var(--glow)]",
  outline:
    "text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)]",
  ghost: "text-[var(--text-muted)] hover:text-[var(--text)]",
};

/** A button/link that subtly leans toward the cursor (magnetic effect). */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  download,
  external,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const cls = cn(base, variants[variant], className);
  const motionProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    className: cls,
    "data-cursor": "hover",
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        onClick={onClick}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button {...motionProps} onClick={onClick} type="button">
      {children}
    </motion.button>
  );
}
