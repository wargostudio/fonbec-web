// Generador estático de FONBEC (solo en desarrollo: `node tools/build.mjs`).
// Produce la carpeta `dist/` lista para subir a cualquier hosting (Hostinger, Netlify, etc.).
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, postsBySlug } from '../src/content.mjs';
import * as P from '../src/pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'src/static'), out, { recursive: true });

const pages = [
  ['/', P.home(), 1.0],
  ['/quienes-somos/', P.quienesSomos(), 0.9],
  ['/historia/', P.historia(), 0.7],
  ['/que-hacemos/', P.queHacemos(), 0.9],
  ['/impacto/', P.impacto(), 0.8],
  ['/historias/', P.historias(), 0.8],
  ['/colaborar/', P.colaborar(), 1.0],
  ['/contacto/', P.contacto(), 0.8],
];

for (const [path, html] of pages) {
  const file = join(out, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
writeFileSync(join(out, '404.html'), P.notFound());

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, , pr, date]) => `  <url><loc>${site.url}${path}</loc><lastmod>${date || today}</lastmod><priority>${pr.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`
);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /enviar.php\n\nSitemap: ${site.url}/sitemap.xml\n`);

// .htaccess: caché + HTTPS + 404 + redirecciones 301 desde las URLs del WordPress anterior
const oldPages = {
  10: '/quienes-somos/', 1771: '/quienes-somos/', 2003: '/quienes-somos/', 12: '/quienes-somos/#pilares', 533: '/quienes-somos/#red',
  14: '/que-hacemos/', 18: '/colaborar/#amigos', 20: '/impacto/#transparencia', 22: '/impacto/#empresas', 27: '/impacto/#empresas',
  25: '/colaborar/#apadrinar', 149: '/colaborar/#apadrinar', 243: '/colaborar/#apadrinar', 197: '/colaborar/#voluntariado',
  2128: '/colaborar/#becarios', 2055: '/historias/', 29: '/contacto/', 160: '/contacto/#filiales', 92: '/historias/', 2056: '/historias/',
};
// Notas del WordPress anterior → dónde quedó su contenido en el sitio nuevo
const oldPosts = {
  'de-ahijada-a-madrina-2': '/historias/#catherina', 'predicando-con-el-ejemplo': '/historias/#sergio',
  'encuentro-total-filial-fonbec-bs-as': '/historias/#mauro', 'historia-de-final-feliz': '/historias/#santos',
  'una-maestra-que-vale-un-millon': '/historias/#maria-cristina', 'jovenes-embajadores-2012': '/historias/#ezequiel',
  'ezequiel-caceres-becario-de-fonbec-mendoza-fue-seleccionado-por-la-embajada-de-estados-unidos': '/historias/#ezequiel',
  'deportistas': '/historias/#deportistas', 'a-leer': '/historias/#lectura', '10-semanas-en-fonbec-2': '/historias/#voluntarios-michigan',
  'bodegas-abiertas-a-beneficio-de-fonbec-mendoza': '/historia/#y2018', 'el-diario-del-centro-ayuda-que-abre-puertas-y-da-esperanzas': '/impacto/#prensa',
  'la-nacion-no-pueden-terminar-sus-estudios-por-falta-de-recursos-y-buscan-padrinos': '/impacto/#prensa',
  'garayoa-joven-sobresaliente': '/historia/#y2014', 'fonbec-miembro-de-la-federacion-el-foro-del-sector-social-2': '/historia/#y2013',
  'el-premio-al-esfuerzo-educativo': '/historia/#y2012',
};
const rules = [
  ...Object.entries(oldPages).map(([id, to]) => `  RewriteCond %{QUERY_STRING} (^|&)page_id=${id}(&|$)\n  RewriteRule ^(index\\.php)?$ ${to} [R=301,L,NE,QSD]`),
  ...Object.values(postsBySlug).map((p) => {
    const to = oldPosts[p.slug] || '/historias/';
    return `  RewriteCond %{QUERY_STRING} (^|&)p=${p.id}(&|$)\n  RewriteRule ^(index\\.php)?$ ${to} [R=301,L,NE,QSD]\n  RewriteRule ^(index\\.php/)?${p.slug}/?$ ${to} [R=301,L,NE]`;
  }),
  '  RewriteRule ^novedades(/.*)?$ /historias/ [R=301,L]',
].join('\n');
const htaccess = `${readFileSync(join(root, 'src/templates/htaccess.base'), 'utf8')}
ErrorDocument 404 /404.html
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # HTTPS + www (dominio canónico)
  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP_HOST} ^fonbec\\.org\\.ar$ [NC]
  RewriteRule ^(.*)$ https://www.fonbec.org.ar/$1 [R=301,L]

  # Redirecciones desde el sitio WordPress anterior
${rules}

  # Contenido spam inyectado en el sitio anterior y rutas de WordPress: 410 (eliminado definitivamente)
  RewriteCond %{QUERY_STRING} (^|&)(p|cat|feed|page_id|rest_route|s)= [NC]
  RewriteRule ^(index\\.php)?$ - [G,L]
  RewriteRule ^(wp-admin|wp-content|wp-includes|wp-json|xmlrpc\\.php|wp-login\\.php|feed)(/.*)?$ - [G,L]
</IfModule>
`;
writeFileSync(join(out, '.htaccess'), htaccess);

console.log(`✓ ${pages.length + 1} páginas generadas en dist/`);
