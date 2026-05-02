import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, companyInfo } from '@/lib/data';
import Image from 'next/image';
import ContactButton from '@/components/Contact';
import GalleryLightbox from '@/components/GalleryLightbox';

export async function generateStaticParams() {
  const slugs = services.map((service) => ({ slug: service.slug }));
  console.log('Generated static params:', slugs);
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  return {
    title: service?.title ?? 'خدمات السواتر والمظلات',
    description: service?.description ?? 'خدمات تركيب السواتر والمظلات في الرياض',
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // Await params to get the actual slug
  const { slug } = await params;

  // Find the service
  const service = services.find((s) => s.slug === slug);

  // If service not found, show error
  if (!service) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gradient-desert">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              الخدمة غير موجودة
            </h1>
            <p className="text-muted-foreground">
              عذراً، الخدمة المطلوبة غير متوفرة حالياً.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-4">
        {/* Hero Section for Service */}
        <section className="bg-gradient-desert py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    {service.title}
                  </h1>
                  {service.shortTitle && (
                    <p className="text-xl text-coffee-medium font-semibold mb-4">
                      {service.shortTitle}
                    </p>
                  )}
                  {service.description && (
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                  )}
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {service.fullDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      اتصل الآن
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      تواصل عبر الواتساب
                    </a>
                  </div>
                </div>
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                مميزات الخدمة
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gradient-desert rounded-xl shadow-md border border-coffee-medium/10 hover:border-coffee-medium/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {service.gallery && service.gallery.length > 0 && (
          <section className="py-16 bg-gradient-desert">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                  أعمالنا
                </h2>
                <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">
                  مجموعة من أعمالنا المميزة في مجال {service.title}
                </p>

                <GalleryLightbox images={service.gallery} title={service.title} />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  الأسئلة الشائعة
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, index) => (
                    <details
                      key={index}
                      className="group border border-coffee-medium/20 rounded-xl p-6 hover:border-coffee-medium/40 transition-all"
                    >
                      <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                        {item.question}
                        <span className="ml-2 transform group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
