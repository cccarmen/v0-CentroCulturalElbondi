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
      'Veni a disfrutar de una noche magica con los mejores artistas del circuito independiente. Un espectaculo que reune circo, danza, comedia stand-up y musica en vivo en un formato de variete que promete sorprender a toda la familia. Cada funcion trae nuevos artistas invitados y numeros exclusivos. La Noche de Variete es uno de los eventos mas emblematicos de El Bondi, donde la comunidad se reune para celebrar el arte en todas sus formas. No te pierdas esta experiencia unica que combina talento local con propuestas artisticas innovadoras.',
    image: '/images/event-1.jpg',
    date: '15 Ene 2026',
    time: '20:00 hs',
    category: 'evento',
    location: 'Salon principal - El Bondi',
    price: 'Entrada general: $2500 / Menores de 12: gratis',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Compania El Bondi',
      avatar: '/images/event-1.jpg',
      bio: 'La compania artistica de El Bondi reune a performers de circo, danza y teatro de la zona sur del Gran Buenos Aires.',
    },
  },
  {
    slug: 'festival-de-musica',
    title: 'Festival de Musica',
    description:
      'Bandas locales e invitados especiales. Una celebracion de la musica independiente regional.',
    fullDescription:
      'El Festival de Musica de El Bondi es una celebracion de la escena musical independiente del sur del conurbano. Durante toda la jornada, bandas locales y artistas invitados comparten escenario en un evento que promueve la cultura musical de la region. Con generos que van desde el rock y el folklore hasta la cumbia y el rap, el festival ofrece una experiencia sonora diversa y vibrante. Ademas de musica en vivo, el festival cuenta con puestos de comida casera, feria de discos y merchandising de las bandas participantes.',
    image: '/images/event-2.jpg',
    date: '22 Ene 2026',
    time: '19:00 hs',
    category: 'evento',
    location: 'Patio al aire libre - El Bondi',
    price: 'Entrada a la gorra (colaboracion voluntaria)',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Coordinacion Musical El Bondi',
      avatar: '/images/event-2.jpg',
      bio: 'El area de musica de El Bondi gestiona la programacion musical del centro cultural y promueve a los artistas emergentes de la comunidad.',
    },
  },
  {
    slug: 'expo-arte-urbano',
    title: 'Expo Arte Urbano',
    description:
      'Exposicion colectiva de artistas urbanos. Graffiti, murales y arte contemporaneo en la comunidad.',
    fullDescription:
      'La Expo Arte Urbano reune a los mejores artistas urbanos de la region en una muestra colectiva que transforma el espacio de El Bondi en una galeria a cielo abierto. Graffiti, murales, instalaciones y arte contemporaneo se combinan en una propuesta que celebra la expresion artistica callejera. Los visitantes podran recorrer las obras, participar en charlas con los artistas y sumarse a talleres express de tecnicas urbanas. Un evento que conecta el arte con la calle y la comunidad.',
    image: '/images/event-3.jpg',
    date: '29 Ene 2026',
    time: '17:00 hs',
    category: 'evento',
    location: 'Galeria y patio - El Bondi',
    price: 'Entrada libre y gratuita',
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Colectivo Muralistas del Sur',
      avatar: '/images/event-3.jpg',
      bio: 'Un colectivo de artistas urbanos que trabaja en la intervencion de espacios publicos con arte mural y graffiti en el conurbano sur.',
    },
  },
  {
    slug: 'a-la-canasta',
    title: 'A la Canasta!',
    description:
      'Evento comunitario de intercambio y feria. Comida casera, artesanias y juegos para toda la familia.',
    fullDescription:
      'A la Canasta es el evento comunitario mas esperado de El Bondi. Una jornada de intercambio donde vecinos y vecinas se reunen para compartir productos caseros, artesanias, ropa y mas. La feria incluye puestos de comida casera, espacio de juegos para ninos, musica en vivo y actividades recreativas para toda la familia. Un espacio de encuentro que fortalece los lazos comunitarios y promueve la economia social y solidaria del barrio.',
    image: '/images/event-4.jpg',
    date: '5 Feb 2026',
    time: '14:00 hs',
    category: 'evento',
    location: 'Todo el predio - El Bondi',
    price: 'Entrada libre y gratuita',
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
      'El taller de Acrobacias Aereas ofrece formacion en telas, trapecio y aro aereo para todos los niveles. Desde principiantes que dan sus primeros pasos en las alturas hasta avanzados que perfeccionan sus rutinas, el taller propone un espacio de desarrollo fisico, artistico y personal. Las clases incluyen entrada en calor, tecnica especifica, creacion de secuencias y elongacion. El taller culmina cada semestre con una muestra abierta donde los estudiantes presentan sus rutinas al publico.',
    image: '/images/workshop-1.jpg',
    date: 'Lunes y Miercoles',
    time: '18:00 hs',
    category: 'taller',
    location: 'Sala de aereos - El Bondi',
    price: 'Cuota mensual: $8000 / Clase suelta: $3000',
    maxParticipants: 15,
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Lucia Fernandez',
      avatar: '/images/workshop-1.jpg',
      bio: 'Artista aerea con mas de 10 anos de experiencia en circo contemporaneo. Formada en la Escuela de Circo Criollo y especialista en telas y trapecio.',
    },
  },
  {
    slug: 'teatro-comunitario',
    title: 'Teatro Comunitario',
    description:
      'Espacio de formacion teatral abierto a la comunidad. Exploracion escenica y trabajo grupal.',
    fullDescription:
      'El taller de Teatro Comunitario es un espacio de formacion escenica abierto a personas de todas las edades y sin experiencia previa. A traves de juegos teatrales, improvisacion, trabajo corporal y vocal, los participantes exploran sus capacidades expresivas y construyen colectivamente piezas teatrales que reflejan las historias y vivencias de la comunidad. El taller promueve el encuentro, la creatividad y el pensamiento critico a traves del arte teatral.',
    image: '/images/workshop-2.jpg',
    date: 'Martes y Jueves',
    time: '19:00 hs',
    category: 'taller',
    location: 'Sala de teatro - El Bondi',
    price: 'A la gorra / Colaboracion voluntaria',
    maxParticipants: 25,
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Martin Rodriguez',
      avatar: '/images/workshop-2.jpg',
      bio: 'Director teatral y docente con 15 anos de trayectoria en teatro comunitario. Fundador del grupo de teatro barrial Los del Sur.',
    },
  },
  {
    slug: 'danza-contemporanea',
    title: 'Danza Contemporanea',
    description:
      'Clases de danza contemporanea para todos los niveles. Expresion corporal y creatividad en movimiento.',
    fullDescription:
      'Las clases de Danza Contemporanea proponen un viaje por el movimiento libre y consciente. Trabajando desde la expresion corporal, la improvisacion y la tecnica contemporanea, el taller invita a explorar las posibilidades del cuerpo como herramienta artistica. Apto para todos los niveles, las clases combinan calentamiento, tecnica de piso, composicion coreografica y relajacion. Un espacio para conectar con el cuerpo, la musica y la creatividad en un ambiente de respeto y libertad.',
    image: '/images/workshop-3.jpg',
    date: 'Miercoles y Viernes',
    time: '17:00 hs',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Cuota mensual: $7000 / Clase suelta: $2500',
    maxParticipants: 20,
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Camila Sosa',
      avatar: '/images/workshop-3.jpg',
      bio: 'Bailarina y coreografa contemporanea. Egresada del IUNA con especializacion en danza-teatro. Docente desde 2015 en espacios comunitarios.',
    },
  },
  {
    slug: 'produccion-musical',
    title: 'Produccion Musical',
    description:
      'Taller de produccion y grabacion musical. Aprendizaje de herramientas de audio y composicion.',
    fullDescription:
      'El taller de Produccion Musical brinda herramientas practicas para la grabacion, mezcla y produccion de musica. Los participantes aprenden a utilizar software de audio profesional (DAWs), tecnicas de microfoneo, mezcla y masterizacion basica. El taller incluye sesiones practicas de grabacion en el estudio de El Bondi y cada alumno finaliza el curso con al menos una produccion propia. Ideal para musicos, cantantes y cualquier persona interesada en el mundo de la produccion sonora.',
    image: '/images/workshop-4.jpg',
    date: 'Sabados',
    time: '15:00 hs',
    category: 'taller',
    location: 'Estudio de grabacion - El Bondi',
    price: 'Cuota mensual: $9000',
    maxParticipants: 10,
    contact: 'mailcolectivocultural@gmail.com',
    instructor: {
      name: 'Diego Alvarez',
      avatar: '/images/workshop-4.jpg',
      bio: 'Productor musical y tecnico de sonido con experiencia en la escena independiente. Trabajo con bandas de la zona sur y dirige el estudio de grabacion de El Bondi.',
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
