import type { Metadata } from 'next';
import { companyInfo } from '@/lib/data';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

type FaqItem = { question: string; answer: string };

export function absoluteUrl(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title: { absolute: title },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — تركيب مظلات وسواتر في الرياض`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: companyInfo.name,
    description: companyInfo.seoDescription ?? companyInfo.tagline,
    url: SITE_URL,
    telephone: `+${companyInfo.whatsapp}`,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'الرياض',
      addressRegion: 'منطقة الرياض',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'City',
      name: 'الرياض',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
  };
}

export function serviceSchema({
  name,
  description,
  slug,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'الرياض',
    url: absoluteUrl(`/${slug}`),
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

export function faqPageSchema(faq: FaqItem[]) {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageSchema({
  name,
  description,
  path,
  numberOfItems,
}: {
  name: string;
  description: string;
  path: string;
  numberOfItems: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    numberOfItems,
    inLanguage: 'ar',
  };
}

export function serializeJsonLd(data: object | object[] | null) {
  if (!data) return '[]';
  const list = Array.isArray(data) ? data : [data];
  return JSON.stringify(list);
}
