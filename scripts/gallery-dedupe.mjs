/** استبعاد المكررات: نسخ Copy والمصغرات ونفس الاسم الأساسي */

import { normalize } from './gallery-mapping.mjs';

const THUMB_RE =
  /-(?:32x32|150x150|180x180|192x192|296x300|300x112|300x300)\.(webp|jpg|jpeg|png)$/i;

export function shouldSkipFile(filename) {
  if (THUMB_RE.test(filename)) return true;
  if (/^cropped-/i.test(filename)) return true;
  if (/\bcopy\b/i.test(filename) || /-Copy\./i.test(filename) || /\(1\)/i.test(filename))
    return true;
  if (/\(\d+\)\.(jpg|jpeg|png|webp)$/i.test(filename)) return true;
  return false;
}

function baseKey(filename) {
  let base = filename.replace(/\.[^.]+$/i, '');
  base = base
    .replace(/-Copy$/i, '')
    .replace(/\s+copy$/i, '')
    .replace(/-\d+x\d+$/i, '')
    .replace(/-scaled$/i, '')
    .replace(/-1$/, '')
    .replace(/-/g, ' ');
  return normalize(base);
}

function qualityScore(filename) {
  let score = 0;
  if (/copy/i.test(filename)) score -= 100;
  if (/\.webp$/i.test(filename)) score += 10;
  if (/\.png$/i.test(filename)) score += 5;
  const dim = filename.match(/-(\d+)x(\d+)/i);
  if (dim) score += parseInt(dim[1], 10) + parseInt(dim[2], 10);
  if (!/-\d+x\d+/i.test(filename)) score += 50;
  if (/^picsart/i.test(filename)) score -= 5;
  return score;
}

/** من قائمة أسماء ملفات، يُرجع الملفات غير المكررة (الأفضل من كل مجموعة) */
export function dedupeFilenames(files) {
  const groups = new Map();
  for (const filename of files) {
    if (shouldSkipFile(filename)) continue;
    const key = baseKey(filename);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(filename);
  }

  const kept = [];
  for (const [, group] of groups) {
    group.sort((a, b) => qualityScore(b) - qualityScore(a));
    kept.push(group[0]);
  }
  return kept.sort();
}
