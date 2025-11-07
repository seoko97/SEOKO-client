import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.toast.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 86400,
    deviceSizes: [320, 480, 768, 1024, 1280],
    imageSizes: [96, 128, 256, 384, 512, 768, 1024],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
