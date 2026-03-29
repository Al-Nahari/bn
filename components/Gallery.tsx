import Image from "next/image";
import { services } from "@/lib/data";

export default function Gallery() {
  // Extract all gallery images from all services
  const allGalleryImages = services.flatMap((service) =>
    service.gallery.map((item) => ({
      image: item.image,
      description: item.description,
      serviceTitle: service.title,
    }))
  );

  // Take first 8 images for the gallery grid
  const displayImages = allGalleryImages.slice(0, 8);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {displayImages.map((item, i) => (
        <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <Image
            src={item.image}
            alt={`${item.serviceTitle} - ${item.description}`}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}