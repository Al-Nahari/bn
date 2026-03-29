import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import GalleryLightbox from '@/components/GalleryLightbox';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import { services } from '@/lib/data';
import Image from 'next/image';

export default function Home() {
  // Get gallery images from all services
  const allGalleryImages = services.flatMap((service) =>
    service.gallery.map((item) => ({
      image: item.image,
      description: item.description,
    }))
  );

  // Featured image (first service's main image)
  const featuredService = services[0];
  const featuredImage = featuredService?.image;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        {/* Featured Image Section */}
        {featuredImage && (
          <section className="py-16 md:py-24 bg-gradient-desert">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <span className="text-coffee-medium font-semibold text-sm uppercase tracking-wider">مشروع مميز</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {featuredService.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {featuredService.description}
                </p>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
                <Image
                  src={featuredImage}
                  alt={featuredService.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-white text-xl md:text-2xl font-bold mb-2">
                    {featuredService.shortTitle}
                  </p>
                  <p className="text-white/90 max-w-2xl">
                    {featuredService.fullDescription.slice(0, 150)}...
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
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