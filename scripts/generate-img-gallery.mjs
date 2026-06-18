import fs from 'fs';
import path from 'path';
import {
  buildAlt,
  getSlug,
  labelFromFilename,
  normalize,
  parseType,
} from './gallery-mapping.mjs';
import { dedupeFilenames } from './gallery-dedupe.mjs';

const IMG_DIR = path.join(process.cwd(), 'public', 'img');

const allFiles = fs
  .readdirSync(IMG_DIR)
  .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
const files = dedupeFilenames(allFiles);
const skipped = allFiles.length - files.length;
console.log(`img: ${allFiles.length} on disk → ${files.length} after dedupe (skipped ${skipped})`);

const SERVICE_SLUGS = [
  'mazallat-sayarat-riyadh',
  'mazallat-mutaharrika-riyadh',
  'mazallat-haramiya-riyadh',
  'mazallat-shad-inshai-riyadh',
  'mazallat-maqousa-riyadh',
  'mazallat-madaris-riyadh',
  'mazallat-masabi-riyadh',
  'sawatr-hadid-riyadh',
  'sawatr-laser-riyadh',
  'sawatr-qumash-riyadh',
  'sawatr-plastic-riyadh',
  'jalsat-borjolat-riyadh',
  'tansiq-hadaiq-riyadh',
  'ghoraf-sandwich-panel-riyadh',
  'hanajer-w-mastoudat-riyadh',
  'buyut-sha3r-riyadh',
  'asatih-sandwich-panel-riyadh',
  'qaramid-riyadh',
];

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const items = [];
let unclassified = 0;

for (const filename of files) {
  const label = labelFromFilename(filename);
  const norm = normalize(filename.replace(/\.[^.]+$/, ''));
  const type = parseType(norm) ?? 'أعمال متنوعة';
  let slug = getSlug(norm);
  if (!slug) {
    slug = SERVICE_SLUGS[hashString(filename) % SERVICE_SLUGS.length];
    unclassified++;
  }

  const image = `/img/${filename}`;
  const description = label;

  items.push({
    filename,
    image,
    description,
    alt: buildAlt(description, type),
    type,
    slug,
  });
}

const outPath = path.join(process.cwd(), 'lib', 'img-gallery.ts');
const content = `// Auto-generated from public/img — run: node scripts/generate-img-gallery.mjs

import type { GalleryImage } from './gallery';

export const imgGallery: (GalleryImage & { slug: string; filename: string })[] = ${JSON.stringify(items, null, 2)};

export function getImgImagesBySlug(slug: string): GalleryImage[] {
  return imgGallery
    .filter((item) => item.slug === slug)
    .map(({ image, description, alt, type }) => ({ image, description, alt, type }));
}

export function getAllImgImages(): GalleryImage[] {
  return imgGallery.map(({ image, description, alt, type }) => ({
    image,
    description,
    alt,
    type,
  }));
}
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`Wrote ${items.length} images (${unclassified} unclassified) to ${outPath}`);

const counts = {};
for (const item of items) {
  const key = item.slug ?? '_unclassified';
  counts[key] = (counts[key] || 0) + 1;
}
console.log(counts);
