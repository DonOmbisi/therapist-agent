/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize package imports for faster compilation
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react', 'framer-motion'],
  },

  // Basic image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable compression
  compress: true,

  // Optimize powered by header
  poweredByHeader: false,

  // Enable React strict mode
  reactStrictMode: true,

  // Optimize swc minification
  swcMinify: true,
};

export default nextConfig;
