import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import ContactButton from '@/components/Contact';
import ContactSection from '@/components/ContactSection';
import { companyInfo } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-96 bg-sand-light/20 rounded-xl animate-pulse" />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-sand-light/20 rounded-xl animate-pulse" />,
});

export const metadata: Metadata = buildPageMetadata({
  title: `${companyInfo.name} | مظلات وسواتر الرياض — تركيب احترافي بضمان`,
  description: companyInfo.seoDescription,
  path: '/',
  keywords: [
    'مظلات الرياض',
    'سواتر الرياض',
    'مظلات سيارات الرياض',
    'تركيب مظلات',
    'تركيب سواتر',
    'برجولات الرياض',
    'هناجر الرياض',
    'شركة مظلات الرياض',
    'أسعار مظلات الرياض',
    'سواتر حديد الرياض',
    'مظلات حدائق الرياض',
    'مظلات مسابح الرياض',
  ],
});

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <ContactButton />
    </>
  );
}
