import type { MetadataRoute } from 'next';
import { services } from '@/lib/data';
import { projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

/** تاريخ آخر تحديث افتراضي — يُستخدم فقط للصفحات التي لا تملك تاريخاً مخصصاً */
const LAST_UPDATED = new Date('2025-06-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: service.priority === 1 ? 0.85 : service.priority === 2 ? 0.75 : 0.65,
  }));

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/gallery/${project.slug}`,
    // يعكس تاريخ إنجاز المشروع الفعلي بدل تاريخ ثابت واحد لكل الموقع
    lastModified: new Date(`${project.completedLabel}-06-01`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
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
    ...projectPages,
  ];
}
