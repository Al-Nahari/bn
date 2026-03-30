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
        <Testimonials />
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}