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
    image: '/images/event-1.jpg',
    date: '15 Ene 2026',
    time: '20:00 hs',
    category: 'evento',
    location: 'Salon principal - El Bondi',
    price: 'Entrada general: $2500 / Menores de 12: gratis',
    calendarDate: '2026-01-15',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Compania El Bondi',
      avatar: '/images/event-1.jpg',
      bio: 'La compania artistica de El Bondi reune a performers de circo, danza y teatro de la zona norte del Gran Buenos Aires.',
    },
  },
  {
    slug: 'festival-de-musica',
    title: 'Festival de Musica',
    description:
      'Bandas locales e invitados especiales. Una celebracion de la musica independiente regional.',
    fullDescription:
      'El Festival de Musica de El Bondi es una celebracion de la escena musical independiente. Durante toda la jornada, bandas locales y artistas invitados comparten escenario.',
    image: '/images/event-2.jpg',
    date: '22 Ene 2026',
    time: '19:00 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'Entrada a la gorra (colaboracion voluntaria)',
    calendarDate: '2026-01-22',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Coordinacion Musical El Bondi',
      avatar: '/images/event-2.jpg',
      bio: 'El area de musica de El Bondi gestiona la programacion musical del centro cultural.',
    },
  },
  {
    slug: 'expo-arte-urbano',
    title: 'Expo Arte Urbano',
    description:
      'Exposicion colectiva de artistas urbanos. Graffiti, murales y arte contemporaneo en la comunidad.',
    fullDescription:
      'La Expo Arte Urbano reune a los mejores artistas urbanos de la region en una muestra colectiva que transforma el espacio de El Bondi en una galeria a cielo abierto.',
    image: '/images/event-3.jpg',
    date: '29 Ene 2026',
    time: '17:00 hs',
    category: 'evento',
    location: 'Galeria y patio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-01-29',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Colectivo Muralistas del Sur',
      avatar: '/images/event-3.jpg',
      bio: 'Un colectivo de artistas urbanos que trabaja en la intervencion de espacios publicos con arte mural y graffiti.',
    },
  },
  {
    slug: 'a-la-canasta',
    title: 'A la Canasta!',
    description:
      'Evento comunitario de intercambio y feria. Comida casera, artesanias y juegos para toda la familia.',
    fullDescription:
      'A la Canasta es el evento comunitario mas esperado de El Bondi. Una jornada de intercambio donde vecinos y vecinas se reunen para compartir productos caseros, artesanias, ropa y mas.',
    image: '/images/event-4.jpg',
    date: '5 Feb 2026',
    time: '14:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'cine-bajo-las-estrellas',
    title: 'Cine Bajo las Estrellas',
    description: 'Proyeccion de cine al aire libre para toda la familia con peliculas argentinas independientes.',
    fullDescription: 'Todos los viernes de verano, El Bondi se transforma en una sala de cine al aire libre. Proyectamos peliculas argentinas independientes, cortometrajes locales y documentales comunitarios.',
    image: '/images/event-1.jpg',
    date: '12 Feb 2026',
    time: '21:00 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-12',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'feria-de-economia-social',
    title: 'Feria de Economia Social',
    description: 'Emprendedores locales con productos artesanales, comida casera y economia solidaria.',
    fullDescription: 'La Feria de Economia Social reune a emprendedores y productores del barrio. Encontra productos artesanales, cosmetica natural, ropa reciclada, comida casera y mucho mas.',
    image: '/images/event-3.jpg',
    date: '19 Feb 2026',
    time: '11:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-19',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'jornada-muralismo',
    title: 'Jornada de Muralismo',
    description: 'Pintada colectiva de murales comunitarios. Veni con tu idea y dejala en las paredes del barrio.',
    fullDescription: 'Una jornada completa dedicada al muralismo donde artistas y vecinos pintan juntos las paredes del centro cultural.',
    image: '/images/event-2.jpg',
    date: '26 Feb 2026',
    time: '10:00 hs',
    category: 'evento',
    location: 'Fachada y muros - El Bondi',
    price: 'Entrada libre y gratuita',
    calendarDate: '2026-02-26',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'noche-de-poesia',
    title: 'Noche de Poesia',
    description: 'Microfono abierto de poesia y spoken word. Comparti tus textos o veni a escuchar.',
    fullDescription: 'Un espacio intimo donde la palabra toma protagonismo. Poetas, escritores y cualquier persona que quiera compartir sus textos tiene el microfono abierto.',
    image: '/images/event-4.jpg',
    date: '5 Mar 2026',
    time: '20:30 hs',
    category: 'evento',
    location: 'Salon principal - El Bondi',
    price: 'A la gorra',
    calendarDate: '2026-03-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas',
    title: 'Variete Bajo las Estrellas',
    description: 'El clasico espectaculo de variete ahora en version al aire libre con artistas invitados especiales.',
    fullDescription: 'Una edicion especial del Variete al aire libre, con artistas invitados de todo el pais. Circo, humor, musica y magia bajo el cielo estrellado de Maschwitz.',
    image: '/images/event-1.jpg',
    date: '14 Mar 2026',
    time: '20:00 hs',
    category: 'evento',
    location: 'Escenario al aire libre - El Bondi',
    price: 'Entrada general: $3000',
    calendarDate: '2026-03-14',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'festival-dia-de-la-memoria',
    title: 'Festival Dia de la Memoria',
    description: 'Jornada cultural por el Dia de la Memoria con musica, teatro y actividades reflexivas.',
    fullDescription: 'El Bondi conmemora el Dia de la Memoria con una jornada cultural que incluye espectaculos de musica y teatro, proyeccion de documentales, charlas y actividades para todas las edades.',
    image: '/images/event-2.jpg',
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
