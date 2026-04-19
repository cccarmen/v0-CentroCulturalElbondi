export type RadioDay =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo'

export const RADIO_DAYS: { value: RadioDay; label: string; short: string }[] = [
  { value: 'lunes', label: 'Lunes', short: 'Lun' },
  { value: 'martes', label: 'Martes', short: 'Mar' },
  { value: 'miercoles', label: 'Miercoles', short: 'Mie' },
  { value: 'jueves', label: 'Jueves', short: 'Jue' },
  { value: 'viernes', label: 'Viernes', short: 'Vie' },
  { value: 'sabado', label: 'Sabado', short: 'Sab' },
  { value: 'domingo', label: 'Domingo', short: 'Dom' },
]

export type RadioCategory =
  | 'musica'
  | 'informativo'
  | 'cultural'
  | 'debate'
  | 'infantil'
  | 'deportes'

export const RADIO_CATEGORIES: { value: RadioCategory; label: string }[] = [
  { value: 'musica', label: 'Musica' },
  { value: 'informativo', label: 'Informativo' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'debate', label: 'Debate' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'deportes', label: 'Deportes' },
]

export interface RadioShow {
  id: string
  title: string
  description: string
  hosts: string
  days: RadioDay[]
  startTime: string // formato 24h "HH:MM"
  endTime: string // formato 24h "HH:MM"
  category: RadioCategory
  isLive?: boolean
}

export const radioShows: RadioShow[] = [
  // Lunes a Viernes - Programacion diaria
  {
    id: 'despertador-comunitario',
    title: 'Despertador Comunitario',
    description: 'Noticias locales, agenda cultural y musica para arrancar el dia.',
    hosts: 'Carolina Pereyra y Martin Silva',
    days: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    startTime: '07:00',
    endTime: '09:00',
    category: 'informativo',
  },
  {
    id: 'mesa-de-debate',
    title: 'Mesa de Debate',
    description: 'Analisis y debate de los temas que atraviesan a nuestra comunidad.',
    hosts: 'Panel rotativo de vecinos y vecinas',
    days: ['lunes', 'miercoles', 'viernes'],
    startTime: '09:00',
    endTime: '10:30',
    category: 'debate',
  },
  {
    id: 'ritmos-latinoamericanos',
    title: 'Ritmos Latinoamericanos',
    description: 'Un recorrido por la musica popular de toda Latinoamerica.',
    hosts: 'Gabriel Morales',
    days: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    startTime: '10:30',
    endTime: '12:00',
    category: 'musica',
  },
  {
    id: 'cultura-en-movimiento',
    title: 'Cultura en Movimiento',
    description: 'Entrevistas con artistas locales y agenda cultural de la semana.',
    hosts: 'Lucia Fernandez',
    days: ['martes', 'jueves'],
    startTime: '12:00',
    endTime: '13:30',
    category: 'cultural',
  },
  {
    id: 'noticiero-del-mediodia',
    title: 'Noticiero del Mediodia',
    description: 'Informativo comunitario con las noticias mas importantes del dia.',
    hosts: 'Redaccion Radio Activa',
    days: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    startTime: '13:30',
    endTime: '14:30',
    category: 'informativo',
  },
  {
    id: 'folklore-al-atardecer',
    title: 'Folklore al Atardecer',
    description: 'Chacareras, zambas y los clasicos del folklore argentino.',
    hosts: 'Don Julio Martinez',
    days: ['lunes', 'miercoles', 'viernes'],
    startTime: '14:30',
    endTime: '16:00',
    category: 'musica',
  },
  {
    id: 'voces-del-barrio',
    title: 'Voces del Barrio',
    description: 'Historias y testimonios de los vecinos de Maschwitz y la zona.',
    hosts: 'Sofia Ramirez',
    days: ['martes', 'jueves'],
    startTime: '14:30',
    endTime: '16:00',
    category: 'cultural',
  },
  {
    id: 'el-patio-de-los-pibes',
    title: 'El Patio de los Pibes',
    description: 'Programa infantil con cuentos, juegos y musica para la infancia.',
    hosts: 'Paula Mendez y Diego Alvarez',
    days: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    startTime: '16:00',
    endTime: '17:00',
    category: 'infantil',
  },
  {
    id: 'rock-nacional',
    title: 'Rock Nacional',
    description: 'Clasicos del rock argentino y las nuevas bandas del under.',
    hosts: 'Javier Torres',
    days: ['lunes', 'miercoles'],
    startTime: '17:00',
    endTime: '19:00',
    category: 'musica',
  },
  {
    id: 'tarde-de-jazz',
    title: 'Tarde de Jazz',
    description: 'Jazz, blues y soul. Clasicos y contemporaneos.',
    hosts: 'Ana Gutierrez',
    days: ['martes', 'jueves'],
    startTime: '17:00',
    endTime: '19:00',
    category: 'musica',
  },
  {
    id: 'temas-comunitarios',
    title: 'Temas Comunitarios',
    description: 'Entrevistas y reflexiones sobre la vida en comunidad.',
    hosts: 'Colectivo El Bondi',
    days: ['viernes'],
    startTime: '17:00',
    endTime: '19:00',
    category: 'debate',
  },
  {
    id: 'noticiero-de-la-tarde',
    title: 'Noticiero de la Tarde',
    description: 'Cierre informativo del dia con el resumen de noticias.',
    hosts: 'Redaccion Radio Activa',
    days: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    startTime: '19:00',
    endTime: '20:00',
    category: 'informativo',
  },
  {
    id: 'concierto-en-vivo',
    title: 'Concierto en Vivo',
    description: 'Bandas locales en vivo desde el estudio de Radio Activa.',
    hosts: 'Coordinacion Musical El Bondi',
    days: ['miercoles'],
    startTime: '20:00',
    endTime: '22:00',
    category: 'musica',
    isLive: true,
  },
  {
    id: 'cumbia-de-la-buena',
    title: 'Cumbia de la Buena',
    description: 'Cumbia santafesina, peruana y latina para alegrar la noche.',
    hosts: 'Roberto Ramos',
    days: ['viernes'],
    startTime: '20:00',
    endTime: '22:00',
    category: 'musica',
  },
  // Sabados
  {
    id: 'sabado-cultural',
    title: 'Sabado Cultural',
    description: 'Agenda cultural del fin de semana y recomendados del centro cultural.',
    hosts: 'Camila Sosa',
    days: ['sabado'],
    startTime: '10:00',
    endTime: '12:00',
    category: 'cultural',
  },
  {
    id: 'futbol-comunitario',
    title: 'Futbol Comunitario',
    description: 'Previa, analisis y transmision de los partidos del barrio.',
    hosts: 'Equipo Deportivo El Bondi',
    days: ['sabado'],
    startTime: '12:00',
    endTime: '14:00',
    category: 'deportes',
  },
  {
    id: 'tarde-de-tango',
    title: 'Tarde de Tango',
    description: 'Los clasicos del tango y la milonga ciudadana.',
    hosts: 'Don Julio Martinez',
    days: ['sabado'],
    startTime: '14:00',
    endTime: '16:00',
    category: 'musica',
  },
  {
    id: 'musica-del-mundo',
    title: 'Musica del Mundo',
    description: 'Un viaje sonoro por distintas culturas y continentes.',
    hosts: 'Gabriel Morales',
    days: ['sabado'],
    startTime: '16:00',
    endTime: '18:00',
    category: 'musica',
  },
  {
    id: 'noche-de-variete',
    title: 'Noche de Variete',
    description: 'Transmision especial desde los eventos del centro cultural.',
    hosts: 'Compania El Bondi',
    days: ['sabado'],
    startTime: '20:00',
    endTime: '23:00',
    category: 'cultural',
    isLive: true,
  },
  // Domingos
  {
    id: 'domingo-en-familia',
    title: 'Domingo en Familia',
    description: 'Programa familiar con musica, juegos y actividades para todas las edades.',
    hosts: 'Paula Mendez',
    days: ['domingo'],
    startTime: '10:00',
    endTime: '12:00',
    category: 'infantil',
  },
  {
    id: 'mate-y-folklore',
    title: 'Mate y Folklore',
    description: 'La musica de raiz para compartir la sobremesa del domingo.',
    hosts: 'Don Julio Martinez',
    days: ['domingo'],
    startTime: '13:00',
    endTime: '16:00',
    category: 'musica',
  },
  {
    id: 'cine-y-literatura',
    title: 'Cine y Literatura',
    description: 'Reseñas y charlas sobre libros, peliculas y arte.',
    hosts: 'Martin Rodriguez',
    days: ['domingo'],
    startTime: '16:00',
    endTime: '18:00',
    category: 'cultural',
  },
  {
    id: 'resumen-deportivo',
    title: 'Resumen Deportivo',
    description: 'Todo el deporte del fin de semana con analisis y estadisticas.',
    hosts: 'Equipo Deportivo El Bondi',
    days: ['domingo'],
    startTime: '18:00',
    endTime: '20:00',
    category: 'deportes',
  },
]

// Helpers
export function getShowsByDay(day: RadioDay): RadioShow[] {
  return radioShows
    .filter((show) => show.days.includes(day))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

export function getShowsByCategory(category: RadioCategory | 'todos'): RadioShow[] {
  if (category === 'todos') return radioShows
  return radioShows.filter((show) => show.category === category)
}

export function getCategoryCount(category: RadioCategory | 'todos'): number {
  if (category === 'todos') return radioShows.length
  return radioShows.filter((show) => show.category === category).length
}

// Dia actual basado en la zona horaria del navegador
export function getCurrentDay(): RadioDay {
  const days: RadioDay[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
  return days[new Date().getDay()]
}
