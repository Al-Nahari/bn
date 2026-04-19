import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, companyInfo } from '@/lib/data';
import ServiceDetailsClient from '@/components/ServiceDetailsClient';
import Image from 'next/image';
import ContactButton from '@/components/Contact';

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  return {
    title: service?.title || 'خدمات السواتر والمظلات',
    description: service?.description || 'خدمات تركيب السواتر والمظلات في الرياض',
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

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
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ServiceDetailsClient service={service} />
          </div>
        </div>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}