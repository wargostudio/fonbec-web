import { readFileSync } from 'node:fs';
import { filiales, stats, testimonials, pillars, sponsors } from './content.mjs';
import { esc, icon, initialsOrb } from './layout.mjs';

// ---------- Mapa "constelación": ciudades ubicadas por coordenadas reales ----------
const W = 360, H = 640, LON0 = -71.5, LON1 = -53.5, LAT0 = -14, LAT1 = -45.5;
const px = (lon) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;
// posición de etiqueta para evitar superposiciones: [dx, dy, anchor]
const LABEL = {
  'Bolivia': [-10, -10, 'end'], 'Santa Cruz de la Sierra': [10, 4, 'start'], 'Salta': [10, 4, 'start'], 'Tucumán': [10, 4, 'start'],
  'Catamarca': [-10, 4, 'end'], 'Misiones': [-10, -8, 'end'], 'Santa Fe': [10, -6, 'start'], 'San Juan': [-10, 4, 'end'],
  'Córdoba': [-12, -10, 'end'], 'Rosario': [10, 6, 'start'], 'Villa María': [-10, 14, 'end'], 'Mendoza': [-10, 6, 'end'],
  'Buenos Aires': [10, 4, 'start'], 'Tandil': [-10, 4, 'end'], 'Mar del Plata': [10, 8, 'start'], 'Bahía Blanca': [-10, 6, 'end'], 'Trelew': [10, 4, 'start'],
};

export function constellation({ id = 'map', compact = false } = {}) {
  const points = filiales.flatMap((f) => [
    { city: f.abroad ? 'La Paz' : f.city, label: f.abroad ? 'Bolivia' : f.city, lat: f.lat, lon: f.lon, hq: f.hq },
    ...(f.extra || []).map((e) => ({ city: e.city, label: e.city, lat: e.lat, lon: e.lon })),
  ]);
  const hq = points.find((p) => p.hq);
  const hx = px(hq.lon), hy = py(hq.lat);
  const grid = [];
  for (let lat = -15; lat >= -45; lat -= 5) grid.push(`<line x1="0" x2="${W}" y1="${py(lat).toFixed(1)}" y2="${py(lat).toFixed(1)}"/>`);
  for (let lon = -70; lon <= -55; lon += 5) grid.push(`<line y1="0" y2="${H}" x1="${px(lon).toFixed(1)}" x2="${px(lon).toFixed(1)}"/>`);
  const links = points
    .filter((p) => !p.hq)
    .map((p, i) => {
      const x = px(p.lon), y = py(p.lat);
      const mx = (x + hx) / 2 + (y - hy) * 0.18, my = (y + hy) / 2 - (x - hx) * 0.18;
      return `<path style="--i:${i}" pathLength="1" d="M${hx.toFixed(1)} ${hy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}"/>`;
    })
    .join('');
  const dots = points
    .map((p, i) => {
      const x = px(p.lon).toFixed(1), y = py(p.lat).toFixed(1);
      const [dx, dy, anchor] = LABEL[p.label] || [10, 4, 'start'];
      return `<g class="map__city${p.hq ? ' is-hq' : ''}" style="--i:${i}" transform="translate(${x} ${y})">
        ${p.hq ? '<circle class="map__ring" r="13"/>' : ''}<circle class="map__dot" r="${p.hq ? 6 : 4.5}"/>
        <text x="${dx}" y="${dy}" text-anchor="${anchor}">${esc(p.label)}</text></g>`;
    })
    .join('');
  return `<figure class="map${compact ? ' map--compact' : ''}" id="${id}">
  <svg viewBox="-70 -24 ${W + 140} ${H + 44}" role="img" aria-labelledby="${id}-t">
    <title id="${id}-t">Ciudades con presencia de FONBEC en Argentina y Bolivia</title>
    <g class="map__grid">${grid.join('')}</g>
    <g class="map__links">${links}</g>
    <g class="map__cities">${dots}</g>
  </svg>
  <figcaption><span class="map__legend-hq"></span> Oficina Córdoba <span class="map__legend-dot"></span> Filiales y ciudades con becarios</figcaption>
</figure>`;
}

export function statsList(cls = '') {
  return `<dl class="stats ${cls}">${stats
    .map(
      (s, i) => `<div class="stats__item reveal" style="--d:${i * 0.08}s">
      <dt><span class="stats__num" data-count="${s.value}" data-prefix="${s.prefix || ''}">${s.prefix || ''}${s.value.toLocaleString('es-AR')}</span></dt>
      <dd><strong>${s.label}</strong><span>${s.note}</span></dd></div>`
    )
    .join('')}</dl>`;
}

// ---------- Diagrama de cómo funciona (nodos + carta en movimiento) ----------
export function howDiagram() {
  const letterPath = 'M118 356 C 150 250, 250 230, 270 200 S 330 130, 360 118';
  return `<svg class="how-diagram" viewBox="0 0 480 480" role="img" aria-labelledby="how-t how-d">
  <title id="how-t">Cómo funciona FONBEC</title>
  <desc id="how-d">Un padrino o madrina aporta una beca mensual a un estudiante. Un mediador voluntario acompaña al estudiante y la carta une a ambos.</desc>
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#dee45a" stop-opacity=".35"/><stop offset="1" stop-color="#dee45a" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="hd__links">
    <path class="hd__link hd__link--letter" id="how-letter" d="${letterPath}"/>
    <path class="hd__link hd__link--med" d="M150 380 C 220 430, 290 420, 330 392"/>
    <path class="hd__link hd__link--fund" d="M372 182 C 410 260, 400 320, 372 340"/>
    <path class="hd__link hd__link--bond" d="${letterPath}"/>
  </g>
  <g class="hd__node hd__node--padrino" transform="translate(360 118)">
    <circle class="hd__halo" r="96" fill="url(#glow)"/>
    <circle class="hd__disc" r="54" cx="-10" cy="8"/><circle class="hd__ring" r="54"/>
    <g class="hd__icon" transform="translate(-14 -16)"><circle cx="14" cy="9" r="7"/><path d="M0 34c0-8 6-14 14-14s14 6 14 14"/></g>
    <text class="hd__label" y="84">Padrino · Madrina</text>
  </g>
  <g class="hd__node hd__node--becario" transform="translate(118 356)">
    <circle class="hd__halo" r="96" fill="url(#glow)"/>
    <circle class="hd__disc" r="54" cx="-10" cy="8"/><circle class="hd__ring" r="54"/>
    <g class="hd__icon" transform="translate(-16 -14)"><path d="M2 8 16 2l14 6-14 6Z"/><path d="M8 11v8c0 3 4 5 8 5s8-2 8-5v-8"/></g>
    <text class="hd__label" y="84">Becario · Becaria</text>
  </g>
  <g class="hd__node hd__node--mediador" transform="translate(362 368)">
    <circle class="hd__halo" r="80" fill="url(#glow)"/>
    <circle class="hd__disc" r="40" cx="-8" cy="6"/><circle class="hd__ring" r="40"/>
    <g class="hd__icon" transform="translate(-13 -12)"><circle cx="13" cy="6" r="5"/><path d="M1 26c0-7 5-12 12-12s12 5 12 12"/></g>
    <text class="hd__label" y="66">Mediador voluntario</text>
  </g>
  <g class="hd__fonbec" transform="translate(236 252)" aria-hidden="true">
    <circle r="8" cx="-9" cy="-2" class="hd__m1"/><circle r="10" cx="9" cy="-6" class="hd__m2"/>
  </g>
  <g class="hd__envelope">
    <g transform="translate(-14 -10)"><rect width="28" height="20" rx="2"/><path d="m1 2 13 9 13-9"/></g>
    <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".6 0 .4 1;.6 0 .4 1"><mpath href="#how-letter"/></animateMotion>
  </g>
  <g class="hd__heart" transform="translate(236 252)"><path d="M0 9s-11-6.7-11-14.6A6.3 6.3 0 0 1 0-9.2a6.3 6.3 0 0 1 11 3.6C11 2.3 0 9 0 9Z"/></g>
</svg>`;
}

export function howSteps(numbered = true) {
  return `<ol class="how__steps">${pillars
    .map(
      (p, i) => `<li class="how__step" data-step="${p.key}">
      <span class="how__num">${numbered ? String(i + 1).padStart(2, '0') : ''}</span>
      <div><h3>${p.title}</h3><p class="how__short">${p.short}</p><p>${p.text}</p></div></li>`
    )
    .join('')}</ol>`;
}

// ---------- Testimonios con pestañas accesibles ----------
export function testimonialTabs(ids = ['isaac', 'barbara', 'liliana', 'jorge', 'monica']) {
  const list = ids.map((id) => testimonials.find((t) => t.id === id));
  const tabs = list
    .map(
      (t, i) => `<button class="voices__tab" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
      <span class="voices__name">${t.name}</span><span class="voices__role">${t.role}</span></button>`
    )
    .join('');
  const panels = list
    .map(
      (t, i) => `<div class="voices__panel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" tabindex="0"${i === 0 ? '' : ' hidden'}>
      ${t.img ? `<figure class="orb orb--lime voices__orb"><span class="orb__disc" aria-hidden="true"></span><span class="orb__frame"><img src="${t.img}" alt="${esc(t.name)}" width="204" height="451" loading="lazy" decoding="async"></span></figure>` : initialsOrb(t.name, 'voices__orb')}
      <blockquote class="voices__quote"><p>${t.quote}</p><footer><cite>${t.name}</cite><span>${t.role}</span></footer></blockquote></div>`
    )
    .join('');
  return `<div class="voices">
    <div class="voices__tabs" role="tablist" aria-label="Testimonios">${tabs}</div>
    <div class="voices__panels">${panels}</div>
  </div>`;
}

// Logos con tamaño equilibrado por área visual (los horizontales no dominan a los cuadrados).
const logoDir = new URL('./static/assets/img/logos/', import.meta.url);
function pngSize(file) {
  const b = readFileSync(new URL(file + '.png', logoDir));
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
function logoImg(file, name, hidden = false) {
  const { w, h } = pngSize(file);
  const r = w / h, AREA = 7200, MAXH = 88, MAXW = 190;
  let dw = Math.sqrt(AREA * r), dh = dw / r;
  if (dh > MAXH) { dh = MAXH; dw = dh * r; }
  if (dw > MAXW) { dw = MAXW; dh = dw / r; }
  return `<img src="/assets/img/logos/${file}.png" alt="${hidden ? '' : esc(name)}" width="${Math.round(dw)}" height="${Math.round(dh)}" loading="lazy" decoding="async">`;
}

export function sponsorMarquee() {
  const row = sponsors.map(([file, name]) => `<li>${logoImg(file, name)}</li>`).join('');
  const rowHidden = sponsors.map(([file, name]) => `<li>${logoImg(file, name, true)}</li>`).join('');
  return `<div class="marquee" aria-label="Empresas que acompañan a FONBEC">
    <ul class="marquee__track">${row}</ul>
    <ul class="marquee__track" aria-hidden="true">${rowHidden}</ul>
  </div>`;
}

export const waysToJoin = [
  { n: '01', id: 'apadrinar', title: 'Apadriná', text: 'Acompañá a un estudiante con un aporte mensual y una carta que va y viene.', href: '/colaborar/#apadrinar' },
  { n: '02', id: 'voluntariado', title: 'Sumá tu tiempo', text: 'Más de 100 voluntarios hacen posible el trabajo cotidiano de FONBEC.', href: '/colaborar/#voluntariado' },
  { n: '03', id: 'amigos', title: 'Doná', text: 'Como Amigo de FONBEC, con el monto que puedas, sostenés la Misión.', href: '/colaborar/#amigos' },
  { n: '04', id: 'empresas', title: 'Tu empresa', text: 'Canalizá tu programa de Responsabilidad Social a través de la educación.', href: '/colaborar/#empresas' },
  { n: '05', id: 'becarios', title: 'Quiero estudiar', text: '¿Tenés muchas ganas de estudiar y necesitás apoyo? Empezá tu camino.', href: '/colaborar/#becarios' },
];

export function joinRows(items = waysToJoin) {
  return `<ul class="rows">${items
    .map(
      (w, i) => `<li class="reveal" style="--d:${i * 0.06}s"><a class="row" href="${w.href}">
      <span class="row__n">${w.n}</span><span class="row__t">${w.title}</span><span class="row__d">${w.text}</span><span class="row__a">${icon.arrow}</span></a></li>`
    )
    .join('')}</ul>`;
}
