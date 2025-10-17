/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    externalDir: true,
  },
  transpilePackages: ['@acme/ui', '@acme/shared', '@acme/database'],
};

module.exports = nextConfig;
