import type { NextConfig } from 'next';

/**
 * Next.js runtime configuration for image optimization domains.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
