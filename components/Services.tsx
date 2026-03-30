'use client';

import { useState } from 'react';
import Image from 'next/image';
import { services } from '@/lib/data';
import GalleryLightbox from './GalleryLightbox';

// Service type icons mapping
const serviceIcons: Record<string, string> = {};

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  // Get service category from ID
  const getServiceCategory = (serviceId: string) => {
    const category = serviceId.split('-')[0];
    return serviceIcons[category] || '🔧';
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-desert relative overflow-hidden">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

              {/* Service Icon Badge */}
              <div className="absolute top-16 right-4 z-20 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {getServiceCategory(service.id)}
              </div>

              {/* Service Image Area - Enhanced */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-coffee-medium/5 via-sand-medium/10 to-sand-light/20">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                <div className="space-y-3 mb-6">
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
                </div>

                {/* CTA Button - Enhanced */}
                <button
                  onClick={() => openModal(service)}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-coffee-medium to-coffee-dark text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 group/btn"
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
                </button>
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

      {/* Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Enhanced */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 group/close"
              aria-label="إغلاق"
            >
              <svg className="w-7 h-7 text-coffee-dark group-hover/close:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Featured Image Section - Enhanced */}
            <section className="relative py-20 md:py-32 bg-gradient-desert">
              <div className="absolute inset-0 bg-black/20" />
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-coffee-medium/20 px-6 py-3 rounded-full text-coffee-medium font-semibold text-sm mb-6 shadow-lg">
                    <span className="w-2 h-2 bg-coffee-medium rounded-full animate-pulse"></span>
                    مشروع مميز
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {selectedService.description}
                  </p>
                </div>
                <div className="relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <p className="text-white text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">
                      {selectedService.shortTitle}
                    </p>
                    <p className="text-white/95 text-lg max-w-3xl leading-relaxed drop-shadow-md">
                      {selectedService.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section - New */}
            <section className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      مميزات الخدمة
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-coffee-light to-coffee-dark mx-auto rounded-full" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-br from-coffee-medium/5 to-transparent rounded-2xl hover:from-coffee-medium/10 transition-colors">
                        <div className="w-10 h-10 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-foreground/90 leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            {selectedService.gallery && selectedService.gallery.length > 0 && (
              <section id="gallery" className="py-16 md:py-24 bg-gradient-desert">
                <div className="container mx-auto px-4">
                  {/* Section Header */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-coffee-medium/20 px-6 py-3 rounded-full text-coffee-medium font-semibold text-sm mb-6 shadow-lg">
                      <span className="w-2 h-2 bg-coffee-medium rounded-full animate-pulse"></span>
                      معرض الأعمال
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                      صور تنفيذية للمشاريع
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      نظرة على بعض من أعمالنا المتميزة في مجال {selectedService.title}
                    </p>
                  </div>
                </div>
                <GalleryLightbox
                  images={selectedService.gallery}
                  title={selectedService.title}
                />
              </section>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
