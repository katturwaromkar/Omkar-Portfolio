import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Omkar Katturwar — available for freelance projects and full-time roles. Reach out via email, phone or WhatsApp with a project brief.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="pt-24" />
      <Contact />
    </PageShell>
  );
}
