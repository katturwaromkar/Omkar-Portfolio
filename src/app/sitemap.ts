import type { MetadataRoute } from "next";
import { navLinks } from "@/data/portfolio";

const SITE_URL = "https://omkar-katturwar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return navLinks.map((l) => {
    const isHome = l.href === "/";
    return {
      url: isHome ? SITE_URL : `${SITE_URL}${l.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: isHome ? 1 : 0.8,
    };
  });
}
