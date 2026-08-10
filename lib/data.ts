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
    slug: 'cachengue-y-tambor',
    title: 'Cachengue y Tambor',
    description:
      'Noche de cachengue y tambores con Tremendo Solcito y DJ Rancho. Musica en vivo para bailar.',
    fullDescription:
      'Cachengue y Tambor abre la agenda de septiembre en El Bondi con Tremendo Solcito y DJ Rancho. Una noche de tambores, ritmo y musica para poner el cuerpo en movimiento y encontrarnos en comunidad.',
    image: '/images/evento-fiesta.jpg',
    date: '5 Sep 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'externa',
    location: 'El Bondi',
    price: 'Contribución sugerida',
    calendarDate: '2026-09-05',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'variete-bajo-las-estrellas-septiembre',
    title: 'Varieté Bajo las Estrellas',
    description:
      'El clasico varieté del Bondi: circo, musica, humor, teatro y variedades para toda la familia.',
    fullDescription:
      'Varieté Bajo las Estrellas es una de las producciones mas queridas del Colectivo Cultural. Circo, musica, humor, teatro y variedades se combinan en una noche a cielo abierto para toda la familia, donde los artistas del Bondi e invitados comparten escenario con la comunidad. Temporada 12.',
    image: '/images/flyer-variete-septiembre.jpg',
    date: '12 Sep 2026',
    time: '21:00 hs',
    category: 'evento',
    eventType: 'variedades',
    production: 'bondi',
    location: 'Patio - El Bondi',
    price: 'Contribución sugerida',
    calendarDate: '2026-09-12',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'festival-cubo-estudio',
    title: 'Festival Cubo Estudio',
    description:
      'Festival de musica con propuestas artisticas diversas para toda la familia por la tarde.',
    fullDescription:
      'El Festival Cubo Estudio trae una tarde de musica y variedades para toda la familia. Una propuesta que reune distintas expresiones artisticas en el espacio recuperado del Colectivo Cultural.',
    image: '/images/evento-musica.jpg',
    date: '19 Sep 2026',
    time: '16:00 hs',
    category: 'evento',
    eventType: 'musica',
    production: 'externa',
    location: 'El Bondi',
    price: 'Contribución sugerida',
    calendarDate: '2026-09-19',
    contact: 'mailcolectivocultural@gmail.com',
  },
  {
    slug: 'teatro-carga',
    title: 'Teatro: Carga',
    description:
      'Obra de teatro de Evangelina Ferreiro. Una propuesta escenica potente para cerrar septiembre.',
    fullDescription:
      'Carga, de Evangelina Ferreiro, llega al escenario de El Bondi. Una obra de teatro que forma parte de la programacion de producciones externas que reciben nuestro espacio, cerrando el ciclo de septiembre con la fuerza de la escena independiente.',
    image: '/images/evento-variete.jpg',
    date: '26 Sep 2026',
    time: '20:00 hs',
    category: 'evento',
    eventType: 'teatro',
    production: 'externa',
    location: 'Salon principal - El Bondi',
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
    price: 'Contribución sugerida',
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
  // ----------------------------- MARTES -----------------------------
  {
    slug: 'fitness-dance',
    title: 'Fitness Dance',
    description:
      'Clase de baile y entrenamiento aerobico para mover el cuerpo, soltar y divertirse al ritmo de la musica.',
    fullDescription:
      'Fitness Dance combina baile y entrenamiento en una clase dinamica y divertida. Trabajamos coordinacion, resistencia y expresion corporal a traves de la danza, en un espacio abierto a todos los niveles. Se dicta los martes y jueves a las 14 hs.',
    image: '/images/taller-danza.jpg',
    date: 'Martes y Jueves',
    time: '14:00 hs',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491154594403',
    instagram: 'https://www.instagram.com/danceconsil',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Sil',
      avatar: '/images/taller-danza.jpg',
      bio: 'Facilita Fitness Dance en El Bondi. Info e inscripciones al 11 5459-4403 o en Instagram como @danceconsil.',
    },
  },
  {
    slug: 'capoeira',
    title: 'Capoeira',
    description:
      'Arte afrobrasilena que integra lucha, danza, musica y acrobacia. Para adolescentes y adultos (+14).',
    fullDescription:
      'La Capoeira es un arte afrobrasileno que combina lucha, danza, musica y juego. En la roda se trabaja la coordinacion, la fuerza y el ritmo, en comunidad. Dirigido a adolescentes y adultos a partir de los 14 anos.',
    image: '/images/workshop-1.jpg',
    date: 'Martes',
    time: '17:00 hs',
    category: 'taller',
    location: 'Salon principal - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491166123008',
    instagram: 'https://www.instagram.com/soso.enmovimento',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Sofia',
      avatar: '/images/workshop-1.jpg',
      bio: 'Facilita el taller de Capoeira en El Bondi. Info e inscripciones al 11 6612-3008 o en Instagram como @soso.enmovimento.',
    },
  },
  {
    slug: 'verticales',
    title: 'Verticales',
    description:
      'Entrenamiento de verticales e invertidas: fuerza, alineacion y equilibrio. Adolescentes y adultos (+14).',
    fullDescription:
      'Taller de Verticales enfocado en el trabajo de invertidas, fuerza, alineacion y equilibrio. Un espacio de entrenamiento progresivo del cuerpo, ligado a las disciplinas de circo y acrobacia, para adolescentes y adultos a partir de los 14 anos.',
    image: '/images/taller-acrobacia.jpg',
    date: 'Martes',
    time: '18:00 hs',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491130082079',
    instagram: 'https://www.instagram.com/camlacat',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Camila',
      avatar: '/images/taller-acrobacia.jpg',
      bio: 'Facilita los talleres de tela, verticales y flexibilidad en El Bondi. Info e inscripciones al 11 3008-2079 o en Instagram como @camlacat.',
    },
  },
  {
    slug: 'astromagias',
    title: 'AstroMagias',
    description:
      'Tarot, astrologia, ritualidad y mundo simbolico. Un aquelarre para vivir la magia, no para aprenderla.',
    fullDescription:
      'Nos encontramos para vivir la magia en Aquelarre (no para aprenderla). Tarot, astrologia, ritualidad y mundo simbolico: un espacio de encuentro donde el proposito se revela desde la magia simple y la tribu. No se requiere experiencia previa y podes sumarte en el momento que lo sientas.',
    image: '/images/taller-astromagias.png',
    date: 'Martes',
    time: '18:30 hs',
    category: 'taller',
    location: 'El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491159523682',
    instagram: 'https://www.instagram.com/blendemagias',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Agos',
      avatar: '/images/taller-astromagias.png',
      bio: 'Facilitadora de AstroMagias. Trabaja el tarot, la astrologia, la ritualidad y el mundo simbolico. Info al 11 5952-3682 o en Instagram como @blendemagias.',
    },
  },
  {
    slug: 'teatro-adultos',
    title: 'Teatro',
    description:
      'Entrenamiento actoral, juego escenico y creacion colectiva. Dirigido a adultos (+18).',
    fullDescription:
      'Taller de Teatro para adultos. Un espacio de entrenamiento actoral, juego escenico e improvisacion donde exploramos el cuerpo, la voz y la creacion colectiva. Dirigido a personas adultas a partir de los 18 anos, sin necesidad de experiencia previa.',
    image: '/images/evento-variete.jpg',
    date: 'Martes',
    time: '19:00 hs',
    category: 'taller',
    location: 'Salon principal - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491140902710',
    instagram: 'https://www.instagram.com/nayiaaiyan',
    calendarDate: '2026-09-01',
    instructor: {
      name: 'Nayia',
      avatar: '/images/evento-variete.jpg',
      bio: 'Facilita los talleres de teatro, juegos teatrales y acrobacia en tela en El Bondi. Info e inscripciones al 11 4090-2710 o en Instagram como @nayiaaiyan.',
    },
  },
  // --------------------------- MIERCOLES ----------------------------
  {
    slug: 'tela-ninxs-camila',
    title: 'Tela Niñxs',
    description:
      'Iniciacion a la acrobacia en tela para las infancias. A partir de los 8 anos.',
    fullDescription:
      'Taller de tela para niñxs: una introduccion ludica a la acrobacia aerea donde se trabaja la fuerza, la coordinacion y la confianza en el propio cuerpo. Disciplina de circo pensada para las infancias, a partir de los 8 anos.',
    image: '/images/taller-acrobacias-duo.jpg',
    date: 'Miércoles',
    time: '17:00 a 18:00 hs',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491130082079',
    instagram: 'https://www.instagram.com/camlacat',
    calendarDate: '2026-09-02',
    instructor: {
      name: 'Camila',
      avatar: '/images/taller-acrobacias-duo.jpg',
      bio: 'Facilita los talleres de tela, verticales y flexibilidad en El Bondi. Info e inscripciones al 11 3008-2079 o en Instagram como @camlacat.',
    },
  },
  {
    slug: 'tela-flexibilidad',
    title: 'Tela y Flexibilidad',
    description:
      'Acrobacia en tela combinada con trabajo de flexibilidad. Adolescentes y adultos (+14).',
    fullDescription:
      'Taller de tela y flexibilidad para adolescentes y adultos (+14). Combinamos el entrenamiento de acrobacia aerea en tela con un trabajo especifico de flexibilidad y movilidad, integrando disciplinas de circo. Se dicta los miercoles a las 18:30 hs y los viernes de 10 a 12 hs.',
    image: '/images/taller-acrobacia.jpg',
    date: 'Miércoles y Viernes',
    time: '18:30 hs (Mié) · 10 a 12 hs (Vie)',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491130082079',
    instagram: 'https://www.instagram.com/camlacat',
    calendarDate: '2026-09-02',
    instructor: {
      name: 'Camila',
      avatar: '/images/taller-acrobacia.jpg',
      bio: 'Facilita los talleres de tela, verticales y flexibilidad en El Bondi. Info e inscripciones al 11 3008-2079 o en Instagram como @camlacat.',
    },
  },
  {
    slug: 'ensamble-musical',
    title: 'Ensamble Musical',
    description:
      'Practica musical grupal para tocar en conjunto. Abierto a todas las edades y niveles.',
    fullDescription:
      'Taller de Ensamble Musical: un espacio para hacer musica en grupo, integrando instrumentos y voces. Trabajamos repertorio, escucha y la experiencia de tocar en conjunto. Abierto a todas las edades y niveles.',
    image: '/images/taller-guitarra.jpg',
    date: 'Miércoles',
    time: '18:30 hs',
    category: 'taller',
    location: 'Salon principal - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491138986228',
    calendarDate: '2026-09-02',
    instructor: {
      name: 'Daniel',
      avatar: '/images/taller-guitarra.jpg',
      bio: 'Coordina el Ensamble Musical de El Bondi, un espacio grupal para tocar en conjunto. Info e inscripciones al 11 3898-6228.',
    },
  },
  // ----------------------------- JUEVES -----------------------------
  {
    slug: 'juegos-teatrales-tela',
    title: 'Juegos Teatrales y Tela',
    description:
      'Juego escenico y acrobacia en tela para las infancias. A partir de los 6 anos.',
    fullDescription:
      'Taller de Juegos Teatrales y Tela para niñxs: combinamos el juego dramatico y la expresion con una iniciacion a la acrobacia en tela. Un espacio para explorar el cuerpo, la imaginacion y el movimiento, a partir de los 6 anos.',
    image: '/images/workshop-2.jpg',
    date: 'Jueves',
    time: '17:00 hs',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491140902710',
    instagram: 'https://www.instagram.com/nayiaaiyan',
    calendarDate: '2026-09-03',
    instructor: {
      name: 'Nayia',
      avatar: '/images/workshop-2.jpg',
      bio: 'Facilita los talleres de teatro, juegos teatrales y acrobacia en tela en El Bondi. Info e inscripciones al 11 4090-2710 o en Instagram como @nayiaaiyan.',
    },
  },
  {
    slug: 'teatro-comunitario',
    title: 'Teatro Comunitario',
    description:
      'Teatro de vecinos para vecinos. Creacion colectiva y comunitaria. Actividad no arancelada.',
    fullDescription:
      'Teatro Comunitario: teatro de vecinos para vecinos. Un grupo abierto de creacion colectiva donde la comunidad se encuentra para hacer y compartir teatro. Es una actividad no arancelada, abierta a todas las personas que quieran sumarse.',
    image: '/images/evento-ronda.jpg',
    date: 'Jueves',
    time: '19:00 hs',
    category: 'taller',
    location: 'Salon principal - El Bondi',
    price: 'Actividad no arancelada',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5493484668719',
    instagram: 'https://www.instagram.com/gloria_la_del_bondi',
    calendarDate: '2026-09-03',
    instructor: {
      name: 'Cintia',
      avatar: '/images/evento-ronda.jpg',
      bio: 'Coordina el grupo de Teatro Comunitario de El Bondi, teatro de vecinos para vecinos. Info al 3484 66-8719 o en Instagram como @gloria_la_del_bondi.',
    },
  },
  // ----------------------------- VIERNES ----------------------------
  {
    slug: 'tela-ninxs-delfina',
    title: 'Tela Niñxs (Delfina)',
    description:
      'Acrobacia en tela para las infancias. Grupo de niñes de 6 a 11 anos.',
    fullDescription:
      'Taller de tela para niñxs: iniciacion a la acrobacia aerea en un espacio de juego y confianza. Disciplina de circo que trabaja la fuerza, la coordinacion y la expresion, para niñes de 6 a 11 anos.',
    image: '/images/taller-acrobacia.jpg',
    date: 'Viernes',
    time: '18:00 a 19:00 hs',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491155773885',
    instagram: 'https://www.instagram.com/delffi.z',
    calendarDate: '2026-09-04',
    instructor: {
      name: 'Delfina',
      avatar: '/images/taller-acrobacia.jpg',
      bio: 'Facilita los talleres de Circo Babys y Tela para las infancias en El Bondi. Info e inscripciones al 11 5577-3885 o en Instagram como @delffi.z.',
    },
  },
  {
    slug: 'candombe',
    title: 'Candombe',
    description:
      'Toque de tambores y ritmo de candombe en comunidad. Musica afrouruguaya en vivo.',
    fullDescription:
      'Taller de Candombe: nos encontramos para tocar los tambores y compartir el ritmo del candombe, musica afrouruguaya de raiz comunitaria. Trabajamos chico, repique y piano, y la energia de tocar en cuerda. Abierto a todos los niveles.',
    image: '/images/evento-fiesta.jpg',
    date: 'Viernes',
    time: '17:30 hs',
    category: 'taller',
    location: 'Patio - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491157526368',
    instagram: 'https://www.instagram.com/fmdiazcano',
    calendarDate: '2026-09-04',
    instructor: {
      name: 'Francisco',
      avatar: '/images/evento-fiesta.jpg',
      bio: 'Facilita el taller de Candombe en El Bondi. Info e inscripciones al 11 5752-6368 o en Instagram como @fmdiazcano.',
    },
  },
  {
    slug: 'bienestar-adolescentes',
    title: 'Taller de Bienestar',
    description:
      'Espacio de bienestar y cuidado para adolescentes. Encuentro, escucha y herramientas para el dia a dia.',
    fullDescription:
      'Taller de Bienestar para adolescentes: un espacio de encuentro, escucha y cuidado, con herramientas para transitar la adolescencia. Trabajamos las emociones, los vinculos y el bienestar integral en un ambiente de confianza.',
    image: '/images/workshop-3.jpg',
    date: 'Viernes',
    time: '18:00 hs',
    category: 'taller',
    location: 'El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5493513057103',
    instagram: 'https://www.instagram.com/cuyengonzalez',
    calendarDate: '2026-09-04',
    instructor: {
      name: 'Cuyen',
      avatar: '/images/workshop-3.jpg',
      bio: 'Facilita el Taller de Bienestar para adolescentes en El Bondi. Info al 351 305-7103 o en Instagram como @cuyengonzalez.',
    },
  },
  // ----------------------------- SABADO -----------------------------
  {
    slug: 'acrobacia-en-tela',
    title: 'Acrobacia en Tela: Exploración y Creación',
    description:
      'Acrobacia aerea en tela con foco en la exploracion y la creacion. Adolescentes y adultos (+14).',
    fullDescription:
      'Taller de Acrobacia en Tela: exploracion y creacion. Un espacio para profundizar la tecnica de tela aerea y, a la vez, investigar el movimiento y componer secuencias propias. Disciplina de circo para adolescentes y adultos a partir de los 14 anos.',
    image: '/images/taller-acrobacias-duo.jpg',
    date: 'Sábado',
    time: '11:00 hs',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491140902710',
    instagram: 'https://www.instagram.com/nayiaaiyan',
    calendarDate: '2026-09-05',
    instructor: {
      name: 'Nayia',
      avatar: '/images/taller-acrobacias-duo.jpg',
      bio: 'Facilita los talleres de teatro, juegos teatrales y acrobacia en tela en El Bondi. Info e inscripciones al 11 4090-2710 o en Instagram como @nayiaaiyan.',
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
    date: 'Sábado',
    time: '12:00 hs',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491159982772',
    calendarDate: '2026-09-05',
    instructor: {
      name: 'Ivana',
      avatar: '/images/taller-danza-africana.png',
      bio: 'Facilita el taller de Danza Africana en El Bondi, con percusion en vivo. Contacto al 11 5998-2772.',
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
    date: 'Sábado',
    time: '15:00 hs',
    category: 'taller',
    location: 'El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491123859685',
    instagram: 'https://www.instagram.com/rebelo.pablo',
    calendarDate: '2026-09-05',
    instructor: {
      name: 'Pablo',
      avatar: '/images/taller-percusion-africana.png',
      bio: 'Profe de percusion del Bondi. Facilita el taller de percusion africana, un espacio grupal y multinivel. Info al 11 2385-9685 o en Instagram como @rebelo.pablo.',
    },
  },
  // ----------------- Talleres con dia/horario a confirmar -----------
  {
    slug: 'circo-babys',
    title: 'Circo Babys',
    description:
      'Iniciacion al circo para las primeras infancias, de 3 a 5 anos. Juego, movimiento y psicomotricidad.',
    fullDescription:
      'Circo Babys es un espacio de iniciacion al circo para las primeras infancias, de 3 a 5 anos. A traves del juego trabajamos la psicomotricidad, el equilibrio y la exploracion del cuerpo en un ambiente seguro y afectuoso. Consultar dia y horario con la tallerista.',
    image: '/images/taller-malabares.jpg',
    date: 'Consultar',
    time: 'A confirmar',
    category: 'taller',
    location: 'El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491155773885',
    instagram: 'https://www.instagram.com/delffi.z',
    calendarDate: '2026-09-06',
    instructor: {
      name: 'Delfina',
      avatar: '/images/taller-malabares.jpg',
      bio: 'Facilita los talleres de Circo Babys y Tela para las infancias en El Bondi. Info e inscripciones al 11 5577-3885 o en Instagram como @delffi.z.',
    },
  },
  {
    slug: 'apoyo-escolar',
    title: 'Apoyo Escolar',
    description:
      'Acompanamiento educativo gratuito para las infancias. Incluye merienda.',
    fullDescription:
      'Espacio de Apoyo Escolar: acompanamiento educativo para las infancias, en el marco del trabajo comunitario de El Bondi. Es una actividad gratuita e incluye merienda. Consultar dia y horario con la tallerista.',
    image: '/images/evento-encuentro.jpg',
    date: 'Consultar',
    time: 'A confirmar',
    category: 'taller',
    location: 'El Bondi',
    price: 'Gratuito',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491164939561',
    instagram: 'https://www.instagram.com/tania.gallas',
    calendarDate: '2026-09-06',
    instructor: {
      name: 'Tania',
      avatar: '/images/evento-encuentro.jpg',
      bio: 'Coordina el espacio de Apoyo Escolar gratuito para las infancias en El Bondi. Info al 11 6493-9561 o en Instagram como @tania.gallas.',
    },
  },
  {
    slug: 'danza-raiz',
    title: 'Danza Raíz: Danzas Folclóricas',
    description:
      'Tecnica, ritmo y coreografia de danzas tradicionales: chacarera, gato, zamba, malambo y mas.',
    fullDescription:
      'Taller de Danza Raiz: danzas folcloricas. Tecnica, ritmo y coreografia de danzas tradicionales y no tanto: chacarera, gato, zamba, escondido, bailecito, zamba alegre, malambo y otras. Trabajamos variantes coreograficas y la busqueda de expresividad en la danza. Consultar dia y horario con la tallerista.',
    image: '/images/taller-danza-raiz.png',
    date: 'Consultar',
    time: 'A confirmar',
    category: 'taller',
    location: 'Salon de danza - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491135924409',
    instagram: 'https://www.instagram.com/fer_lojo',
    calendarDate: '2026-09-06',
    instructor: {
      name: 'Fernanda',
      avatar: '/images/taller-danza-raiz.png',
      bio: 'Facilita el taller de Danza Raiz (danzas folcloricas) en El Bondi. Info e inscripciones al 11 3592-4409 o en Instagram como @fer_lojo.',
    },
  },
  {
    slug: 'tela-daniela',
    title: 'Tela',
    description:
      'Acrobacia aerea en tela: tecnica, fuerza y figuras. Espacio de entrenamiento en disciplinas de circo.',
    fullDescription:
      'Taller de Tela: entrenamiento de acrobacia aerea donde se trabajan la tecnica, la fuerza, las subidas y las figuras. Un espacio de circo para desarrollar el propio recorrido en la tela. Consultar dia y horario con la tallerista.',
    image: '/images/workshop-4.jpg',
    date: 'Consultar',
    time: 'A confirmar',
    category: 'taller',
    location: 'Sala de telas - El Bondi',
    price: 'Aporte sugerido',
    contact: 'mailcolectivocultural@gmail.com',
    whatsapp: '5491136342920',
    instagram: 'https://www.instagram.com/dani_ruani_',
    calendarDate: '2026-09-06',
    instructor: {
      name: 'Daniela',
      avatar: '/images/workshop-4.jpg',
      bio: 'Facilita el taller de Tela en El Bondi. Info e inscripciones al 11 3634-2920 o en Instagram como @dani_ruani_.',
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

const PRODUCTION_LABELS: Record<NonNullable<EventItem['production']>, string> = {
  bondi: 'Producción de El Bondi',
  externa: '',
}

export function getProductionLabel(production?: EventItem['production']): string {
  if (!production) return ''
  return PRODUCTION_LABELS[production]
}

// Events sorted so El Bondi productions come first (by date),
// followed by the rest of the events (by date).
export function getSortedEvents(source: EventItem[] = events): EventItem[] {
  const byDate = (a: EventItem, b: EventItem) => {
    if (!a.calendarDate || !b.calendarDate) return 0
    return new Date(a.calendarDate).getTime() - new Date(b.calendarDate).getTime()
  }

  const bondi = source.filter((e) => e.production === 'bondi').sort(byDate)
  const others = source.filter((e) => e.production !== 'bondi').sort(byDate)

  return [...bondi, ...others]
}

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
