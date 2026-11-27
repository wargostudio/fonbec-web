/* FONBEC — interacciones. JS clásico (sin módulos), cada módulo aislado con safe().
   El contenido funciona sin JS; esto solo enriquece. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch (e) { if (window.console) console.warn('[fonbec] ' + name, e); } }

  // ---------- Header: estado al hacer scroll + ocultar al bajar ----------
  function initHeader() {
    var h = $('[data-header]');
    if (!h) return;
    var last = window.scrollY, ticking = false;
    function update() {
      var y = window.scrollY;
      h.classList.toggle('is-scrolled', y > 12);
      var menuOpen = doc.body.classList.contains('menu-open');
      var subOpen = !!$('.nav__group.is-open');
      if (!menuOpen && !subOpen && y > 400 && y > last + 4) h.classList.add('is-hidden');
      else if (y < last - 4 || y < 400) h.classList.remove('is-hidden');
      last = y; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    h.addEventListener('focusin', function () { h.classList.remove('is-hidden'); });
    update();
  }

  // ---------- Submenú de escritorio ----------
  function initDropdown() {
    $$('.nav__group').forEach(function (g) {
      var btn = $('.nav__toggle', g);
      var timer;
      function open(v) { g.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v)); }
      btn.addEventListener('click', function () { open(!g.classList.contains('is-open')); });
      g.addEventListener('mouseover', function () { clearTimeout(timer); open(true); });
      g.addEventListener('mouseout', function (e) { if (!g.contains(e.relatedTarget)) timer = setTimeout(function () { open(false); }, 180); });
      g.addEventListener('focusout', function (e) { if (!g.contains(e.relatedTarget)) open(false); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Escape') { open(false); btn.focus(); } });
    });
    doc.addEventListener('click', function (e) { $$('.nav__group.is-open').forEach(function (g) { if (!g.contains(e.target)) { g.classList.remove('is-open'); $('.nav__toggle', g).setAttribute('aria-expanded', 'false'); } }); });
  }

  // ---------- Menú móvil ----------
  function initMobileMenu() {
    var burger = $('.burger'), menu = $('#menu-movil');
    if (!burger || !menu) return;
    function set(open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      doc.body.classList.toggle('menu-open', open);
      if (open) { menu.hidden = false; void menu.offsetWidth; menu.classList.add('is-open'); setTimeout(function () { var a = $('a', menu); if (a) a.focus(); }, 350); }
      else { menu.classList.remove('is-open'); setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 700); }
    }
    burger.addEventListener('click', function () { set(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    doc.addEventListener('keydown', function (e) {
      if (!doc.body.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { set(false); burger.focus(); }
      if (e.key === 'Tab') { // trampa de foco simple
        var f = [burger].concat($$('a, button', menu));
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && doc.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1080 && doc.body.classList.contains('menu-open')) set(false); });
  }

  // ---------- Revelado al entrar en viewport (umbral bajo + red de seguridad) ----------
  function initReveal() {
    var els = $$('.reveal, .map, .growth__bars, [data-letter]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.01, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { $$('.reveal:not(.is-in)').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('is-in'); }); }, 6000);
  }

  // ---------- Texto que se "enciende" palabra a palabra con el scroll ----------
  function initFill() {
    var el = $('[data-fill]');
    if (!el) return;
    if (reduce) { root.classList.add('no-fill'); return; }
    // envuelve palabras preservando <em>
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(part)); return; }
            var s = doc.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) wrap(n);
      });
    }
    wrap(el);
    var words = $$('.w', el), ticking = false;
    function update() {
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('is-on', i < n);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  // ---------- "Cómo funciona": activa el paso visible y sincroniza el diagrama ----------
  function initHow() {
    $$('[data-how]').forEach(function (sec) {
      var steps = $$('.how__step', sec);
      if (!steps.length) return;
      function activate(step) {
        steps.forEach(function (s) { s.classList.toggle('is-active', s === step); });
        sec.setAttribute('data-active', step.getAttribute('data-step'));
      }
      activate(steps[0]);
      if (!('IntersectionObserver' in window)) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) activate(en.target); });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      steps.forEach(function (s) { io.observe(s); });
    });
  }

  // ---------- Contadores animados (solo cifras verificadas, ya escritas en el HTML) ----------
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    var fmt = new Intl.NumberFormat('es-AR');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = +el.getAttribute('data-count'), pre = el.getAttribute('data-prefix') || '';
        if (reduce) return;
        var t0 = null, dur = 1600;
        function step(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
          el.textContent = pre + fmt.format(Math.round(to * e));
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- Pestañas de testimonios (patrón ARIA tabs) ----------
  function initTabs() {
    $$('.voices').forEach(function (box) {
      var tabs = $$('[role="tab"]', box);
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          $('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tab.focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t); });
        t.addEventListener('keydown', function (e) {
          var k = e.key, n = null;
          if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
          if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
          if (k === 'Home') n = tabs[0];
          if (k === 'End') n = tabs[tabs.length - 1];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });
  }

  // ---------- Línea de tiempo: progreso del trazo ----------
  function initTimeline() {
    var tl = $('[data-timeline]');
    if (!tl) return;
    var bar = $('.tl__line', tl), ticking = false;
    function update() {
      var r = tl.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
      bar.style.setProperty('--p', p.toFixed(4));
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  // ---------- Parallax suave del arte del hero (solo puntero fino) ----------
  function initParallax() {
    var art = $('[data-parallax]');
    if (!art || reduce || !window.matchMedia('(pointer: fine)').matches) return;
    var orbs = $$('.hero__orb', art), raf = null, tx = 0, ty = 0;
    art.parentElement.addEventListener('mousemove', function (e) {
      var r = art.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / r.width;
      ty = (e.clientY - (r.top + r.height / 2)) / r.height;
      if (!raf) raf = requestAnimationFrame(function () {
        orbs.forEach(function (o, i) { var k = (i + 1) * 6; o.style.translate = (tx * k).toFixed(1) + 'px ' + (ty * k).toFixed(1) + 'px'; });
        raf = null;
      });
    });
  }

  // ---------- Botones magnéticos (sutil) ----------
  function initMagnetic() {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    $$('[data-magnetic]').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.2).toFixed(1) + 'px)';
      });
      b.addEventListener('mouseout', function (e) { if (!b.contains(e.relatedTarget)) b.style.transform = ''; });
    });
  }

  // ---------- Pausar animaciones SVG (SMIL) si se pide menos movimiento ----------
  function initSvgMotion() {
    if (!reduce) return;
    $$('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
  }

  // ---------- Filtro de novedades ----------
  function initFilters() {
    var list = $('[data-filterable]');
    if (!list) return;
    var chips = $$('[data-filter]');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter');
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
        $$('[data-cat]', list).forEach(function (li) { li.classList.toggle('news-item-hidden', f !== '*' && li.getAttribute('data-cat') !== f); });
      });
    });
  }

  // ---------- Buscador de filiales ----------
  function initFiliales() {
    var q = $('[data-fil-search]');
    if (!q) return;
    var items = $$('[data-fil-list] .fil'), empty = $('[data-fil-empty]');
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    q.addEventListener('input', function () {
      var v = norm(q.value.trim()), shown = 0;
      items.forEach(function (it) { var ok = !v || norm(it.getAttribute('data-city')).indexOf(v) > -1; it.hidden = !ok; if (ok) shown++; });
      empty.hidden = shown > 0;
    });
  }

  // ---------- Navegación de anclas en Colaborar (estado activo) ----------
  function initJump() {
    var nav = $('.jump');
    if (!nav || !('IntersectionObserver' in window)) return;
    var links = $$('a', nav);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) io.observe(s); });
  }

  // ---------- Copiar enlace ----------
  function initCopy() {
    $$('[data-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var label = $('span', b), url = b.getAttribute('data-copy');
        function done() { label.textContent = '¡Enlace copiado!'; setTimeout(function () { label.textContent = 'Copiar enlace'; }, 2200); }
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copiá el enlace:', url); });
        else window.prompt('Copiá el enlace:', url);
      });
    });
  }

  // ---------- Formularios: motivo, validación accesible y envío ----------
  var MSG = {
    valueMissing: 'Este campo es obligatorio.',
    typeMismatch: 'Revisá el formato del correo electrónico.',
    tooShort: 'Es un poco corto. ¿Podés completarlo?',
    patternMismatch: 'Ingresá un número válido (solo números, espacios, +, - o paréntesis).',
    checkbox: 'Necesitamos tu conformidad para responderte.',
  };
  function errorFor(input) {
    var v = input.validity;
    if (v.valid) return '';
    if (input.type === 'checkbox') return MSG.checkbox;
    if (v.valueMissing) return MSG.valueMissing;
    if (v.typeMismatch) return MSG.typeMismatch;
    if (v.tooShort) return MSG.tooShort;
    if (v.patternMismatch) return MSG.patternMismatch;
    return 'Revisá este campo.';
  }
  function showError(input) {
    var field = input.closest('.field'), msg = errorFor(input), out = field && $('.field__err', field);
    if (!field) return !msg;
    field.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) out.textContent = msg;
    return !msg;
  }
  function syncMotivo(form) {
    var sel = $('[data-motivo]', form);
    if (!sel) return;
    $$('[data-show-for]', form).forEach(function (f) { f.hidden = f.getAttribute('data-show-for') !== sel.value; });
  }
  function initForms() {
    var params = new URLSearchParams(window.location.search);
    var motivo = params.get('motivo');
    $$('[data-form]').forEach(function (form) {
      var sel = $('[data-motivo]', form);
      // el formulario general toma el motivo de la URL
      if (sel && motivo && form.id !== 'f-apadrinar' && $('option[value="' + motivo + '"]', sel)) sel.value = motivo;
      if (sel) sel.addEventListener('change', function () { syncMotivo(form); });
      syncMotivo(form);
      $$('input, textarea', form).forEach(function (inp) {
        inp.addEventListener('blur', function () { if (inp.value || inp.type === 'checkbox') showError(inp); });
        inp.addEventListener('input', function () { if (inp.closest('.field.is-invalid')) showError(inp); });
        inp.addEventListener('change', function () { if (inp.type === 'checkbox') showError(inp); });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var status = $('.form__status', form);
        var fields = $$('input:not([name="web"]), textarea', form);
        var firstBad = null;
        fields.forEach(function (f) { if (!showError(f) && !firstBad) firstBad = f; });
        if (firstBad) { firstBad.focus(); status.className = 'form__status is-error'; status.textContent = 'Revisá los campos marcados para poder enviar el mensaje.'; return; }
        if ($('[name="web"]', form).value) return; // honeypot
        form.classList.add('is-sending');
        status.className = 'form__status'; status.textContent = 'Enviando…';
        var data = new FormData(form);
        fetch(form.getAttribute('action'), { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) throw new Error(j.error || 'error'); return j; }); })
          .then(function () {
            form.reset(); syncMotivo(form);
            status.className = 'form__status is-ok';
            status.textContent = '¡Gracias! Recibimos tu mensaje y te vamos a responder a la brevedad.';
            status.focus();
          })
          .catch(function () {
            // Sin servidor PHP disponible: abrimos el correo con el mensaje armado.
            var body = ['Motivo: ' + (sel ? sel.options[sel.selectedIndex].text : ''), 'Nombre: ' + data.get('nombre') + ' ' + data.get('apellido'), 'Email: ' + data.get('email'), 'Teléfono: ' + (data.get('telefono') || '-'), 'Ciudad: ' + (data.get('ciudad') || '-'), 'Empresa: ' + (data.get('empresa') || '-'), '¿Cómo conoció FONBEC?: ' + (data.get('como_conocio') || '-'), '', data.get('mensaje')].join('\n');
            var href = 'mailto:info@fonbec.org.ar?subject=' + encodeURIComponent('Contacto web — ' + (sel ? sel.options[sel.selectedIndex].text : 'Consulta')) + '&body=' + encodeURIComponent(body);
            status.className = 'form__status is-error';
            status.innerHTML = 'No pudimos enviar el formulario automáticamente. <a href="' + href + '">Enviá tu mensaje por correo</a> (ya está redactado) o escribinos a info@fonbec.org.ar.';
            status.focus();
          })
          .then(function () { form.classList.remove('is-sending'); });
      });
    });
    // Botones de Colaborar que cambian el motivo sin recargar
    $$('[data-motivo-link]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = $('#formulario'), form = target && $('[data-form]', target), s = form && $('[data-motivo]', form);
        if (!s) return;
        e.preventDefault();
        s.value = a.getAttribute('data-motivo-link'); syncMotivo(form);
        history.replaceState(null, '', '?motivo=' + s.value + '#formulario');
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        setTimeout(function () { var n = $('[name="nombre"]', form); if (n) n.focus({ preventScroll: true }); }, 600);
      });
    });
  }

  function initYear() { $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); }); }

  function boot() {
    safe(initHeader, 'header');
    safe(initDropdown, 'dropdown');
    safe(initMobileMenu, 'mobile menu');
    safe(initReveal, 'reveal');
    safe(initFill, 'fill');
    safe(initHow, 'how');
    safe(initCounters, 'counters');
    safe(initTabs, 'tabs');
    safe(initTimeline, 'timeline');
    safe(initParallax, 'parallax');
    safe(initMagnetic, 'magnetic');
    safe(initSvgMotion, 'svg motion');
    safe(initFilters, 'filters');
    safe(initFiliales, 'filiales');
    safe(initJump, 'jump');
    safe(initCopy, 'copy');
    safe(initForms, 'forms');
    safe(initYear, 'year');
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
