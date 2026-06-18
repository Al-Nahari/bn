/** @type {import('next').NextConfig} */
const nextConfig = {
  // Target modern browsers to reduce polyfills
  // This removes need for Array.prototype.at, flat/flatMap, Object.fromEntries, trimStart/trimEnd polyfills
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Compiler options to reduce bundle size
  compiler: {
    // Remove console statements in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  optimizeFonts: true,

  // Reduce JavaScript bundle size
  swcMinify: true,

  // Static generation optimization
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;