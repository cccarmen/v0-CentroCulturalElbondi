'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Calendar as CalendarIcon,
  X,
  MapPin,
  Clock,
  Music,
  Flame,
  Users,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Palette,
  Dumbbell,
  Guitar,
  Home,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
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
import { workshops, type EventItem } from '@/lib/data'
import { Navbar } from '@/components/navbar'
import { WeeklyTimetable } from '@/components/weekly-timetable'
import { Table2, LayoutGrid } from 'lucide-react'

type TallerCategory = 'todos' | 'circo' | 'musica' | 'danza' | 'arte'
type DateFilter = 'todos' | 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'esta-semana' | 'este-mes' | 'custom'

export default function TalleresPage() {
  return (
    <Suspense fallback={null}>
      <TalleresContent />
    </Suspense>
  )
}

function TalleresContent() {
  const [tallerCategory, setTallerCategory] = useState<TallerCategory>('todos')
  const [search, setSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [dateFilter, setDateFilter] = useState<DateFilter>('todos')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Categorize workshops based on their content
  const categorizeWorkshop = (item: EventItem): TallerCategory => {
    const title = item.title.toLowerCase()
    const desc = item.description.toLowerCase()
    
    if (title.includes('acrobacia') || title.includes('malabares') || title.includes('fuego') || title.includes('hula') || desc.includes('circo')) {
      return 'circo'
    }
    if (title.includes('guitarra') || title.includes('canto') || title.includes('musica') || desc.includes('musica')) {
      return 'musica'
    }
    if (title.includes('danza') || title.includes('baile') || desc.includes('danza')) {
      return 'danza'
    }
    return 'arte'
  }

  // Get day from date string
  const getDayFromDate = (dateStr: string): string => {
    const lower = dateStr.toLowerCase()
    if (lower.includes('lunes')) return 'lunes'
    if (lower.includes('martes')) return 'martes'
    if (lower.includes('miercoles') || lower.includes('miércoles')) return 'miercoles'
    if (lower.includes('jueves')) return 'jueves'
    if (lower.includes('viernes')) return 'viernes'
    if (lower.includes('sabado') || lower.includes('sábado')) return 'sabado'
    return ''
  }

  // Dates that have workshops (for calendar highlighting)
  const workshopDates = useMemo(() => {
    return workshops
      .filter((item) => item.calendarDate)
      .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
  }, [])

  // Get date range based on filter
  const getDateRange = (filter: DateFilter): { start: Date; end: Date } | null => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (filter) {
      case 'esta-semana': {
        const endOfWeek = new Date(today)
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
        return { start: today, end: endOfWeek }
      }
      case 'este-mes': {
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        return { start: today, end: endOfMonth }
      }
      default:
        return null
    }
  }

  // Check if dateFilter is a day of the week
  const isDayFilter = (filter: DateFilter): filter is 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' => {
    return ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].includes(filter)
  }

  // Filtered items
  const filtered = useMemo(() => {
    let items = [...workshops]

    // Category filter
    if (tallerCategory !== 'todos') {
      items = items.filter((i) => categorizeWorkshop(i) === tallerCategory)
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          (i.instructor?.name && i.instructor.name.toLowerCase().includes(q))
      )
    }

    // Date filtering - now includes days of the week
    if (selectedDate && dateFilter === 'custom') {
      const dateStr = selectedDate.toISOString().split('T')[0]
      items = items.filter((i) => i.calendarDate === dateStr)
    } else if (isDayFilter(dateFilter)) {
      // Filter by day of the week
      items = items.filter((i) => {
        const day = getDayFromDate(i.date)
        return day === dateFilter
      })
    } else if (dateFilter !== 'todos' && dateFilter !== 'custom') {
      const range = getDateRange(dateFilter)
      if (range) {
        items = items.filter((i) => {
          if (!i.calendarDate) return false
          const itemDate = new Date(i.calendarDate + 'T12:00:00')
          return itemDate >= range.start && itemDate <= range.end
        })
      }
    }

    return items
  }, [tallerCategory, search, selectedDate, dateFilter])

  const categoryOptions: { label: string; value: TallerCategory; icon: React.ReactNode }[] = [
    { label: 'Todos los talleres', value: 'todos', icon: <GraduationCap className="size-4" /> },
    { label: 'Circo y Acrobacia', value: 'circo', icon: <Sparkles className="size-4" /> },
    { label: 'Musica', value: 'musica', icon: <Guitar className="size-4" /> },
    { label: 'Danza', value: 'danza', icon: <Dumbbell className="size-4" /> },
    { label: 'Arte y Expresion', value: 'arte', icon: <Palette className="size-4" /> },
  ]

  const dateOptions: { label: string; value: DateFilter; isDay?: boolean }[] = [
    { label: 'Todas las fechas', value: 'todos' },
    { label: 'Esta semana', value: 'esta-semana' },
    { label: 'Este mes', value: 'este-mes' },
    { label: 'Lunes', value: 'lunes', isDay: true },
    { label: 'Martes', value: 'martes', isDay: true },
    { label: 'Miercoles', value: 'miercoles', isDay: true },
    { label: 'Jueves', value: 'jueves', isDay: true },
    { label: 'Viernes', value: 'viernes', isDay: true },
    { label: 'Sabado', value: 'sabado', isDay: true },
    { label: 'Elegir fecha', value: 'custom' },
  ]

  const clearFilters = () => {
    setTallerCategory('todos')
    setSearch('')
    setSelectedDate(undefined)
    setDateFilter('todos')
  }

  const hasActiveFilters =
    tallerCategory !== 'todos' || search.trim() !== '' || dateFilter !== 'todos'

  const handleDateFilterChange = (value: DateFilter) => {
    setDateFilter(value)
    if (value !== 'custom') {
      setSelectedDate(undefined)
      setShowCalendar(false)
    } else {
      setShowCalendar(true)
    }
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setDateFilter(date ? 'custom' : 'todos')
  }

  // Count workshops per category
  const getCategoryCount = (cat: TallerCategory) => {
    if (cat === 'todos') return workshops.length
    return workshops.filter((w) => categorizeWorkshop(w) === cat).length
  }

  return (
    <>
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
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
                <BreadcrumbPage>Talleres y Bachilleratos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero header */}
      <section className="relative bg-primary pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <InteractivePageHeader
            title="Talleres y Bachilleratos"
            description="Formacion artistica para todas las edades. Circo, musica, danza y mas."
          />

          {/* Search bar - Eventbrite style */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar talleres por nombre, instructor, disciplina..."
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
                      {[tallerCategory !== 'todos', dateFilter !== 'todos', search.trim()].filter(Boolean).length}
                    </Badge>
                  )}
                </span>
                {showMobileFilters ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

              {/* Filter content */}
              <div className={`mt-4 space-y-6 lg:mt-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Discipline/Category filter */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Disciplina</h3>
                  <div className="space-y-1">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTallerCategory(opt.value)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          tallerCategory === opt.value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {opt.icon}
                        {opt.label}
                        <span className="ml-auto text-xs opacity-70">
                          {getCategoryCount(opt.value)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date filter - unified days and date ranges */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Fecha</h3>
                  <div className="space-y-1">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleDateFilterChange(opt.value)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          dateFilter === opt.value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {opt.value === 'custom' && <CalendarIcon className="size-4" />}
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Calendar picker */}
                  {(showCalendar || dateFilter === 'custom') && (
                    <div className="mt-4 border-t border-border pt-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleCalendarSelect}
                        modifiers={{ event: workshopDates }}
                        className="p-0"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Los dias resaltados tienen talleres programados.
                      </p>
                    </div>
                  )}
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
                    <Users className="size-4 text-primary" />
                    Inscripcion
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Podes reservar tu lugar en cualquier taller completando el formulario de inscripcion. El pago se realiza en persona el primer dia de clase.
                  </p>
                </div>
              </div>
            </aside>

            {/* Right: Results */}
            <div className="flex-1">
              {/* Results header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} taller{filtered.length !== 1 ? 'es' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                  </p>
                  {/* View toggle */}
                  <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Vista de tarjetas"
                    >
                      <LayoutGrid className="size-3.5" />
                      <span className="hidden sm:inline">Tarjetas</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        viewMode === 'table'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Vista de tabla semanal"
                    >
                      <Table2 className="size-3.5" />
                      <span className="hidden sm:inline">Semanal</span>
                    </button>
                  </div>
                </div>

                {/* Active filter badges */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {tallerCategory !== 'todos' && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        {categoryOptions.find((o) => o.value === tallerCategory)?.label}
                        <button
                          onClick={() => setTallerCategory('todos')}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                    {dateFilter !== 'todos' && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        {dateFilter === 'custom' && selectedDate
                          ? selectedDate.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
                          : dateOptions.find((o) => o.value === dateFilter)?.label}
                        <button
                          onClick={() => {
                            setDateFilter('todos')
                            setSelectedDate(undefined)
                          }}
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

              {/* Results: Grid or Timetable view */}
              {viewMode === 'table' ? (
                <WeeklyTimetable mode="talleres" selectedDay={isDayFilter(dateFilter) ? dateFilter : 'todos'} />
              ) : filtered.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((item, index) => (
                    <ScrollReveal key={item.slug} delay={index * 40} className="h-full">
                      <TallerCard item={item} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No se encontraron talleres</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Intenta ajustar los filtros o buscar con otros terminos para encontrar el taller que buscas.
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
    </>
  )
}

/* Card for talleres - Eventbrite inspired */
function TallerCard({ item }: { item: EventItem }) {
  return (
    <Link
      href={`/evento/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge
          className="absolute top-3 left-3 text-xs"
          variant="secondary"
        >
          Taller
        </Badge>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-medium text-white/90">
            {item.date} - {item.time}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        
        {/* Instructor */}
        {item.instructor && (
          <div className="flex items-center gap-2 mt-1">
            <div className="size-6 rounded-full overflow-hidden bg-muted">
              <Image
                src={item.instructor.avatar}
                alt={item.instructor.name}
                width={24}
                height={24}
                className="size-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {item.instructor.name}
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-border">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-xs text-muted-foreground">
            {item.location}
          </span>
        </div>
        
        {item.price && (
          <p className="text-sm font-medium text-primary">
            {item.price.includes('gratis') || item.price.includes('libre') ? 'Gratis' : item.price.split('/')[0]}
          </p>
        )}

        {item.maxParticipants && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3" />
            Cupo: {item.maxParticipants} personas
          </p>
        )}
      </div>
    </Link>
  )
}
