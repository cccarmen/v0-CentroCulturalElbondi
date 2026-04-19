'use client'

import { useMemo, useState } from 'react'
import { Clock, Users, Mic, Radio as RadioIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  RADIO_DAYS,
  RADIO_CATEGORIES,
  radioShows,
  getCurrentDay,
  type RadioCategory,
  type RadioDay,
  type RadioShow,
} from '@/lib/radio-shows'

// Color por categoria - usa design tokens del tema
const categoryStyles: Record<RadioCategory, { bg: string; border: string; text: string; dot: string }> = {
  musica: {
    bg: 'bg-primary/10 hover:bg-primary/20',
    border: 'border-l-primary',
    text: 'text-primary',
    dot: 'bg-primary',
  },
  informativo: {
    bg: 'bg-chart-2/10 hover:bg-chart-2/20',
    border: 'border-l-chart-2',
    text: 'text-chart-2',
    dot: 'bg-chart-2',
  },
  cultural: {
    bg: 'bg-chart-4/10 hover:bg-chart-4/20',
    border: 'border-l-chart-4',
    text: 'text-chart-4',
    dot: 'bg-chart-4',
  },
  debate: {
    bg: 'bg-chart-3/10 hover:bg-chart-3/20',
    border: 'border-l-chart-3',
    text: 'text-chart-3',
    dot: 'bg-chart-3',
  },
  infantil: {
    bg: 'bg-chart-5/10 hover:bg-chart-5/20',
    border: 'border-l-chart-5',
    text: 'text-chart-5',
    dot: 'bg-chart-5',
  },
  deportes: {
    bg: 'bg-accent/40 hover:bg-accent/60',
    border: 'border-l-accent-foreground',
    text: 'text-accent-foreground',
    dot: 'bg-accent-foreground',
  },
}

interface RadioWeeklyGridProps {
  categoryFilter: RadioCategory | 'todos'
}

export function RadioWeeklyGrid({ categoryFilter }: RadioWeeklyGridProps) {
  const [activeDay, setActiveDay] = useState<RadioDay>(() => getCurrentDay())

  // Organiza los programas por dia, filtrando por categoria
  const showsByDay = useMemo(() => {
    const map: Record<RadioDay, RadioShow[]> = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
    }

    const filtered =
      categoryFilter === 'todos'
        ? radioShows
        : radioShows.filter((s) => s.category === categoryFilter)

    filtered.forEach((show) => {
      show.days.forEach((day) => {
        map[day].push(show)
      })
    })

    // Ordena cada dia por hora de inicio
    ;(Object.keys(map) as RadioDay[]).forEach((day) => {
      map[day].sort((a, b) => a.startTime.localeCompare(b.startTime))
    })

    return map
  }, [categoryFilter])

  const totalShows = Object.values(showsByDay).reduce(
    (acc, dayShows) => acc + dayShows.length,
    0,
  )

  if (totalShows === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <RadioIcon className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          No hay programas para esta categoria
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Probá seleccionando otra categoria para ver mas programas de la grilla.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Vista mobile: Tabs por dia */}
      <div className="lg:hidden">
        <DayTabs activeDay={activeDay} onChange={setActiveDay} showsByDay={showsByDay} />
        <div className="mt-4">
          <DayColumn
            day={activeDay}
            shows={showsByDay[activeDay]}
            variant="mobile"
          />
        </div>
      </div>

      {/* Vista desktop: Grilla semanal completa */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Encabezado de dias */}
            <div className="grid grid-cols-7 gap-1 rounded-t-xl bg-muted/50 p-1">
              {RADIO_DAYS.map((day) => {
                const isToday = day.value === getCurrentDay()
                return (
                  <div
                    key={day.value}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold ${
                      isToday
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground'
                    }`}
                  >
                    {day.label}
                    {isToday && (
                      <span className="text-[10px] font-normal uppercase opacity-80">
                        hoy
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Columnas de programas */}
            <div className="grid grid-cols-7 gap-1 rounded-b-xl border border-t-0 border-border bg-muted/30 p-1">
              {RADIO_DAYS.map((day) => (
                <DayColumn
                  key={day.value}
                  day={day.value}
                  shows={showsByDay[day.value]}
                  variant="desktop"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ayuda de scroll para pantallas medianas */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Deslizá horizontalmente para ver todos los dias.
        </p>
      </div>
    </>
  )
}

/* --- Tabs de dias para mobile --- */
function DayTabs({
  activeDay,
  onChange,
  showsByDay,
}: {
  activeDay: RadioDay
  onChange: (day: RadioDay) => void
  showsByDay: Record<RadioDay, RadioShow[]>
}) {
  return (
    <div className="sticky top-16 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur-sm">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {RADIO_DAYS.map((day) => {
          const isActive = activeDay === day.value
          const isToday = day.value === getCurrentDay()
          const count = showsByDay[day.value].length
          return (
            <button
              key={day.value}
              onClick={() => onChange(day.value)}
              className={`flex shrink-0 flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              aria-pressed={isActive}
            >
              <span className="text-[10px] uppercase opacity-70">
                {isToday ? 'Hoy' : day.short}
              </span>
              <span className="text-sm font-semibold">{day.label}</span>
              <span
                className={`text-[10px] ${isActive ? 'opacity-90' : 'opacity-60'}`}
              >
                {count} {count === 1 ? 'prog.' : 'progs.'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* --- Columna de un dia (shared mobile & desktop) --- */
function DayColumn({
  day,
  shows,
  variant,
}: {
  day: RadioDay
  shows: RadioShow[]
  variant: 'mobile' | 'desktop'
}) {
  if (variant === 'desktop') {
    return (
      <div className="flex min-h-[300px] flex-col gap-1.5 p-1.5">
        {shows.length > 0 ? (
          shows.map((show) => <ShowCard key={`${show.id}-${day}`} show={show} compact />)
        ) : (
          <div className="flex h-full min-h-[120px] items-center justify-center rounded-lg border border-dashed border-border/60 p-3 text-center">
            <span className="text-xs text-muted-foreground/60">Sin programacion</span>
          </div>
        )}
      </div>
    )
  }

  // Mobile
  return (
    <div className="flex flex-col gap-3">
      {shows.length > 0 ? (
        shows.map((show) => <ShowCard key={`${show.id}-${day}`} show={show} />)
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
          <RadioIcon className="mb-2 size-6 text-muted-foreground/60" />
          <p className="text-sm text-muted-foreground">
            Sin programacion para este dia
          </p>
        </div>
      )}
    </div>
  )
}

/* --- Card de un programa --- */
function ShowCard({ show, compact = false }: { show: RadioShow; compact?: boolean }) {
  const style = categoryStyles[show.category]
  const categoryLabel = RADIO_CATEGORIES.find((c) => c.value === show.category)?.label

  if (compact) {
    return (
      <article
        className={`group rounded-lg border-l-4 ${style.border} ${style.bg} p-3 transition-all hover:shadow-md`}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tabular-nums text-foreground">
          <Clock className="size-3 shrink-0" />
          <span>
            {show.startTime} - {show.endTime}
          </span>
          {show.isLive && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-red-500/15 px-1.5 py-0.5 text-[9px] font-bold text-red-600 dark:text-red-400">
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
              VIVO
            </span>
          )}
        </div>
        <h4 className="mt-1.5 text-sm font-semibold leading-tight text-foreground line-clamp-2">
          {show.title}
        </h4>
        {show.hosts && (
          <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground line-clamp-1">
            <Mic className="size-2.5 shrink-0" />
            {show.hosts}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {categoryLabel}
          </span>
        </div>
      </article>
    )
  }

  return (
    <article
      className={`rounded-xl border border-border border-l-4 ${style.border} bg-card p-4 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold tabular-nums text-foreground">
          <Clock className="size-4 shrink-0 text-muted-foreground" />
          <span>
            {show.startTime} - {show.endTime}
          </span>
        </div>
        <Badge variant="secondary" className="gap-1.5 text-[10px]">
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          {categoryLabel}
        </Badge>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-tight text-foreground">
        {show.title}
        {show.isLive && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 align-middle text-[10px] font-bold text-red-600 dark:text-red-400">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            VIVO
          </span>
        )}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {show.description}
      </p>

      {show.hosts && (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <Users className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{show.hosts}</span>
        </div>
      )}
    </article>
  )
}
