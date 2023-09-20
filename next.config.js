/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverComponentsExternalPackages: [],
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'robohash.org',
         },
      ],
   },
};

module.exports = nextConfig;
