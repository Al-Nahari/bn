import fs from 'fs';
import path from 'path';

const DATA = path.join(process.cwd(), 'lib', 'data.ts');
const PUBLIC = path.join(process.cwd(), 'public');
const content = fs.readFileSync(DATA, 'utf8');
const re = /image:\s*"(\/[^"]+)"/g;
const missing = [];
let m;
while ((m = re.exec(content)) !== null) {
  const rel = decodeURIComponent(m[1].slice(1));
  const full = path.join(PUBLIC, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(full)) missing.push(m[1]);
}
console.log(JSON.stringify(missing, null, 2));
