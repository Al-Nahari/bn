'use client';

import Link from 'next/link';
import { services, companyInfo } from '@/lib/data';

export default function Footer() {
  // تجميع الخدمات
  const canopies = services.filter(s => s.id.includes('mazallat'));
  const shades = services.filter(s => s.id.includes('sawatr'));
  const additional = services.filter(s => 
    !s.id.includes('mazallat') && !s.id.includes('sawatr')
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* معلومات الشركة */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              {companyInfo.name}
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {companyInfo.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="font-semibold">📍</span> {companyInfo.address}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">📞</span> 
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition">
                  {companyInfo.phone}
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">📧</span>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition">
                  {companyInfo.email}
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">⏰</span> {companyInfo.workingHours}
              </p>
            </div>
          </div>

          {/* مظلات السيارات */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-coffee-medium pb-2">
              مظلات السيارات
            </h4>
            <ul className="space-y-3">
              {canopies.map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${service.slug}`}
                    className="text-gray-400 hover:text-coffee-medium transition-colors duration-200 
                             text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* السواتر */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-coffee-medium pb-2">
              السواتر والأسوار
            </h4>
            <ul className="space-y-3">
              {shades.map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${service.slug}`}
                    className="text-gray-400 hover:text-coffee-medium transition-colors duration-200 
                             text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الخدمات الإضافية */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-coffee-medium pb-2">
              خدمات أخرى
            </h4>
            <ul className="space-y-3">
              {additional.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${service.slug}`}
                    className="text-gray-400 hover:text-coffee-medium transition-colors duration-200 
                             text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الروابط السريعة */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-coffee-medium pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/"
                  className="text-gray-400 hover:text-coffee-medium transition-colors text-sm"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link 
                  href="#all-services"
                  className="text-gray-400 hover:text-coffee-medium transition-colors text-sm"
                >
                  جميع الخدمات
                </Link>
              </li>
              <li>
                <Link 
                  href="/sitemap"
                  className="text-gray-400 hover:text-coffee-medium transition-colors text-sm"
                >
                  خريطة الموقع
                </Link>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="text-gray-400 hover:text-coffee-medium transition-colors text-sm"
                >
                  اتصل بنا
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-coffee-medium transition-colors text-sm"
                >
                  الواتساب
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* الفاصل */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              © {currentYear} مظلات و سواتر الرياض. جميع الحقوق محفوظة.
            </p>
            <p className="mt-2">
              تصميم وتطوير متخصص | جميع الخدمات متاحة في الرياض والمملكة العربية السعودية
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
