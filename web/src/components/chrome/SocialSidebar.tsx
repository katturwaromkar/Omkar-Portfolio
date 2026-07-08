"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { socials } from "@/data/portfolio";
import { Icon } from "@/components/ui/Icon";

// Rail cascades in when visible, peels off to the left when hidden.
const railVariants: Variants = {
  shown: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  hidden: {
    // reverse the stagger so the bottom icon leaves first — a "peel" effect
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const iconVariants: Variants = {
  shown: {
    opacity: 1,
    x: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
  hidden: {
    opacity: 0,
    x: -48,
    rotate: -35,
    filter: "blur(4px)",
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

/** Fixed vertical social rail on the left (desktop only). */
export function SocialSidebar() {
  // `hidden` is true while scrolling down, false near top / scrolling up.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      // Always reveal near the very top; otherwise follow scroll direction.
      setHidden(y > 120 && goingDown);
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-0 left-6 z-40 hidden xl:block"
    >
      <motion.div
        variants={railVariants}
        animate={hidden ? "hidden" : "shown"}
        className="flex flex-col items-center gap-4"
      >
        {socials.map((s) => (
          <motion.a
            key={s.label}
            variants={iconVariants}
            href={s.href}
            target={s.icon === "mail" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : 0}
            data-cursor="hover"
            whileHover={{ y: -3, scale: 1.15 }}
            className="text-[var(--text-faint)] transition-colors duration-300 hover:text-[var(--brand-2)]"
          >
            <Icon name={s.icon} size={19} />
          </motion.a>
        ))}
        <motion.span
          variants={iconVariants}
          className="h-24 w-px bg-[linear-gradient(var(--border-strong),transparent)]"
        />
      </motion.div>
    </motion.div>
  );
}
