import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, socials } from "@/data/portfolio";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://omkar-katturwar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.shortName} — AI Engineer & Full-Stack Developer`,
    template: `%s · ${profile.shortName}`,
  },
  description: profile.tagline,
  keywords: [
    "Omkar Katturwar",
    "AI Engineer",
    "Full-Stack Developer",
    "Python Developer",
    "Machine Learning",
    "NLP",
    "Computer Vision",
    "Django",
    "Next.js",
    "Pune",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: `${profile.shortName} — AI Engineer & Full-Stack Developer`,
    description: profile.tagline,
    siteName: `${profile.shortName} Portfolio`,
    images: [
      {
        url: profile.photo,
        width: 1200,
        height: 630,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — AI Engineer & Full-Stack Developer`,
    description: profile.tagline,
    creator: "@omkarkatturwar",
    images: [profile.photo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer & Full-Stack Developer",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  sameAs: socials.filter((s) => s.icon !== "mail").map((s) => s.href),
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Python",
    "Django",
    "Full-Stack Development",
  ],
};

// Prevent theme flash: set data-theme before paint from localStorage / OS pref.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t||d);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${mono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
