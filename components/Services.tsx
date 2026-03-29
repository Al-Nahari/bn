'use client';

import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-desert">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-coffee-medium font-semibold text-sm uppercase tracking-wider">خدماتنا المتميزة</span>
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
              <div className="h-2 bg-gradient-to-r from-coffee-light via-coffee-medium to-coffee-dark" />

              {/* Service Image Area */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-coffee-medium/5 via-sand-medium/10 to-sand-light/20">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-coffee-medium transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-success"
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
                  className="block w-full text-center bg-gradient-to-r from-coffee-medium/10 to-coffee-medium/5 text-coffee-dark py-4 rounded-xl font-semibold hover:from-coffee-medium hover:to-coffee-dark hover:text-white transition-all duration-300 border border-coffee-medium/20 hover:border-transparent"
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