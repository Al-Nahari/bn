import type { Metadata } from 'next';
import Script from 'next/script';
import '@fontsource/noto-sans-arabic/400.css';
import '@fontsource/noto-sans-arabic/500.css';
import '@fontsource/noto-sans-arabic/600.css';
import '@fontsource/noto-sans-arabic/700.css';
import { companyInfo } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { buildPageMetadata, localBusinessSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: `${companyInfo.name} | تركيب مظلات وسواتر في الرياض`,
    description: companyInfo.seoDescription,
    path: '/',
    keywords: [
      'مظلات الرياض',
      'سواتر الرياض',
      'تركيب مظلات',
      'تركيب سواتر',
      'مظلات سيارات الرياض',
      'سواتر حديد',
      'سواتر ليزر',
      'برجولات الرياض',
      'ساندويش بنل الرياض',
    ],
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="II/GkLP/+KLeAbY+8lLp0w"
          async
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans pb-28 md:pb-8">
        <JsonLd data={localBusinessSchema()} />
        {children}
      </body>
    </html>
  );
}
