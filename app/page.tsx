import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';

export default function Home() {
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