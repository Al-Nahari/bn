import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import GalleryBrowser from '@/components/GalleryBrowser';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getAllGalleryImages, getAllGalleryTypes } from '@/lib/gallery';
import { projects } from '@/lib/projects';
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
  const images = getAllGalleryImages();
  const types = getAllGalleryTypes();

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

            </div>
          </div>
        </section>

        {/* Featured Projects — Portfolio مع وصف تفصيلي لكل مشروع */}
        <section className="py-14 md:py-16 bg-white" aria-labelledby="projects-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="projects-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  مشاريع مميزة — دراسات حالة تفصيلية
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  تفاصيل كاملة عن كل مشروع: التصميم، الخامات المستخدمة، ومدة التنفيذ
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/gallery/${project.slug}`}
                    className="group flex flex-col bg-gradient-desert rounded-2xl overflow-hidden border border-coffee-medium/15 hover:border-coffee-medium/40 hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.coverImage}
                        alt={project.coverAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={75}
                      />
                      <span className="absolute top-3 right-3 rounded-full bg-coffee-medium/95 px-3 py-1 text-xs font-medium text-white">
                        {project.serviceLabel}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-coffee-medium transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {project.summary}
                      </p>
                      <span className="inline-block text-sm font-semibold text-coffee-medium">
                        تفاصيل المشروع ←
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Full photo browser */}
        <section className="py-14 md:py-16 bg-gradient-desert" aria-labelledby="all-photos-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="all-photos-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  جميع الصور
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {images.length} صورة من مشاريعنا في الرياض — تصفية حسب النوع
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
