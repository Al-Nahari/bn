'use client';

import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-desert scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-coffee-medium font-semibold text-sm uppercase tracking-wider">آراء العملاء</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نفخر بثقة عملائنا الكرام ونسعى دائماً لتحقيق رضاهم التام
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-coffee-medium/20"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-coffee-medium/10 rounded-full flex items-center justify-center opacity-50">
                <svg className="w-6 h-6 text-coffee-medium" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 30c-1.1 0-2-.9-2-2V16c0-1.1.9-2 2-2s2 .9 2 2v12c0 1.1-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2V16c0-1.1.9-2 2-2s2 .9 2 2v12c0 1.1-.9 2-2 2zM6 14c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2s2 .9 2 2v6c0 1.1-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2s2 .9 2 2v6c0 1.1-.9 2-2 2z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-8 leading-relaxed text-base relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-dashed border-coffee-medium/20">
                <div className="w-14 h-14 bg-gradient-to-br from-coffee-medium to-coffee-dark rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-coffee-medium font-medium">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}