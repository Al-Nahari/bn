import type { Metadata } from 'next';
import Script from 'next/script';
import '@fontsource/noto-sans-arabic/400.css';
import '@fontsource/noto-sans-arabic/700.css';
import { companyInfo } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { localBusinessSchema, webSiteSchema } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${companyInfo.name} | مظلات وسواتر الرياض`,
    template: `%s | ${SITE_NAME}`,
  },
  description: companyInfo.seoDescription,
  applicationName: SITE_NAME,
  authors: [{ name: companyInfo.name, url: SITE_URL }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="II/GkLP/+KLeAbY+8lLp0w"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans pb-28 md:pb-8">
        <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
