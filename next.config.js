/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["image.toast.com"],
    minimumCacheTTL: 86400,
    deviceSizes: [480, 768, 980],
  },
};

module.exports = nextConfig;
