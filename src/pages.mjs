import { site, mission, pillars, becarioRequirements, testimonials, stories, milestones, filiales, companiesText, network, documents, postsBySlug, graduates, moments, press } from './content.mjs';
import { page, pageHero, ctaBand, btn, link, eyebrow, orb, initialsOrb, icon, esc, fmtDate, socialLinks } from './layout.mjs';
import { constellation, statsList, howDiagram, howSteps, testimonialTabs, sponsorMarquee, joinRows, waysToJoin } from './shared.mjs';

const org = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'FONBEC — Fondo de Becas para Estudiantes',
  alternateName: 'Fundación FONBEC',
  url: site.url,
  logo: `${site.url}/assets/img/logo-fonbec.png`,
  foundingDate: '1999',
  founder: { '@type': 'Person', name: 'Facundo Garayoa' },
  email: site.email,
  telephone: '+54 351 341 9008',
  address: { '@type': 'PostalAddress', streetAddress: 'Obispo Trejo 219, Oficina 302', addressLocality: 'Córdoba', addressCountry: 'AR' },
  sameAs: [site.social.instagram, site.social.facebook],
  description: site.description,
};

// ---------- Formulario reutilizable ----------
const MOTIVOS = [
  ['apadrinar', 'Quiero ser padrino o madrina'],
  ['voluntariado', 'Quiero ser voluntario/a'],
  ['donar', 'Quiero donar (Amigo de FONBEC)'],
  ['empresa', 'Represento a una empresa'],
  ['becario', 'Quiero ser becario/a'],
  ['historia', 'Quiero compartir mi historia'],
  ['consulta', 'Otra consulta'],
];
function contactForm({ id = 'form', motivo = 'consulta', title = 'Escribinos', intro = '' } = {}) {
  const opts = MOTIVOS.map(([v, l]) => `<option value="${v}"${v === motivo ? ' selected' : ''}>${l}</option>`).join('');
  return `<form class="form" id="${id}" action="/enviar.php" method="post" novalidate data-form>
  <div class="form__head"><h3>${title}</h3>${intro ? `<p>${intro}</p>` : ''}</div>
  <div class="form__grid">
    <div class="field field--full"><label for="${id}-motivo">Motivo</label>
      <div class="select"><select id="${id}-motivo" name="motivo" data-motivo>${opts}</select>${icon.down}</div></div>
    <div class="field"><label for="${id}-nombre">Nombre <span aria-hidden="true">*</span></label>
      <input id="${id}-nombre" name="nombre" autocomplete="given-name" required minlength="2" aria-describedby="${id}-nombre-e"><p class="field__err" id="${id}-nombre-e"></p></div>
    <div class="field"><label for="${id}-apellido">Apellido <span aria-hidden="true">*</span></label>
      <input id="${id}-apellido" name="apellido" autocomplete="family-name" required minlength="2" aria-describedby="${id}-apellido-e"><p class="field__err" id="${id}-apellido-e"></p></div>
    <div class="field"><label for="${id}-email">Correo electrónico <span aria-hidden="true">*</span></label>
      <input id="${id}-email" name="email" type="email" autocomplete="email" required aria-describedby="${id}-email-e"><p class="field__err" id="${id}-email-e"></p></div>
    <div class="field"><label for="${id}-tel">Teléfono o celular</label>
      <input id="${id}-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel" pattern="[\\d\\s+\\(\\)\\-]{6,}" aria-describedby="${id}-tel-e"><p class="field__err" id="${id}-tel-e"></p></div>
    <div class="field"><label for="${id}-ciudad">Ciudad</label>
      <input id="${id}-ciudad" name="ciudad" autocomplete="address-level2"></div>
    <div class="field" data-show-for="empresa"><label for="${id}-empresa">Empresa</label>
      <input id="${id}-empresa" name="empresa" autocomplete="organization"></div>
    <div class="field field--full"><label for="${id}-como">¿Cómo conociste FONBEC?</label>
      <input id="${id}-como" name="como_conocio"></div>
    <div class="field field--full"><label for="${id}-msg">Mensaje <span aria-hidden="true">*</span></label>
      <textarea id="${id}-msg" name="mensaje" rows="5" required minlength="10" aria-describedby="${id}-msg-e"></textarea><p class="field__err" id="${id}-msg-e"></p></div>
    <div class="hp" aria-hidden="true"><label for="${id}-web">No completar</label><input id="${id}-web" name="web" tabindex="-1" autocomplete="off"></div>
    <div class="field field--full field--check"><input id="${id}-ok" name="acepto" type="checkbox" required aria-describedby="${id}-ok-e"><label for="${id}-ok">Acepto que FONBEC use estos datos solo para responder mi consulta.</label><p class="field__err" id="${id}-ok-e"></p></div>
  </div>
  <div class="form__foot">
    <button class="btn btn--primary" type="submit"><span class="btn__label">Enviar mensaje</span><span class="btn__icon">${icon.arrow}</span></button>
    <p class="form__note">Los campos con * son obligatorios.</p>
  </div>
  <div class="form__status" role="status" aria-live="polite" tabindex="-1"></div>
</form>`;
}

// Bloques reutilizables con las fotos nuevas
const gradsBlock = (eyebrowNum = '') => `<section class="grads" aria-labelledby="grads-title">
  <div class="wrap">
    <header class="grads__head">
      ${eyebrow(eyebrowNum, 'Me recibí')}
      <h2 class="h2 reveal" id="grads-title">Del aula <em>a la profesión.</em></h2>
      <p class="reveal" style="--d:.1s">Cada título es el resultado del esfuerzo de un estudiante y del acompañamiento de su padrino, su madrina y su mediador.</p>
    </header>
    <ul class="grads__list">${graduates
      .map((g, i) => `<li class="grads__item reveal" style="--d:${i * 0.1}s"><figure><span class="grads__frame"><img src="${g.img}" alt="${esc(g.alt)}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async"></span><figcaption><span class="grads__label">Me recibí</span>${g.title}</figcaption></figure></li>`)
      .join('')}</ul>
  </div>
</section>`;

const momentsBlock = (eyebrowNum = '') => `<section class="moments" aria-labelledby="moments-title">
  <div class="wrap">
    <header class="split-head">
      <div>${eyebrow(eyebrowNum, 'Momentos')}<h2 class="h2 reveal" id="moments-title">Así se vive <em>FONBEC.</em></h2></div>
      <a class="ig-pill" href="${site.social.instagram}" target="_blank" rel="noopener">${icon.instagram}<span>Seguí el día a día en <strong>@fonbec_nacional</strong></span>${icon.arrowUpRight}</a>
    </header>
    <ul class="moments__grid">${moments
      .map((m, i) => `<li class="moments__item moments__item--${m.area} reveal" style="--d:${(i % 3) * 0.08}s"><figure><img src="${m.img}" alt="${esc(m.alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async"><figcaption>${m.cap}</figcaption></figure></li>`)
      .join('')}</ul>
  </div>
</section>`;

// =================================================================== HOME
export function home() {
  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"><span class="hero__sun"></span></div>
  <div class="wrap hero__grid">
    <div class="hero__text">
      ${eyebrow('', 'Fondo de Becas para Estudiantes · Desde 1999')}
      <h1 class="hero__title" id="hero-title"><span class="ln"><span>Conectamos</span></span> <span class="ln"><span><em>dos mundos.</em></span></span></h1>
      <p class="hero__lede reveal" style="--d:.35s">El de chicos y jóvenes que quieren estudiar, y el de personas generosas que quieren ayudar. Con una beca mensual, cartas que van y vienen y acompañamiento personal.</p>
      <div class="hero__actions reveal" style="--d:.45s">
        ${btn('Quiero ser padrino o madrina', '/colaborar/#apadrinar', 'primary', ' data-magnetic')}
        ${link('Cómo funciona', '#como-funciona')}
      </div>
    </div>
    <div class="hero__art" data-parallax>
      <svg class="hero__thread" viewBox="0 0 600 640" aria-hidden="true" focusable="false">
        <path id="hero-path" d="M96 560 C 30 470, 80 380, 170 400 S 300 560, 420 520 S 600 420, 520 330"/>
        <g class="hero__env"><g transform="translate(-13 -9)"><rect width="26" height="18" rx="2"/><path d="m1 2 12 8 12-8"/></g>
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto"><mpath href="#hero-path"/></animateMotion></g>
      </svg>
      ${orb({ src: '/assets/img/chicos-banner-fonbec.webp', alt: 'Chicos y chicas de FONBEC sostienen una bandera pintada con sus manos y el nombre de la Fundación', cls: 'hero__orb hero__orb--a', w: 1400, h: 788, lazy: false, priority: true })}
      ${orb({ src: '/assets/img/egresada-bioquimica.webp', alt: 'Una egresada sonríe con un cartel que dice “Me recibí, soy bioquímica”', cls: 'hero__orb hero__orb--b', w: 900, h: 1200, lazy: false, tone: 'teal' })}
      ${orb({ src: '/assets/img/abanderado.webp', alt: 'Un chico abanderado sostiene la bandera argentina', cls: 'hero__orb hero__orb--c', w: 653, h: 1160, lazy: false })}
      <p class="hand hero__note hero__note--a" aria-hidden="true">de la primaria…</p>
      <p class="hand hero__note hero__note--b" aria-hidden="true">…a la universidad</p>
    </div>
  </div>
  <div class="wrap">
    <ul class="hero__facts reveal" style="--d:.55s">
      <li><strong>+2.000</strong> becarios y becarias</li>
      <li><strong>16</strong> ciudades de Argentina y <strong>2</strong> de Bolivia</li>
      <li>De la primaria a la <strong>universidad</strong></li>
    </ul>
  </div>
</section>

<section class="purpose" id="proposito" aria-labelledby="purpose-title">
  <div class="wrap purpose__grid">
    <div class="purpose__side">
      ${eyebrow('01', 'Propósito')}
      <h2 class="visually-hidden" id="purpose-title">Nuestro propósito</h2>
      <p class="purpose__founding reveal">${mission.founding}</p>
      ${link('Nuestra historia', '/historia/')}
    </div>
    <p class="purpose__big" data-fill>Creemos en la educación como la herramienta básica de transformación y promoción social. Por eso acompañamos a estudiantes de entornos vulnerables para que puedan <em>seguir estudiando</em> y concretar sus metas.</p>
  </div>
  <div class="wrap">
    <ol class="attrs">${mission.attributes
      .map((a, i) => `<li class="reveal" style="--d:${i * 0.08}s"><span class="attrs__mark" aria-hidden="true"></span><h3>${a.name}</h3><p>${a.text}</p></li>`)
      .join('')}</ol>
  </div>
</section>

<section class="how" id="como-funciona" aria-labelledby="how-title" data-how>
  <div class="wrap">
    <header class="how__head">
      ${eyebrow('02', 'Cómo funciona')}
      <h2 class="h2 reveal" id="how-title">Una beca, <em>una carta,</em> un vínculo.</h2>
    </header>
    <div class="how__grid">
      <div class="how__visual"><div class="how__sticky">${howDiagram()}</div></div>
      ${howSteps()}
    </div>
    <div class="how__foot reveal">${link('Conocé el programa completo', '/que-hacemos/')}</div>
  </div>
</section>

<section class="letter" aria-labelledby="letter-title">
  <div class="wrap letter__grid">
    <div class="letter__text">
      ${eyebrow('03', 'La carta')}
      <h2 class="h2 reveal" id="letter-title">El ahijado <em>no es un ser anónimo.</em></h2>
      <p class="reveal" style="--d:.1s">El padrino sabe quién es, dónde vive, cuántos hermanos tiene, qué le pasa, cuáles son sus dificultades y cuáles son sus sueños.</p>
      <p class="reveal" style="--d:.15s">Cada becario escribe periódicamente a su padrino o madrina. La carta fomenta la comunicación, permite detectar situaciones que requieran ayuda extraescolar y funciona como rendición de cuentas de la beca.</p>
    </div>
    <div class="letter__art" data-letter>
      <figure class="letter__photo"><img src="/assets/img/nino-escribiendo-carta.webp" alt="Un chico sonríe mientras escribe una carta" width="1200" height="675" loading="lazy" decoding="async"></figure>
      <div class="envelope" aria-hidden="true"><span class="envelope__back"></span><span class="envelope__flap"></span><span class="envelope__front"></span></div>
      <figure class="note">
        <blockquote><p class="hand">“Hasta que llegó la primera carta de Karen. Allí la conocí. Supe quién era, cuáles eran sus problemas y cuáles eran sus sueños. Mi aporte dejó de ser para FONBEC: ahora yo sabía que mi aporte era para Karen.”</p></blockquote>
        <figcaption><strong>Bárbara Negri</strong>, madrina de Karen</figcaption>
        <span class="note__stamp" aria-hidden="true"></span>
      </figure>
    </div>
  </div>
</section>

<section class="impact" aria-labelledby="impact-title">
  <div class="wrap impact__grid">
    <div class="impact__text">
      ${eyebrow('04', 'Impacto')}
      <h2 class="h2 reveal" id="impact-title">El impacto se mide <em>en personas.</em></h2>
      ${statsList()}
      <p class="impact__source">Datos institucionales publicados por FONBEC.</p>
      ${link('Impacto y transparencia', '/impacto/')}
    </div>
    <div class="impact__map reveal">${constellation({ id: 'home-map', compact: true })}</div>
  </div>
</section>

${gradsBlock()}

<section class="stories-home" aria-labelledby="voices-title">
  <div class="wrap">
    <header class="split-head">
      <div>${eyebrow('05', 'Historias')}<h2 class="h2 reveal" id="voices-title">Historias que se escriben <em>de a dos.</em></h2></div>
      ${link('Todas las historias', '/historias/')}
    </header>
    ${testimonialTabs()}
  </div>
</section>

<section class="join" id="sumate" aria-labelledby="join-title">
  <div class="wrap join__grid">
    <div class="join__head">
      ${eyebrow('06', 'Sumate')}
      <h2 class="h2 reveal" id="join-title">Hay muchas formas <em>de ser parte.</em></h2>
      <p class="reveal" style="--d:.1s">Sin el trabajo cotidiano y silencioso de padrinos, madrinas y voluntarios no sería posible que miles de estudiantes terminen sus estudios.</p>
    </div>
    ${joinRows()}
  </div>
</section>

${momentsBlock('07')}

<section class="partners" aria-labelledby="partners-title">
  <div class="wrap partners__head">
    <h2 id="partners-title">Nos acompañan</h2>
    <p>Empresas que concretan su programa de RSE a través de FONBEC.</p>
  </div>
  ${sponsorMarquee()}
</section>

${ctaBand({
  title: 'Hay muchos niños y adolescentes <em>esperándote.</em>',
  text: 'Convertite en padrino o madrina y acompañá a un estudiante en su camino.',
  primary: btn('Quiero apadrinar', '/colaborar/#apadrinar', 'lime', ' data-magnetic'),
  secondary: link('Hablemos', '/contacto/', ' data-light'),
})}`;
  return page({ path: '/', title: 'Inicio', description: site.description, body, bodyClass: 'is-home', jsonld: [org, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'FONBEC', url: site.url, inLanguage: 'es-AR' }] });
}

// =================================================================== QUIÉNES SOMOS
export function quienesSomos() {
  const crumbs = [{ name: 'Quiénes somos', path: '/quienes-somos/' }];
  const body = `
${pageHero({
  kicker: 'Quiénes somos',
  title: 'Una fundación que <em>une personas</em> a través de la educación.',
  lede: `${mission.founding} ${mission.today}`,
  variant: 'orbs',
  crumbs,
  aside: orb({ src: '/assets/img/chicos-banner-fonbec.webp', alt: 'Chicos y chicas de FONBEC con una bandera pintada con sus manos', w: 1400, h: 788, lazy: false, priority: true, cls: 'phero__orb' }),
})}

<section class="mission">
  <div class="wrap mission__grid">
    ${eyebrow('', 'Misión')}
    <blockquote class="mission__quote reveal"><p>${mission.statement}</p></blockquote>
  </div>
  <div class="wrap">
    <p class="mission__intro reveal">Nuestra Misión es <strong>educativa, integral, circular y vinculante.</strong></p>
    <ol class="attrs attrs--large">${mission.attributes
      .map((a, i) => `<li class="reveal" style="--d:${i * 0.08}s"><span class="attrs__mark" aria-hidden="true"></span><h3>${a.name}</h3><p>${a.text}</p></li>`)
      .join('')}</ol>
  </div>
</section>

<section class="how how--page" id="pilares" data-how aria-labelledby="pilares-title">
  <div class="wrap">
    <header class="how__head">${eyebrow('', 'Cómo trabajamos')}<h2 class="h2 reveal" id="pilares-title">Nuestros <em>5 pilares.</em></h2></header>
    <div class="how__grid"><div class="how__visual"><div class="how__sticky">${howDiagram()}</div></div>${howSteps()}</div>
  </div>
</section>

<section class="volunteers">
  <div class="wrap volunteers__grid">
    <div class="volunteers__media">
      <figure class="volunteers__img reveal"><img src="/assets/img/equipo-voluntarias.webp" alt="Grupo de voluntarias y voluntarios de FONBEC con un banderín con el nombre de la Fundación" width="900" height="1200" loading="lazy" decoding="async"></figure>
      <div class="volunteers__num reveal" style="--d:.15s"><span data-count="100" data-prefix="+">+100</span><small>voluntarios</small></div>
    </div>
    <div>
      ${eyebrow('', 'Una organización de voluntarios')}
      <h2 class="h2 reveal">Detrás de cada beca hay <em>personas que dan su tiempo.</em></h2>
      <p class="reveal">En FONBEC trabajan más de 100 voluntarios y un solo empleado administrativo rentado. Realizan todo tipo de tareas, desde las más profesionalizadas hasta las más sencillas, y todas son de enorme valor: sin ellas FONBEC no podría cumplir su Misión.</p>
      ${btn('Quiero ser voluntario', '/colaborar/?motivo=voluntariado#voluntariado', 'primary')}
    </div>
  </div>
</section>

<section class="network" id="red">
  <div class="wrap network__grid">
    <div>
      ${eyebrow('', 'Trabajo en red')}
      <h2 class="h2 reveal">Solos llegamos lejos. <em>En red, más lejos.</em></h2>
      <p class="reveal">FONBEC desarrolló programas y convenios con organizaciones sociales, universidades y fundaciones. Además, integra la Federación que nuclea Asociaciones Civiles y Fundaciones de todo el país: el Foro del Sector Social.</p>
    </div>
    <ul class="tags-cloud reveal">${network.map((n) => `<li>${n}</li>`).join('')}</ul>
  </div>
</section>

${ctaBand({ title: 'Conocé el impacto <em>de este trabajo.</em>', text: 'Cifras, presencia territorial, empresas que nos acompañan y documentación institucional.', primary: btn('Impacto y transparencia', '/impacto/', 'lime'), secondary: link('Nuestra historia', '/historia/', ' data-light') })}`;
  return page({ path: '/quienes-somos/', title: 'Quiénes somos', description: 'Desde 1999, FONBEC une a estudiantes de entornos vulnerables con padrinos y madrinas. Conocé nuestra misión, los 5 pilares y nuestra red de voluntarios.', body, breadcrumbs: crumbs, jsonld: [org] });
}

// =================================================================== HISTORIA
export function historia() {
  const crumbs = [{ name: 'Nosotros', path: '/quienes-somos/' }, { name: 'Nuestra historia', path: '/historia/' }];
  const items = milestones
    .map(
      (m, i) => `<li class="tl__item${m.img ? ' has-img' : ''}">
      <div class="tl__year reveal" id="y${m.year === 'Hoy' ? 'hoy' : m.year}"><span>${m.year}</span></div>
      <div class="tl__body reveal" style="--d:.08s">
        <h2>${m.title}</h2><p>${m.text}</p>
        ${m.link ? link(m.link[0], m.link[1]) : ''}
      </div>
      ${m.img ? `<figure class="tl__img reveal${m.contain ? ' is-contain' : ''}" style="--d:.14s"><img src="${m.img}" alt="${m.contain ? 'Logo conmemorativo de los 25 años de FONBEC' : 'Foto: ' + esc(m.title)}" loading="lazy" decoding="async" width="600" height="400"></figure>` : ''}
    </li>`
    )
    .join('');
  const body = `
${pageHero({ kicker: 'Nuestra historia', title: 'Más de dos décadas <em>abriendo puertas.</em>', lede: 'Lo que empezó en 1999 como la búsqueda de padrinos para unos pocos estudiantes hoy es una red federal de becarios, padrinos, mediadores y voluntarios.', crumbs, variant: 'year', aside: '<p class="phero__year" aria-hidden="true">1999</p>' })}
<section class="tl" data-timeline>
  <div class="wrap">
    <div class="tl__line" aria-hidden="true"><span></span></div>
    <ol class="tl__list">${items}</ol>
  </div>
</section>
${ctaBand({ title: 'La próxima página <em>la escribimos juntos.</em>', primary: btn('Sumate', '/colaborar/', 'lime'), secondary: link('Ver historias', '/historias/', ' data-light') })}`;
  return page({ path: '/historia/', title: 'Nuestra historia', description: 'De 1999 a hoy: los hitos de FONBEC, el Fondo de Becas para Estudiantes que hoy acompaña a más de 2.000 becarios en Argentina y Bolivia.', body, breadcrumbs: crumbs });
}

// =================================================================== QUÉ HACEMOS
export function queHacemos() {
  const crumbs = [{ name: 'Qué hacemos', path: '/que-hacemos/' }];
  const levels = [
    ['Primaria', 'Desde los 6 años'],
    ['Secundaria', 'Para terminar la escuela'],
    ['Terciario y universidad', 'Para llegar a una profesión'],
  ];
  const initiatives = [
    { t: 'Tutorías y talleres', d: 'Las filiales organizan tutorías universitarias, actividades de fortalecimiento y talleres —como robótica— para que cada becario desarrolle su potencial.', icon: icon.book },
    { t: 'Bolsa de Trabajo', d: 'Acompañamos el paso del estudio al trabajo: muchos egresados consiguen su primer empleo a través de la red de FONBEC.', icon: icon.building, href: '/historias/#catherina' },
    { t: 'Animación a la lectura', d: 'Proyectos impulsados por padrinos y docentes para acercar libros a chicos que no tienen uno a mano.', icon: icon.letter, href: '/historias/#lectura' },
    { t: 'Deporte y cultura', d: 'Padrinos y empresas han hecho posible que becarias practiquen hockey o tenis fuera del horario escolar.', icon: icon.heart, href: '/historias/#deportistas' },
  ];
  const body = `
${pageHero({ kicker: 'Qué hacemos', title: 'Becas que vienen <em>con compañía.</em>', lede: 'Posibilitamos, mediante un aporte económico y acompañamiento académico y personal, que estudiantes de entornos vulnerables continúen sus estudios.', crumbs, variant: 'illus', aside: `<div class="phero__duo">
      ${orb({ src: '/assets/img/reconocimiento-trayectoria-plaza.webp', alt: 'Becarios y voluntarias de FONBEC reunidos bajo un árbol con sus certificados de reconocimiento', w: 800, h: 1067, lazy: false, priority: true, cls: 'phero__duo-a' })}
      ${orb({ src: '/assets/img/nino-escribiendo-carta.webp', alt: 'Un chico sonríe mientras escribe una carta', w: 1200, h: 675, lazy: false, tone: 'teal', cls: 'phero__duo-b' })}
      <p class="hand phero__duo-note" aria-hidden="true">nadie estudia solo</p>
    </div>` })}

<section class="levels">
  <div class="wrap levels__grid">
    <div>${eyebrow('', 'El programa de becas')}<h2 class="h2 reveal">Una beca mensual, <em>de la primaria a la universidad.</em></h2>
    <p class="reveal">Padrinos y madrinas aportan una beca mensual para estudiantes de nivel primario, secundario y terciario o universitario. La beca la administra un mediador voluntario que conoce al estudiante y lo acompaña.</p>
    <figure class="levels__img reveal"><img src="/assets/img/bienvenida-programa-becas.webp" alt="Un becario recibe su certificado de bienvenida al Programa de Becas junto a dos integrantes de FONBEC" width="1100" height="825" loading="lazy" decoding="async"><figcaption>Bienvenida al Programa de Becas.</figcaption></figure></div>
    <ol class="levels__list">${levels.map(([t, d], i) => `<li class="reveal" style="--d:${i * 0.08}s"><span class="levels__n">${i + 1}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}</ol>
  </div>
</section>

<section class="how how--page" data-how aria-labelledby="hq-title">
  <div class="wrap">
    <header class="how__head">${eyebrow('', 'Cómo funciona')}<h2 class="h2 reveal" id="hq-title">Cinco pilares, <em>un mismo propósito.</em></h2></header>
    <div class="how__grid"><div class="how__visual"><div class="how__sticky">${howDiagram()}</div></div>${howSteps()}</div>
  </div>
</section>

<section class="encounters">
  <div class="wrap encounters__grid">
    <figure class="encounters__img reveal"><img src="/assets/img/encuentros-vinculos.webp" alt="Pieza de FONBEC “Encuentros, vínculos”: una videollamada entre padrino y ahijado" width="940" height="788" loading="lazy" decoding="async"></figure>
    <div>
      ${eyebrow('', 'Los encuentros')}
      <h2 class="h2 reveal">Lo que sucede por carta, <em>un día se vuelve abrazo.</em></h2>
      <p class="reveal">Cuando ahijados y padrinos manifiestan su deseo de conocerse, FONBEC facilita el encuentro. La experiencia demuestra que el padrino se transforma en un verdadero referente para su ahijado, y el vínculo que se establece enriquece a ambos.</p>
      ${link('Crónica del encuentro en Buenos Aires', '/historias/#mauro')}
    </div>
  </div>
</section>

<section class="initiatives">
  <div class="wrap">
    <header class="split-head">${eyebrow('', 'Más allá de la beca')}<h2 class="h2 reveal">Acompañar es <em>mucho más que un aporte.</em></h2></header>
    <figure class="initiatives__img reveal"><img src="/assets/img/taller-robotica.webp" alt="Un joven muestra un robot de competencia a un grupo de chicos durante un taller" width="900" height="1200" loading="lazy" decoding="async"><figcaption>Taller de robótica con becarios.</figcaption></figure>
    <ul class="initiatives__list">${initiatives
      .map((x, i) => `<li class="reveal" style="--d:${i * 0.07}s"><span class="initiatives__icon">${x.icon}</span><h3>${x.t}</h3><p>${x.d}</p>${x.href ? link('Leer más', x.href) : ''}</li>`)
      .join('')}</ul>
  </div>
</section>

<section class="commit" id="compromiso">
  <div class="wrap commit__grid">
    <div>${eyebrow('', 'El compromiso del becario')}<h2 class="h2 reveal">Lo que FONBEC <em>pide a cada estudiante.</em></h2>
    <p class="reveal">Tener muchas ganas de estudiar y aprovechar la oportunidad, convencido de que gracias a la educación se pueden lograr las metas que uno se propone para la vida.</p>
    ${btn('Quiero ser becario', '/colaborar/?motivo=becario#becarios', 'primary')}</div>
    <ol class="checklist">${becarioRequirements.map((r) => `<li class="reveal">${icon.check}<span>${r}</span></li>`).join('')}</ol>
  </div>
</section>

${ctaBand({ title: '¿Querés acompañar <em>a un estudiante?</em>', primary: btn('Quiero apadrinar', '/colaborar/#apadrinar', 'lime'), secondary: link('Otras formas de colaborar', '/colaborar/', ' data-light') })}`;
  return page({ path: '/que-hacemos/', title: 'Qué hacemos', description: 'El programa de becas de FONBEC: aporte mensual de padrinos, mediadores voluntarios, cartas, encuentros y acompañamiento de la primaria a la universidad.', body, breadcrumbs: crumbs });
}

// =================================================================== IMPACTO
export function impacto() {
  const crumbs = [{ name: 'Nosotros', path: '/quienes-somos/' }, { name: 'Impacto y transparencia', path: '/impacto/' }];
  const awards = [
    ['2012', 'Premio Ciudadanía FAVIM', 'Mendoza', '/historia/#y2012'],
    ['2013', 'Miembro del Foro del Sector Social', 'Federación de Asociaciones Civiles y Fundaciones', '/historia/#y2013'],
    ['2014', 'Diez Jóvenes Sobresalientes del Año', 'Bolsa de Comercio de Córdoba · Facundo Garayoa', '/historia/#y2014'],
    ['2019', 'Mediadora nominada entre los 50 mejores docentes del mundo', 'María Cristina Gómez, FONBEC Rosario', '/historias/#maria-cristina'],
  ];
  const body = `
${pageHero({ kicker: 'Impacto y transparencia', title: 'Resultados que <em>tienen nombre propio.</em>', lede: 'Cada número de esta página es una persona que sigue estudiando. Y cada peso aportado tiene una rendición de cuentas: la carta, el seguimiento del mediador y nuestros balances.', crumbs, variant: 'wide', aside: `<figure class="phero__wide"><img src="/assets/img/reconocimiento-trayectoria.webp" alt="Becarios y voluntarias con sus certificados de Reconocimiento a la Trayectoria FONBEC" width="1400" height="586" fetchpriority="high"></figure>` })}

<section class="impact impact--page">
  <div class="wrap impact__grid">
    <div class="impact__text">${statsList('stats--large')}<p class="impact__source">Fuente: información institucional publicada por FONBEC. Las cifras se actualizan con cada balance.</p></div>
    <div class="impact__map reveal">${constellation({ id: 'impact-map' })}</div>
  </div>
</section>

<section class="growth">
  <div class="wrap growth__grid">
    <div>${eyebrow('', 'Crecimiento')}<h2 class="h2 reveal">De un puñado de becas <em>a una red federal.</em></h2></div>
    <ol class="growth__bars" aria-label="Becarios acompañados según publicaciones de FONBEC">
      <li style="--v:.55"><span class="growth__y">2012</span><span class="growth__bar"><span></span></span><span class="growth__v">+1.100</span></li>
      <li style="--v:.7"><span class="growth__y">2014</span><span class="growth__bar"><span></span></span><span class="growth__v">1.400</span></li>
      <li style="--v:1"><span class="growth__y">Hoy</span><span class="growth__bar"><span></span></span><span class="growth__v">+2.000</span></li>
    </ol>
    <p class="growth__note">2012: Premio Ciudadanía FAVIM. 2014: 400 becarios en Mendoza y 1.000 en el resto del país (Diario Los Andes). Hoy: dato institucional.</p>
  </div>
</section>

<section class="awards">
  <div class="wrap">
    <header class="split-head">${eyebrow('', 'Reconocimientos')}<h2 class="h2 reveal">Un trabajo <em>reconocido.</em></h2></header>
    <ul class="awards__list">${awards.map(([y, t, d, h], i) => `<li class="reveal" style="--d:${i * 0.06}s"><a href="${h}"><span class="awards__y">${y}</span><span class="awards__t">${t}</span><span class="awards__d">${d}</span>${icon.arrowUpRight}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="press" id="prensa">
  <div class="wrap">
    <header class="split-head">${eyebrow('', 'En los medios')}<h2 class="h2 reveal">Lo que dijo <em>la prensa.</em></h2></header>
    <ul class="press__list">${press
      .map((x, i) => {
        const ext = /^https?:/.test(x.href);
        return `<li class="reveal" style="--d:${i * 0.06}s"><a href="${x.href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="press__y">${x.year}</span><span class="press__o">${x.outlet}</span><span class="press__t">${x.title}</span>${icon.arrowUpRight}</a></li>`;
      })
      .join('')}</ul>
  </div>
</section>

<section class="docs" id="transparencia">
  <div class="wrap docs__grid">
    <div>
      ${eyebrow('', 'Transparencia')}
      <h2 class="h2 reveal">Balances <em>y certificados.</em></h2>
      <p class="reveal">La sustentabilidad de FONBEC depende de la confianza de quienes aportan. Por eso publicamos nuestros balances —los de 2017 y 2018, auditados por Deloitte— y la documentación institucional vigente.</p>
      <p class="docs__pending">Los balances más recientes se publicarán en esta sección.</p>
    </div>
    <ul class="docs__list">${documents
      .map((d) => `<li class="reveal"><a href="/assets/docs/${d.file}" target="_blank" rel="noopener" type="application/pdf"><span class="docs__icon">${icon.download}</span><span><strong>${d.title}</strong><small>${d.meta} · PDF</small></span></a></li>`)
      .join('')}</ul>
  </div>
</section>

<section class="companies" id="empresas">
  <div class="wrap">
    <header class="split-head">${eyebrow('', 'Empresas que apoyan')}<h2 class="h2 reveal">Empresas que eligen <em>invertir en educación.</em></h2></header>
    <p class="companies__lede reveal">FONBEC sostiene que para terminar con la pobreza hay que ayudar a cada estudiante a desplegar su riqueza interior, y lo hace a través de la educación. Estas empresas concretan su programa de RSE a través de FONBEC.</p>
  </div>
  ${sponsorMarquee()}
  <div class="wrap"><ul class="companies__list">${companiesText.map((c) => `<li>${c}</li>`).join('')}</ul></div>
</section>

${ctaBand({ title: 'Tu empresa también <em>puede ser madrina.</em>', text: 'Existen tantas modalidades de padrinazgo como deseos de ayudar, incluido el padrinazgo compartido entre empresa y empleados.', primary: btn('Hablemos de RSE', '/colaborar/?motivo=empresa#empresas', 'lime'), secondary: '' })}`;
  return page({ path: '/impacto/', title: 'Impacto y transparencia', description: 'Más de 2.000 becarios en 16 ciudades de Argentina y 2 de Bolivia. Conocé el impacto de FONBEC, sus reconocimientos, balances auditados y empresas que apoyan.', body, breadcrumbs: crumbs });
}

// =================================================================== HISTORIAS
export function historias() {
  const crumbs = [{ name: 'Historias', path: '/historias/' }];
  const longs = testimonials.filter((t) => t.long);
  const body = `
${pageHero({ kicker: 'Historias', title: 'Detrás de cada beca, <em>una historia.</em>', lede: 'Becarios que hoy son profesionales, ahijados que se volvieron padrinos, maestras que abren puertas. Estas son algunas de las personas que hacen FONBEC.', crumbs, variant: 'plain' })}

<section class="feature-story">
  <div class="wrap feature-story__grid">
    ${orb({ src: '/assets/img/isaac-medico.webp', alt: 'Isaac, becario de FONBEC recibido de médico', w: 204, h: 451, cls: 'feature-story__orb', lazy: false })}
    <blockquote class="feature-story__quote reveal">
      <p>“Seguir estudiando no se consigue solo con apoyo económico, sino con motivación, consejos y una guía. Y mi padrino siempre está <em>al pie del cañón.</em>”</p>
      <footer><cite>Isaac</cite><span>Becario de FONBEC · Recibido de médico en 2021</span></footer>
    </blockquote>
  </div>
</section>

${gradsBlock()}

<section class="story-list" aria-label="Historias">
  <div class="wrap">
    <ol class="story-list__items">${stories
      .map((st, i) => {
        const src = (st.source || []).map((k) => postsBySlug[k]).filter(Boolean);
        const full = src.length
          ? `<details class="story__more"><summary><span>Leer la historia completa</span>${icon.down}</summary><div class="prose">${st.img ? `<figure class="story__img"><img src="${st.img}" alt="${esc(st.imgAlt)}" width="800" height="599" loading="lazy" decoding="async"></figure>` : ''}${src.map((x) => `${src.length > 1 ? `<h3>${esc(x.title)}</h3>` : ''}${x.html}`).join('')}<p class="story__src">Publicado originalmente por FONBEC el ${fmtDate(src[0].date)}.</p></div></details>`
          : link('Leer la nota en La Nación', st.external, ' target="_blank" rel="noopener"');
        return `<li class="story reveal" id="${st.id}">
        <span class="story__n">${String(i + 1).padStart(2, '0')}</span>
        <div class="story__main"><p class="story__kicker">${st.kicker}</p><h2>${st.title}</h2></div>
        <div class="story__body"><p>${st.text}</p>${full}</div>
      </li>`;
      })
      .join('')}</ol>
  </div>
</section>

<section class="voices-long">
  <div class="wrap">
    <header class="split-head">${eyebrow('', 'En primera persona')}<h2 class="h2 reveal">Lo que dicen <em>quienes nos conocen.</em></h2></header>
    <div class="voices-long__grid">${longs
      .map(
        (t, i) => `<figure class="vl reveal" style="--d:${i * 0.08}s">${initialsOrb(t.name, 'vl__orb')}<blockquote><p>${t.long}</p></blockquote><figcaption><strong>${t.name}</strong><span>${t.role}</span></figcaption></figure>`
      )
      .join('')}</div>
  </div>
</section>

<section class="quote-band" aria-label="Testimonio de Jorge, estudiante universitario">
  <div class="quote-band__deco" aria-hidden="true"><span class="qb-ring qb-ring--1"></span><span class="qb-ring qb-ring--2"></span><span class="qb-disc"></span><span class="qb-dot"></span></div>
  <div class="wrap quote-band__grid">
    <span class="quote-band__mark" aria-hidden="true">“</span>
    <figure class="quote-band__fig reveal" data-underline>
      <blockquote><p>Si alguna vez pudieran ver desde lejos, se darían cuenta de&nbsp;<span class="qb-hl">todo lo que me ayudaron.<svg viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" d="M4 16 C 70 6, 140 22, 210 12 S 340 4, 396 14"/></svg></span></p></blockquote>
      <figcaption><span class="quote-band__line" aria-hidden="true"></span><span><strong>Jorge</strong>, 20 años · estudiante universitario<small>Encuentro de la filial Buenos Aires de FONBEC</small></span></figcaption>
    </figure>
  </div>
</section>

${ctaBand({ title: '¿Sos parte de FONBEC? <em>Contanos tu historia.</em>', text: 'Si fuiste becario, sos padrino, madrina, mediador o voluntario, nos encantaría escucharte.', primary: btn('Compartir mi historia', '/contacto/?motivo=historia#formulario', 'lime'), secondary: link('Quiero apadrinar', '/colaborar/#apadrinar', ' data-light') })}`;
  return page({ path: '/historias/', title: 'Historias', description: 'Historias reales de becarios, padrinos, madrinas y mediadores de FONBEC: de ahijados que se volvieron padrinos a becarios que hoy son profesionales.', body, breadcrumbs: crumbs });
}

// =================================================================== COLABORAR
export function colaborar() {
  const crumbs = [{ name: 'Colaborar', path: '/colaborar/' }];
  const body = `
${pageHero({ kicker: 'Colaborar', title: 'Tu ayuda llega <em>con nombre y apellido.</em>', lede: 'Podés acompañar a un estudiante como padrino o madrina, donar como Amigo de FONBEC, sumar tu tiempo o involucrar a tu empresa. Elegí tu forma de ser parte.', crumbs, variant: 'plain' })}
<nav class="jump wrap" aria-label="Formas de colaborar"><ul>${waysToJoin.map((w) => `<li><a href="#${w.id}"><span>${w.n}</span>${w.title}</a></li>`).join('')}</ul></nav>

<section class="give give--feature" id="apadrinar">
  <div class="wrap give__grid">
    <div class="give__text">
      <p class="give__n">01</p>
      <h2 class="h2 reveal">Apadriná <em>a un estudiante.</em></h2>
      <p class="reveal">Como padrino o madrina de FONBEC aportás una beca mensual para un estudiante de nivel primario, secundario o terciario/universitario.</p>
      <p class="reveal">La relación no es solo económica: se relacionan mediante cartas periódicas. A través de ellas vas conociendo los distintos aspectos de la vida de tu ahijado o ahijada, y se establece un vínculo muchas veces duradero en el tiempo. Cuando ambos lo desean, FONBEC facilita el encuentro.</p>
      <div class="give__amount reveal">
        <p class="give__amount-label">Aporte mensual de la beca</p>
        <p>El valor se actualiza periódicamente según el nivel educativo. Escribinos y te contamos el monto vigente.</p>
      </div>
      <figure class="give__img reveal"><img src="/assets/img/nino-escribiendo-carta.webp" alt="Un chico sonríe mientras escribe una carta" width="1200" height="675" loading="lazy" decoding="async"></figure>
    </div>
    <div class="give__form">${contactForm({ id: 'f-apadrinar', motivo: 'apadrinar', title: 'Quiero apadrinar', intro: 'Dejanos tus datos y te contactamos para contarte los próximos pasos.' })}</div>
  </div>
</section>

<section class="give give--dark" id="amigos">
  <div class="wrap give__grid give__grid--rev">
    <div class="give__text">
      <p class="give__n">02</p>
      <h2 class="h2 reveal">Doná como <em>Amigo de FONBEC.</em></h2>
      <p class="reveal">FONBEC acompaña de forma eficiente a sus becarios en lo académico y en lo personal. La sustentabilidad de la entidad depende de recursos que nos permitan asegurar el cumplimiento de la Misión. Donando el monto que dispongas, nos ayudás a ayudar.</p>
    </div>
    <div class="donate">
      <div class="donate__opt reveal">
        <h3>Desde Argentina</h3>
        <p>Doná de forma segura con débito automático o tarjeta, a través de TuCuota.</p>
        ${btn('Donar ahora', site.donate.argentina, 'lime', ' target="_blank" rel="noopener"')}
        <figure class="donate__qr">
          <span class="donate__qr-code"><img src="/assets/img/mercadopago-qr-codigo.webp" alt="Código QR para donar a FONBEC con Mercado Pago" width="380" height="380" loading="lazy" decoding="async"></span>
          <figcaption><strong>Escaneá y doná</strong>Abrí la app de Mercado Pago o Mercado Libre y apuntá la cámara al código.<small>¿Estás en el celular? Usá el botón “Donar ahora”.</small></figcaption>
        </figure>
      </div>
      <div class="donate__opt reveal" style="--d:.1s">
        <h3>Desde el exterior</h3>
        <p>La distancia no es un obstáculo: podés donar o ser padrino desde cualquier parte del mundo a través de Help Argentina.</p>
        ${link('Donar vía Help Argentina', site.donate.exterior, ' target="_blank" rel="noopener" data-light')}
      </div>
    </div>
  </div>
</section>

<section class="give" id="voluntariado">
  <div class="wrap give__grid">
    <div class="give__text">
      <p class="give__n">03</p>
      <h2 class="h2 reveal">Sumá <em>tu tiempo.</em></h2>
      <p class="reveal">En FONBEC trabajan más de 100 voluntarios y solo un empleado administrativo rentado. Hay tareas de todo tipo, desde las más profesionalizadas hasta las más sencillas, y todas son de enorme valor. También podés ser mediador: docentes y vecinos que conocen a los estudiantes y los acompañan de cerca.</p>
      <p class="reveal"><strong>Siempre necesitamos voluntarios.</strong></p>
    </div>
    <div class="give__aside reveal">
      <figure class="give__img give__img--tall"><img src="/assets/img/equipo-voluntarias.webp" alt="Grupo de voluntarias y voluntarios de FONBEC" width="900" height="1200" loading="lazy" decoding="async"></figure>
      <ul class="mini-list"><li>Acompañamiento y seguimiento de becarios</li><li>Mediación entre la Fundación y las escuelas</li><li>Tutorías y apoyo escolar</li><li>Comunicación, administración y organización de encuentros</li></ul>
      ${btn('Quiero ser voluntario', '?motivo=voluntariado#formulario', 'primary', ' data-motivo-link="voluntariado"')}
    </div>
  </div>
</section>

<section class="give give--tint" id="empresas">
  <div class="wrap give__grid">
    <div class="give__text">
      <p class="give__n">04</p>
      <h2 class="h2 reveal">Empresas que <em>apuestan a la educación.</em></h2>
      <p class="reveal">El sector privado evolucionó de la asistencia hacia el apoyo del sistema educativo, porque es por esa dimensión por donde pasan los procesos reales de inclusión social. Los becarios son estudiantes que, a pesar de las adversidades, manifiestan un fuerte compromiso educativo.</p>
      <p class="reveal">Cuando la madrina es una empresa, pedimos que designe referentes entre sus empleados, para que cada ahijado mantenga un vínculo personal. También existe el <strong>padrinazgo compartido</strong>: la beca se aporta entre la empresa y el empleado.</p>
    </div>
    <div class="give__aside reveal">
      <p class="give__quote">“En Argentina, 3 de cada 10 ciudadanos consideran que la educación es la principal área en que las empresas deberían ayudar a su comunidad.”</p>
      <p class="give__src">Los argentinos y la Responsabilidad Social, TNS Gallup.</p>
      ${btn('Contactar al equipo', '?motivo=empresa#formulario', 'primary', ' data-motivo-link="empresa"')}
      ${link('Ver empresas que nos acompañan', '/impacto/#empresas')}
    </div>
  </div>
</section>

<section class="give" id="becarios">
  <div class="wrap give__grid">
    <div class="give__text">
      <p class="give__n">05</p>
      <h2 class="h2 reveal">¿Querés estudiar? <em>Empezá tu camino.</em></h2>
      <p class="reveal">Para ser becario de FONBEC necesitás tener muchas ganas de estudiar y aprovechar la oportunidad, convencido de que gracias a la educación vas a lograr las metas que te propongas. Los futuros becados son propuestos por mediadores —docentes o vecinos que los conocen— a partir de los 6 años.</p>
      ${link('Ver qué pide FONBEC a cada becario', '/que-hacemos/#compromiso')}
    </div>
    <div class="give__aside reveal">
      <figure class="give__img"><img src="/assets/img/becaria-certificado.webp" alt="Una becaria sonríe con su certificado de reconocimiento junto al logo de FONBEC" width="1200" height="862" loading="lazy" decoding="async"></figure>
      <p>Escribinos contando dónde estudiás y en qué ciudad vivís. Te orientamos sobre la filial más cercana.</p>
      ${btn('Quiero ser becario', '?motivo=becario#formulario', 'primary', ' data-motivo-link="becario"')}
    </div>
  </div>
</section>

<section class="form-section" id="formulario">
  <div class="wrap form-section__grid">
    <div>${eyebrow('', 'Escribinos')}<h2 class="h2 reveal">Contanos <em>cómo querés sumarte.</em></h2>
    <p class="reveal">Respondemos cada mensaje. Si preferís, escribinos directamente a <a href="mailto:${site.email}">${site.email}</a> o por <a href="${site.whatsapp.href}" target="_blank" rel="noopener">WhatsApp</a>.</p></div>
    ${contactForm({ id: 'f-colaborar', motivo: 'voluntariado', title: 'Formulario de colaboración' })}
  </div>
</section>`;
  return page({ path: '/colaborar/', title: 'Cómo colaborar', description: 'Apadriná a un estudiante, doná como Amigo de FONBEC, sumate como voluntario o involucrá a tu empresa. Todas las formas de colaborar con FONBEC.', body, breadcrumbs: crumbs });
}

// =================================================================== CONTACTO
export function contacto() {
  const crumbs = [{ name: 'Contacto', path: '/contacto/' }];
  const rows = filiales
    .map(
      (f) => `<li class="fil" data-city="${esc((f.city + ' ' + (f.note || '')).toLowerCase())}">
      <h3>${f.city}${f.hq ? ' <span class="tag tag--small">Oficina</span>' : ''}</h3>
      ${f.note ? `<p class="fil__note">${f.note}</p>` : ''}
      ${f.contact ? `<p class="fil__who">${f.contact}</p>` : ''}
      <ul>
        <li><a href="mailto:${f.email}">${icon.mail}<span>${f.email}</span></a></li>
        ${(f.phones || []).map((ph) => `<li><a href="tel:${ph.replace(/[^\d+]/g, '').replace(/^0/, '+54')}">${icon.phone}<span>${ph}</span></a></li>`).join('')}
        ${f.address ? `<li><span>${icon.pin}<span>${f.address}</span></span></li>` : ''}
      </ul></li>`
    )
    .join('');
  const body = `
${pageHero({ kicker: 'Contacto', title: 'Esperamos <em>tu contacto.</em>', lede: 'Escribinos por el formulario, por correo o por WhatsApp. También podés comunicarte directamente con la filial de tu ciudad.', crumbs, variant: 'plain' })}
<section class="contact" id="formulario">
  <div class="wrap contact__grid">
    <aside class="channels">
      <a class="channel" href="mailto:${site.email}">${icon.mail}<span><small>Correo</small>${site.email}</span></a>
      <a class="channel" href="${site.phone.href}">${icon.phone}<span><small>Teléfono</small>${site.phone.label}</span></a>
      <a class="channel" href="${site.whatsapp.href}" target="_blank" rel="noopener">${icon.whatsapp}<span><small>WhatsApp</small>${site.whatsapp.label}</span></a>
      <div class="channel">${icon.pin}<span><small>Oficina Córdoba</small>${site.office.label}</span></div>
      <div class="channels__social"><span>Seguinos</span><div class="social">${socialLinks()}</div></div>
    </aside>
    ${contactForm({ id: 'f-contacto', title: 'Envianos un mensaje' })}
  </div>
</section>
<section class="filiales" id="filiales">
  <div class="wrap">
    <header class="split-head">
      <div>${eyebrow('', 'Filiales')}<h2 class="h2 reveal">FONBEC <em>cerca tuyo.</em></h2></div>
      <div class="search"><label for="fil-q" class="visually-hidden">Buscar filial por ciudad</label><input id="fil-q" type="search" placeholder="Buscá tu ciudad" data-fil-search autocomplete="off"></div>
    </header>
    <ul class="fil-grid" data-fil-list>${rows}</ul>
    <p class="fil-empty" hidden data-fil-empty>No encontramos esa ciudad. Escribinos a <a href="mailto:${site.email}">${site.email}</a> y te orientamos.</p>
  </div>
</section>`;
  return page({ path: '/contacto/', title: 'Contacto', description: 'Contactá a FONBEC por formulario, correo o WhatsApp, o comunicate con la filial de tu ciudad en Argentina o Bolivia.', body, breadcrumbs: crumbs, jsonld: [org] });
}

// =================================================================== 404
export function notFound() {
  const body = `<section class="nf"><div class="wrap nf__grid">
  <p class="nf__code" aria-hidden="true">4<span></span>4</p>
  <div><h1 class="h2">Esta página <em>no existe.</em></h1><p>Puede que el enlace haya cambiado con el nuevo sitio. Te dejamos algunos caminos:</p>
  <div class="nf__links">${btn('Ir al inicio', '/', 'primary')}${link('Cómo colaborar', '/colaborar/')}${link('Contacto', '/contacto/')}</div></div>
</div></section>`;
  return page({ path: '/404.html', title: 'Página no encontrada', description: 'La página que buscás no existe o cambió de dirección con el nuevo sitio de FONBEC. Volvé al inicio o escribinos.', body, noindex: true });
}
