"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ParticleField } from "./ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Typewriter that cycles through the roles list. */
function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) {
          setDeleting(true);
          return;
        }
        if (empty) {
          setDeleting(false);
          setI((v) => v + 1);
          return;
        }
        setText((t) =>
          deleting ? word.slice(0, t.length - 1) : word.slice(0, t.length + 1),
        );
      },
      done ? 1600 : deleting ? 45 : 90,
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, i, words]);

  return text;
}

export function Hero() {
  const role = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <ParticleField />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="aurora left-[8%] top-[12%] h-72 w-72 bg-[var(--brand)]/40" style={{ animation: "float-y 9s ease-in-out infinite" }} />
        <div className="aurora right-[6%] top-[40%] h-80 w-80 bg-[var(--brand-3)]/25" style={{ animation: "float-y 11s ease-in-out infinite reverse" }} />
        <div className="aurora bottom-[6%] left-[40%] h-72 w-72 bg-[var(--brand-2)]/30" style={{ animation: "float-y 13s ease-in-out infinite" }} />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.shortName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 flex items-center justify-center gap-2 text-2xl font-semibold text-[var(--text-muted)] sm:text-3xl lg:justify-start"
          >
            <Sparkles size={22} className="text-[var(--brand-3)]" />
            <span className="text-[var(--text)]">{role}</span>
            <span className="ml-0.5 inline-block h-7 w-[3px] animate-pulse bg-[var(--brand-2)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-muted)] sm:text-lg lg:mx-0"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href="#contact">Hire Me</MagneticButton>
            <MagneticButton href="#projects" variant="outline">
              View Projects
            </MagneticButton>
            <MagneticButton
              href={profile.resumePdf}
              variant="ghost"
              download
            >
              Download CV ↓
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -14,
            scale: 1.02,
            transition: { type: "spring", stiffness: 260, damping: 18 },
          }}
          className="group relative mx-auto w-full max-w-[280px] cursor-pointer"
        >
          <div
            className="absolute -inset-4 rounded-[2rem] bg-[conic-gradient(from_0deg,var(--brand),var(--brand-3),var(--brand-2),var(--brand))] opacity-50 blur-2xl"
            style={{ animation: "spin-slow 14s linear infinite" }}
          />
          <div className="card-spotlight relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] glass-strong shadow-lg shadow-black/20 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-(--brand)/30">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={520}
              height={620}
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg)] to-transparent p-5 pt-16">
              <div className="flex items-center justify-between rounded-xl glass px-4 py-3">
                <div>
                  <p className="text-xs text-[var(--text-faint)]">Based in</p>
                  <p className="text-sm font-semibold">Pune, India</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--text-faint)]">Focus</p>
                  <p className="text-sm font-semibold text-[var(--brand-3)]">
                    AI · Full-Stack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[var(--text-faint)]"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-xs"
        >
          Scroll <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
