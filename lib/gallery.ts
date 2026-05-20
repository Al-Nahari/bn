import { getNewPhotoImagesBySlug } from './newphoto-gallery';

export interface GalleryImage {
  image: string;
  description: string;
  alt: string;
  type?: string;
}

function imageKey(image: string): string {
  try {
    return decodeURIComponent(image);
  } catch {
    return image;
  }
}

/** دمج صور المعرض الأصلية مع الصور الجديدة من public/newphoto */
export function mergeServiceGallery(
  slug: string,
  existing: GalleryImage[] = []
): GalleryImage[] {
  const newPhotos = getNewPhotoImagesBySlug(slug);
  const seen = new Set(existing.map((item) => imageKey(item.image)));

  const merged = [...existing];
  for (const photo of newPhotos) {
    const key = imageKey(photo.image);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(photo);
    }
  }

  return merged;
}
