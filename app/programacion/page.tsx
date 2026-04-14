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
import { events, type EventItem } from '@/lib/data'


type DateFilter = 'todos' | 'hoy' | 'manana' | 'esta-semana' | 'este-mes' | 'custom'

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
  const [dateFilter, setDateFilter] = useState<DateFilter>('todos')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const allItems = useMemo(() => [...events], [])

  // Dates that have events (for calendar highlighting)
  const eventDates = useMemo(() => {
    return allItems
      .filter((item) => item.calendarDate)
      .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
  }, [allItems])

  // Get date range based on filter
  const getDateRange = (filter: DateFilter): { start: Date; end: Date } | null => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (filter) {
      case 'hoy':
        return { start: today, end: today }
      case 'manana': {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return { start: tomorrow, end: tomorrow }
      }
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

    // Date filtering
    if (selectedDate && dateFilter === 'custom') {
      const dateStr = selectedDate.toISOString().split('T')[0]
      items = items.filter((i) => i.calendarDate === dateStr)
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

    // Sort by date
    return items.sort((a, b) => {
      if (!a.calendarDate || !b.calendarDate) return 0
      return new Date(a.calendarDate).getTime() - new Date(b.calendarDate).getTime()
    })
  }, [allItems, search, selectedDate, dateFilter])

  const dateOptions: { label: string; value: DateFilter }[] = [
    { label: 'Todas las fechas', value: 'todos' },
    { label: 'Hoy', value: 'hoy' },
    { label: 'Manana', value: 'manana' },
    { label: 'Esta semana', value: 'esta-semana' },
    { label: 'Este mes', value: 'este-mes' },
    { label: 'Elegir fecha', value: 'custom' },
  ]

  const clearFilters = () => {
    setSearch('')
    setSelectedDate(undefined)
    setDateFilter('todos')
  }

  const hasActiveFilters = search.trim() !== '' || dateFilter !== 'todos'

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
                <BreadcrumbPage>Programacion</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero header */}
      <section className="relative bg-primary px-4 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
            Programacion
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            Descubri eventos, talleres y actividades en El Bondi
          </p>

          {/* Search bar - Eventbrite style */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar eventos, talleres, actividades..."
                className="h-12 rounded-xl bg-white pl-12 text-base shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-white/50"
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
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 lg:hidden"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Filter className="size-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      {[dateFilter !== 'todos', search.trim()].filter(Boolean).length}
                    </Badge>
                  )}
                </span>
                {showMobileFilters ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

              {/* Filter content */}
              <div className={`mt-4 space-y-6 lg:mt-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Date filter */}
                <div className="rounded-xl border border-border bg-card p-4">
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
                        modifiers={{ event: eventDates }}
                        className="p-0"
                      />
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-primary" />
                          Dias con eventos
                        </span>
                      </div>
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

                {/* Upcoming events sidebar */}
                <div className="rounded-xl border border-border bg-card p-4">
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
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl"
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
