import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import GalleryBrowser from '@/components/GalleryBrowser';
import { getAllNewPhotoImages, newPhotoTypes } from '@/lib/newphoto-gallery';

export const metadata = {
  title: 'معرض الأعمال | مظلات و سواتر الرياض',
  description:
    'تصفح معرض صور أعمالنا من المظلات والسواتر والبرجولات والحدائق في الرياض — مرتبة حسب النوع والاسم.',
};

export default function GalleryPage() {
  const images = getAllNewPhotoImages();
  const types = [...newPhotoTypes];

  return (
    <>
      <Header />
      <main className="pt-4">
        <section className="bg-gradient-desert py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                معرض الأعمال
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {images.length} صورة من مشاريعنا — كل صورة تعرض اسمها ونوعها كما في
                الملف الأصلي. يمكنك التصفية حسب النوع أو فتح أي صورة للمعاينة.
              </p>
            </div>

            <GalleryBrowser images={images} types={types} />
          </div>
        </section>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
