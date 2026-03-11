import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/my/privacy.php", destination: "/my/privacy" },
      { source: "/my/market_privacy.php", destination: "/my/market-privacy" },
      { source: "/my/terms_of_service.php", destination: "/my/terms-of-service" },
    ];
  },
};

export default nextConfig;
