// Control de calidad estático: enlaces internos, anclas, imágenes, alt, h1, ids duplicados, metadatos.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dist);
const pageIds = {}; const issues = [];
const rel = (f) => f.replace(dist, '') || '/';
for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) issues.push(`${rel(f)}: ids duplicados ${[...new Set(dup)].join(', ')}`);
  pageIds[rel(f)] = new Set(ids);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) issues.push(`${rel(f)}: ${h1} h1`);
  if (!/<title>[^<]{10,}<\/title>/.test(h)) issues.push(`${rel(f)}: title`);
  const desc = h.match(/name="description" content="([^"]*)"/);
  if (!desc || desc[1].length < 50 || desc[1].length > 175) issues.push(`${rel(f)}: description ${desc ? desc[1].length : 0} chars`);
  for (const m of h.matchAll(/<img\s[^>]*>/g)) { if (!/\salt="/.test(m[0])) issues.push(`${rel(f)}: img sin alt ${m[0].slice(0, 80)}`); const s = m[0].match(/src="([^"]+)"/)[1]; if (s.startsWith('/') && !existsSync(join(dist, s))) issues.push(`${rel(f)}: img rota ${s}`); }
  for (const m of h.matchAll(/href="([^"]*)"/g)) {
    const u = m[1];
    if (!u || u === '#') { issues.push(`${rel(f)}: href vacío`); continue; }
    if (/^(https?:|mailto:|tel:)/.test(u)) continue;
    let [path, hash] = u.split('#'); path = path.split('?')[0];
    if (!path) path = rel(f).replace(/index\.html$/, '');
    let target = join(dist, path); if (path.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) { issues.push(`${rel(f)}: enlace roto ${u}`); continue; }
    if (hash) (globalThis.__anchors ||= []).push([rel(f), u, target.replace(dist, ''), hash]);
  }
  if (/[Ll]orem ipsum|\bTODO\b|PENDIENTE|\bundefined\b|\bNaN\b|\[object/.test(h.replace(/<script[\s\S]*?<\/script>/g, ''))) issues.push(`${rel(f)}: texto de prueba o error de plantilla`);
}
for (const [from, u, page, hash] of globalThis.__anchors || []) if (!pageIds[page]?.has(hash)) issues.push(`${from}: ancla inexistente ${u}`);
console.log(`${files.length} páginas revisadas`);
console.log(issues.length ? issues.join('\n') : '✓ sin problemas');
process.exitCode = issues.length ? 1 : 0;
