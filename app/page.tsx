import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';

// Lazy load below-the-fold components
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-96 bg-sand-light/20 rounded-xl animate-pulse" />
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-sand-light/20 rounded-xl animate-pulse" />
});

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