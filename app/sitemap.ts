import { services } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://mazalat-riyadh.com";

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: service.priority === 1 ? 0.8 : 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...servicePages,
  ];
}
