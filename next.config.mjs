/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export
  },
  reactStrictMode: true,
};

export default nextConfig;
