"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GalleryLightbox with code splitting
const GalleryLightbox = dynamic(() => import('./GalleryLightbox'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-sand-light/20 rounded-xl animate-pulse" />
  ),
});

interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  features: string[];
  image: string;
  slug: string;
  gallery: {
    image: string;
    description: string;
  }[];
}

interface ServiceDetailsClientProps {
  service: Service;
}

export default function ServiceDetailsClient({ service }: ServiceDetailsClientProps) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
    if (!showDetails) {
      setTimeout(() => {
        const element = document.getElementById('details');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={toggleDetails}
            className="mb-8 flex items-center justify-center gap-2 border-2 border-coffee-medium text-coffee-medium px-8 py-4 rounded-xl text-lg font-semibold hover:bg-coffee-medium hover:text-white transition-all duration-300 w-full sm:w-auto"
          >
            {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div id="details">
          {/* Features Section */}
          <section className="py-16 bg-gradient-desert">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  مميزات الخدمة
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border border-coffee-medium/10 hover:border-coffee-medium/30 transition-all"
                    >
                      <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-success"
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
                      <p className="text-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          {service.gallery && service.gallery.length > 0 && (
            <section className="py-16 bg-gradient-desert">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                    أعمالنا
                  </h2>
                  <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">
                    مجموعة من أعمالنا المميزة في مجال {service.title}
                  </p>

                  <GalleryLightbox images={service.gallery} title={service.title} />
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
