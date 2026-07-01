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
    alternates: {
      canonical: url,
      languages: { 'ar-SA': url },
    },
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
      site: '@mazalat_riyadh',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/** WebSite schema مع SearchAction لـ sitelinks search box */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ar-SA',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/gallery?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** LocalBusiness schema محسّن بإحداثيات الرياض */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: companyInfo.name,
    description: companyInfo.seoDescription ?? companyInfo.tagline,
    url: SITE_URL,
    telephone: `+${companyInfo.whatsapp}`,
    email: companyInfo.email,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    // Service-Area Business: لا يوجد مكتب استقبال فعلي، لذا لا نضع عنوان شارع دقيق
    // (وضع عنوان وهمي يخالف إرشادات Google ويعرّض النطاق لخطر الرفض)
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'الرياض',
      addressRegion: 'منطقة الرياض',
      addressCountry: 'SA',
    },
    // نطاق تغطية الخدمة بدلاً من موقع ثابت — أدق تمثيلاً لعمل ميداني بالكامل
    areaServed: [
      { '@type': 'City', name: 'الرياض' },
      { '@type': 'AdministrativeArea', name: 'منطقة الرياض' },
    ],
    priceRange: '$$',
    currenciesAccepted: 'SAR',
    paymentAccepted: 'Cash, Bank Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://mazalat-riyadh.com',
    ],
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
    areaServed: {
      '@type': 'City',
      name: 'الرياض',
    },
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

export function breadcrumbSchema(items: { name: string; path: string }[]) {
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
    inLanguage: 'ar-SA',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** ImageGallery schema — لصفحات المعارض ومشاريع الأعمال */
export function imageGallerySchema({
  name,
  description,
  path,
  images,
}: {
  name: string;
  description: string;
  path: string;
  images: { url: string; caption: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'ar-SA',
    publisher: { '@id': `${SITE_URL}/#organization` },
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: absoluteUrl(img.url),
      caption: img.caption,
    })),
  };
}

/** Article schema — لصفحات دراسة الحالة (مشاريع الأعمال) والمدونة مستقبلاً */
export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: [absoluteUrl(image)],
    url: absoluteUrl(path),
    inLanguage: 'ar-SA',
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  };
}

export function serializeJsonLd(data: object | object[] | null) {
  if (!data) return '[]';
  const list = Array.isArray(data) ? data : [data];
  return JSON.stringify(list);
}
