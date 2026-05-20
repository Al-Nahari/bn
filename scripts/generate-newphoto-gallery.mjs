import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'newphoto');
const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();

function normalize(text) {
  return text
    .replace(/مضلات/g, 'مظلات')
    .replace(/مضلان/g, 'مظلات')
    .replace(/مضله/g, 'مظلة')
    .replace(/سندوش/g, 'ساندويش')
    .replace(/حدايق/g, 'حدائق')
    .replace(/خارجه/g, 'خارجية')
    .replace(/بلاستيكيه/g, 'بلاستيكية')
    .replace(/\.+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseType(name) {
  const checks = [
    ['هناجر', 'هناجر ومستودعات'],
    ['مستودعات', 'هناجر ومستودعات'],
    ['ساندويش', 'ساندويش بنل'],
    ['سندوش', 'ساندويش بنل'],
    ['غرف', 'غرف ساندويش بنل'],
    ['قرميد', 'قرميد'],
    ['ليزر', 'سواتر ليزر'],
    ['بلاستيك', 'سواتر بلاستيك'],
    ['بديل الخشب', 'سواتر بديل الخشب'],
    ['سواتر', 'سواتر'],
    ['ساتر', 'سواتر'],
    ['برجول', 'برجولات وجلسات'],
    ['جلسات', 'جلسات خارجية'],
    ['جلسه', 'جلسات خارجية'],
    ['تنسيق', 'تنسيق حدائق'],
    ['حدائق', 'تنسيق حدائق'],
    ['مدارس', 'مظلات مدارس'],
    ['ساحات', 'مظلات مدارس'],
    ['مسابح', 'مظلات مسابح'],
    ['لكسان', 'مظلات مسابح'],
    ['هرميه', 'مظلات هرمية'],
    ['هرمية', 'مظلات هرمية'],
    ['مقوسه', 'مظلات مقوسة'],
    ['مقوسة', 'مظلات مقوسة'],
    ['كلادينج', 'مظلات كلادينج'],
    ['ممرات', 'مظلات ممرات'],
    ['تضليل', 'تضليل ممرات'],
    ['سيارات', 'مظلات سيارات'],
    ['سيارت', 'مظلات سيارات'],
    ['مواقف', 'مظلات مواقف'],
    ['اسطح', 'مظلات أسطح'],
    ['مظلات', 'مظلات'],
  ];
  for (const [key, type] of checks) {
    if (name.includes(key)) return type;
  }
  if (/picsart/i.test(name)) return 'أعمال متنوعة';
  return 'أعمالنا';
}

function getSlug(name) {
  if (/هناجر|مستودعات/.test(name)) return 'hanajer-w-mastoudat-riyadh';
  if (/ساندويش|سندوش|غرف/.test(name)) return 'ghoraf-sandwich-panel-riyadh';
  if (/قرميد/.test(name)) return 'qaramid-riyadh';
  if (/ليزر/.test(name)) return 'sawatr-laser-riyadh';
  if (/بلاستيك|بديل الخشب/.test(name)) return 'sawatr-plastic-riyadh';
  if (/سواتر|ساتر/.test(name)) return 'sawatr-hadid-riyadh';
  if (/تنسيق|حدائق|حدايق/.test(name) && !/جلسات|برجول|جلسه/.test(name))
    return 'tansiq-hadaiq-riyadh';
  if (/برجول|جلسات|جلسه/.test(name)) return 'jalsat-borjolat-riyadh';
  if (/مدارس|ساحات/.test(name)) return 'mazallat-madaris-riyadh';
  if (/مسابح|لكسان/.test(name)) return 'mazallat-masabi-riyadh';
  if (/هرميه|هرمية/.test(name)) return 'mazallat-haramiya-riyadh';
  if (/مقوسه|مقوسة/.test(name)) return 'mazallat-maqousa-riyadh';
  if (/كلادينج/.test(name)) return 'mazallat-shad-inshai-riyadh';
  if (/ممرات|تضليل/.test(name)) return 'mazallat-maqousa-riyadh';
  if (/اسطح/.test(name)) return 'asatih-sandwich-panel-riyadh';
  if (/سيارات|سيارت|مواقف/.test(name)) return 'mazallat-sayarat-riyadh';
  if (/مظلات/.test(name)) return 'mazallat-sayarat-riyadh';
  if (/picsart/i.test(name)) return 'jalsat-borjolat-riyadh';
  return 'mazallat-sayarat-riyadh';
}

const items = files.map((filename) => {
  const base = filename.replace(/\.[^.]+$/, '');
  const label = normalize(base);
  const type = parseType(label);
  const slug = getSlug(label);
  const image = `/newphoto/${encodeURIComponent(filename)}`;
  return {
    filename,
    image,
    description: label,
    alt: `${label} - ${type} في الرياض`,
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
