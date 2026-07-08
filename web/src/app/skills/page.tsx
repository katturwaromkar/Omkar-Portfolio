import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Omkar Katturwar — Python, Machine Learning, NLP, Computer Vision, Django, React, Next.js, REST APIs and full-stack development.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <Skills />
    </PageShell>
  );
}
