/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  output: "standalone",

  // transpilePackages: ["@seoko/components"],
};

module.exports = nextConfig;
