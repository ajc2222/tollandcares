import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vinext remains the primary local build and performs its own type analysis.
  // The native Next build is used only by Vercel, where `tsc --showConfig`
  // cannot parse the Vinext/Cloudflare type environment.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
