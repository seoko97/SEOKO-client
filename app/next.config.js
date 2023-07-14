/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  output: "standalone",
  transpilePackages: ["@seoko/theme", "@seoko/ui"],
};

module.exports = nextConfig;
