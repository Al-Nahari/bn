/**
 * يزيل من data.ts مراجع الصور غير الموجودة على القرص
 * ويستبدل نسخ -Copy إذا وُجد الأصل
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, 'lib', 'data.ts');
const PUBLIC = path.join(ROOT, 'public');

function fileExists(imagePath) {
  if (!imagePath.startsWith('/')) return false;
  const relative = decodeURIComponent(imagePath.slice(1));
  const full = path.join(PUBLIC, relative.replace(/\//g, path.sep));
  return fs.existsSync(full);
}

function resolveCopyPath(imagePath) {
  if (!/-Copy\.(jpg|jpeg|png|webp)$/i.test(imagePath)) return null;
  const alt = imagePath.replace(/-Copy\.(jpg|jpeg|png|webp)$/i, '.$1');
  return fileExists(alt) ? alt : null;
}

function cleanDataTs() {
  let content = fs.readFileSync(DATA_PATH, 'utf8');
  const imageRe = /image:\s*"(\/[^"]+)"/g;
  const paths = [...content.matchAll(imageRe)].map((m) => m[1]);
  const missing = paths.filter((p) => !fileExists(p));

  for (const imagePath of missing) {
    const escaped = imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRe = new RegExp(
      `\\s*\\{[^{}]*image:\\s*"${escaped}"[^{}]*\\},?`,
      'g'
    );
    content = content.replace(blockRe, '');
    content = content.replace(
      new RegExp(`image:\\s*"${escaped}"`, 'g'),
      'image: "/img/IMG-20241015-WA0134.webp"'
    );
  }

  const copyRe = /image:\s*"(\/img\/[^"]+-Copy\.(?:jpg|jpeg|png|webp))"/gi;
  content = content.replace(copyRe, (full, copyPath) => {
    const original = resolveCopyPath(copyPath);
    return original ? `image: "${original}"` : full;
  });

  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  fs.writeFileSync(DATA_PATH, content, 'utf8');

  console.log('data.ts: removed/fixed missing', missing.length);
  if (missing.length) missing.forEach((p) => console.log('  -', p));
}

cleanDataTs();
