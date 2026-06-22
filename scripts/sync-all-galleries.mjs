/**
 * مزامنة كاملة: تنظيف data.ts + إعادة توليد معارض img و newphoto
 * node scripts/sync-all-galleries.mjs
 */
import { execSync } from 'child_process';

const root = process.cwd();

console.log('1/3 Cleaning data.ts (removed files)...');
execSync('node scripts/clean-gallery-files.mjs', { cwd: root, stdio: 'inherit' });

console.log('2/3 Regenerating img-gallery...');
execSync('node scripts/generate-img-gallery.mjs', { cwd: root, stdio: 'inherit' });

console.log('3/3 Regenerating newphoto-gallery...');
execSync('node scripts/generate-newphoto-gallery.mjs', { cwd: root, stdio: 'inherit' });

console.log('Done.');
