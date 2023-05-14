/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config;
  },
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx',
  ],
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
