/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "arweave.net",
      },
    ],
  },
};

export default nextConfig;
