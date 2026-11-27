# Sitio web FONBEC — Fondo de Becas para Estudiantes

Sitio institucional completo, estático y sin dependencias de ejecución.
**La carpeta para publicar es `dist/`** (arrastrar su contenido a la raíz `public_html` de Hostinger o cualquier hosting).

---

## 1. Auditoría del sitio anterior (www.fonbec.org.ar, relevado el 20/11/2026)

| Hallazgo | Detalle | Qué hace el nuevo sitio |
|---|---|---|
| **Sitio comprometido** | El WordPress tiene **811 entradas**, casi todas spam inyectado (casinos, apuestas, etc.). Solo 19 son de FONBEC. | Se migraron solo las notas reales. El `.htaccess` responde **410 (eliminado)** a las URLs de spam y a las rutas de WordPress para que Google las desindexe. **Recomendación urgente:** dar de baja el WordPress y cambiar todas sus contraseñas. |
| Contenido de relleno | La página “Las Uniones” era texto *lorem ipsum*; varias páginas duplicadas (“Empresas que apoyan” ×2, “Apadrinar” ×2). | Eliminado / unificado. |
| Navegación | 13 ítems planos en el menú, sin jerarquía. | 5 ítems + submenú “Nosotros” + llamado a la acción fijo “Quiero colaborar”. |
| Documentos rotos | 9 de 16 documentos de “Balances y Certificados” dan error 404; el Balance 2019 apuntaba a un archivo de una PC local (`file:///F:/...`). | Se rescataron y alojan localmente los 7 PDF disponibles. |
| Instagram | El feed de Instagram embebido estaba vencido (imágenes caídas). | Se reemplazó por enlaces directos a @fonbec_nacional. |
| Imágenes | Fotos reales escasas y de baja resolución (máx. 800 px). | Se diseñó un sistema visual (orbes circulares) que luce bien con fotos chicas. |

## 2. Concepto creativo: “Dos mundos, una carta”

- **Idea central:** FONBEC conecta dos mundos (quien quiere estudiar y quien quiere ayudar) a través de un vínculo humano: la carta.
- **Gesto gráfico:** el aro teal + disco lima desplazado del logo se usa como máscara de fotos, nodo del diagrama “Cómo funciona”, viñetas y marcadores. Es reconocible y propio, sin agregar elementos ajenos a la marca.
- **Paleta (extraída del logo):** teal `#0E9C8A`, lima `#DEE45A`, teal profundo `#073C35`, papel `#F7F6EF`. Para texto se usa un teal más oscuro (`#0A6B5F`) que cumple contraste WCAG AA.
- **Tipografía:** Outfit (geométrica, en diálogo con el logotipo) + Instrument Serif itálica para el énfasis emocional + Caveat (manuscrita) solo para “la carta”.
- **Movimiento:** revelado al hacer scroll, texto que se “enciende” palabra por palabra, diagrama que se sincroniza con el scroll, carta que sale del sobre, contadores, mapa de filiales que se dibuja y transiciones entre páginas. Con “reducir movimiento” activado se detienen las animaciones continuas.

## 3. Arquitectura

```
/                         Inicio
/quienes-somos/           Misión, 5 pilares, voluntarios, trabajo en red
/historia/                Línea de tiempo 1999 → hoy
/que-hacemos/             Programa de becas, encuentros, iniciativas, compromiso del becario
/impacto/                 Cifras, mapa de filiales, crecimiento, reconocimientos, prensa, balances, empresas
/historias/               Egresados, 10 historias completas (texto original desplegable) y testimonios
/colaborar/               Apadrinar · Donar · Voluntariado · Empresas · Ser becario + formulario
/contacto/                Formulario, canales y buscador de filiales
```

**Sin sección de Novedades:** como no se van a seguir publicando noticias, su contenido se distribuyó: las historias completas en **Historias**, las notas de prensa en **Impacto → En los medios** y los premios y eventos en la **línea de tiempo de Historia**. La actualidad se deriva a Instagram desde la galería “Momentos” de la home. Las URLs viejas de cada nota redirigen (301) al lugar donde quedó su contenido.

**Botón flotante de WhatsApp** en todas las páginas, con un mensaje inicial prearmado (se edita en `site.whatsapp.chat` de `src/content.mjs`).

## 4. Técnica

- HTML semántico + CSS + JavaScript clásico. Sin frameworks ni librerías en tiempo de ejecución (CSS ≈ 70 KB, JS ≈ 20 KB sin comprimir).
- Imágenes WebP con carga diferida, `width`/`height` para evitar saltos y `fetchpriority` en la imagen principal.
- SEO: título y descripción por página, canonical, Open Graph + Twitter Card, datos estructurados (NGO, BreadcrumbList, NewsArticle), `sitemap.xml`, `robots.txt`, URLs amigables y **redirecciones 301** desde las URLs del WordPress anterior (`?page_id=`, `?p=`).
- Accesibilidad: enlace “saltar al contenido”, foco visible, menú móvil con trampa de foco y Esc, pestañas ARIA con teclado, formularios con mensajes de error asociados, `prefers-reduced-motion`.
- Formularios: validación en el navegador y en el servidor (`enviar.php`, con honeypot y límite por IP). Si el hosting no tiene PHP, el sitio ofrece enviar el mensaje por correo ya redactado.

## 5. Cómo editar y publicar

1. Editar textos en `src/content.mjs` (datos institucionales, filiales, testimonios, cifras, documentos) o `src/pages.mjs` (estructura de cada página). Estilos en `src/static/css/styles.css`.
2. Ejecutar `node tools/build.mjs` → regenera `dist/`.
3. Ejecutar `node tools/qa.mjs` → revisa enlaces, anclas, imágenes, `alt`, `h1` y metadatos.
4. Subir el contenido de `dist/` al hosting. Cambiar `version` en `src/content.mjs` en cada publicación (fuerza a los navegadores a cargar el CSS/JS nuevo).

**Agregar una historia:** sumar un objeto al array `stories` de `src/content.mjs` (id, título, resumen y, si querés, el texto completo en `src/data/posts.json`). Las fotos de la galería y de egresados están en los arrays `moments` y `graduates`.
**Agregar fotos:** convertir a WebP (`cwebp -q 82 foto.jpg -o src/static/assets/img/foto.webp`) y referenciarla.

En `enviar.php` revisar `DESTINO` (casilla que recibe) y `REMITENTE` (debe existir en el dominio, p. ej. `web@fonbec.org.ar`).

## 6. Información para que FONBEC confirme o complete

Se respetó la regla de no inventar datos. Estos puntos quedaron identificados:

1. **Monto de la beca:** el sitio anterior mostraba $5.200 / $7.500 (valores desactualizados). Se reemplazó por “escribinos y te contamos el monto vigente”.
2. **Cifras:** “+2.000 becarios, 16 ciudades de Argentina y 2 de Bolivia” y “+100 voluntarios” salen de páginas sin fecha. Confirmar si siguen vigentes.
3. **Balances:** el más reciente disponible es 2018 y el certificado de exención de Ganancias venció en 2021. Faltan el Balance 2019 y años siguientes, la nómina de autoridades y los certificados CENOC, IPJ y DGR (sus archivos ya no existen).
4. **Contactos con inconsistencias en el sitio anterior:** Córdoba (se mostraba `comunicación@` pero el enlace iba a `elvira.garayoa@fonbec.org.ar`; se usó este último), Misiones (`.com.ar` vs `.org.ar`; se usó `.org.ar`). El enlace de “IG” en Contacto apuntaba a un sitio ajeno (aahd.com.ar) y se descartó.
5. **Donaciones:** verificar que el enlace de TuCuota, el QR de Mercado Pago y la página de Help Argentina sigan activos.
6. **Fotos:** se incorporaron 12 de las 18 fotos nuevas. Quedaron afuera la del niño en el hospital (privacidad de un menor), dos reuniones con personas no identificadas, la del evento “Para Servir” y un certificado repetido. Confirmar que todas las personas que aparecen autorizaron la publicación.
7. **Privacidad:** se omitieron los números de DNI que figuraban junto a los testimonios.
8. **Notas no migradas:** “Video Testimonio” y “Abanderado 2011” (sus videos ya no existen) y “¡Nueva Web!” (2012).
