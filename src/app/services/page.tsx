import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services offered by Omkar Katturwar — freelance AI solutions, full-stack web development, ML/NLP integration and end-to-end product delivery.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <Services />
    </PageShell>
  );
}
