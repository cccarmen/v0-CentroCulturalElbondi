'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  X,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  Home,
  Radio,
  Mic,
  Music,
  Users,
  MessageSquare,
  Newspaper,
  Play,
  Pause,
  Headphones,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Heart,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type ProgramCategory = 'todos' | 'musica' | 'cultural' | 'debate' | 'noticias' | 'infantil'

interface RadioProgram {
  id: number
  title: string
  description: string
  category: ProgramCategory
  duration: string
  schedule: string
  host: string
  icon: typeof Radio
}

const radioPrograms: RadioProgram[] = [
  {
    id: 1,
    title: 'Voces del Barrio',
    description: 'Historias y testimonios de los vecinos de Maschwitz. Un espacio para escuchar las voces que construyen nuestra comunidad.',
    category: 'cultural',
    duration: '45 min',
    schedule: 'Lunes 18:00',
    host: 'Maria Garcia',
    icon: Users,
  },
  {
    id: 2,
    title: 'Ritmos Latinoamericanos',
    description: 'Un viaje musical por los sonidos de America Latina. Cumbia, salsa, folklore y mas.',
    category: 'musica',
    duration: '60 min',
    schedule: 'Martes 20:00',
    host: 'Carlos Rodriguez',
    icon: Music,
  },
  {
    id: 3,
    title: 'Cultura en Movimiento',
    description: 'Entrevistas a artistas locales, agenda cultural y todo lo que pasa en la escena artistica de la zona norte.',
    category: 'cultural',
    duration: '30 min',
    schedule: 'Miercoles 17:00',
    host: 'Laura Martinez',
    icon: Mic,
  },
  {
    id: 4,
    title: 'El Patio de los Pibes',
    description: 'Programa infantil con cuentos, musica y juegos para los mas chicos de la comunidad.',
    category: 'infantil',
    duration: '25 min',
    schedule: 'Sabados 10:00',
    host: 'Ana Fernandez',
    icon: Heart,
  },
  {
    id: 5,
    title: 'Folklore al Atardecer',
    description: 'Chacareras, zambas y todo el folklore argentino para cerrar la tarde con la mejor musica.',
    category: 'musica',
    duration: '75 min',
    schedule: 'Viernes 19:00',
    host: 'Juan Perez',
    icon: Music,
  },
  {
    id: 6,
    title: 'Mesa de Debate',
    description: 'Temas de actualidad comunitaria con invitados especiales. Politica, sociedad y cultura.',
    category: 'debate',
    duration: '50 min',
    schedule: 'Jueves 21:00',
    host: 'Pedro Sanchez',
    icon: MessageSquare,
  },
  {
    id: 7,
    title: 'Noticiero Comunitario',
    description: 'Las noticias de Maschwitz y la zona norte. Informacion local que nos importa.',
    category: 'noticias',
    duration: '30 min',
    schedule: 'Lunes a Viernes 12:00',
    host: 'Lucia Torres',
    icon: Newspaper,
  },
  {
    id: 8,
    title: 'Rock Nacional Clasico',
    description: 'Los mejores clasicos del rock argentino de los 80 y 90. Soda, Fito, Charly y mas.',
    category: 'musica',
    duration: '60 min',
    schedule: 'Sabados 22:00',
    host: 'Diego Lopez',
    icon: Music,
  },
  {
    id: 9,
    title: 'Tarde de Tango',
    description: 'El mejor tango para disfrutar en la tarde. Gardel, Piazzolla y los grandes del genero.',
    category: 'musica',
    duration: '55 min',
    schedule: 'Domingos 17:00',
    host: 'Roberto Gomez',
    icon: Music,
  },
  {
    id: 10,
    title: 'Voces Jovenes',
    description: 'Programa conducido por jovenes del bachillerato popular. Temas que les importan a las nuevas generaciones.',
    category: 'debate',
    duration: '40 min',
    schedule: 'Miercoles 20:00',
    host: 'Colectivo Juvenil',
    icon: Users,
  },
  {
    id: 11,
    title: 'Musica del Mundo',
    description: 'Un recorrido por los sonidos de diferentes culturas. Jazz, blues, reggae y world music.',
    category: 'musica',
    duration: '70 min',
    schedule: 'Domingos 20:00',
    host: 'Sofia Ruiz',
    icon: Music,
  },
  {
    id: 12,
    title: 'Historias de Vida',
    description: 'Entrevistas en profundidad a personajes de nuestra comunidad que tienen mucho para contar.',
    category: 'cultural',
    duration: '45 min',
    schedule: 'Jueves 18:00',
    host: 'Martin Diaz',
    icon: Mic,
  },
]

const PROGRAM_CATEGORIES: { value: ProgramCategory; label: string; icon: typeof Radio }[] = [
  { value: 'musica', label: 'Musica', icon: Music },
  { value: 'cultural', label: 'Cultural', icon: Mic },
  { value: 'debate', label: 'Debate', icon: MessageSquare },
  { value: 'noticias', label: 'Noticias', icon: Newspaper },
  { value: 'infantil', label: 'Infantil', icon: Users },
]

const galleryImages = [
  { src: '/images/radio-mixer-knobs.jpg', alt: 'Controles de la consola de audio' },
  { src: '/images/radio-studio-desk.jpg', alt: 'Estudio de Radio Activa con consola y auriculares' },
  { src: '/images/radio-mic-vintage.jpg', alt: 'Microfono vintage del estudio' },
  { src: '/images/radio-mic-condenser.jpg', alt: 'Microfono profesional con filtro anti-pop' },
  { src: '/images/radio-estudio-activa.jpg', alt: 'Estudio de Radio Activa 96.9 en vivo' },
  { src: '/images/radio-logo-969.jpg', alt: 'Logo Radio Activa Comunitaria 96.9' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/fmradioactiva96.9/', handle: '@fmradioactiva96.9' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/radioactivacomunitaria', handle: '/radioactivacomunitaria' },
  { name: 'Youtube', icon: Youtube, url: 'https://www.youtube.com/@fmradioactiva96.9', handle: '@fmradioactiva96.9' },
  { name: 'App Android', icon: ExternalLink, url: 'https://play.google.com/store/apps/details?id=com.radioactivacomunitaria', handle: 'Descarga la App' },
]

export default function RadioEspacioPage() {
  return (
    <Suspense fallback={null}>
      <RadioEspacioContent />
    </Suspense>
  )
}

function RadioEspacioContent() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('todos')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLivePlaying, setIsLivePlaying] = useState(false)
  const [playingProgramId, setPlayingProgramId] = useState<number | null>(null)

  // Filtered programs
  const filtered = useMemo(() => {
    let items = [...radioPrograms]

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.host.toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'todos') {
      items = items.filter((i) => i.category === selectedCategory)
    }

    return items
  }, [search, selectedCategory])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('todos')
  }

  const hasActiveFilters = search.trim() !== '' || selectedCategory !== 'todos'

  const getCategoryCount = (cat: ProgramCategory) => {
    if (cat === 'todos') return radioPrograms.length
    return radioPrograms.filter((p) => p.category === cat).length
  }

  const togglePlay = (programId: number) => {
    if (playingProgramId === programId) {
      setPlayingProgramId(null)
    } else {
      setPlayingProgramId(programId)
      setIsLivePlaying(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30 px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5">
                    <Home className="size-4" />
                    <span className="sr-only sm:not-sr-only">Inicio</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Radio Espacio</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Header */}
      <section className="border-b border-border/40 bg-primary py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Radio Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Radio className="size-6 text-primary-foreground" />
                  </div>
                  <span className="font-display text-5xl text-primary-foreground md:text-6xl">96.9</span>
                </div>
                <InteractivePageHeader
                  title="Radio Activa Comunitaria"
                  description="La voz de Maschwitz y alrededores. Desde 2012 transmitiendo cultura, musica y las voces de nuestra comunidad."
                />

                {/* Live Player */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsLivePlaying(!isLivePlaying)
                      setPlayingProgramId(null)
                    }}
                    className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {isLivePlaying ? (
                      <>
                        <Pause className="size-5" />
                        Pausar Radio
                      </>
                    ) : (
                      <>
                        <Play className="size-5" />
                        Escuchar en Vivo
                      </>
                    )}
                  </Button>
                  {isLivePlaying && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-red-500" />
                      </span>
                      <span className="text-sm font-medium text-primary-foreground">EN VIVO</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Radio Section */}
      <section className="border-b border-border/40 bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Description */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
                  Quienes Somos
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Maschwitz es la primera localidad del Partido de Escobar en tener una radio comunitaria. 
                    En FM RadioActiva se promueven las voces del pueblo y nuestra diversidad local.
                  </p>
                  <p className="leading-relaxed">
                    Organizaciones sociocomunitarias, estudiantes, jovenes, adultos y adultos mayores tienen las puertas abiertas 
                    en este medio de comunicacion. Somos una radio comunitaria sin fines de lucro y no pertenecemos a un partido politico.
                  </p>
                  <p className="leading-relaxed">
                    La musica que suena es diversa, como quienes participan de este sueno, sea desde el estudio o escuchando. 
                    FM RadioActiva, la radio comunitaria del pueblo.
                  </p>
                </div>

                {/* Contact info */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>Av El Dorado 1518, Ingeniero Maschwitz 1623</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="size-4 text-primary" />
                    <span>11 6005-1234</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4 text-primary" />
                    <a href="mailto:fmra969@gmail.com" className="hover:text-primary transition-colors">fmra969@gmail.com</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Media */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground">
                  Seguinos en Redes
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Encontranos en todas las plataformas y no te pierdas nada.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{social.name}</p>
                          <p className="text-xs text-muted-foreground">{social.handle}</p>
                        </div>
                        <ExternalLink className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="border-b border-border/40 bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
              La Radio en Imagenes
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Momentos de transmision, eventos especiales y la vida cotidiana en Radio Activa.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="group relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{image.alt}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
              Nuestra Programacion
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Explora todos nuestros programas y encontra tu favorito.
            </p>
          </ScrollReveal>

          {/* Search bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar programas, conductores..."
                className="h-12 rounded-lg pl-12 text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            {/* Left: Sidebar filters */}
            <aside className="lg:w-[280px] shrink-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 lg:hidden"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Filter className="size-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      {[selectedCategory !== 'todos', search.trim()].filter(Boolean).length}
                    </Badge>
                  )}
                </span>
                {showMobileFilters ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

              {/* Filter content */}
              <div className={`mt-4 space-y-6 lg:mt-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category filter */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Categoria</h3>
                  <div className="space-y-1">
                    {/* All programs option */}
                    <button
                      onClick={() => setSelectedCategory('todos')}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        selectedCategory === 'todos'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Headphones className="size-4" />
                        Todos los programas
                      </span>
                      <span className="text-xs">{getCategoryCount('todos')}</span>
                    </button>
                    {/* Individual categories */}
                    {PROGRAM_CATEGORIES.map((cat) => {
                      const Icon = cat.icon
                      return (
                        <button
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            selectedCategory === cat.value
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="size-4" />
                            {cat.label}
                          </span>
                          <span className="text-xs">{getCategoryCount(cat.value)}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 size-4" />
                    Limpiar filtros
                  </Button>
                )}

                {/* Info card */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Mic className="size-4 text-primary" />
                    Queres participar?
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Radio Activa es un espacio abierto. Si tenes una propuesta de programa o queres compartir tu musica, escribinos.
                  </p>
                  <Button size="sm" className="mt-3 w-full" asChild>
                    <a href="mailto:radioactiva@elbondi.org">
                      Contactanos
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Right: Results */}
            <div className="flex-1">
              {/* Results header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} programa{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Active filter badges */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCategory !== 'todos' && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        {PROGRAM_CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                        <button
                          onClick={() => setSelectedCategory('todos')}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                    {search.trim() && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        {`"${search}"`}
                        <button
                          onClick={() => setSearch('')}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Results grid */}
              {filtered.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((program, index) => (
                    <ScrollReveal key={program.id} delay={index * 40} className="h-full">
                      <RadioProgramCard 
                        program={program} 
                        isPlaying={playingProgramId === program.id}
                        onTogglePlay={() => togglePlay(program.id)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No se encontraron programas</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Intenta ajustar los filtros o buscar con otros terminos.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* Card component for radio programs - Purple background with icons */
function RadioProgramCard({ 
  program, 
  isPlaying, 
  onTogglePlay 
}: { 
  program: RadioProgram
  isPlaying: boolean
  onTogglePlay: () => void
}) {
  const categoryInfo = PROGRAM_CATEGORIES.find((c) => c.value === program.category)
  const ProgramIcon = program.icon
  
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl">
      {/* Purple header with icon */}
      <div className="relative flex aspect-[16/10] items-center justify-center bg-primary">
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Large icon */}
        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary-foreground/20 transition-transform duration-300 group-hover:scale-110">
          <ProgramIcon className="size-10 text-primary-foreground" />
        </div>
        
        {/* Play button overlay */}
        <button
          onClick={onTogglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          <div className={`absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-lg transition-all ${
            isPlaying ? 'scale-100' : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'
          }`}>
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 ml-0.5" />
            )}
          </div>
        </button>
        
        {/* Category badge */}
        {categoryInfo && (
          <Badge className="absolute top-3 left-3 text-xs bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30">
            {categoryInfo.label}
          </Badge>
        )}
        
        {/* Schedule */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-primary-foreground/90">
          <Clock className="size-3.5" />
          <span className="text-xs font-medium">{program.schedule}</span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <Mic className="size-3 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">{program.host}</span>
          </div>
          <span className="text-xs text-muted-foreground">{program.duration}</span>
        </div>
      </div>
    </div>
  )
}
