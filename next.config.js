/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "https://simplefilesharing69.s3.ap-south-1.amazonaws.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
