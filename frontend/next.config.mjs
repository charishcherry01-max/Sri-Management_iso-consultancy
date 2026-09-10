/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/standards/:id',
        destination: '/standards#:id',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
