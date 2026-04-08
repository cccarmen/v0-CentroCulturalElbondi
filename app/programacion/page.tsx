'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Calendar as CalendarIcon, X, MapPin, Clock } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { events, workshops, type EventItem } from '@/lib/data'
import { WeeklyTimetable } from '@/components/weekly-timetable'

type CategoryFilter = 'evento' | 'taller'

export default function ProgramacionPage() {
  return (
    <Suspense fallback={null}>
      <ProgramacionContent />
    </Suspense>
  )
}

function ProgramacionContent() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get('categoria') as CategoryFilter) || 'evento'
  const [category, setCategory] = useState<CategoryFilter>(
    ['evento', 'taller'].includes(initialCategory) ? initialCategory : 'evento'
  )
  const [search, setSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState(false)

  const allItems = useMemo(() => [...events, ...workshops], [])

  // Dates that have events (for calendar highlighting)
  const eventDates = useMemo(() => {
    return allItems
      .filter((item) => item.calendarDate)
      .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
  }, [allItems])

  // Filtered items
  const filtered = useMemo(() => {
    let items = allItems.filter((i) => i.category === category)

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      )
    }

    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      items = items.filter((i) => i.calendarDate === dateStr)
    }

    return items
  }, [allItems, category, search, selectedDate])

  const categoryOptions: { label: string; value: CategoryFilter }[] = [
    { label: 'Eventos', value: 'evento' },
    { label: 'Talleres', value: 'taller' },
  ]

  const clearFilters = () => {
    setSearch('')
    setSelectedDate(undefined)
  }

  const hasActiveFilters = search.trim() !== '' || selectedDate !== undefined

  return (
    <>
      {/* Hero header */}
      <section className="relative bg-primary px-4 pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
            Programacion
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            Explora todos nuestros eventos, talleres y actividades.
          </p>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left: Filters + Grid */}
            <div className="flex-1">
              {/* Filter bar */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category pills */}
                <div className="flex gap-1.5 rounded-lg bg-muted p-1">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCategory(opt.value)}
                      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        category === opt.value
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Search - only shown for eventos view */}
                {category !== 'taller' && (
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por nombre, descripcion o ubicacion..."
                      className="pl-9"
                    />
                  </div>
                )}

                {/* Calendar toggle (mobile) - only shown for eventos view */}
                {category !== 'taller' && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setShowCalendar(!showCalendar)}
                    aria-label="Mostrar calendario"
                  >
                    <CalendarIcon className="size-4" />
                  </Button>
                )}

                {/* Clear filters */}
                {hasActiveFilters && category !== 'taller' && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                    <X className="mr-1 size-3.5" />
                    Limpiar filtros
                  </Button>
                )}
              </div>

              {/* Active filter badges - only for eventos view */}
              {hasActiveFilters && category !== 'taller' && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {search.trim() && (
                    <Badge variant="secondary" className="gap-1">
                      {`"${search}"`}
                      <button onClick={() => setSearch('')} aria-label="Quitar busqueda">
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedDate && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedDate.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <button onClick={() => setSelectedDate(undefined)} aria-label="Quitar filtro fecha">
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Mobile calendar */}
              {showCalendar && (
                <div className="mt-4 lg:hidden">
                  <CalendarSidebar
                    eventDates={eventDates}
                    selectedDate={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setShowCalendar(false)
                    }}
                  />
                </div>
              )}

              {/* Content: Timetable for Talleres, Grid for Eventos */}
              {category === 'taller' ? (
                <WeeklyTimetable />
              ) : (
                <>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((item, index) => (
                      <ScrollReveal key={item.slug} delay={index * 60} className="h-full">
                        <ProgramCard item={item} />
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Empty state */}
                  {filtered.length === 0 && (
                    <div className="mt-16 flex flex-col items-center gap-3 text-center">
                      <Search className="size-10 text-muted-foreground/50" />
                      <p className="text-lg font-medium text-foreground">No se encontraron resultados</p>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        Intenta ajustar los filtros o buscar con otros terminos.
                      </p>
                      <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                        Limpiar filtros
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right: Calendar sidebar (desktop) - hidden in timetable mode */}
            <div className={`${category === 'taller' ? 'hidden' : 'hidden lg:block'}`}>
              <div className="sticky top-24 w-[300px]">
                <CalendarSidebar
                  eventDates={eventDates}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />

                {/* Upcoming items sidebar */}
                <div className="mt-6 rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground">Proximos eventos</h3>
                  <div className="mt-3 flex flex-col gap-3">
                    {events.slice(0, 4).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/evento/${item.slug}`}
                        className="group flex gap-3 text-sm"
                      >
                        <div className="mt-0.5 size-2 shrink-0 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.date} - {item.time}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* Calendar sidebar component */
function CalendarSidebar({
  eventDates,
  selectedDate,
  onSelect,
}: {
  eventDates: Date[]
  selectedDate: Date | undefined
  onSelect: (date: Date | undefined) => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <CalendarIcon className="size-4 text-primary" />
          Calendario
        </h3>
        {selectedDate && (
          <button
            onClick={() => onSelect(undefined)}
            className="text-xs text-primary hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        modifiers={{ event: eventDates }}
        modifiersClassNames={{
          event: 'bg-primary/20 text-primary font-bold',
        }}
        className="mt-2 p-0"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Los dias resaltados tienen actividades programadas.
      </p>
    </div>
  )
}

/* Card for the programacion grid */
function ProgramCard({ item }: { item: EventItem }) {
  return (
    <Link
      href={`/evento/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className="absolute top-3 left-3 text-xs"
          variant={item.category === 'evento' ? 'default' : 'secondary'}
        >
          {item.category === 'evento' ? 'Evento' : 'Taller'}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarIcon className="size-3" />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {item.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {item.location.split(' - ')[0]}
          </span>
        </div>
      </div>
    </Link>
  )
}
