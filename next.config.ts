
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Major CDNs & Image Services
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'media.gettyimages.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 's3-eu-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      
      // News & Media Outlets (Consolidated)
      { protocol: 'https', hostname: '**.aljazeera.com' },
      { protocol: 'https', hostname: '*.twimg.com' },
      { protocol: 'https', hostname: '*.pindula.co.zw' },
      { protocol: 'https', hostname: '*.herald.co.zw' },
      { protocol: 'https', hostname: '*.zbcnews.co.zw' },
      { protocol: 'https', hostname: '*.zimlive.com' },
      { protocol: 'https', hostname: '*.zimeye.net' },
      { protocol: 'https', hostname: '*.zimbabwesituation.com' },
      { protocol: 'https', hostname: 'prod.cdn-medias.theafricareport.com' },
      { protocol: 'https', hostname: 'media.cnn.com' },
      { protocol: 'https', hostname: 'i.guim.co.uk' },
      { protocol: 'https', hostname: 'images.ft.com' },
      { protocol: 'https', hostname: 'gdb.voanews.com' },
      { protocol: 'https', hostname: 'cdn1.img.sputniknews.africa' },
      { protocol: 'https', hostname: 'southernafricantimes.com' },
      { protocol: 'https', hostname: 'nehandaradio.com' },
      { protocol: 'https', hostname: 'newziana.co.zw' },
      { protocol: 'https', hostname: 'ipi.media' },
      { protocol: 'https', hostname: 'newsreelzimbabwe.co.zw' },
      { protocol: 'https', hostname: 'cdn.thestandard.co.zw' },
      { protocol: 'https', hostname: 'static.africa-press.net' },
      { protocol: 'https', hostname: 'masvingomirror.com' },
      { protocol: 'https', hostname: 'insiderzim.com' },
      { protocol: 'https', hostname: 'startupbiz.co.zw' },
      
      // Organizational & Other
      { protocol: 'https', hostname: 'www.tandfonline.com' },
      { protocol: 'https', hostname: 'www.english.ox.ac.uk' },
      { protocol: 'https', hostname: 'www.colonialrelic.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'www.victoriafalls-guide.net' },
      { protocol: 'https', hostname: 'cdn.britannica.com' },
      { protocol: 'https', hostname: 'www.dandaro.online' },
      { protocol: 'https', hostname: 'cite.org.zw' },
      { protocol: 'https', hostname: 'images.routledge.com' },
      { protocol: 'https', hostname: 'omo-oss-image.thefastimg.com' },
      { protocol: 'https', hostname: 'hurumende.com' },
      { protocol: 'https', hostname: 'zimbabweanpatriot.co.zw' },
      { protocol: 'https', hostname: 'www.boell.de' },
      { protocol: 'https', hostname: 'zanupf.org.zw' },
      { protocol: 'https', hostname: 'resa.aero' },
      { protocol: 'https', hostname: 'www.acz.co.zw' },
      { protocol: 'https', hostname: 'www.infomin.org.zw' },
      { protocol: 'https', hostname: 'www.freightnews.co.za' },
      { protocol: 'https', hostname: 'apta.biz' },
      { protocol: 'https', hostname: 'www.hit.ac.zw' },
    ],
  },
};

export default nextConfig;
