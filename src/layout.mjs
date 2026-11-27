import { site, nav } from './content.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};
export const fmtShort = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { day: String(d).padStart(2, '0'), month: MONTHS[m - 1].slice(0, 3), year: y };
};

const v = site.version;

// ---------- iconos (SVG inline, trazo uniforme 1.6) ----------
const svg = (body, cls = 'i') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
export const icon = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  down: svg('<path d="m6 9 6 6 6-6"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>'),
  facebook: svg('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 0 1 0 0Z"/>'),
  whatsapp: svg('<path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.4 19Z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2Z"/>'),
  letter: svg('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>'),
  heart: svg('<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>'),
  hand: svg('<path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L4.2 15.5a1.5 1.5 0 0 1 2.3-1.9L7 14"/>'),
  building: svg('<path d="M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M3 21h18"/>'),
  book: svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>'),
  waSolid: '<svg class="i" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3.2A12.8 12.8 0 0 0 5 22.5L3.3 28.8l6.5-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.3c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.5Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>',
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
};

// ---------- componentes ----------
export const btn = (label, href, kind = 'primary', extra = '') =>
  `<a class="btn btn--${kind}" href="${href}"${extra}><span class="btn__label">${label}</span><span class="btn__icon">${icon.arrow}</span></a>`;

export const link = (label, href, extra = '') =>
  `<a class="tlink" href="${href}"${extra}><span>${label}</span>${icon.arrow}</a>`;

export const eyebrow = (num, label) =>
  `<p class="eyebrow"><span class="eyebrow__dot" aria-hidden="true"></span>${num ? `<span class="eyebrow__num">${num}</span>` : ''}${label}</p>`;

// Orbe: el gesto gráfico del logo (aro teal + disco lima desplazado) usado como máscara fotográfica.
export const orb = ({ src, alt = '', cls = '', w = 600, h = 600, lazy = true, tone = 'lime', priority = false }) =>
  `<figure class="orb orb--${tone} ${cls}"><span class="orb__disc" aria-hidden="true"></span><span class="orb__frame"><img src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" ${lazy ? 'loading="lazy"' : ''} decoding="async"${priority ? ' fetchpriority="high"' : ''}></span></figure>`;

export const initialsOrb = (name, cls = '') => {
  const ini = name.split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join('');
  return `<span class="orb orb--initials ${cls}" aria-hidden="true"><span class="orb__disc"></span><span class="orb__frame"><span class="orb__ini">${ini}</span></span></span>`;
};

const logo = (variant = 'color', cls = 'brand') =>
  `<a class="${cls}" href="/" aria-label="FONBEC — Fondo de Becas para Estudiantes, ir al inicio"><img src="/assets/img/${variant === 'white' ? 'logo-fonbec-blanco' : 'logo-fonbec'}.webp" alt="FONBEC — Fondo de Becas para Estudiantes" width="420" height="205"></a>`;

function header(current) {
  const isCur = (href) => (current === href || (href !== '/' && current.startsWith(href)) ? ' aria-current="page"' : '');
  const items = nav
    .map((item, i) => {
      if (!item.children) return `<li><a class="nav__link" href="${item.href}"${isCur(item.href)}>${item.label}</a></li>`;
      const active = item.children.some((c) => current.startsWith(c.href)) ? ' is-active' : '';
      return `<li class="nav__group${active}">
        <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="sub-${i}">${item.label}${icon.down}</button>
        <div class="nav__sub" id="sub-${i}"><ul>${item.children
          .map((c) => `<li><a href="${c.href}"${isCur(c.href)}><strong>${c.label}</strong><span>${c.note}</span></a></li>`)
          .join('')}</ul></div></li>`;
    })
    .join('');
  const mobile = nav
    .flatMap((item) => (item.children ? item.children : [item]))
    .map((c, i) => `<li style="--i:${i}"><a href="${c.href}"${isCur(c.href)}>${c.label}</a></li>`)
    .join('');
  return `<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="site-header__inner wrap">
    ${logo()}
    <nav class="nav" aria-label="Principal"><ul class="nav__list">${items}</ul></nav>
    <div class="site-header__actions">
      ${btn('Quiero colaborar', '/colaborar/', 'primary', ' data-magnetic')}
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu-movil" aria-label="Abrir menú"><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="menu-movil" hidden>
  <nav aria-label="Menú móvil"><ul>${mobile}</ul></nav>
  <div class="mobile-menu__foot">
    ${btn('Quiero colaborar', '/colaborar/', 'primary')}
    <p><a href="mailto:${site.email}">${site.email}</a></p>
    <div class="social">${socialLinks()}</div>
  </div>
</div>`;
}

export const socialLinks = () =>
  `<a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram de FONBEC">${icon.instagram}</a>
   <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook de FONBEC">${icon.facebook}</a>
   <a href="${site.whatsapp.href}" target="_blank" rel="noopener" aria-label="WhatsApp de FONBEC">${icon.whatsapp}</a>`;

function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        ${logo('white', 'brand brand--footer')}
        <p>Una fundación que conecta dos mundos: el de chicos que quieren estudiar y el de personas generosas que quieren ayudar.</p>
        <div class="social social--light">${socialLinks()}</div>
      </div>
      <nav class="site-footer__cols" aria-label="Secundaria">
        <div><h2>Fundación</h2><ul>
          <li><a href="/quienes-somos/">Quiénes somos</a></li>
          <li><a href="/historia/">Nuestra historia</a></li>
          <li><a href="/que-hacemos/">Qué hacemos</a></li>
          <li><a href="/impacto/">Impacto</a></li>
          <li><a href="/impacto/#transparencia">Balances y certificados</a></li>
        </ul></div>
        <div><h2>Sumate</h2><ul>
          <li><a href="/colaborar/#apadrinar">Apadrinar</a></li>
          <li><a href="/colaborar/#amigos">Donar</a></li>
          <li><a href="/colaborar/#voluntariado">Ser voluntario</a></li>
          <li><a href="/colaborar/#empresas">Empresas</a></li>
          <li><a href="/colaborar/#becarios">Quiero ser becario</a></li>
        </ul></div>
        <div><h2>Contacto</h2><ul class="site-footer__contact">
          <li><a href="mailto:${site.email}">${icon.mail}<span>${site.email}</span></a></li>
          <li><a href="${site.phone.href}">${icon.phone}<span>${site.phone.label}</span></a></li>
          <li><a href="${site.whatsapp.href}" target="_blank" rel="noopener">${icon.whatsapp}<span>WhatsApp</span></a></li>
          <li><span>${icon.pin}<span>${site.office.label}<br>${site.office.city}</span></span></li>
        </ul></div>
      </nav>
    </div>
    <div class="site-footer__cta">
      <p>¿Querés ser parte <em>de FONBEC?</em></p>
      ${btn('Conocé cómo sumarte', '/colaborar/', 'lime')}
    </div>
    <div class="site-footer__bottom">
      <p>© <span data-year>2026</span> ${site.legalName}</p>
      <p><a href="/contacto/#filiales">Filiales</a><a href="/historias/">Historias</a><a href="/sitemap.xml">Mapa del sitio</a></p>
      <p class="site-footer__credit">Diseño y desarrollo web: <a href="https://wargostudio.com" target="_blank" rel="nofollow noopener noreferrer">Wargo Studio</a></p>
    </div>
  </div>
</footer>`;
}

// ---------- documento ----------
export function page({ path, title, description, body, ogImage = '/assets/img/og-fonbec.jpg', bodyClass = '', jsonld = [], type = 'website', breadcrumbs = null, noindex = false }) {
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline} | Becas, padrinos y acompañamiento` : `${title} | ${site.name}`;
  const url = site.url + path;
  const ld = [...jsonld];
  if (breadcrumbs) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Inicio', path: '/' }, ...breadcrumbs].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: site.url + b.path })),
    });
  }
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#073c35">
<meta name="color-scheme" content="light">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="FONBEC">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(path === '/' ? `${site.name} — ${site.tagline}` : title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Instrument+Serif:ital@0;1&family=Outfit:wght@300..700&display=swap">
<link rel="stylesheet" href="/css/styles.css?v=${v}">
<script>document.documentElement.classList.add('js')</script>
<script defer src="/js/main.js?v=${v}"></script>
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body class="${bodyClass}">
${header(path)}
<main id="contenido" tabindex="-1">
${body}
</main>
${footer()}
<a class="wa-float" href="${site.whatsapp.chat}" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)" data-wa>${icon.waSolid}<span class="wa-float__label">¿Hablamos por WhatsApp?</span></a>
</body>
</html>
`;
}

// Cabecera interna reutilizable (variaciones por página vía `variant`)
export function pageHero({ kicker, title, lede, variant = 'default', aside = '', crumbs = [] }) {
  const bc = crumbs.length
    ? `<nav class="crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${c.name}</li>` : `<li><a href="${c.path}">${c.name}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  return `<section class="phero phero--${variant}">
  <div class="wrap phero__grid">
    <div class="phero__text">
      ${bc}
      ${kicker ? eyebrow('', kicker) : ''}
      <h1 class="phero__title reveal">${title}</h1>
      ${lede ? `<p class="phero__lede reveal" style="--d:.12s">${lede}</p>` : ''}
    </div>
    ${aside ? `<div class="phero__aside reveal" style="--d:.2s">${aside}</div>` : ''}
  </div>
</section>`;
}

export const ctaBand = ({ title, text, primary, secondary }) => `<section class="cta-band">
  <div class="wrap cta-band__grid">
    <div class="cta-band__orbs" aria-hidden="true"><span></span><span></span><span></span></div>
    <h2 class="cta-band__title reveal">${title}</h2>
    <div class="cta-band__side reveal" style="--d:.1s">
      ${text ? `<p>${text}</p>` : ''}
      <div class="cta-band__actions">${primary || ''}${secondary || ''}</div>
    </div>
  </div>
</section>`;
