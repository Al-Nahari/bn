import { pages } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://sawatr-riyad-sa.com";

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