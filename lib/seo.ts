export function generateSchema(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: title,
    description: description,
    areaServed: "Riyadh",
    telephone: "+966500000000",
  };
}