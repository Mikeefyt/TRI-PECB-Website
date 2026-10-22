import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const routes = ['', 'courses', 'corporate-training', 'your-pathway', 'about', 'faqs', 'contact'];
for (const route of routes) {
  const file = path.join(root, 'dist', route, 'index.html');
  if (!fs.existsSync(file)) throw new Error(`Missing page: ${route || '/'}`);
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('/cursor-animation.js')) throw new Error(`Missing cursor script: ${route || '/'}`);
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const relative = decodeURIComponent(match[1]);
    let target = path.join(root, 'dist', relative);
    if (relative.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) throw new Error(`Missing target in ${route || '/'}: ${relative}`);
  }
}
for (const name of fs.readdirSync(path.join(root, 'dist')).filter(name => name.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, 'dist', name)], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || `JavaScript syntax check failed: ${name}`);
}
console.log('Validated seven pages, local assets, page paths and JavaScript syntax.');
console.log('No compilation is required. Deployment files are already in dist/.');
