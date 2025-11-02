
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  experimental: {
    // This is required for the dev environment to work correctly.
  },
  // The new property `allowedDevOrigins` is at the top level.
  allowedDevOrigins: [
    "https://*.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev",
  ],
};

export default nextConfig;
