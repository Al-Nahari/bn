'use client';

import Link from 'next/link';
import { services } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">خدماتنا المتميزة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ما نقدمه لكم
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من خدمات تركيب السواتر والمظلات بأعلى معايير الجودة
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Top Border */}
              <div className="h-2 bg-gradient-to-r from-primary via-primary-light to-primary-dark" />

              {/* Service Icon Area */}
              <div className="h-48 bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/${service.slug}`}
                  className="block w-full text-center bg-gradient-to-r from-primary/10 to-primary/5 text-primary py-4 rounded-xl font-semibold hover:from-primary hover:to-primary-dark hover:text-white transition-all duration-300 border border-primary/20 hover:border-transparent"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}