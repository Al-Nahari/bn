import type { MetadataRoute } from 'next';
import { services } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

/** تاريخ آخر تحديث للمحتوى — يُعدَّل يدوياً عند تحديث الصفحات */
const LAST_UPDATED = new Date('2025-06-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: service.priority === 1 ? 0.85 : service.priority === 2 ? 0.75 : 0.65,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...servicePages,
  ];
}
