export interface EventItem {
  slug: string
  title: string
  description: string
  fullDescription: string
  image: string
  date: string
  time: string
  category: 'evento' | 'taller'
  location: string
  price: string
  maxParticipants?: number
  contact: string
  calendarDate?: string // ISO date string for calendar matching e.g. "2026-02-15"
  instructor?: {
    name: string
    avatar: string
    bio: string
  }
}

export const events: EventItem[] = [
  {
    slug: 'noche-de-variete',
    title: 'Noche de Variete',
    description:
      'Espectaculo de circo, danza, comedia y musica en vivo. Una noche de varietes para toda la comunidad.',
    fullDescription:
      'Veni a disfrutar de una noche magica con los mejores artistas del circuito independiente. Un espectaculo que reune circo, danza, comedia stand-up y musica en vivo en un formato de variete que promete sorprender a toda la familia.',
    image: '/images/evento-variete.jpg',
    date: '15 Ene 2026',
    time: '20:00 hs',
    category: 'evento',
    location: 'Salon principal - El Bondi',
    price: 'Entrada general: $2500 / Menores de 12: gratis',
    calendarDate: '2026-01-15',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Compania El Bondi',
      avatar: '/images/evento-variete.jpg',
      bio: 'La compania artistica de El Bondi reune a performers de circo, danza y teatro de la zona norte del Gran Buenos Aires.',
    },
  },
  {
    slug: 'festival-de-musica',
    title: 'Musica en Vivo',
    description:
      'Bandas locales e invitados especiales. Una celebracion de la musica independiente regional.',
    fullDescription:
      'El Festival de Musica de El Bondi es una celebracion de la escena musical independiente. Durante toda la jornada, bandas locales y artistas invitados comparten escenario.',
    image: '/images/evento-musica.jpg',
    date: '22 Ene 2026',
    time: '19:00 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'Entrada a la gorra (colaboracion voluntaria)',
    calendarDate: '2026-01-22',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Coordinacion Musical El Bondi',
      avatar: '/images/evento-musica.jpg',
      bio: 'El area de musica de El Bondi gestiona la programacion musical del centro cultural.',
    },
  },
  {
    slug: 'baile-folklorico',
    title: 'Ballet Folklorico',
    description:
      'Espectaculo de danza folklorica argentina con vestuario tradicional y musica en vivo.',
    fullDescription:
      'Disfruta de una noche de danza folklorica con el ballet de El Bondi. Vestidos tradicionales, musica en vivo y la pasion del folklore argentino en su maxima expresion.',
    image: '/images/evento-folklore.jpg',
    date: '29 Ene 2026',
    time: '20:00 hs',
    category: 'evento',
    location: 'Salon principal - El Bondi',
    price: 'Entrada general: $3000',
    calendarDate: '2026-01-29',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Ballet Folklorico El Bondi',
      avatar: '/images/evento-folklore.jpg',
      bio: 'El ballet folklorico de El Bondi presenta danzas tradicionales argentinas con vestuario autentico.',
    },
  },
  {
    slug: 'encuentro-comunitario',
    title: 'Encuentro Comunitario',
    description:
      'Jornada de encuentro y celebracion entre vecinos. Comida compartida, musica y abrazos.',
    fullDescription:
      'El Encuentro Comunitario es el evento mas esperado de El Bondi. Una jornada donde vecinos y vecinas se reunen para compartir, celebrar y fortalecer los lazos de la comunidad.',
    image: '/images/evento-encuentro.jpg',
    date: '5 Feb 2026',
    time: '14:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'milonga-popular',
    title: 'Milonga Popular',
    description: 'Tarde de baile popular con musica en vivo. Tango, folklore y ritmos latinoamericanos.',
    fullDescription: 'La Milonga Popular de El Bondi es un espacio de baile abierto a toda la comunidad. Con musica en vivo, parejas de todas las edades bailan tango, folklore y ritmos populares.',
    image: '/images/evento-pareja.jpg',
    date: '12 Feb 2026',
    time: '17:00 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-12',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'fiesta-comunitaria',
    title: 'Fiesta Comunitaria',
    description: 'Celebracion con torta, velitas y toda la comunidad reunida. Un cumple colectivo.',
    fullDescription: 'La Fiesta Comunitaria celebra a todos los que cumplen anos en el mes. Torta gigante, velitas, aplausos y el calor de toda la comunidad reunida.',
    image: '/images/evento-cumple.jpg',
    date: '19 Feb 2026',
    time: '16:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-19',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'ronda-de-baile',
    title: 'Ronda de Baile',
    description: 'Danza circular comunitaria. Todos los cuerpos, todas las edades, un solo ritmo.',
    fullDescription: 'La Ronda de Baile es un espacio de danza circular donde la comunidad se toma de las manos y baila junta. No se necesita experiencia, solo ganas de moverse.',
    image: '/images/evento-ronda.jpg',
    date: '26 Feb 2026',
    time: '18:00 hs',
    category: 'evento',
    location: 'Patio principal - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-26',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'baile-al-atardecer',
    title: 'Baile al Atardecer',
    description: 'Folklore al caer el sol. Parejas bailando chacarera, zamba y gato bajo la luz dorada.',
    fullDescription: 'Una tarde magica de folklore argentino al atardecer. Parejas de todas las edades bailan chacarera, zamba y gato mientras el sol pinta de dorado el patio de El Bondi.',
    image: '/images/evento-baile-atardecer.jpg',
    date: '5 Mar 2026',
    time: '18:30 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-03-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'danza-en-circulo',
    title: 'Danza en Circulo',
    description: 'Movimiento libre y colectivo. Cuerpos en movimiento, musica y energia compartida.',
    fullDescription: 'La Danza en Circulo propone un espacio de movimiento libre donde el grupo crea coreografias espontaneas. Cuerpos diversos, musica del mundo y la alegria de moverse juntos.',
    image: '/images/evento-danza-circulo.jpg',
    date: '14 Mar 2026',
    time: '19:00 hs',
    category: 'evento',
    location: 'Salon de danza - El Bondi',
    price: 'Entrada general: $2000',
    calendarDate: '2026-03-14',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'celebracion-colectiva',
    title: 'Celebracion Colectiva',
    description: 'Festejo con bengalas, aplausos y toda la comunidad. Un momento de alegria compartida.',
    fullDescription: 'La Celebracion Colectiva es un momento de encuentro y festejo. Bengalas, aplausos, musica y el calor de toda la comunidad reunida en el patio de El Bondi.',
    image: '/images/evento-fiesta.jpg',
    date: '24 Mar 2026',
    time: '15:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-03-24',
    contact: 'mailcolectivocultural@gmail.com',
  },
]

export const workshops: EventItem[] = [
  {
    slug: 'acrobacias-suelo',
    title: 'Acrobacias de Suelo',
    description:
      'Taller de flexibilidad, fuerza y figuras acrobaticas. Desarrollo fisico y expresion corporal.',
    fullDescription:
      'El taller de Acrobacias de Suelo ofrece formacion en tecnicas de piso, flexibilidad y figuras acrobaticas para todos los niveles.',
    image: '/images/taller-acrobacia.jpg',
    date: 'Lunes y Miercoles',
    time: '18:00 hs',
    category: 'taller',
    location: 'Sala de circo - El Bondi',
    price: 'Cuota mensual: $8000 / Clase suelta: $3000',
    maxParticipants: 15,
    calendarDate: '2026-01-19',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Lucia Fernandez',
      avatar: '/images/taller-acrobacia.jpg',
      bio: 'Artista de circo con mas de 10 anos de experiencia en acrobacia contemporanea.',
    },
  },
  {
    slug: 'guitarra-y-canto',
    title: 'Guitarra y Canto',
    description:
      'Taller de guitarra criolla y canto popular. Aprende a tocar y cantar tus canciones favoritas.',
    fullDescription:
      'El taller de Guitarra y Canto es un espacio para aprender los acordes basicos y tecnicas de voz para interpretar musica popular argentina y latinoamericana.',
    image: '/images/taller-guitarra.jpg',
    date: 'Martes y Jueves',
    time: '19:00 hs',
    category: 'taller',
    location: 'Sala de musica - El Bondi',
    price: 'Cuota mensual: $7000 / Clase suelta: $2500',
    maxParticipants: 12,
    calendarDate: '2026-01-20',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Martin Rodriguez',
      avatar: '/images/taller-guitarra.jpg',
      bio: 'Musico y docente con 15 anos de trayectoria en la escena independiente.',
    },
  },
  {
    slug: 'danza-contemporanea',
    title: 'Danza Contemporanea',
    description:
      'Clases de danza contemporanea para todos los niveles. Expresion corporal y creatividad en movimiento.',
    fullDescription:
      'Las clases de Danza Contemporanea proponen un viaje por el movimiento libre y consciente.',
    image: '/images/taller-danza.jpg',
    date: 'Miercoles y Viernes',
    time: '17:00 hs',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Cuota mensual: $7000 / Clase suelta: $2500',
    maxParticipants: 20,
    calendarDate: '2026-01-21',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Camila Sosa',
      avatar: '/images/taller-danza.jpg',
      bio: 'Bailarina y coreografa contemporanea. Egresada del IUNA con especializacion en danza-teatro.',
    },
  },
  {
    slug: 'malabares-circo',
    title: 'Malabares y Circo',
    description:
      'Taller de malabares, equilibrio y tecnicas circenses. Para principiantes y avanzados.',
    fullDescription:
      'El taller de Malabares y Circo ensena tecnicas de malabarismo con pelotas, clavas y aros, ademas de equilibrio y expresion escenica.',
    image: '/images/taller-malabares.jpg',
    date: 'Sabados',
    time: '15:00 hs',
    category: 'taller',
    location: 'Patio de circo - El Bondi',
    price: 'Cuota mensual: $6000',
    maxParticipants: 15,
    calendarDate: '2026-01-24',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Diego Alvarez',
      avatar: '/images/taller-malabares.jpg',
      bio: 'Artista de circo y malabarista profesional con experiencia en festivales internacionales.',
    },
  },
  {
    slug: 'artes-del-fuego',
    title: 'Artes del Fuego',
    description: 'Taller de manipulacion de fuego y tecnicas de seguridad para performers.',
    fullDescription: 'Aprende las tecnicas basicas de manipulacion de fuego con antorchas, bastones y abanicos. El taller incluye formacion en seguridad y protocolos de emergencia.',
    image: '/images/taller-fuego.jpg',
    date: 'Martes',
    time: '20:00 hs',
    category: 'taller',
    location: 'Patio trasero - El Bondi',
    price: 'Cuota mensual: $9000 (materiales incluidos)',
    maxParticipants: 8,
    calendarDate: '2026-02-03',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Ana Gutierrez',
      avatar: '/images/taller-fuego.jpg',
      bio: 'Performer de fuego con 8 anos de experiencia en espectaculos y festivales.',
    },
  },
  {
    slug: 'acrobacias-duo',
    title: 'Acrobacias en Duo',
    description: 'Taller de acrobacias en pareja. Porteos, figuras y confianza corporal.',
    fullDescription: 'El taller de Acrobacias en Duo trabaja la confianza, el equilibrio y la comunicacion corporal entre dos personas para crear figuras acrobaticas.',
    image: '/images/taller-acrobacias-duo.jpg',
    date: 'Sabados',
    time: '10:00 hs',
    category: 'taller',
    location: 'Sala de circo - El Bondi',
    price: 'Cuota mensual: $8000',
    maxParticipants: 16,
    calendarDate: '2026-02-07',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Roberto y Paula',
      avatar: '/images/taller-acrobacias-duo.jpg',
      bio: 'Duo acrobatico profesional con 10 anos de trayectoria en circo contemporaneo.',
    },
  },
  {
    slug: 'hula-hoop',
    title: 'Hula Hoop',
    description: 'Taller de hula hoop para todas las edades. Coordinacion, ritmo y diversion.',
    fullDescription: 'Aprende a mover el hula hoop en cintura, brazos, piernas y cuello. El taller incluye coreografias simples y tecnicas de manipulacion con multiples aros.',
    image: '/images/taller-hula.jpg',
    date: 'Jueves',
    time: '18:00 hs',
    category: 'taller',
    location: 'Salon principal - El Bondi',
    price: 'Cuota mensual: $5500 (aros disponibles)',
    maxParticipants: 20,
    calendarDate: '2026-02-05',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Paula Mendez',
      avatar: '/images/taller-hula.jpg',
      bio: 'Artista de circo especializada en hula hoop y manipulacion de objetos.',
    },
  },
  {
    slug: 'guitarra-electrica',
    title: 'Guitarra Electrica',
    description: 'Taller de guitarra electrica y rock. Tecnicas de pua, acordes y solos.',
    fullDescription: 'El taller de Guitarra Electrica ensena las bases del rock, blues y otros generos electricos. Aprende tecnicas de pua, power chords y solos basicos.',
    image: '/images/taller-musica.jpg',
    date: 'Viernes',
    time: '19:00 hs',
    category: 'taller',
    location: 'Sala de ensayo - El Bondi',
    price: 'Cuota mensual: $7500',
    maxParticipants: 10,
    calendarDate: '2026-02-06',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Javier Torres',
      avatar: '/images/taller-musica.jpg',
      bio: 'Guitarrista profesional con 12 anos de experiencia en bandas de rock y blues.',
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
