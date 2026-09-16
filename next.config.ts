
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/national-heroes',
        destination: '/timeline',
        permanent: true,
      },
    ];
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
