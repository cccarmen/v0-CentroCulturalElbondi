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
  date: string
  image: string
  host: string
}

const radioPrograms: RadioProgram[] = [
  {
    id: 1,
    title: 'Voces del Barrio',
    description: 'Historias y testimonios de los vecinos de Maschwitz. Un espacio para escuchar las voces que construyen nuestra comunidad.',
    category: 'cultural',
    duration: '45:30',
    date: '12 Abr 2026',
    image: '/images/evento-encuentro.jpg',
    host: 'Maria Garcia',
  },
  {
    id: 2,
    title: 'Ritmos Latinoamericanos',
    description: 'Un viaje musical por los sonidos de America Latina. Cumbia, salsa, folklore y mas.',
    category: 'musica',
    duration: '58:15',
    date: '10 Abr 2026',
    image: '/images/evento-musica.jpg',
    host: 'Carlos Rodriguez',
  },
  {
    id: 3,
    title: 'Cultura en Movimiento',
    description: 'Entrevistas a artistas locales, agenda cultural y todo lo que pasa en la escena artistica de la zona norte.',
    category: 'cultural',
    duration: '32:45',
    date: '8 Abr 2026',
    image: '/images/evento-variete.jpg',
    host: 'Laura Martinez',
  },
  {
    id: 4,
    title: 'El Patio de los Pibes',
    description: 'Programa infantil con cuentos, musica y juegos para los mas chicos de la comunidad.',
    category: 'infantil',
    duration: '25:00',
    date: '5 Abr 2026',
    image: '/images/evento-ronda.jpg',
    host: 'Ana Fernandez',
  },
  {
    id: 5,
    title: 'Folklore al Atardecer',
    description: 'Chacareras, zambas y todo el folklore argentino para cerrar la tarde con la mejor musica.',
    category: 'musica',
    duration: '1:15:20',
    date: '3 Abr 2026',
    image: '/images/evento-folklore.jpg',
    host: 'Juan Perez',
  },
  {
    id: 6,
    title: 'Mesa de Debate',
    description: 'Temas de actualidad comunitaria con invitados especiales. Politica, sociedad y cultura.',
    category: 'debate',
    duration: '52:10',
    date: '1 Abr 2026',
    image: '/images/evento-cumple.jpg',
    host: 'Pedro Sanchez',
  },
  {
    id: 7,
    title: 'Noticiero Comunitario',
    description: 'Las noticias de Maschwitz y la zona norte. Informacion local que nos importa.',
    category: 'noticias',
    duration: '28:45',
    date: '29 Mar 2026',
    image: '/images/evento-pareja.jpg',
    host: 'Lucia Torres',
  },
  {
    id: 8,
    title: 'Rock Nacional Clasico',
    description: 'Los mejores clasicos del rock argentino de los 80 y 90. Soda, Fito, Charly y mas.',
    category: 'musica',
    duration: '1:02:30',
    date: '27 Mar 2026',
    image: '/images/evento-baile-atardecer.jpg',
    host: 'Diego Lopez',
  },
  {
    id: 9,
    title: 'Tarde de Tango',
    description: 'El mejor tango para disfrutar en la tarde. Gardel, Piazzolla y los grandes del genero.',
    category: 'musica',
    duration: '55:00',
    date: '25 Mar 2026',
    image: '/images/evento-danza-circulo.jpg',
    host: 'Roberto Gomez',
  },
  {
    id: 10,
    title: 'Voces Jovenes',
    description: 'Programa conducido por jovenes del bachillerato popular. Temas que les importan a las nuevas generaciones.',
    category: 'debate',
    duration: '40:15',
    date: '23 Mar 2026',
    image: '/images/evento-fiesta.jpg',
    host: 'Colectivo Juvenil',
  },
  {
    id: 11,
    title: 'Musica del Mundo',
    description: 'Un recorrido por los sonidos de diferentes culturas. Jazz, blues, reggae y world music.',
    category: 'musica',
    duration: '1:10:00',
    date: '21 Mar 2026',
    image: '/images/evento-musica.jpg',
    host: 'Sofia Ruiz',
  },
  {
    id: 12,
    title: 'Historias de Vida',
    description: 'Entrevistas en profundidad a personajes de nuestra comunidad que tienen mucho para contar.',
    category: 'cultural',
    duration: '48:30',
    date: '19 Mar 2026',
    image: '/images/evento-encuentro.jpg',
    host: 'Martin Diaz',
  },
]

const PROGRAM_CATEGORIES: { value: ProgramCategory; label: string; icon: typeof Radio }[] = [
  { value: 'musica', label: 'Musica', icon: Music },
  { value: 'cultural', label: 'Cultural', icon: Mic },
  { value: 'debate', label: 'Debate', icon: MessageSquare },
  { value: 'noticias', label: 'Noticias', icon: Newspaper },
  { value: 'infantil', label: 'Infantil', icon: Users },
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

            {/* Search bar */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar programas, conductores..."
                  className="h-12 rounded-lg bg-white pl-12 text-base shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-white/50"
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
          </ScrollReveal>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="bg-background py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
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
                    <a href="mailto:radioactiva@elbondi.com">
                      Contactanos
                    </a>
                  </Button>
                </div>

                {/* External link */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Ver archivo completo
                      <ExternalLink className="size-4" />
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

/* Card component for radio programs */
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
  
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play button overlay */}
        <button
          onClick={onTogglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          <div className={`flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all ${
            isPlaying ? 'scale-100' : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'
          }`}>
            {isPlaying ? (
              <Pause className="size-6" />
            ) : (
              <Play className="size-6 ml-1" />
            )}
          </div>
        </button>
        
        {/* Category badge */}
        {categoryInfo && (
          <Badge className="absolute top-3 left-3 text-xs" variant="secondary">
            {categoryInfo.label}
          </Badge>
        )}
        
        {/* Duration */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90">
          <Clock className="size-3.5" />
          <span className="text-sm font-medium">{program.duration}</span>
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
            <div className="flex size-6 items-center justify-center rounded-full bg-muted">
              <Mic className="size-3 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{program.host}</span>
          </div>
          <span className="text-xs text-muted-foreground">{program.date}</span>
        </div>
      </div>
    </div>
  )
}
