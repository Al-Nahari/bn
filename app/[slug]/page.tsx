import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, companyInfo } from '@/lib/data';
import GalleryLightbox from '@/components/GalleryLightbox';
import Image from 'next/image';
import ContactButton from '@/components/Contact';
import { notFound } from 'next/navigation';

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
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-4">
        {/* Breadcrumb */}
        <div className="bg-gradient-desert border-b border-coffee-medium/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
              <span>الرئيسية</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>الخدمات</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-foreground font-medium">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Enhanced */}
        <section className="bg-gradient-desert py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image Column */}
                <div className="order-2 md:order-1">
                  <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-coffee-medium/10">
                      <div className="text-2xl font-bold text-coffee-dark">{service.features.length}</div>
                      <div className="text-xs text-muted-foreground mt-1">مميزات</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-coffee-medium/10">
                      <div className="text-2xl font-bold text-coffee-dark">{service.gallery?.length || 0}</div>
                      <div className="text-xs text-muted-foreground mt-1">صور</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-coffee-medium/10">
                      <div className="text-2xl font-bold text-coffee-dark">+10</div>
                      <div className="text-xs text-muted-foreground mt-1">سنوات خبرة</div>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="order-1 md:order-2 space-y-6">
                  {/* Service Badge */}
                  <div className="inline-block bg-coffee-medium/10 text-coffee-dark px-4 py-2 rounded-full text-sm font-semibold border border-coffee-medium/20">
                    {service.shortTitle}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    {service.title}
                  </h1>

                  {/* Short Description */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-coffee-medium/10 shadow-sm">
                    <h3 className="text-lg font-bold text-coffee-dark mb-3 flex items-center gap-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      نظرة عامة
                    </h3>
                    <p className="text-foreground/80 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">التفاصيل</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-gradient-to-r from-coffee-dark via-coffee-medium to-coffee-light text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      اتصل الآن
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      تواصل عبر الواتساب
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Technical Details Card */}
                <div className="md:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    <div className="bg-gradient-desert rounded-2xl p-6 shadow-lg border border-coffee-medium/10">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-coffee-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        معلومات الخدمة
                      </h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">المعرف</dt>
                          <dd className="font-mono text-sm text-foreground bg-coffee-medium/5 rounded px-2 py-1 mt-1">{service.id}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">الرابط</dt>
                          <dd className="font-mono text-sm text-foreground bg-coffee-medium/5 rounded px-2 py-1 mt-1">/{service.slug}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">عدد الصور</dt>
                          <dd className="text-foreground font-semibold mt-1">{service.gallery?.length || 0} صورة</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Quick Contact Card */}
                    <div className="bg-coffee-dark text-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
                      <div className="space-y-4">
                        <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 hover:text-sand-light transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span>{companyInfo.phone}</span>
                        </a>
                        <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sand-light transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>{companyInfo.whatsapp}</span>
                        </a>
                        <div className="flex items-center gap-3 text-sm">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{companyInfo.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-12">
                  {/* Features Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-coffee-light to-coffee-dark rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-foreground">مميزات الخدمة</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group flex items-start gap-4 p-5 bg-gradient-to-br from-sand-light/30 to-white rounded-2xl shadow-sm border border-coffee-medium/5 hover:border-coffee-medium/20 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-success to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-foreground leading-relaxed pt-1">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Section */}
                  {service.gallery && service.gallery.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-coffee-light to-coffee-dark rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">معرض الأعمال</h2>
                      </div>
                      <p className="text-muted-foreground mb-8 text-lg">
                        مجموعة من أعمالنا المميزة في مجال {service.title}
                      </p>
                      <GalleryLightbox images={service.gallery} title={service.title} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-desert">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                هل أنت مستعد لبدء مشروعك؟
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                فريقنا جاهز لمساعدتك في اختيار الحل الأمثل لاحتياجاتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center justify-center gap-2 bg-gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  اتصل الآن
                </a>
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  تواصل عبر الواتساب
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}