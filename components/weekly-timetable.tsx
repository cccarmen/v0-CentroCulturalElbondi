'use client'

import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { workshops, type EventItem } from '@/lib/data'

const DAYS_ORDER = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'] as const

type DayOfWeek = (typeof DAYS_ORDER)[number]

interface TimetableSlot {
  workshop: EventItem
  time: string
}

function parseDays(dateStr: string): DayOfWeek[] {
  const days: DayOfWeek[] = []
  for (const day of DAYS_ORDER) {
    if (dateStr.includes(day)) {
      days.push(day)
    }
  }
  return days
}

function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d{1,2}):(\d{2})/)
  if (!match) return 0
  return parseInt(match[1]) * 60 + parseInt(match[2])
}

function buildTimetable(): Map<DayOfWeek, TimetableSlot[]> {
  const timetable = new Map<DayOfWeek, TimetableSlot[]>()

  for (const day of DAYS_ORDER) {
    timetable.set(day, [])
  }

  for (const workshop of workshops) {
    const days = parseDays(workshop.date)
    for (const day of days) {
      timetable.get(day)?.push({
        workshop,
        time: workshop.time,
      })
    }
  }

  // Sort each day's slots by time
  for (const [day, slots] of timetable) {
    slots.sort((a, b) => parseTime(a.time) - parseTime(b.time))
    timetable.set(day, slots)
  }

  return timetable
}

// Consistent colors per workshop for visual distinction
const SLOT_COLORS = [
  { bg: 'bg-primary/15', border: 'border-primary/30', text: 'text-primary' },
  { bg: 'bg-chart-2/15', border: 'border-chart-2/30', text: 'text-chart-2' },
  { bg: 'bg-chart-3/15', border: 'border-chart-3/30', text: 'text-chart-3' },
  { bg: 'bg-chart-4/15', border: 'border-chart-4/30', text: 'text-chart-4' },
  { bg: 'bg-chart-5/15', border: 'border-chart-5/30', text: 'text-chart-5' },
  { bg: 'bg-chart-1/15', border: 'border-chart-1/30', text: 'text-chart-1' },
  { bg: 'bg-accent/30', border: 'border-accent/50', text: 'text-accent-foreground' },
  { bg: 'bg-secondary', border: 'border-secondary-foreground/20', text: 'text-secondary-foreground' },
]

function getWorkshopColor(index: number) {
  return SLOT_COLORS[index % SLOT_COLORS.length]
}

export function WeeklyTimetable() {
  const timetable = buildTimetable()

  // Build a consistent color map per workshop slug
  const colorMap = new Map<string, (typeof SLOT_COLORS)[number]>()
  workshops.forEach((w, i) => {
    colorMap.set(w.slug, getWorkshopColor(i))
  })

  return (
    <div className="mt-8">
      {/* Desktop timetable */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-xl border border-border">
          {/* Header row */}
          <div className="grid grid-cols-6 border-b border-border bg-muted">
            {DAYS_ORDER.map((day) => (
              <div
                key={day}
                className="border-r border-border px-3 py-3 text-center text-sm font-semibold text-foreground last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="grid grid-cols-6 bg-card">
            {DAYS_ORDER.map((day) => {
              const slots = timetable.get(day) || []
              return (
                <div
                  key={day}
                  className="flex min-h-[280px] flex-col gap-2 border-r border-border p-2 last:border-r-0"
                >
                  {slots.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center">
                      <span className="text-xs text-muted-foreground/50">Sin talleres</span>
                    </div>
                  ) : (
                    slots.map((slot) => {
                      const colors = colorMap.get(slot.workshop.slug) || SLOT_COLORS[0]
                      return (
                        <Link
                          key={slot.workshop.slug}
                          href={`/evento/${slot.workshop.slug}`}
                          className={`group flex flex-col gap-1.5 rounded-lg border ${colors.border} ${colors.bg} p-3 transition-all hover:shadow-md hover:scale-[1.02]`}
                        >
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {slot.workshop.title}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3 shrink-0" />
                            {slot.time}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" />
                            {slot.workshop.location.split(' - ')[0]}
                          </span>
                        </Link>
                      )
                    })
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile timetable - stacked by day */}
      <div className="flex flex-col gap-4 lg:hidden">
        {DAYS_ORDER.map((day) => {
          const slots = timetable.get(day) || []
          if (slots.length === 0) return null
          return (
            <div key={day} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="bg-muted px-4 py-2.5">
                <h3 className="text-sm font-semibold text-foreground">{day}</h3>
              </div>
              <div className="flex flex-col gap-2 p-3">
                {slots.map((slot) => {
                  const colors = colorMap.get(slot.workshop.slug) || SLOT_COLORS[0]
                  return (
                    <Link
                      key={slot.workshop.slug}
                      href={`/evento/${slot.workshop.slug}`}
                      className={`group flex items-center gap-4 rounded-lg border ${colors.border} ${colors.bg} p-3 transition-all hover:shadow-md`}
                    >
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {slot.workshop.title}
                        </span>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {slot.workshop.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {slot.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {slot.workshop.location.split(' - ')[0]}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
