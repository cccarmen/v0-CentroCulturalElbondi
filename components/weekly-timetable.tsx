'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import { workshops, events, type EventItem } from '@/lib/data'

type TimetableMode = 'eventos' | 'talleres'

interface WeeklyTimetableProps {
  mode?: TimetableMode
}

const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'] as const
type Day = typeof DAYS[number]

interface TimetableItem {
  title: string
  time: string
  location: string
  slug: string
  category: 'evento' | 'taller'
}

function getDayFromDateString(dateStr: string): Day | null {
  const lower = dateStr.toLowerCase()
  if (lower.includes('lunes')) return 'Lunes'
  if (lower.includes('martes')) return 'Martes'
  if (lower.includes('miercoles') || lower.includes('miércoles')) return 'Miercoles'
  if (lower.includes('jueves')) return 'Jueves'
  if (lower.includes('viernes')) return 'Viernes'
  if (lower.includes('sabado') || lower.includes('sábado') || lower.includes('sabados') || lower.includes('sábados')) return 'Sabados'
  return null
}

function parseMultipleDays(dateStr: string): Day[] {
  const days: Day[] = []
  const lower = dateStr.toLowerCase()
  
  if (lower.includes('lunes')) days.push('Lunes')
  if (lower.includes('martes')) days.push('Martes')
  if (lower.includes('miercoles') || lower.includes('miércoles')) days.push('Miercoles')
  if (lower.includes('jueves')) days.push('Jueves')
  if (lower.includes('viernes')) days.push('Viernes')
  if (lower.includes('sabado') || lower.includes('sábado') || lower.includes('sabados') || lower.includes('sábados')) days.push('Sabados')
  
  return days
}

export function WeeklyTimetable({ mode = 'talleres' }: WeeklyTimetableProps) {
  const timetableData = useMemo(() => {
    const data: Record<Day, TimetableItem[]> = {
      Lunes: [],
      Martes: [],
      Miercoles: [],
      Jueves: [],
      Viernes: [],
      Sabados: [],
    }

    const items = mode === 'talleres' ? workshops : events

    items.forEach((item) => {
      const days = parseMultipleDays(item.date)
      
      days.forEach((day) => {
        data[day].push({
          title: item.title,
          time: item.time,
          location: item.location.replace(' - El Bondi', ''),
          slug: item.slug,
          category: item.category,
        })
      })
    })

    // Sort each day by time
    Object.keys(data).forEach((day) => {
      data[day as Day].sort((a, b) => {
        const timeA = parseInt(a.time.replace(/[^0-9]/g, ''))
        const timeB = parseInt(b.time.replace(/[^0-9]/g, ''))
        return timeA - timeB
      })
    })

    return data
  }, [mode])

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header row */}
        <div className="grid grid-cols-6 gap-1 rounded-t-xl bg-muted/50 p-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="rounded-lg bg-card px-3 py-3 text-center text-sm font-semibold text-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Content row */}
        <div className="grid grid-cols-6 gap-1 rounded-b-xl border border-t-0 border-border bg-muted/30 p-1">
          {DAYS.map((day) => (
            <div key={day} className="flex min-h-[200px] flex-col gap-2 p-2">
              {timetableData[day].length > 0 ? (
                timetableData[day].map((item, index) => (
                  <Link
                    key={`${item.slug}-${index}`}
                    href={item.category === 'evento' ? `/evento/${item.slug}` : `/evento/${item.slug}`}
                    className="group rounded-lg bg-primary/10 p-3 transition-all hover:bg-primary/20 hover:shadow-md"
                  >
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {item.title}
                    </h4>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{item.time}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs text-muted-foreground/50">-</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
