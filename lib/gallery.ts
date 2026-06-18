import type { GalleryImage } from './gallery-types';
export type { GalleryImage } from './gallery-types';
import { getAllImgImages, getImgImagesBySlug } from './img-gallery';
import { getAllNewPhotoImages, getNewPhotoImagesBySlug } from './newphoto-gallery';

function imageKey(image: string): string {
  try {
    return decodeURIComponent(image);
  } catch {
    return image;
  }
}

function appendUnique(
  merged: GalleryImage[],
  seen: Set<string>,
  photos: GalleryImage[]
) {
  for (const photo of photos) {
    const key = imageKey(photo.image);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(photo);
    }
  }
}

/** دمج صور data.ts + public/newphoto + public/img */
export function mergeServiceGallery(
  slug: string,
  existing: GalleryImage[] = []
): GalleryImage[] {
  const seen = new Set(existing.map((item) => imageKey(item.image)));
  const merged = [...existing];
  appendUnique(merged, seen, getNewPhotoImagesBySlug(slug));
  appendUnique(merged, seen, getImgImagesBySlug(slug));
  return merged;
}

export function getAllGalleryImages(): GalleryImage[] {
  const seen = new Set<string>();
  const merged: GalleryImage[] = [];
  appendUnique(merged, seen, getAllNewPhotoImages());
  appendUnique(merged, seen, getAllImgImages());
  return merged;
}

export function getAllGalleryTypes(): string[] {
  const types = new Set<string>();
  for (const img of getAllGalleryImages()) {
    if (img.type) types.add(img.type);
  }
  return [...types].sort();
}
