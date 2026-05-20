'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services-summary';

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-desert relative overflow-hidden scroll-mt-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coffee-medium rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-coffee-light rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-coffee-medium/20 px-6 py-3 rounded-full text-coffee-medium font-semibold text-sm mb-6 shadow-lg">
            <span className="w-2 h-2 bg-coffee-medium rounded-full animate-pulse"></span>
            خدماتنا المتخصصة
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            نقدم لكم <span className="bg-gradient-to-r from-coffee-dark via-coffee-medium to-coffee-light bg-clip-text text-transparent">أفضل الحلول</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            خبراء في تركيب جميع أنواع السواتر والمظلات بأعلى معايير الجودة والاحترافية
          </p>
        </div>

        {/* Services Grid - Enhanced */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 card-hover flex flex-col"
              style={{
                animationDelay: `${index * 100}ms`,
                transform: hoveredCard === service.id ? 'translateY(-12px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Top Border - More Vibrant */}
              <div className="h-3 bg-gradient-to-r from-coffee-light via-coffee-medium to-coffee-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>

              {/* Service Image Area - Enhanced */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-coffee-medium/5 via-sand-medium/10 to-sand-light/20">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={75}
                    priority={index === 0}
                  />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Category Label on Image */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-coffee-dark text-xs font-bold px-4 py-2 rounded-full shadow-md">
                    {service.shortTitle || service.title.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Service Content - Enhanced */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-coffee-medium transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Features List - Enhanced */}
                <ul className="space-y-3 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-success/30 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 text-success"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors line-clamp-2">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Link - Direct Navigation */}
                <Link
                  href={`/${service.slug}`}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-coffee-medium to-coffee-dark text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 group/btn text-center block"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    عرض التفاصيل
                    <svg
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark to-coffee-medium translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 90, 43, 0.1) 0%, transparent 50%)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
