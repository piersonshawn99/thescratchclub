/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    optimizePackageImports: ['react'],
  },
  async redirects() {
    return [
      {
        source: '/golf-and-life',
        destination: '/golf-life',
        permanent: true,
      },
    ];
  },
};
