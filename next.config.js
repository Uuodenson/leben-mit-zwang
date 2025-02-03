/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/leben-mit-zwang',
  assetPrefix: '/leben-mit-zwang/',
  trailingSlash: true,
}

module.exports = nextConfig
