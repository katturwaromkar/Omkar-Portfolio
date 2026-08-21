import type { ReactNode } from "react";
import { Navbar } from "@/components/chrome/Navbar";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Cursor } from "@/components/chrome/Cursor";
import { SocialSidebar } from "@/components/chrome/SocialSidebar";
import { Footer } from "@/components/chrome/Footer";
import { AIAssistant } from "@/components/chrome/AIAssistant";

/**
 * Shared page frame — the persistent chrome that wraps every route
 * (home and the standalone /skills, /projects, … pages).
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SocialSidebar />

      <main id="main">{children}</main>

      <Footer />
      <AIAssistant />
    </>
  );
}
