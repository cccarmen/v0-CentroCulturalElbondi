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
  Users,
  Filter,
  ChevronDown,
  ChevronUp,
  Home,
  Music,
  Theater,
  PartyPopper,
  Palette,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { events, EVENT_TYPES, type EventItem, type EventType } from '@/lib/data'

export default function ProgramacionPage() {
  return (
    <Suspense fallback={null}>
      <ProgramacionContent />
    </Suspense>
  )
}

function ProgramacionContent() {
  const [search, setSearch] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const allItems = useMemo(() => [...events], [])

  // Dates that have events (for calendar highlighting)
  const eventDates = useMemo(() => {
    return allItems
      .filter((item) => item.calendarDate)
      .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
  }, [allItems])

  // Filtered items
  const filtered = useMemo(() => {
    let items = allItems

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      )
    }

    // Date filtering - only calendar selection
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      items = items.filter((i) => i.calendarDate === dateStr)
    }

    // Event type filtering
    if (selectedTypes.length > 0) {
      items = items.filter((i) => i.eventType && selectedTypes.includes(i.eventType))
    }

    // Sort by date
    return items.sort((a, b) => {
      if (!a.calendarDate || !b.calendarDate) return 0
      return new Date(a.calendarDate).getTime() - new Date(b.calendarDate).getTime()
    })
  }, [allItems, search, selectedDate, selectedTypes])

  const clearFilters = () => {
    setSearch('')
    setSelectedDate(undefined)
    setSelectedTypes([])
  }

  const hasActiveFilters = search.trim() !== '' || selectedDate !== undefined || selectedTypes.length > 0

  const toggleEventType = (type: EventType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  return (
    <>
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
                <BreadcrumbPage>Eventos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero header */}
      <section className="relative bg-primary px-4 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
            Eventos
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            Descubre eventos en El Bondi
          </p>

          {/* Search bar - Eventbrite style */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar eventos, talleres, actividades..."
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
                      {[selectedDate !== undefined, search.trim(), selectedTypes.length > 0].filter(Boolean).length}
                    </Badge>
                  )}
                </span>
                {showMobileFilters ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

              {/* Filter content */}
              <div className={`mt-4 space-y-6 lg:mt-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Event type filter - vertical list style */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    Categoria
                  </h3>
                  <div className="flex flex-col gap-1">
                    {/* All events option */}
                    <button
                      onClick={() => setSelectedTypes([])}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        selectedTypes.length === 0
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Sparkles className="size-4" />
                        Todos los eventos
                      </span>
                      <span className="text-xs">{allItems.length}</span>
                    </button>
                    {/* Individual category options */}
                    {EVENT_TYPES.map((type) => {
                      const count = allItems.filter((i) => i.eventType === type.value).length
                      const Icon = type.value === 'concierto' ? Music :
                                   type.value === 'variete' ? Theater :
                                   type.value === 'baile' ? Users :
                                   type.value === 'fiesta' ? PartyPopper :
                                   type.value === 'arte' ? Palette :
                                   BookOpen
                      const isSelected = selectedTypes.includes(type.value)
                      return (
                        <button
                          key={type.value}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTypes(selectedTypes.filter((t) => t !== type.value))
                            } else {
                              setSelectedTypes([type.value])
                            }
                          }}
                          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="size-4" />
                            {type.label}
                          </span>
                          <span className="text-xs">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Date filter - Calendar only */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CalendarIcon className="size-4 text-primary" />
                      Elegir fecha
                    </h3>
                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate(undefined)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                  
                  {/* Calendar picker - always visible */}
                  <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/20 p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleCalendarSelect}
                      modifiers={{ event: eventDates }}
                      className="!w-full [--cell-size:1.75rem] text-sm"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-primary" />
                    <span>Dias con eventos</span>
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

                {/* Upcoming events sidebar */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Users className="size-4 text-primary" />
                    Proximos eventos
                  </h3>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/evento/${item.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Results */}
            <div className="flex-1">
              {/* Results header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Active filter badges */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedDate && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        {selectedDate.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                        <button
                          onClick={() => setSelectedDate(undefined)}
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
                    {selectedTypes.map((type) => {
                      const typeLabel = EVENT_TYPES.find((t) => t.value === type)?.label || type
                      return (
                        <Badge key={type} variant="secondary" className="gap-1 pr-1">
                          {typeLabel}
                          <button
                            onClick={() => toggleEventType(type)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Results grid */}
              {filtered.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((item, index) => (
                    <ScrollReveal key={item.slug} delay={index * 40} className="h-full">
                      <ProgramCard item={item} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No se encontraron resultados</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Intenta ajustar los filtros o buscar con otros terminos para encontrar lo que buscas.
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

/* Card for the programacion grid - Eventbrite inspired */
function ProgramCard({ item }: { item: EventItem }) {
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
          variant={item.category === 'evento' ? 'default' : 'secondary'}
        >
          {item.category === 'evento' ? 'Evento' : 'Taller'}
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
      </div>
    </Link>
  )
}
