import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Omkar Katturwar — AI, machine learning and full-stack web applications including RescueHer and AI Resume Screening.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <Projects />
    </PageShell>
  );
}
