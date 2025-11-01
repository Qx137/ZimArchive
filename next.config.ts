
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
      // General CDNs
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'media.gettyimages.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn.britannica.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },

      // Publication Wildcards
      { protocol: 'https', hostname: '**.aljazeera.com' },
      { protocol: 'https', hostname: '**.pindula.co.zw' },
      { protocol: 'https', hostname: '**.herald.co.zw' },
      { protocol: 'http', hostname: '**.herald.co.zw' },
      { protocol: 'https', hostname: '**.zbcnews.co.zw' },
      { protocol: 'https', hostname: '**.zimlive.com' },
      { protocol: 'https', hostname: '**.zimeye.net' },
      { protocol: 'https', hostname: '**.zimbabwesituation.com' },
      { protocol: 'https', hostname: '**.theafricareport.com' },
      { protocol: 'https', hostname: '**.cnn.com' },
      { protocol: 'https', hostname: '**.guim.co.uk' },
      { protocol: 'https', hostname: '**.ft.com' },
      { protocol: 'https', hostname: '**.voanews.com' },
      { protocol: 'https', hostname: '**.sputniknews.africa' },
      { protocol: 'https', hostname: '**.southernafricantimes.com' },
      { protocol: 'https', hostname: 'nehandaradio.com' },
      { protocol: 'https', hostname: '**.nehandaradio.com' },
      { protocol: 'https', hostname: '**.newziana.co.zw' },
      { protocol: 'https', hostname: '**.insiderzim.com' },
      { protocol: 'https', hostname: '**.startupbiz.co.zw' },

      // Other Specific Domains
      { protocol: 'https', hostname: 'omo-oss-image.thefastimg.com' },
      { protocol: 'https', hostname: 's3-eu-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'www.english.ox.ac.uk' },
      { protocol: 'https' , hostname: 'www.colonialrelic.com'},
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https' , hostname: 'www.victoriafalls-guide.net'},
      { protocol: 'https' , hostname: 'www.dandaro.online'},
      { protocol: 'https', hostname: 'images.routledge.com' },
      { protocol: 'https', hostname: 'boell.de' },
      { protocol: 'https', hostname: 'www.tandfonline.com' },
      { protocol: 'https', hostname: 'hurumende.com' },
      { protocol: 'https', hostname: 'zimbabweanpatriot.co.zw' },
      { protocol: 'https', hostname: 'zanupf.org.zw' },
      { protocol: 'https', hostname: 'resa.aero' },
      { protocol: 'https', hostname: 'apta.biz' },
      { protocol: 'https', hostname: 'cite.org.zw' },
      { protocol: 'https', hostname: 'acz.co.zw' },
      { protocol: 'https', hostname: 'infomin.org.zw' },
      { protocol: 'https', hostname: 'freightnews.co.za' },
      { protocol: 'https', hostname: 'hit.ac.zw' },
      { protocol: 'https', hostname: 'www.heraldonline.co.zw' },
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
