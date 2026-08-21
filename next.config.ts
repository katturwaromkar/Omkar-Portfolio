import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Compress + remove the X-Powered-By header for a cleaner, faster response.
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
