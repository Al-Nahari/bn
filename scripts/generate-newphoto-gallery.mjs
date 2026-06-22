import fs from 'fs';
import path from 'path';
import {
  buildAlt,
  getSlug,
  normalize,
  parseType,
} from './gallery-mapping.mjs';

import { dedupeFilenames } from './gallery-dedupe.mjs';

const dir = path.join(process.cwd(), 'public', 'newphoto');
const allFiles = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
const files = dedupeFilenames(allFiles);
console.log(`newphoto: ${allFiles.length} on disk → ${files.length} after dedupe`);

const items = files.map((filename) => {
  const base = filename.replace(/\.[^.]+$/, '');
  const label = normalize(base);
  const type = parseType(label) ?? 'أعمالنا';
  const slug = getSlug(label) ?? 'mazallat-sayarat-riyadh';
  const image = `/newphoto/${filename}`;
  const description = label.length > 3 ? label : type;
  return {
    filename,
    image,
    description,
    alt: buildAlt(description, type),
    type,
    slug,
  };
});

const outPath = path.join(process.cwd(), 'lib', 'newphoto-gallery.ts');
const content = `// Auto-generated from public/newphoto — run: node scripts/generate-newphoto-gallery.mjs

export interface GalleryImage {
  image: string;
  description: string;
  alt: string;
  type: string;
}

export const newPhotoGallery: (GalleryImage & { slug: string; filename: string })[] = ${JSON.stringify(items, null, 2)};

export const newPhotoTypes = ${JSON.stringify([...new Set(items.map((i) => i.type))].sort(), null, 2)} as const;

export function getNewPhotoImagesBySlug(slug: string): GalleryImage[] {
  return newPhotoGallery
    .filter((item) => item.slug === slug)
    .map(({ image, description, alt, type }) => ({ image, description, alt, type }));
}

export function getAllNewPhotoImages(): GalleryImage[] {
  return newPhotoGallery.map(({ image, description, alt, type }) => ({
    image,
    description,
    alt,
    type,
  }));
}
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`Wrote ${items.length} images to ${outPath}`);

const counts = {};
for (const item of items) counts[item.slug] = (counts[item.slug] || 0) + 1;
console.log(counts);
