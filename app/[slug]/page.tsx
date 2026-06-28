import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { services, companyInfo } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import ContactButton from '@/components/Contact';
import GalleryLightbox from '@/components/GalleryLightbox';
import { mergeServiceGallery } from '@/lib/gallery';
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqPageSchema,
  serviceSchema,
} from '@/lib/seo';

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return buildPageMetadata({
      title: 'خدمة غير موجودة',
      description: 'الصفحة المطلوبة غير متوفرة.',
      path: `/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: service.title,
    description: service.description,
    path: `/${slug}`,
    keywords: service.keywords,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const galleryImages = mergeServiceGallery(service.slug, service.gallery ?? []);
  const summaryParagraphs = service.fullDescription
    .trim()
    .split(/\n\n+/)
    .filter(Boolean);
  const leadParagraph = summaryParagraphs[0] ?? service.description;

  // Related services
  const relatedServices = service.relatedServices
    ? service.relatedServices
        .map((id: string) => services.find((s) => s.id === id))
        .filter(Boolean)
    : [];

  const jsonLd = [
    serviceSchema({
      name: service.shortTitle ?? service.title,
      description: service.description,
      slug: service.slug,
      image: service.image,
    }),
    breadcrumbSchema([
      { name: 'الرئيسية', path: '/' },
      { name: service.shortTitle ?? service.title, path: `/${service.slug}` },
    ]),
    faqPageSchema(service.faq ?? []),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={jsonLd} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-primary focus:font-semibold"
      >
        انتقل إلى المحتوى الرئيسي
      </a>
      <Header />
      <main className="pt-4" id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-desert py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: 'الرئيسية', href: '/' },
                  { label: service.shortTitle ?? service.title },
                ]}
              />

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="order-2 lg:order-1">
                  <p className="text-sm font-semibold text-coffee-medium mb-3">
                    {service.shortTitle} — الرياض
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                    {service.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {service.regions && service.regions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.regions.map((region: string) => (
                        <span
                          key={region}
                          className="rounded-full bg-white/80 border border-coffee-medium/20 px-3 py-1 text-xs font-medium text-coffee-dark"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${companyInfo.phone}`}
                      aria-label={`اتصل بنا لـ ${service.shortTitle}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      اتصل الآن
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`واتساب لاستفسار عن ${service.shortTitle}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all shadow-lg"
                    >
                      واتساب
                    </a>
                  </div>
                </div>

                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                  <Image
                    src={service.image}
                    alt={`${service.shortTitle} — تركيب احترافي في الرياض`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={80}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-14 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                عن خدمة {service.shortTitle} في الرياض
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {leadParagraph}
              </p>
              {summaryParagraphs.length > 1 && (
                <details className="group rounded-2xl border border-coffee-medium/15 bg-muted/30 p-6">
                  <summary className="cursor-pointer font-semibold text-foreground list-none flex items-center justify-between gap-4">
                    <span>اقرأ التفاصيل الكاملة</span>
                    <span
                      className="text-coffee-medium transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      ▼
                    </span>
                  </summary>
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    {summaryParagraphs.slice(1).map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14 md:py-16 bg-gradient-desert" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
                مميزات {service.shortTitle}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-5">
                {service.features.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-coffee-medium/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <section className="py-14 md:py-16 bg-white" aria-labelledby="gallery-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 id="gallery-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    معرض أعمال {service.shortTitle} في الرياض
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    صور حقيقية من مشاريعنا المنفذة — {galleryImages.length} مشروع في الرياض
                  </p>
                </div>
                <GalleryLightbox images={galleryImages} title={service.title} />
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <section className="py-14 md:py-16 bg-gradient-desert" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  الأسئلة الشائعة عن {service.shortTitle}
                </h2>
                <div className="space-y-3">
                  {service.faq.map((item: { question: string; answer: string }, index: number) => (
                    <details
                      key={index}
                      className="group bg-white border border-coffee-medium/15 rounded-xl p-5 hover:border-coffee-medium/30 transition-colors"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-foreground list-none">
                        {item.question}
                        <span className="text-coffee-medium shrink-0 transition-transform group-open:rotate-180" aria-hidden>
                          ▼
                        </span>
                      </summary>
                      <p className="mt-4 text-muted-foreground leading-relaxed border-t border-coffee-medium/10 pt-4">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-14 md:py-16 bg-white" aria-labelledby="related-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  خدمات ذات صلة
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedServices.map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/${related.slug}`}
                      className="group flex flex-col bg-gradient-desert rounded-2xl overflow-hidden border border-coffee-medium/15 hover:border-coffee-medium/40 hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={related.image}
                          alt={`${related.shortTitle} في الرياض`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={70}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-coffee-medium transition-colors">
                          {related.shortTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                        <span className="inline-block mt-3 text-sm font-semibold text-coffee-medium">
                          اعرف المزيد ←
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 bg-coffee-espresso text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              جاهزون لتركيب {service.shortTitle} في موقعك بالرياض
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              معاينة مجانية وعرض سعر خلال 24 ساعة — اتصل أو راسلنا على الواتساب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-coffee-espresso px-8 py-4 rounded-xl font-bold hover:bg-sand-light transition-colors"
              >
                {companyInfo.phone}
              </a>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                شاهد معرض الأعمال
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
