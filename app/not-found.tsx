import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'الصفحة غير موجودة | مظلات و سواتر الرياض',
  description: 'الصفحة التي تبحث عنها غير متوفرة. تصفح خدماتنا أو معرض الأعمال.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-gradient-desert px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-coffee-medium/30 mb-4">404</p>
          <h1 className="text-2xl font-bold text-foreground mb-3">الصفحة غير موجودة</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            عذراً، الرابط غير صحيح أو الخدمة غير متوفرة. يمكنك العودة للرئيسية أو تصفح
            معرض الأعمال.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex justify-center rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white hover:shadow-lg transition-shadow"
            >
              الرئيسية
            </Link>
            <Link
              href="/gallery"
              className="inline-flex justify-center rounded-xl border border-coffee-medium/30 px-6 py-3 font-semibold text-foreground hover:bg-white transition-colors"
            >
              معرض الأعمال
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
