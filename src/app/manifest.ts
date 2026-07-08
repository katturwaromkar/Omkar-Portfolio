import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omkar Katturwar — AI Engineer & Full-Stack Developer",
    short_name: "Omkar Katturwar",
    description:
      "Portfolio of Omkar Katturwar — AI Engineer & Full-Stack Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070d",
    theme_color: "#06070d",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
