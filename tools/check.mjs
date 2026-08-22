import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const root = process.cwd();
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (f === 'node_modules' || f === '.git' || f === '.claude') continue;
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(root);

let bad = 0, checked = 0;
const ids = new Map();

for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  ids.set(p, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])));
}

for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const r of refs) {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/|\/_vercel\/)/.test(r)) {
      if (r.startsWith('#') && r.length > 1) {
        checked++;
        if (!ids.get(p).has(r.slice(1))) { console.log('MISSING ANCHOR', p, r); bad++; }
      }
      continue;
    }
    checked++;
    const [path] = r.split('#');
    const target = path.startsWith('/') ? resolve(root, '.' + path) : resolve(dirname(p), path);
    if (!existsSync(target)) { console.log('MISSING FILE  ', p.replace(root, ''), '->', r); bad++; }
  }
}

// cross-page anchors (e.g. index.html#work from work/*.html)
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  for (const m of html.matchAll(/(?:href)="([^"#]+)#([^"]+)"/g)) {
    const target = m[1].startsWith('/') ? resolve(root, '.' + m[1]) : resolve(dirname(p), m[1]);
    if (!existsSync(target)) continue;
    checked++;
    if (!ids.get(target)?.has(m[2])) { console.log('MISSING ANCHOR', p.replace(root,''), '->', m[0]); bad++; }
  }
}

console.log(`\n${pages.length} pages, ${checked} references checked, ${bad} broken.`);
process.exit(bad ? 1 : 0);
