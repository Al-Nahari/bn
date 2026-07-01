import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { projects, getProjectBySlug } from '@/lib/projects';
import { services } from '@/lib/data';
import {
  articleSchema,
  breadcrumbSchema,
  buildPageMetadata,
  imageGallerySchema,
} from '@/lib/seo';

export async function generateStaticParams() {
  return projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: 'مشروع غير موجود',
      description: 'الصفحة المطلوبة غير متوفرة.',
      path: `/gallery/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${project.title} | معرض أعمال مظلات وسواتر الرياض`,
    description: project.summary,
    path: `/gallery/${project.slug}`,
    keywords: [project.serviceLabel, project.region, 'مظلات وسواتر الرياض'],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedService = services.find((s) => s.slug === project.serviceSlug);
  const paragraphs = project.description.trim().split(/\n\n+/).filter(Boolean);
  const allImages = [
    { image: project.coverImage, alt: project.coverAlt, caption: project.title },
    ...project.gallery.map((g) => ({ image: g.image, alt: g.alt, caption: g.caption })),
  ];

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const jsonLd = [
    articleSchema({
      headline: project.title,
      description: project.summary,
      path: `/gallery/${project.slug}`,
      image: project.coverImage,
      datePublished: `${project.completedLabel}-01-01`,
    }),
    imageGallerySchema({
      name: project.title,
      description: project.summary,
      path: `/gallery/${project.slug}`,
      images: allImages.map((img) => ({ url: img.image, caption: img.caption })),
    }),
    breadcrumbSchema([
      { name: 'الرئيسية', path: '/' },
      { name: 'معرض الأعمال', path: '/gallery' },
      { name: project.title, path: `/gallery/${project.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main className="pt-4" id="main-content">
        <section className="bg-gradient-desert py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: 'الرئيسية', href: '/' },
                  { label: 'معرض الأعمال', href: '/gallery' },
                  { label: project.title },
                ]}
              />
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-full bg-coffee-medium/95 px-3 py-1 text-xs font-medium text-white">
                  {project.serviceLabel}
                </span>
                <span className="rounded-full bg-white/80 border border-coffee-medium/20 px-3 py-1 text-xs font-medium text-coffee-dark">
                  {project.region}
                </span>
                <span className="rounded-full bg-white/80 border border-coffee-medium/20 px-3 py-1 text-xs font-medium text-coffee-dark">
                  تم التنفيذ {project.completedLabel}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {project.title}
              </h1>

              <figure className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl mb-4">
                <Image
                  src={project.coverImage}
                  alt={project.coverAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  quality={80}
                  priority
                />
                <figcaption className="sr-only">{project.coverAlt}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-14 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose-content">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                تفاصيل المشروع
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>

              {relatedService && (
                <div className="mt-10 rounded-2xl border border-coffee-medium/15 bg-muted/30 p-6">
                  <p className="text-foreground font-semibold mb-2">
                    هل تبحث عن خدمة {relatedService.shortTitle}؟
                  </p>
                  <p className="text-muted-foreground mb-4">
                    راجع كل تفاصيل خدمة {relatedService.shortTitle} في الرياض — الأسعار
                    التقريبية، الخامات المستخدمة، والأسئلة الشائعة.
                  </p>
                  <Link
                    href={`/${relatedService.slug}`}
                    className="inline-flex items-center gap-2 text-coffee-medium font-semibold hover:text-coffee-dark transition-colors"
                  >
                    عرض صفحة {relatedService.shortTitle} كاملة ←
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="py-14 md:py-16 bg-gradient-desert" aria-labelledby="project-gallery-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 id="project-gallery-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  صور إضافية من المشروع
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.gallery.map((img, index) => (
                    <figure
                      key={index}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md"
                    >
                      <Image
                        src={img.image}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={75}
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent text-white text-sm p-4">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <section className="py-14 md:py-16 bg-white" aria-labelledby="other-projects-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 id="other-projects-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  مشاريع أخرى قد تهمك
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {otherProjects.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/gallery/${other.slug}`}
                      className="group flex flex-col bg-gradient-desert rounded-2xl overflow-hidden border border-coffee-medium/15 hover:border-coffee-medium/40 hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={other.coverImage}
                          alt={other.coverAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={70}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-coffee-medium transition-colors">
                          {other.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{other.summary}</p>
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
              أعجبك هذا التنفيذ؟ نفّذ مشروعك المشابه الآن
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              معاينة مجانية وعرض سعر خلال 24 ساعة — اتصل أو راسلنا على الواتساب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-white text-coffee-espresso px-8 py-4 rounded-xl font-bold hover:bg-sand-light transition-colors"
              >
                رجوع لمعرض الأعمال
              </Link>
              {relatedService && (
                <Link
                  href={`/${relatedService.slug}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  تفاصيل خدمة {relatedService.shortTitle}
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
