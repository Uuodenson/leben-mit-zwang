import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  basePath: "/leben-mit-zwang",
  output: 'export'
};

export default nextConfig;
