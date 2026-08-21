import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Omkar Katturwar — freelance full-stack & AI development, software engineering roles, technical support and QA across Pune, India.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <Experience />
    </PageShell>
  );
}
