import Link from 'next/link';
import { services, companyInfo } from '@/lib/data';

export default function Footer() {
  const canopies = services.filter((s) => s.id.includes('mazallat'));
  const shades = services.filter((s) => s.id.includes('sawatr'));
  const additional = services.filter(
    (s) => !s.id.includes('mazallat') && !s.id.includes('sawatr')
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-coffee-espresso text-sand-light py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">{companyInfo.name}</h3>
            <p className="text-sand-medium/90 mb-4 text-sm leading-relaxed">
              {companyInfo.seoDescription}
            </p>
            <address className="not-italic space-y-2 text-sm text-sand-medium/80">
              <p>{companyInfo.address}</p>
              <p>
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </p>
              <p>{companyInfo.workingHours}</p>
            </address>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-coffee-medium/50 pb-2">
              مظلات
            </h4>
            <ul className="space-y-2.5">
              {canopies.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-coffee-medium/50 pb-2">
              سواتر
            </h4>
            <ul className="space-y-2.5">
              {shades.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-coffee-medium/50 pb-2">
              خدمات أخرى
            </h4>
            <ul className="space-y-2.5">
              {additional.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-coffee-medium/50 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm">
                  جميع الخدمات
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm">
                  معرض الأعمال
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm">
                  خريطة الموقع
                </a>
              </li>
              <li>
                <Link href="/#contact" className="text-sand-medium/80 hover:text-coffee-light transition-colors text-sm">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-sand-medium/70">
          <p>© {currentYear} {companyInfo.name}. جميع الحقوق محفوظة.</p>
          <p className="mt-2">تركيب مظلات وسواتر في الرياض وجميع أحياء المنطقة</p>
        </div>
      </div>
    </footer>
  );
}
