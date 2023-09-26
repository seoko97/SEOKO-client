/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["image.toast.com"],
    minimumCacheTTL: 86400,
    deviceSizes: [480, 768, 980],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
