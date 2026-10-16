
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Keep redirects non-permanent: browsers and Cloudflare cache 301/308 indefinitely,
  // which made the old /national-heroes redirect linger after it was removed.
  async redirects() {
    return [
      {
        source: '/history',
        destination: '/',
        permanent: false,
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
