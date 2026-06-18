import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, 'lib', 'data.ts');
const NEWPHOTO_DIR = path.join(ROOT, 'public', 'newphoto');
const IMG_DIR = path.join(ROOT, 'public', 'img');
const NP_GALLERY = path.join(ROOT, 'lib', 'newphoto-gallery.ts');
const IM_GALLERY = path.join(ROOT, 'lib', 'img-gallery.ts');

// ====== 1) Parse services from data.ts robustly ======
function parseServices(text: string) {
  const services: { slug: string; shortTitle: string; title: string; keywords: string[] }[] = [];
  // Split into top-level service blocks using id field as anchor
  let pos = 0;
  while (true) {
    const idIdx = text.indexOf('\n  id: "', pos);
    if (idIdx === -1) break;

    // Find the next top-level '  },' after this block start
    const blockStart = idIdx;
    let depth = 0;
    let blockEnd = blockStart;
    for (let i = blockStart; i < text.length; i++) {
      if (text[i] === '{') depth++;
      if (text[i] === '}') depth--;
      if (depth === 0 && text.substring(i, i + 4) === '\n  },') {
        blockEnd = i + 5; // include the \n  },
        break;
      }
    }
    if (blockEnd <= blockStart) break;

    const block = text.slice(blockStart, blockEnd);

    const slug = (block.match(/slug:\s*"([^"]+)"/) || [])[1];
    const shortTitle = (block.match(/shortTitle:\s*"([^"]+)"/) || [])[1];
    const title = (block.match(/title:\s*"([^"]+)"/) || [])[1] || '';
    const kwBlock = (block.match(/keywords:\s*\[([\s\S]*?)\]/) || [])[1] || '';
    const keywords = [...kwBlock.matchAll(/"([^"]+)"/g)].map((k) => k[1]);

    if (slug && shortTitle) {
      services.push({ slug, shortTitle, title, keywords });
    }

    pos = blockEnd;
  }
  return services;
}

// ====== 2) Match scoring ======
function scoreFile(filename: string, svc: { slug: string; shortTitle: string; title: string; keywords: string[] }) {
  const base = filename.toLowerCase();
  let s = 0;
  if (base.includes(svc.shortTitle.toLowerCase())) s += svc.shortTitle.length * 3;
  const titleFirst = svc.title.split('|')[0].trim().toLowerCase();
  if (titleFirst && base.includes(titleFirst)) s += titleFirst.length * 2;
  for (const kw of svc.keywords) {
    if (base.includes(kw.toLowerCase())) s += kw.length;
  }
  for (const part of svc.slug.split('-').filter((x) => x.length > 2)) {
    if (base.includes(part)) s += part.length;
  }
  return s;
}

function matchService(filename: string, services: ReturnType<typeof parseServices>) {
  let best = services[0];
  let bestScore = -1;
  for (const svc of services) {
    const s = scoreFile(filename, svc);
    if (s > bestScore) {
      bestScore = s;
      best = svc;
    }
  }
  return best;
}

// ====== 3) Generate entries ======
function generateEntries(
  dir: string,
  dirName: 'newphoto' | 'img',
  services: ReturnType<typeof parseServices>
) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f))
    .map((file) => {
      const svc = matchService(file, services);
      const slug = svc.slug;
      const type = svc.shortTitle;
      const relPath = '/' + path.join(dirName, file).replace(/\\/g, '/');
      const image = encodeURI(relPath);
      const desc = path.basename(file, path.extname(file));
      return { filename: file, image, description: desc, alt: desc, type, slug } as {
        filename: string;
        image: string;
        description: string;
        alt: string;
        type: string;
        slug: string;
      };
    });
}

// ====== 4) Build TS file ======
function buildGalleyTs(entries: ReturnType<typeof generateEntries>) {
  const items = entries.map((e) => `  ${JSON.stringify(e)}`).join(',\n');
  return [
    '// Auto-generated from public folder — optimized with SEO enhancements',
    '',
    "import type { GalleryImage } from './gallery-types';",
    '',
    `export const imgGallery: (GalleryImage & { slug: string; filename: string })[] = [\n${items}\n];`,
    '',
    'export function getImgImagesBySlug(slug: string): GalleryImage[] {',
    '  return imgGallery',
    '    .filter((item) => item.slug === slug)',
    '    .map(({ image, description, alt, type }) => ({ image, description, alt, type }));',
    '}',
    '',
    'export function getAllImgImages(): GalleryImage[] {',
    '  return imgGallery.map(({ image, description, alt, type }) => ({',
    '    image,',
    '    description,',
    '    alt,',
    '    type,',
    '  }));',
    '}',
    '',
  ].join('\n');
}

// ====== Main ======
const text = fs.readFileSync(DATA_PATH, 'utf8');
const services = parseServices(text);
console.log('Services found:', services.length, services.map(s => `${s.slug} / ${s.shortTitle}`));

const newphotoEntries = generateEntries(NEWPHOTO_DIR, 'newphoto', services);
const imgEntries = generateEntries(IMG_DIR, 'img', services);

fs.writeFileSync(NP_GALLERY, buildGalleyTs(newphotoEntries), 'utf8');
fs.writeFileSync(IM_GALLERY, buildGalleyTs(imgEntries), 'utf8');

console.log('newphoto-gallery.ts entries:', newphotoEntries.length);
console.log('img-gallery.ts entries:', imgEntries.length);
