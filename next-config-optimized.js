/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // 🚀 تحسينات الأداء والحزم
  // Performance & Bundle Optimizations
  // ============================================================================
  
  // إعدادات التجميع
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
    esmExternals: true,
  },

  // خيارات المترجم لتقليل حجم الحزمة
  compiler: {
    // إزالة console statements في الإنتاج
    removeConsole: process.env.NODE_ENV === 'production',
    // إزالة React debugging library
    styledComponents: true,
  },

  // ============================================================================
  // 🖼️ تحسينات الصور - Image Optimization
  // ============================================================================
  images: {
    // تنسيقات الصور الحديثة (أصغر و أسرع)
    formats: ['image/avif', 'image/webp', 'image/jpeg'],
    
    // أحجام الأجهزة (جوال، تابليت، ديسكتوب)
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // أحجام الصور داخل الصفحة
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384, 512],
    
    // cache TTL (بالثواني)
    minimumCacheTTL: 60 * 60 * 24 * 365, // سنة واحدة للملفات الثابتة
    
    // عدم السماح بـ SVG مباشرة (أقل أماناً)
    dangerouslyAllowSVG: false,
    
    // نوع استجابة الملفات
    contentDispositionType: 'attachment',
    
    // دعم الصور الثابتة من المجلدات الخارجية
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com', // عدّل حسب احتياجاتك
      }
    ],
  },

  // ============================================================================
  // 🔧 تحسينات الإنتاج
  // Production Optimizations
  // ============================================================================
  
  // عدم الحاجة لـ source maps في الإنتاج (يقلل الحجم بـ 50%)
  productionBrowserSourceMaps: false,
  
  // تحسين الخطوط (تحميل فقط الخطوط المستخدمة)
  optimizeFonts: true,

  // استخدام SWC للـ minification (أسرع من Terser)
  swcMinify: true,

  // ============================================================================
  // ⏱️ تحسينات الإنشاء الثابت
  // Static Generation Optimizations
  // ============================================================================
  
  // المدة الزمنية لإنشاء الصفحات الثابتة (بالثواني)
  staticPageGenerationTimeout: 120,
  
  // إعادة التحقق من الصفحات الثابتة (ISR)
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // ساعة واحدة
    pagesBufferLength: 5, // عدد الصفحات المخزنة مؤقتاً
  },

  // ============================================================================
  // 📊 تتبع الأداء والـ Analytics
  // Analytics & Monitoring
  // ============================================================================
  
  // تفعيل Web Vitals metrics في التطوير
  reactStrictMode: true,

  // ============================================================================
  // 🔐 الأمان والـ Headers
  // Security Headers
  // ============================================================================
  
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          // SEO Meta Tags
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // استخدام HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // سياسة الإحالة (للخصوصية)
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // أنماط الصور الثابتة
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/newphoto/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // 🌍 إعادة التوجيه والمسارات المخصصة
  // Redirects & Custom Routes
  // ============================================================================
  
  redirects: async () => {
    return [
      // إعادة توجيه القديم للجديد
      {
        source: '/oldservice/:slug',
        destination: '/service/:slug',
        permanent: true, // 301 (دائم)
      },
    ];
  },

  rewrites: async () => {
    return [
      // إعادة كتابة المسارات (بدون تغيير الـ URL)
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // ============================================================================
  // 📱 التوافقية
  // Compatibility
  // ============================================================================
  
  // إصدار Node
  
  // المتغيرات البيئية
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  },

  // ============================================================================
  // 🎯 International (i18n) - اختياري
  // ============================================================================
  
  // إذا كان لديك i18n
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  },

  // ============================================================================
  // 💾 Caching و CDN
  // ============================================================================
  
  // إضافة headers للـ CDN caching
  // يمكن تفعيلها إذا كان لديك CDN (Cloudflare, Vercel, etc.)
  
};

module.exports = nextConfig;
