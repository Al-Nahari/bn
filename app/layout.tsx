import { companyInfo } from '@/lib/data';
import './globals.css';
export const metadata = {
  title: {
    default: companyInfo.name,
    template: `%s | ${companyInfo.name}`,
  },
  description: companyInfo.tagline,
  keywords: [
    'سواتر الرياض',
    'مظلات الرياض',
    'سواتر حديد',
    'مظلات سيارات',
    'تركيب سواتر',
    'تركيب مظلات',
    'سواتر ومظلات',
    'الرياض',
  ],
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://sawatr-riyad-sa.com',
    title: companyInfo.name,
    description: companyInfo.tagline,
    siteName: companyInfo.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}