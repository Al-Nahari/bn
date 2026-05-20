import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import GalleryBrowser from '@/components/GalleryBrowser';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getAllNewPhotoImages, newPhotoTypes } from '@/lib/newphoto-gallery';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'معرض الأعمال | مظلات وسواتر الرياض',
  description:
    'معرض صور مشاريع مظلات وسواتر وبرجولات في الرياض — تصفية حسب النوع، صور حقيقية مع وصف واضح لكل عمل.',
  path: '/gallery',
  keywords: [
    'معرض مظلات الرياض',
    'صور سواتر',
    'أعمال مظلات سيارات',
    'مشاريع سواتر حديد',
  ],
});

export default function GalleryPage() {
  const images = getAllNewPhotoImages();
  const types = [...newPhotoTypes];

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            name: 'معرض أعمال مظلات وسواتر الرياض',
            description:
              'صور مشاريع منفذة في الرياض — مظلات، سواتر، برجولات، وحدائق.',
            path: '/gallery',
            numberOfItems: images.length,
          }),
          breadcrumbSchema([
            { name: 'الرئيسية', path: '/' },
            { name: 'معرض الأعمال', path: '/gallery' },
          ]),
        ]}
      />
      <Header />
      <main className="pt-4" id="main-content">
        <section className="bg-gradient-desert py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: 'الرئيسية', href: '/' },
                  { label: 'معرض الأعمال' },
                ]}
              />
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  معرض الأعمال
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {images.length} صورة من مشاريعنا في الرياض. كل صورة تعرض{' '}
                  <strong className="text-foreground font-medium">اسم العمل</strong> و{' '}
                  <strong className="text-foreground font-medium">نوعه</strong> — يمكنك
                  التصفية حسب التصنيف أو فتح الصورة للمعاينة الكاملة.
                </p>
              </div>

              <GalleryBrowser images={images} types={types} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
