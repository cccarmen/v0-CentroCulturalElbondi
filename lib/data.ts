export type EventType = 'teatro' | 'circo' | 'musica' | 'feria' | 'variedades'

export const EVENT_TYPES: { value: EventType; label: string; icon: string }[] = [
  { value: 'teatro', label: 'Teatro', icon: 'theater' },
  { value: 'circo', label: 'Circo', icon: 'sparkles' },
  { value: 'musica', label: 'Musica', icon: 'music' },
  { value: 'feria', label: 'Feria', icon: 'store' },
  { value: 'variedades', label: 'Variedades', icon: 'palette' },
]

export interface EventItem {
  slug: string
  title: string
  description: string
  fullDescription: string
  image: string
  date: string
  time: string
  category: 'evento' | 'taller'
  eventType?: EventType
  production?: 'bondi' | 'externa'
  location: string
  price: string
  maxParticipants?: number
  contact: string
  whatsapp?: string
  instagram?: string
  calendarDate?: string // ISO date string for calendar matching e.g. "2026-09-05"
  instructor?: {
    name: string
    avatar: string
    bio: string
  }
}

export const events: EventItem[] = [
  {
    slug: 'teatro-carga',
    title: 'Teatro: Carga',
    description:
      'Obra de teatro de Evangelina Ferreiro. Una propuesta escenica potente para abrir el mes de septiembre.',
    fullDescription:
      'Carga, de Evangelina Ferreiro, llega al escenario de El Bondi. Una obra de teatro que forma parte de la programacion de producciones externas que reciben nuestro espacio, abriendo el ciclo de septiembre con la fuerza de la escena independiente.',
    image: '/images/evento-variete.jpg',
    date: '5 Sep 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'teatro',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-09-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'fiesta-candombera',
    title: 'Fiesta Candombera',
    description:
      'Noche de candombe y tambores para poner el cuerpo en movimiento. Musica en vivo hasta tarde.',
    fullDescription:
      'La Fiesta Candombera llena de tambores el patio de El Bondi. Una noche para bailar al ritmo del candombe, con cuerdas de tambores y musica en vivo que invitan a mover el cuerpo y encontrarnos en comunidad.',
    image: '/images/evento-fiesta.jpg',
    date: '5 Sep 2026',
    time: '23:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'externa',
    location: 'Patio - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-09-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas-septiembre',
    title: 'Varieté Bajo las Estrellas',
    description:
      'El clasico varieté del Bondi: circo, danza, musica y humor en una sola noche a cielo abierto.',
    fullDescription:
      'Varieté Bajo las Estrellas es una de las producciones mas queridas del Colectivo Cultural. Circo, danza, musica y humor se combinan en una noche a cielo abierto donde los artistas del Bondi y invitados comparten escenario con la comunidad.',
    image: '/images/evento-baile-atardecer.jpg',
    date: '12 Sep 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'Patio - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-09-12',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'festival-el-cubo',
    title: 'Festival El Cubo',
    description:
      'Festival de variedades con propuestas artisticas diversas para toda la familia por la tarde.',
    fullDescription:
      'El Festival El Cubo trae una tarde de variedades para toda la familia. Una propuesta que reune distintas expresiones artisticas en el espacio recuperado del Colectivo Cultural.',
    image: '/images/evento-encuentro.jpg',
    date: '19 Sep 2026',
    time: '16:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'externa',
    location: 'El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-09-19',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'aniversario-la-ballena-de-mawy',
    title: 'Aniversario La Ballena de Mawy',
    description:
      'Celebracion del aniversario de La Ballena de Mawy con musica en vivo y festejo comunitario.',
    fullDescription:
      'La Ballena de Mawy celebra su aniversario en El Bondi con una noche de musica en vivo y festejo compartido. Un encuentro para acompanar y celebrar a quienes hacen crecer la escena cultural de la zona.',
    image: '/images/evento-musica.jpg',
    date: '26 Sep 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-09-26',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas-octubre',
    title: 'Varieté Bajo las Estrellas',
    description:
      'Nueva edicion del varieté del Bondi: una noche de circo, musica y humor a cielo abierto.',
    fullDescription:
      'Vuelve Varieté Bajo las Estrellas, la produccion insignia del Colectivo Cultural. Circo, danza, musica y humor en una noche a cielo abierto para disfrutar en comunidad.',
    image: '/images/evento-variete.jpg',
    date: '10 Oct 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'Patio - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-10-10',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'festival-de-rock',
    title: 'Festival de Rock',
    description:
      'Bandas de rock en vivo sobre el escenario del Bondi. Una noche potente de musica local.',
    fullDescription:
      'El Festival de Rock reune a bandas locales e invitadas sobre el escenario del Bondi. Una noche potente de musica en vivo para celebrar la escena rockera de Maschwitz y la zona.',
    image: '/images/evento-musica.jpg',
    date: '17 Oct 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-10-17',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'afuera-no-hay-garantias',
    title: 'Afuera no hay garantías, adentro tampoco',
    description:
      'Obra de teatro con una mirada aguda y actual. Una propuesta escenica que invita a pensar.',
    fullDescription:
      'Afuera no hay garantias, adentro tampoco es una obra de teatro que llega al escenario del Bondi con una mirada aguda sobre nuestro presente. Una propuesta escenica que combina reflexion y emocion.',
    image: '/images/evento-variete.jpg',
    date: '24 Oct 2026',
    time: 'A confirmar',
    category: 'evento',
    eventType: 'teatro',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-10-24',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'noche-de-los-muertos',
    title: 'Noche de los Muertos',
    description:
      'Una celebracion con altares, color y memoria. Ritual, arte y comunidad para honrar a quienes ya no estan.',
    fullDescription:
      'La Noche de los Muertos es una celebracion con altares, color y memoria. Una jornada de arte comunitario y ritual para honrar a quienes ya no estan, con propuestas escenicas y participacion de toda la comunidad.',
    image: '/images/evento-fiesta.jpg',
    date: '31 Oct 2026',
    time: '19:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-10-31',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'festival-de-murgas-uruguayas',
    title: 'Festival de Murgas Uruguayas',
    description:
      'Murga uruguaya en vivo: color, canto y percusion sobre el escenario del Bondi.',
    fullDescription:
      'El Festival de Murgas Uruguayas trae el color, el canto y la percusion de la murga rioplatense al escenario del Bondi. Una noche de fiesta popular con la energia inconfundible de la murga uruguaya.',
    image: '/images/evento-variete.jpg',
    date: '7 Nov 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-11-07',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas-noviembre',
    title: 'Varieté Bajo las Estrellas',
    description:
      'El varieté del Bondi vuelve en noviembre con circo, danza, musica y humor a cielo abierto.',
    fullDescription:
      'Una nueva edicion de Varieté Bajo las Estrellas, la produccion mas convocante del Colectivo Cultural. Circo, danza, musica y humor en una noche a cielo abierto para compartir en comunidad.',
    image: '/images/evento-baile-atardecer.jpg',
    date: '14 Nov 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'Patio - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-11-14',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'teatro-noviembre',
    title: 'Teatro en el Bondi',
    description:
      'Noche de teatro en el escenario del Bondi. Una propuesta escenica para cerrar noviembre.',
    fullDescription:
      'Una noche de teatro en el escenario del Bondi como parte de la programacion de noviembre. Produccion del Colectivo Cultural que celebra el trabajo escenico de nuestra comunidad.',
    image: '/images/evento-variete.jpg',
    date: '28 Nov 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'teatro',
    production: 'bondi',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-11-28',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'tertulia-rebelde',
    title: 'Tertulia Rebelde',
    description:
      'El encuentro anual del Colectivo Cultural para pensarnos, sumar manos y proyectar lo que viene.',
    fullDescription:
      'La Tertulia Rebelde es una convocatoria historica del Colectivo Cultural, celebrada todos los anos desde 2009. Un encuentro destinado a ampliar la participacion comunitaria, sumando integrantes a los distintos proyectos en marcha e invitando a formar parte de este sueno colectivo.',
    image: '/images/evento-encuentro.jpg',
    date: '5 Dic 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-12-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas-diciembre',
    title: 'Varieté Bajo las Estrellas',
    description:
      'Ultima edicion del ano del varieté del Bondi: circo, danza, musica y humor a cielo abierto.',
    fullDescription:
      'La ultima edicion del ano de Varieté Bajo las Estrellas. Circo, danza, musica y humor en una noche a cielo abierto para despedir el ano celebrando en comunidad.',
    image: '/images/evento-baile-atardecer.jpg',
    date: '12 Dic 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'Patio - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-12-12',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'aniversario-15-anos-radioactiva',
    title: 'Aniversario 15 años Radioactiva',
    description:
      'FM RadioActiva Comunitaria celebra sus 15 anos con una gran fiesta de musica y comunidad.',
    fullDescription:
      'FM RadioActiva Comunitaria, la primera radio comunitaria del Partido de Escobar, celebra sus 15 anos al aire. Una gran fiesta de musica en vivo y encuentro para festejar a la radio del pueblo y a todas las voces que la hacen posible.',
    image: '/images/evento-musica.jpg',
    date: '19 Dic 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'bondi',
    location: 'El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-12-19',
    contact: 'mailcolectivocultural@gmail.com',
  },
]

export const workshops: EventItem[] = [
  {
    slug: 'astromagias',
    title: 'AstroMagias',
    description:
      'Tarot, astrologia, ritualidad y mundo simbolico. Un aquelarre para vivir la magia, no para aprenderla.',
    fullDescription:
      'Nos encontramos para vivir la magia en Aquelarre (no para aprenderla). Tarot, astrologia, ritualidad y mundo simbolico: un espacio de encuentro donde el proposito se revela desde la magia simple y la tribu. Para mujeres a partir de los 17 anos, no se requiere experiencia previa y podes sumarte en el momento que lo sientas.',
    image: '/images/taller-astromagias.png',
    date: 'Encuentros grupales',
    time: 'A confirmar',
    category: 'taller',
    location: 'El Bondi',
    price: 'Consultar',
    contact: 'mailcolectivocultural@gmail.com',
    instagram: 'https://www.instagram.com/blendemagias',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Agos Cataudella',
      avatar: '/images/taller-astromagias.png',
      bio: 'Facilitadora de AstroMagias. Trabaja el tarot, la astrologia, la ritualidad y el mundo simbolico. La encontras en Instagram como @blendemagias.',
    },
  },
  {
    slug: 'danza-raiz',
    title: 'Danza Raíz: Danzas Peñeras',
    description:
      'Tecnica, ritmo y coreografia de danzas tradicionales: chacarera, gato, zamba, malambo y mas.',
    fullDescription:
      'Taller de Danza Raiz: danzas peneras. Tecnica, ritmo y coreografia de danzas tradicionales y no tanto: chacarera, gato, zamba, escondido, bailecito, zamba alegre, malambo y otras. Trabajamos variantes coreograficas y la busqueda de expresividad en la danza.',
    image: '/images/taller-danza-raiz.png',
    date: 'Lunes',
    time: '18:00 a 19:30 hs',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Consultar',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491135924409',
    calendarDate: '2026-09-07',
    instructor: {
      name: 'Fer Lojo',
      avatar: '/images/taller-danza-raiz.png',
      bio: 'Facilita el taller de Danza Raiz en El Bondi. Info e inscripciones al 11 3592-4409.',
    },
  },
  {
    slug: 'percusion-africana',
    title: 'Percusión Africana',
    description:
      'Clase grupal multinivel de tambor africano. Se facilita instrumento: djembe, dundun, sangban y kenkeny.',
    fullDescription:
      'Taller de percusion africana. La clase grupal es multinivel y se facilita instrumento. Este taller genera e incrementa el vinculo con el tambor y su musica: abordado desde la grupalidad se incorporan las tecnicas y ritmos, dejando a cada participante avanzar acorde a su nivel dentro del grupo. Instrumentos: djembe, dundun, sangban y kenkeny.',
    image: '/images/taller-percusion-africana.png',
    date: 'Clase grupal multinivel',
    time: 'A confirmar',
    category: 'taller',
    location: 'El Bondi',
    price: 'Consultar',
    contact: 'mailcolectivocultural@gmail.com',
    calendarDate: '2026-09-02',
    instructor: {
      name: 'Pablo Rebelo',
      avatar: '/images/taller-percusion-africana.png',
      bio: 'Profe de percusion del Bondi. Facilita el taller de percusion africana, un espacio grupal y multinivel donde se aprende desde el vinculo con el tambor.',
    },
  },
  {
    slug: 'danza-africana',
    title: 'Danza Africana',
    description:
      'Espacio grupal y multinivel con percusion en vivo. Clase aerobica que integra entrenamiento y tecnica.',
    fullDescription:
      'Taller de Danza Africana. Espacio grupal, multinivel, que cuenta con percusion en vivo. Es una clase aerobica que incorpora entrenamiento y tecnica de danza, abierta a todos los niveles.',
    image: '/images/taller-danza-africana.png',
    date: 'Clase grupal multinivel',
    time: 'A confirmar',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Consultar',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491159982772',
    calendarDate: '2026-09-03',
    instructor: {
      name: 'Ivana Chayle',
      avatar: '/images/taller-danza-africana.png',
      bio: 'Facilita el taller de Danza Africana en El Bondi, con percusion en vivo. Contacto al 11 5998-2772.',
    },
  },
  {
    slug: 'bachillerato-popular-el-bondi',
    title: 'Bachillerato Popular El Bondi',
    description:
      'Secundario incluyente para toda la gente. Bachillerato de 3 anos para personas adultas en el marco de la Educacion Popular.',
    fullDescription:
      'Bachillerato Popular El Bondi: "Secundario incluyente para toda la gente". Desde 2019 creamos un espacio de aprendizaje en el marco de la Educacion Popular. Ofrecemos un Bachillerato de 3 anos para personas adultas con orientacion en Ciencias Sociales, en coordinacion con el Fines Programas Especiales. Nos proponemos el encuentro para el aprendizaje dentro de la pedagogia de Paulo Freire. Nuestro proyecto principal es "El Saber Colectivo", un programa radial donde producimos conocimiento en forma cooperativa. Para inscripciones te podes comunicar al 11 5571-7541.',
    image: '/images/evento-encuentro.jpg',
    date: 'Ciclo lectivo',
    time: 'Consultar',
    category: 'taller',
    location: 'El Bondi',
    price: 'Gratuito',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491155717541',
    calendarDate: '2026-03-01',
    instructor: {
      name: 'Bachillerato Popular El Bondi',
      avatar: '/images/evento-encuentro.jpg',
      bio: 'Secundario para personas adultas con titulo oficial, en el marco de la Educacion Popular. Inscripciones al 11 5571-7541.',
    },
  },
]

export function getAllItems(): EventItem[] {
  return [...events, ...workshops]
}

export function getItemBySlug(slug: string): EventItem | undefined {
  return getAllItems().find((item) => item.slug === slug)
}

export function getRelatedItems(slug: string, limit = 3): EventItem[] {
  const current = getItemBySlug(slug)
  if (!current) return []
  return getAllItems()
    .filter((item) => item.slug !== slug && item.category === current.category)
    .slice(0, limit)
}

export function getEventDates(): Date[] {
  return getAllItems()
    .filter((item) => item.calendarDate)
    .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
}

export function getItemsByDate(dateStr: string): EventItem[] {
  return getAllItems().filter((item) => item.calendarDate === dateStr)
}
