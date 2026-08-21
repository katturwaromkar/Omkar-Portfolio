import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Education } from "@/components/sections/Education";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Omkar Katturwar — AI Engineer & Full-Stack Developer based in Pune. Background, mission, education and the story behind the work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <About />
      <Stats />
      <Education />
    </PageShell>
  );
}
