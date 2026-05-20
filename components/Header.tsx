'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { companyInfo } from '@/lib/data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/90 backdrop-blur-sm shadow-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-2xl">س</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground leading-none">
                {companyInfo.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                خبراء السواتر والمظلات
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              الرئيسية
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#services"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              خدماتنا
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#features"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              مميزاتنا
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#testimonials"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              آراء العملاء
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/gallery"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              معرض الأعمال
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#contact"
              className="text-foreground hover:text-primary transition-colors font-medium relative group"
            >
              اتصل بنا
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-2 bg-gradient-primary text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">اتصل الآن</span>
            </a>
            <a
              href={`https://wa.me/${companyInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-medium">واتساب</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t mt-4 animate-fade-in-up">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="/#services"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                خدماتنا
              </Link>
              <Link
                href="/#features"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                مميزاتنا
              </Link>
              <Link
                href="/#testimonials"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                آراء العملاء
              </Link>
              <Link
                href="/gallery"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                معرض الأعمال
              </Link>
              <Link
                href="/#contact"
                className="text-foreground hover:text-primary transition-colors font-medium py-3 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              <div className="flex gap-3 pt-4 border-t mt-2">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white text-center py-3 rounded-xl font-medium"
                >
                  اتصال
                </a>
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-xl font-medium"
                >
                  واتساب
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}