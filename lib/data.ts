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
    slug: 'acrobacias-aereas',
    title: 'Acrobacias Aereas',
    description:
      'Taller de telas y trapecio para principiantes y avanzados. Desarrollo fisico y artistico.',
    fullDescription:
      'El taller de Acrobacias Aereas ofrece formacion en telas, trapecio y aro aereo para todos los niveles.',
    image: '/images/workshop-1.jpg',
    date: 'Lunes y Miercoles',
    time: '18:00 hs',
    category: 'taller',
    location: 'Sala de aereos - El Bondi',
    price: 'Cuota mensual: $8000 / Clase suelta: $3000',
    maxParticipants: 15,
    calendarDate: '2026-01-19',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Lucia Fernandez',
      avatar: '/images/workshop-1.jpg',
      bio: 'Artista aerea con mas de 10 anos de experiencia en circo contemporaneo.',
    },
  },
  {
    slug: 'teatro-comunitario',
    title: 'Teatro Comunitario',
    description:
      'Espacio de formacion teatral abierto a la comunidad. Exploracion escenica y trabajo grupal.',
    fullDescription:
      'El taller de Teatro Comunitario es un espacio de formacion escenica abierto a personas de todas las edades y sin experiencia previa.',
    image: '/images/workshop-2.jpg',
    date: 'Martes y Jueves',
    time: '19:00 hs',
    category: 'taller',
    location: 'Sala de teatro - El Bondi',
    price: 'A la gorra / Colaboracion voluntaria',
    maxParticipants: 25,
    calendarDate: '2026-01-20',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Martin Rodriguez',
      avatar: '/images/workshop-2.jpg',
      bio: 'Director teatral y docente con 15 anos de trayectoria en teatro comunitario.',
    },
  },
  {
    slug: 'danza-contemporanea',
    title: 'Danza Contemporanea',
    description:
      'Clases de danza contemporanea para todos los niveles. Expresion corporal y creatividad en movimiento.',
    fullDescription:
      'Las clases de Danza Contemporanea proponen un viaje por el movimiento libre y consciente.',
    image: '/images/workshop-3.jpg',
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
      avatar: '/images/workshop-3.jpg',
      bio: 'Bailarina y coreografa contemporanea. Egresada del IUNA con especializacion en danza-teatro.',
    },
  },
  {
    slug: 'produccion-musical',
    title: 'Produccion Musical',
    description:
      'Taller de produccion y grabacion musical. Aprendizaje de herramientas de audio y composicion.',
    fullDescription:
      'El taller de Produccion Musical brinda herramientas practicas para la grabacion, mezcla y produccion de musica.',
    image: '/images/workshop-4.jpg',
    date: 'Sabados',
    time: '15:00 hs',
    category: 'taller',
    location: 'Estudio de grabacion - El Bondi',
    price: 'Cuota mensual: $9000',
    maxParticipants: 10,
    calendarDate: '2026-01-24',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Diego Alvarez',
      avatar: '/images/workshop-4.jpg',
      bio: 'Productor musical y tecnico de sonido con experiencia en la escena independiente.',
    },
  },
  {
    slug: 'fotografia-comunitaria',
    title: 'Fotografia Comunitaria',
    description: 'Taller de fotografia documental para registrar la vida del barrio con tu celular o camara.',
    fullDescription: 'Aprende tecnicas de fotografia documental y retrato comunitario. El taller combina teoria y practica recorriendo el barrio y capturando historias.',
    image: '/images/workshop-2.jpg',
    date: 'Martes',
    time: '16:00 hs',
    category: 'taller',
    location: 'Aula 2 - El Bondi',
    price: 'Cuota mensual: $6000',
    maxParticipants: 20,
    calendarDate: '2026-02-03',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Ana Gutierrez',
      avatar: '/images/workshop-2.jpg',
      bio: 'Fotografa documental con 8 anos de experiencia en proyectos comunitarios.',
    },
  },
  {
    slug: 'huerta-organica',
    title: 'Huerta Organica',
    description: 'Taller de huerta agroecologica. Aprende a cultivar tus propios alimentos en casa.',
    fullDescription: 'El taller de Huerta Organica ensena tecnicas de cultivo agroecologico adaptadas a espacios pequenos.',
    image: '/images/workshop-3.jpg',
    date: 'Sabados',
    time: '10:00 hs',
    category: 'taller',
    location: 'Huerta comunitaria - El Bondi',
    price: 'Cuota mensual: $5000',
    maxParticipants: 12,
    calendarDate: '2026-02-07',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Roberto Paz',
      avatar: '/images/workshop-3.jpg',
      bio: 'Ingeniero agronomo especializado en agroecologia urbana.',
    },
  },
  {
    slug: 'serigrafia-artistica',
    title: 'Serigrafia Artistica',
    description: 'Taller de serigrafia para estampar remeras, bolsas y afiches con disenos propios.',
    fullDescription: 'Aprende la tecnica de serigrafia desde cero. Disena tus propias plantillas, prepara los bastidores y estampa sobre diferentes superficies.',
    image: '/images/workshop-4.jpg',
    date: 'Jueves',
    time: '18:00 hs',
    category: 'taller',
    location: 'Taller grafico - El Bondi',
    price: 'Cuota mensual: $7500 (materiales incluidos)',
    maxParticipants: 10,
    calendarDate: '2026-02-05',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Paula Mendez',
      avatar: '/images/workshop-4.jpg',
      bio: 'Artista visual y serigrafista con taller propio. Dirige el area de produccion grafica de El Bondi.',
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
