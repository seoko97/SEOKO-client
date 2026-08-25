import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.toast.com",
        port: "",
      },
    ],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 768, 980, 1080, 1200, 1440, 1920],
    qualities: [80, 90, 100],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
