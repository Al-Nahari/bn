'use client';

import { features } from '@/lib/data';

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-muted to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">لماذا نحن</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ما يميزنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نحن نقدم أفضل الخدمات في مجال السواتر والمظلات في الرياض
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20"
            >
              {/* Icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/0 to-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}