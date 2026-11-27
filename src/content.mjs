// Contenido institucional de FONBEC.
// Fuente: sitio oficial www.fonbec.org.ar (relevado el 20/11/2026).
// Regla: no inventar datos. Lo que falta se marca con `PENDIENTE` para completar.

import { readFileSync } from 'node:fs';

export const site = {
  name: 'FONBEC',
  legalName: 'Fundación FONBEC — Fondo de Becas para Estudiantes',
  url: 'https://www.fonbec.org.ar',
  locale: 'es_AR',
  version: '20261127',
  tagline: 'Fondo de Becas para Estudiantes',
  description:
    'FONBEC es una fundación que conecta dos mundos: el de chicos que quieren estudiar y el de personas generosas que quieren ayudar. Becas, cartas y acompañamiento desde 1999.',
  email: 'info@fonbec.org.ar',
  phone: { label: '351 341 9008', href: 'tel:+543513419008' },
  whatsapp: { label: '+54 9 341 376 7247', href: 'https://wa.me/5493413767247', chat: 'https://wa.me/5493413767247?text=' + encodeURIComponent('Hola FONBEC, quiero recibir información.') },
  office: { label: 'Obispo Trejo 219, Oficina 302', city: 'Córdoba, Argentina' },
  social: {
    instagram: 'https://www.instagram.com/fonbec_nacional',
    facebook: 'https://facebook.com/fonbec/',
  },
  donate: {
    argentina: 'https://tucuota.com/link/7af42060-6390-11ec-85f3-8d59178ca192',
    exterior: 'https://www.helpargentina.org/es/ong/dt/id/65/fundacion-fonbec',
  },
};

export const nav = [
  {
    label: 'Nosotros',
    href: '/quienes-somos/',
    children: [
      { label: 'Quiénes somos', href: '/quienes-somos/', note: 'Misión, forma de trabajo y red' },
      { label: 'Nuestra historia', href: '/historia/', note: 'De 1999 a hoy' },
      { label: 'Impacto y transparencia', href: '/impacto/', note: 'Cifras, filiales y balances' },
    ],
  },
  { label: 'Qué hacemos', href: '/que-hacemos/' },
  { label: 'Historias', href: '/historias/' },
  { label: 'Contacto', href: '/contacto/' },
];

// Cifras con respaldo institucional publicado en fonbec.org.ar
export const stats = [
  { value: 2000, prefix: '+', label: 'becarios y becarias', note: 'que continúan sus estudios gracias a sus padrinos' },
  { value: 16, label: 'ciudades de Argentina', note: 'con presencia de FONBEC' },
  { value: 2, label: 'ciudades de Bolivia', note: 'La Paz y Santa Cruz de la Sierra' },
  { value: 100, prefix: '+', label: 'voluntarios', note: 'sostienen el trabajo cotidiano' },
];

export const mission = {
  statement:
    'Posibilitar, mediante un aporte económico y acompañamiento académico y personal, que estudiantes de entornos socio-económicos vulnerables puedan continuar sus estudios, estimulando el esfuerzo, y concretar sus metas académicas y personales.',
  founding:
    'En 1999 Facundo Garayoa (actual Director Ejecutivo) comenzó con FONBEC, buscando padrinos que apoyen económicamente a niños y jóvenes en situación de vulnerabilidad socio-económica, con ganas de estudiar.',
  today:
    'Hoy FONBEC tiene más de 2.000 becarios, de 16 ciudades de Argentina y 2 ciudades de Bolivia, que gracias a sus padrinos continúan con sus estudios.',
  attributes: [
    { name: 'Educativa', text: 'Creemos en la educación como la herramienta básica de transformación y promoción social del ser humano.' },
    { name: 'Integral', text: 'Sabemos que el progreso del estudiante genera un impacto positivo en él y, también, en su familia y entorno.' },
    { name: 'Circular', text: 'Promovemos que nuestros egresados se comprometan con la educación de otras personas en situación de vulnerabilidad socioeconómica.' },
    { name: 'Vinculante', text: 'Buscamos personas que quieran y puedan ayudar a estudiantes que lo necesitan, con aportes económicos mínimos, promoviendo una buena comunicación entre ellos.' },
  ],
};

// Los 5 pilares (texto oficial, levemente editado para lectura web)
export const pillars = [
  {
    key: 'becados',
    title: 'Becados',
    short: 'Estudiantes con ganas de aprender',
    text: 'Se selecciona a los futuros becados en una población de niños y jóvenes a partir de los 6 años que demuestren interés por el estudio y cuya situación económica ponga en riesgo la continuidad. Una vez becados, los incentivamos a continuar su capacitación y a ser personas solidarias.',
  },
  {
    key: 'padrinos',
    title: 'Padrinos y madrinas',
    short: 'Personas y empresas que aportan cada mes',
    text: 'El programa se financia a través de un Fondo de Becas aportado por individuos y empresas: los padrinos. Cuando el padrino es una empresa, pedimos que designe referentes entre sus empleados para que el ahijado siempre pueda establecer un vínculo individual y personal.',
  },
  {
    key: 'mediadores',
    title: 'Voluntarios y mediadores',
    short: 'Docentes y vecinos que conocen a cada estudiante',
    text: 'Los mediadores son voluntarios: docentes o vecinos que, por conocer personalmente a los estudiantes, proponen a los futuros becados. Son el nexo habitual entre la Fundación y los becados: reciben las cartas, pagan las becas y hacen un seguimiento personalizado.',
  },
  {
    key: 'carta',
    title: 'La carta',
    short: 'El vehículo del vínculo',
    text: 'En FONBEC, padrino no es solo “aportante”. La carta es el vehículo por el cual se conocen y se relacionan de forma afectuosa y sostenida. Además funciona como rendición de cuentas del dinero recibido y aporta transparencia al sistema.',
  },
  {
    key: 'encuentros',
    title: 'Los encuentros',
    short: 'Conocerse en persona',
    text: 'Al menos una vez al año, si el padrino lo desea, fomentamos que se reúna con su ahijado. Ese encuentro no es la culminación del vínculo: suele ser el punto de partida de una relación fuerte, honesta y duradera. Nadie está obligado a participar.',
  },
];

export const becarioRequirements = [
  'Esforzarme por mantener o superar el nivel académico, tener pocas inasistencias y mantener una buena conducta.',
  'Entregar al Mediador una Carta de Agradecimiento a mi Padrino o Madrina, según me indique la Fundación.',
  'Entregar una foto o fotocopia de la libreta de calificaciones (nivel primario o secundario) cada vez que la entregue la escuela.',
  'Entregar la constancia de desempeño académico.',
  'Asistir a las actividades organizadas por FONBEC.',
  'Comprometerme a pagar la cooperadora o similar del establecimiento educativo al que concurra.',
  'Intentar hacer algún trabajo de ayuda a los necesitados de mi entorno. Ya que soy ayudado, puedo ayudar a otros.',
];

// Testimonios: textos literales publicados por FONBEC (se omiten datos personales como DNI).
export const testimonials = [
  {
    id: 'isaac',
    name: 'Isaac',
    role: 'Becario · recibido de médico en 2021',
    quote: 'Seguir estudiando no se consigue solo con apoyo económico, sino con motivación, consejos y una guía. Y mi padrino siempre está al pie del cañón.',
    img: '/assets/img/isaac-medico.webp',
  },
  {
    id: 'barbara',
    name: 'Bárbara Negri',
    role: 'Madrina de Karen',
    quote: 'Hasta que llegó la primera carta de Karen. Allí “la conocí”. Mi aporte dejó de ser para FONBEC, ahora yo sabía que mi aporte era para Karen.',
    long: 'Cuando comencé a ser madrina de FONBEC solo tuve en cuenta si estaba dentro de mis posibilidades económicas el pago mensual de la beca. Hasta que llegó la primera carta de Karen. Allí “la conocí”. Supe quién era, cómo estaba integrada su familia, a qué había aplicado el dinero de la beca, cuáles eran sus problemas y cuáles eran sus sueños. Mi aporte dejó de ser para FONBEC, ahora yo sabía que mi aporte era para Karen. En octubre de 2009, en un encuentro grupal organizado por FONBEC, me reuní con ella y comprobé que es una criatura tímida y deliciosa. Todos los meses espero ansiosa sus cartas y no dejo de aprender de ellas. Creo que soy yo quien más recibe. La beca de FONBEC es una magia, porque hace bien “de una”, tanto al padrino como al ahijado.',
  },
  {
    id: 'liliana',
    name: 'Liliana Corazza',
    role: 'Docente y mediadora · E.S. N.º 17, Buenos Aires',
    quote: 'Para nuestros chicos, ustedes son, aunque les parezca una exageración, una ventana abierta a la esperanza.',
    long: 'Hace muchos años que estoy en esta escuela. Empecé siendo preceptora, hoy soy secretaria; y desde la tarea de preceptora es como aprendí a conocer y querer esta escuela con todo lo que tiene y lo que “no tiene”. Un día se hace presente un muchacho en la escuela y nos ofrece las becas. Por supuesto, no lo creí. ¡Qué suerte! ¡Qué alegría! FONBEC no era “una promesa más”; y empezamos a confiar… porque llegó. Para nuestros chicos, ustedes son, aunque les parezca una exageración, una ventana abierta a la esperanza. A la esperanza no sólo del dinero, a la esperanza que se traduce en valores tan olvidados: solidaridad, confianza, amistad, esfuerzo, pero por sobre todo, creer en la mano tendida.',
  },
  {
    id: 'jorge',
    name: 'Jorge',
    role: 'Estudiante universitario, 20 años · Encuentro Buenos Aires',
    quote: 'Si alguna vez pudieran ver desde lejos, se darían cuenta de todo lo que me ayudaron.',
  },
  {
    id: 'monica',
    name: 'Mónica Caro',
    role: 'Madrina',
    quote: 'FONBEC es la institución social idónea para que otro niño, nuestro ahijado, sienta que para él también es posible.',
    long: 'Para los que pensamos que la despareja posibilidad de acceso a la educación es una de las principales causas de desigualdad, para los que tuvimos la oportunidad de tenerla, disfrutar su valor y ofrecerla a nuestros hijos, pensamos que FONBEC es la institución social idónea para que otro niño, nuestro ahijado, sienta que para él también es posible.',
  },
];

// Historias (resumen editorial + texto completo original publicado por FONBEC en su sitio)
export const stories = [
  { id: 'catherina', kicker: 'De ahijada a madrina', title: 'Catherina eligió devolver lo que recibió', source: ['de-ahijada-a-madrina-2'],
    text: 'Catherina Bringas Navarro fue ahijada de la empresa ISCOT Services. Terminó el secundario, se capacitó en Turismo, Hotelería y Gastronomía gracias a una beca extraordinaria y, a través de la Bolsa de Trabajo de FONBEC, empezó a trabajar. A los 18 años se convirtió en una de las madrinas más jóvenes de la Fundación.' },
  { id: 'sergio', kicker: 'Predicando con el ejemplo', title: 'Sergio fue becario y hoy es padrino', source: ['predicando-con-el-ejemplo'],
    text: 'Uno de nueve hermanos, Sergio Hernández fue becario de FONBEC durante varios años. Al terminar el secundario conoció en persona a sus padrinos, que le ofrecieron trabajo. Estudia Higiene y Seguridad, ayuda a su familia y es padrino de otro chico de FONBEC.' },
  { id: 'mauro', kicker: 'El primer ahijado', title: 'Mauro y Jagger', source: ['encuentro-total-filial-fonbec-bs-as'], img: '/assets/img/encuentro-buenos-aires-2017.webp', imgAlt: 'Foto grupal del encuentro de FONBEC Buenos Aires',
    text: 'En el encuentro de la filial Buenos Aires —más de 200 personas entre becados, padrinos y voluntarios— cerramos cantando con Mauro, el primer ahijado que tuvo FONBEC, que hoy es padrino de Jagger, un pequeño de 8 años que lo admira y sueña con ser padrino él también.' },
  { id: 'santos', kicker: 'Historia de final feliz', title: 'Los hermanos Santos, del Valle de Uco a la universidad', source: ['historia-de-final-feliz'],
    text: 'Cinco hermanos de El Zampalito, Tupungato. Caminaban más de 4 kilómetros para tomar el ómnibus a la escuela técnica y todos fueron escoltas o abanderados. Dos estudian ingeniería y una, administración. “Para que no estén esclavizados como yo”, dice su papá.' },
  { id: 'maria-cristina', kicker: 'Una maestra que vale un millón', title: 'María Cristina Gómez, mediadora entre las 50 mejores docentes del mundo', source: ['una-maestra-que-vale-un-millon'], img: '/assets/img/mediadora-y-becarias-rosario.webp', imgAlt: 'María Cristina Gómez, mediadora de FONBEC Rosario, junto a estudiantes',
    text: 'Docente rosarina y mediadora de FONBEC Rosario, fue nominada entre los 50 mejores docentes del mundo por su trabajo en contextos de vulnerabilidad. Sus alumnos becarios se destacan por su compromiso con el estudio.' },
  { id: 'ezequiel', kicker: 'Joven Embajador', title: 'Ezequiel Cáceres, de Maipú a los Estados Unidos', source: ['jovenes-embajadores-2012', 'ezequiel-caceres-becario-de-fonbec-mendoza-fue-seleccionado-por-la-embajada-de-estados-unidos'],
    text: 'Becario de FONBEC Mendoza, Ezequiel fue uno de los 15 estudiantes argentinos elegidos para el programa Jóvenes Embajadores 2012 y, al año siguiente, la Embajada de Estados Unidos lo seleccionó como mentor del campamento intensivo de inglés del programa ACCESS.' },
  { id: 'deportistas', kicker: '¡Deportistas!', title: 'Ruth y Manuela cumplieron el sueño de hacer deporte', source: ['deportistas'],
    text: 'Dos fonbecarias del IPEM N.º 77 que, gracias a su padrino y a una empresa, pudieron practicar hockey y tenis fuera del horario escolar. “Solidaridad que nunca había visto”, dice Manuela.' },
  { id: 'lectura', kicker: '¡A leer!', title: 'Una madrina que llevó libros al aula', source: ['a-leer'],
    text: 'Karina Casella, madrina de FONBEC y profesora de la Facultad de Lenguas de la UNC, impulsó un proyecto de Animación a la Lectura en una escuela de Barrio Parque República, con el aporte de FONBEC.' },
  { id: 'voluntarios-michigan', kicker: 'Diez semanas en FONBEC', title: 'Voluntarios que llegaron desde Michigan', source: ['10-semanas-en-fonbec-2'],
    text: 'Erik y Tayler, estudiantes de Michigan State University, hicieron su práctica en FONBEC a través de COINED: tareas administrativas y entrevistas a ex becarios para relevar el impacto de la Fundación en sus vidas.' },
  { id: 'stella', kicker: 'Nota en La Nación', title: 'Stella torció su destino y hoy trabaja en Europa', external: 'https://www.lanacion.com.ar/lifestyle/jamas-voy-a-olvidar-ese-dia-vivia-en-un-barrio-carenciado-y-hoy-trabaja-en-europa-gracias-a-una-nid12092023/',
    text: 'Creció en un barrio carenciado. Con sacrificio, amor y el apoyo de FONBEC logró sus metas: su historia fue publicada por el diario La Nación en 2023.' },
];

// Egresados (fotos aportadas por FONBEC; se muestran los títulos que figuran en cada foto)
export const graduates = [
  { img: '/assets/img/egresada-bioquimica.webp', w: 900, h: 1200, title: 'Bioquímica', alt: 'Una egresada sostiene un cartel que dice “Me recibí, soy bioquímica” frente a la facultad' },
  { img: '/assets/img/egresado-analista-sistemas.webp', w: 720, h: 808, title: 'Analista en Sistemas', alt: 'Un egresado sostiene un cartel que dice “¡Me recibí! Analista en Sistemas”' },
  { img: '/assets/img/egresada-profesora-musica.webp', w: 1200, h: 800, title: 'Profesora de Música con especialización en violín', alt: 'Perla Benítez recibe su certificado de FONBEC por completar el Profesorado de Música' },
];

// Momentos (galería de la home)
export const moments = [
  { img: '/assets/img/reconocimiento-trayectoria.webp', w: 1400, h: 586, cap: 'Reconocimiento a la trayectoria', alt: 'Becarios y voluntarias con sus certificados de Reconocimiento a la Trayectoria FONBEC', area: 'a' },
  { img: '/assets/img/taller-robotica.webp', w: 900, h: 1200, cap: 'Taller de robótica', alt: 'Un joven muestra un robot de competencia a un grupo de chicos', area: 'b' },
  { img: '/assets/img/becaria-certificado.webp', w: 1200, h: 862, cap: 'Certificado de reconocimiento', alt: 'Una becaria sonríe con su certificado junto al logo de FONBEC', area: 'c' },
  { img: '/assets/img/abanderado.webp', w: 653, h: 1160, cap: 'Abanderado', alt: 'Un chico con guardapolvo y banda lleva la bandera argentina en un acto escolar', area: 'd' },
  { img: '/assets/img/reconocimiento-trayectoria-plaza.webp', w: 800, h: 1067, cap: 'Encuentro de becarios', alt: 'Becarios y voluntarias bajo un árbol con sus certificados', area: 'e' },
  { img: '/assets/img/equipo-voluntarias.webp', w: 900, h: 1200, cap: 'Voluntarias y voluntarios', alt: 'Grupo de voluntarias y voluntarios de FONBEC con un banderín con el nombre de la Fundación', area: 'f' },
];

// FONBEC en los medios
export const press = [
  { year: '2023', outlet: 'La Nación', title: '“Jamás voy a olvidar ese día”: la historia de Stella', href: 'https://www.lanacion.com.ar/lifestyle/jamas-voy-a-olvidar-ese-dia-vivia-en-un-barrio-carenciado-y-hoy-trabaja-en-europa-gracias-a-una-nid12092023/' },
  { year: '2019', outlet: 'El Correo Gallego', title: 'Una maestra que vale un millón', href: 'https://www.elcorreogallego.es/tendencias/ecg/maestra-vale-un-millon/idEdicion-2019-01-28/idNoticia-1161829' },
  { year: '2017', outlet: 'La Nación', title: 'No pueden terminar sus estudios por falta de recursos y buscan padrinos', href: 'http://www.lanacion.com.ar/2020596' },
  { year: '2017', outlet: 'El Diario del Centro', title: 'Ayuda que abre puertas y da esperanzas', href: 'http://www.eldiariocba.com.ar/ayuda-que-abre-puertas-y-da-esperanzas/' },
  { year: '2014', outlet: 'Diario Los Andes', title: 'Historia de final feliz: los hermanos Santos', href: '/historias/#santos' },
];

// Hitos con fuente en publicaciones de FONBEC
export const milestones = [
  { year: '1999', title: 'Nace FONBEC', text: 'Facundo Garayoa empieza a buscar padrinos que apoyen económicamente a niños y jóvenes con ganas de estudiar.' },
  { year: '2012', title: 'Premio Ciudadanía FAVIM', text: 'El “Premio al esfuerzo educativo” de FONBEC gana el Premio Ciudadanía FAVIM 2012 en Mendoza, con 438 votos de ciudadanos. Para entonces, la Fundación acompañaba a más de 1.100 becarios de todo el país. Ese año, el becario Ezequiel Cáceres es elegido Joven Embajador.', link: ['Conocé a Ezequiel', '/historias/#ezequiel'] },
  { year: '2013', title: 'Parte del Foro del Sector Social', text: 'FONBEC se incorpora a la Federación que nuclea Asociaciones Civiles y Fundaciones de todo el país, que reúne a más de 230 organizaciones.' },
  { year: '2014', title: 'Joven Sobresaliente', text: 'La Bolsa de Comercio de Córdoba distingue a Facundo Garayoa, fundador y Director Ejecutivo, entre los “Diez Jóvenes Sobresalientes del Año”. FONBEC acompaña a 400 becarios en Mendoza y 1.000 en el resto del país.' },
  { year: '2017', title: 'Encuentro “Total” en Buenos Aires', text: 'Más de 200 personas —becados, padrinos y voluntarios— se reúnen en la escuela René Favaloro de Benavídez. La Nación y El Diario del Centro cuentan la historia de FONBEC.', link: ['Leer la crónica', '/historias/#mauro'], img: '/assets/img/encuentro-buenos-aires-2017.webp' },
  { year: '2018', title: 'Bodegas Abiertas', text: 'Bodegas de Argentina, con el apoyo de Turismo Mendoza, organiza un circuito por 28 bodegas mendocinas a beneficio de FONBEC Mendoza.' },
  { year: '2019', title: 'Una maestra que vale un millón', text: 'María Cristina Gómez, mediadora de FONBEC Rosario, es nominada entre los 50 mejores docentes del mundo.', link: ['Conocé su historia', '/historias/#maria-cristina'], img: '/assets/img/mediadora-y-becarias-rosario.webp' },
  { year: '2024', title: '25 años', text: 'FONBEC celebra 25 años acompañando a estudiantes y uniendo personas a través de la educación.', img: '/assets/img/fonbec-25-anios.webp', contain: true },
  { year: 'Hoy', title: 'Más de 2.000 becarios', text: 'En 16 ciudades de Argentina y 2 ciudades de Bolivia, gracias a sus padrinos, madrinas y voluntarios.', img: '/assets/img/reconocimiento-trayectoria-plaza.webp' },
];

export const filiales = [
  { city: 'Bahía Blanca', contact: 'Marcela Anet', email: 'bahiablanca@fonbec.org.ar', phones: ['11 4578 7821'], lat: -38.72, lon: -62.27 },
  { city: 'Buenos Aires', contact: 'Marina Horno', email: 'buenosairesfonbec@gmail.com', phones: ['11 7365 7853', '11 2255 7073'], lat: -34.6, lon: -58.38 },
  { city: 'Catamarca', email: 'catamarca@fonbec.org.ar', lat: -28.47, lon: -65.78 },
  { city: 'Córdoba', contact: 'Elvira Garayoa', email: 'elvira.garayoa@fonbec.org.ar', phones: ['0351 341 9008'], address: 'Obispo Trejo 219, Oficina 302', lat: -31.42, lon: -64.18, hq: true },
  { city: 'Mar del Plata', contact: 'Norma Chornoguvsky', note: 'Super Tenedores / FONBEC', email: 'mardelplata@fonbec.org.ar', phones: ['223 608 0152'], lat: -38.0, lon: -57.56 },
  { city: 'Mendoza', contact: 'María Graciela Sanz', email: 'barrancograciela@gmail.com', phones: ['0261 15 600 6521'], address: 'Chile 759, 2.º 1', lat: -32.89, lon: -68.84 },
  { city: 'Misiones', contact: 'Ivana Riveros da Silva', email: 'misiones@fonbec.org.ar', phones: ['3755 50 8367'], lat: -27.37, lon: -55.9 },
  { city: 'Rosario', contact: 'Inés Risso', email: 'rosario@fonbec.org.ar', phones: ['0341 15 376 7247'], address: 'Corrientes 729, oficina 903', lat: -32.95, lon: -60.65 },
  { city: 'Salta', contact: 'Marcela Bravo', email: 'salta@fonbec.org.ar', phones: ['3876 84 7575', '0387 453 2035'], lat: -24.79, lon: -65.41 },
  { city: 'San Juan', email: 'sanjuan@fonbec.org.ar', lat: -31.54, lon: -68.53 },
  { city: 'Santa Fe', contact: 'Martín Masetto', email: 'santafe@fonbec.org.ar', phones: ['345 402 6263'], lat: -31.63, lon: -60.7 },
  { city: 'Tandil', contact: 'Verónica Flores', email: 'tandil@fonbec.org.ar', phones: ['249 433 5298'], lat: -37.32, lon: -59.13 },
  { city: 'Trelew', email: 'trelew@fonbec.org.ar', lat: -43.25, lon: -65.31 },
  { city: 'Tucumán', contact: 'José Vera', email: 'tucuman@fonbec.org.ar', phones: ['3865 58 8016'], lat: -26.82, lon: -65.22 },
  { city: 'Villa María', contact: 'Sandra Parise', email: 'fonbec.vm@gmail.com', phones: ['353 411 6185', '353 569 7188'], lat: -32.41, lon: -63.24 },
  { city: 'Bolivia', contact: 'Alfredo Mariaca', note: 'La Paz y Santa Cruz de la Sierra', email: 'amariaca@fonbec.org', phones: ['+591 7623 9689'], lat: -16.5, lon: -68.15, abroad: true, extra: [{ city: 'Santa Cruz de la Sierra', lat: -17.78, lon: -63.18 }] },
];

export const sponsors = [
  ['prudential', 'Prudential'], ['banco-galicia', 'Banco Galicia'], ['chandon', 'Bodegas Chandon'], ['rotary', 'Rotary Club'],
  ['aguas-cordobesas', 'Aguas Cordobesas'], ['san-cristobal', 'San Cristóbal'], ['trivento', 'Bodegas Trivento'], ['cadena3', 'Cadena 3'],
  ['banco-hipotecario', 'Banco Hipotecario'], ['coca-cola', 'Coca-Cola Andina'], ['tecnoair', 'Tecno Air'], ['tecme', 'TECME'],
  ['piero', 'Piero Grupos de Estudio'], ['olas', 'OLAS'], ['nexo', 'Nexo Group'], ['montemar', 'Montemar Compañía Financiera'],
  ['naranja', 'Naranja'], ['iscot', 'ISCOT Services'], ['instituto-cardiologico', 'Instituto Modelo de Cardiología'], ['inmeba', 'INMEBA'],
  ['hospital-privado', 'Hospital Privado'], ['edisur', 'Grupo EDISUR'], ['dise', 'Plásticos DISE'], ['consultnet', 'Consultnet'],
  ['denso', 'Denso'], ['commbi', 'COMMBI'],
];

export const companiesText = [
  'Absa – Nutrición Animal', 'Aguas Cordobesas', 'Asociación de Magistrados', 'Banco Galicia', 'Banco Hipotecario', 'Bodegas Chandon',
  'Bodegas Trivento', 'Cadena 3', 'Centro Color', 'Coca-Cola Andina', 'Grupo EDISUR', 'COMMBI', 'Consultnet SRL', 'Denso',
  'Distribuidora Frappampino', 'EDEMSA', 'Farmacia Caruso', 'Farmacia Líder S.A.', 'Fragapane Hnos. SRL', 'Fundación para el Progreso de la UCC',
  'Gastaldi Hnos.', 'Hospital Privado', 'INMEBA SRL', 'Instituto Modelo de Cardiología', 'Inter Agro SRL', 'ISCOT Services SA',
  'ITC Internet y Conectividad', 'Juan Mario Españon S.A. (Bicicletas Enrique)', 'Klixar', 'Macromet', 'Magistrados de Mendoza', 'Mecanálisis',
  'Molco Sport SRL', 'Montemar Cía. Financiera', 'Musimundo', 'Naranja', 'Nexo Group', 'OLAS SRL', 'Piero Grupos de Estudio', 'Plásticos DISE',
  'Prudential', 'Rotary Club', 'San Cristóbal', 'Sena S.A.', 'T y C S.R.L.', 'TAGLE', 'TECME SA', 'Tecno Air', 'Tecno Voz Noroeste S.A.',
  'Usina de Tandil', 'Verallia', 'Womhole', 'Zanetti',
];

export const network = [
  'AliaRSe – Proyecto de Extensión de la Facultad de Ciencias Económicas (UNICEN)', 'Asociación Civil Super Tenedores', 'Banco de Alimentos de Córdoba',
  'Banco de Alimentos de Rosario', 'CEFIM Bolivia', 'Centro de Estudio y Trabajo La Chacra', 'COINED', 'CONIN',
  'Federación Mesa Solidaria Tandil', 'Fundación ARAS – Asociación Rosarina de Ayuda Solidaria', 'Fundación Bunge y Born', 'Fundación MOCONA',
  'Fundación Inclusión Social', 'Fundación Universitaria de Oficios', 'Help Argentina', 'INJUVE', 'La Estancia', 'Oportunidad Educativa',
  'Rotary Club', 'Universidad Nacional del Centro (UNICEN) – Facultad de Ciencias Económicas', 'Universidad Torcuato Di Tella',
];

export const documents = [
  { title: 'Certificado de exención de Ganancias', meta: 'Vigente hasta 31/12/2021', file: 'certificado-exencion-ganancias-2021.pdf' },
  { title: 'Certificado de habilitación', meta: '2021', file: 'certificado-habilitacion-2021.pdf' },
  { title: 'Balance 2018', meta: 'Auditado por Deloitte', file: 'balance-2018-auditado-deloitte.pdf' },
  { title: 'Certificado de subsistencia', meta: '2018', file: 'certificado-subsistencia-2018.pdf' },
  { title: 'Balance 2017', meta: 'Auditado por Deloitte', file: 'balance-2017-auditado-deloitte.pdf' },
  { title: 'Balance 2016', meta: 'Estados contables', file: 'balance-2016.pdf' },
  { title: 'Certificado de habilitación', meta: '2014', file: 'certificado-habilitacion-2014.pdf' },
];

// Texto original de las notas del sitio anterior (src/data/posts.json), incrustado en Historias.
const rawPosts = JSON.parse(readFileSync(new URL('./data/posts.json', import.meta.url), 'utf8'));
function tidy(html) {
  return html
    .replace(/<p>([\s\S]*?)<\/p>/g, (_, inner) => inner.split(/\n+/).map((x) => x.trim()).filter(Boolean).map((x) => `<p>${x}</p>`).join('\n'))
    .replace(/<blockquote>\s*([\s\S]*?)<\/blockquote>/g, (_, inner) => `<p>${inner.trim()}</p>`)
    .replace(/Eric agregaba/g, 'Erik agregaba')
    .replace(/<p>\s*<\/p>/g, '');
}
export const postsBySlug = Object.fromEntries(rawPosts.map((p) => [p.slug, { ...p, html: tidy(p.html) }]));
