import { pages } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://mazalat-riyadh.com";

  const staticPages = pages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...staticPages,
  ];
}
