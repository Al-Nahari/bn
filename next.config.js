/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  poweredByHeader: false, // إخفاء X-Powered-By لأسباب أمنية
  compress: true,

  experimental: {
    optimizePackageImports: ['@fontsource/noto-sans-arabic'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
         {
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",

    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://analytics.ahrefs.com",

    "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://analytics.ahrefs.com",

    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    "font-src 'self' https://fonts.gstatic.com data:",

    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https:",

    "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://analytics.ahrefs.com",

    "frame-src https://www.googletagmanager.com",

    "frame-ancestors 'none'",

    "base-uri 'self'",

    "form-action 'self'",
  ].join('; '),
},
        ],
      },
      {
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/newphoto/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  redirects: async () => {
    return [];
  },
};

module.exports = nextConfig;
