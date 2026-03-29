import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import GalleryLightbox from '@/components/GalleryLightbox';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import { services } from '@/lib/data';

export default function Home() {
  // Get gallery images from all services
  const allGalleryImages = services.flatMap((service) =>
    service.gallery.map((item) => ({
      image: item.image,
      description: item.description,
    }))
  );

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="text-coffee-medium font-semibold text-sm uppercase tracking-wider">معرض الأعمال</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                صور تنفيذية للمشاريع
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                نظرة على بعض من أعمالنا المتميزة في مجال المظلات والسواتر
              </p>
            </div>
          </div>
          <GalleryLightbox
            images={allGalleryImages.slice(0, 8)}
            title="معرض مشاريع المظلات والسواتر"
          />
        </section>
        <Testimonials />
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}