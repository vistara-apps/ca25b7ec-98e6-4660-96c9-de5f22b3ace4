/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'echosphere.app'],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

export default nextConfig;
