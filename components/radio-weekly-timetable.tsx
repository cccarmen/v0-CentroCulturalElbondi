'use client'

import { useMemo } from 'react'
import { Clock, Radio, Music, Mic, MessageSquare, Newspaper, Users, Heart } from 'lucide-react'

interface RadioProgram {
  id: number
  title: string
  schedule: string
  host: string
  category: string
  duration: string
}

interface RadioWeeklyTimetableProps {
  programs: RadioProgram[]
}

const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados', 'Domingos'] as const
type Day = typeof DAYS[number]

interface TimetableItem {
  id: number
  title: string
  time: string
  host: string
  category: string
  duration: string
}

const categoryIcons: Record<string, typeof Radio> = {
  musica: Music,
  cultural: Mic,
  debate: MessageSquare,
  noticias: Newspaper,
  infantil: Heart,
}

const categoryColors: Record<string, string> = {
  musica: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30',
  cultural: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30',
  debate: 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/30',
  noticias: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30',
  infantil: 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/30',
}

function parseSchedule(schedule: string): { days: Day[]; time: string } {
  const lower = schedule.toLowerCase()
  const days: Day[] = []
  
  // Extract time (look for patterns like "18:00", "20:00 hs")
  const timeMatch = schedule.match(/(\d{1,2}:\d{2})/)?.[1] || ''
  const time = timeMatch ? `${timeMatch} hs` : schedule
  
  // Check for "Lunes a Viernes" pattern
  if (lower.includes('lunes a viernes')) {
    days.push('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes')
    return { days, time }
  }
  
  // Check individual days
  if (lower.includes('lunes')) days.push('Lunes')
  if (lower.includes('martes')) days.push('Martes')
  if (lower.includes('miercoles') || lower.includes('miércoles')) days.push('Miercoles')
  if (lower.includes('jueves')) days.push('Jueves')
  if (lower.includes('viernes')) days.push('Viernes')
  if (lower.includes('sabado') || lower.includes('sábado') || lower.includes('sabados') || lower.includes('sábados')) days.push('Sabados')
  if (lower.includes('domingo') || lower.includes('domingos')) days.push('Domingos')
  
  return { days, time }
}

export function RadioWeeklyTimetable({ programs }: RadioWeeklyTimetableProps) {
  const timetableData = useMemo(() => {
    const data: Record<Day, TimetableItem[]> = {
      Lunes: [],
      Martes: [],
      Miercoles: [],
      Jueves: [],
      Viernes: [],
      Sabados: [],
      Domingos: [],
    }

    programs.forEach((program) => {
      const { days, time } = parseSchedule(program.schedule)
      
      days.forEach((day) => {
        data[day].push({
          id: program.id,
          title: program.title,
          time,
          host: program.host,
          category: program.category,
          duration: program.duration,
        })
      })
    })

    // Sort each day by time
    Object.keys(data).forEach((day) => {
      data[day as Day].sort((a, b) => {
        const timeA = parseInt(a.time.replace(/[^0-9]/g, '')) || 0
        const timeB = parseInt(b.time.replace(/[^0-9]/g, '')) || 0
        return timeA - timeB
      })
    })

    return data
  }, [programs])

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <div className="min-w-[800px]">
        {/* Header row */}
        <div className="grid grid-cols-7 gap-px bg-border">
          {DAYS.map((day) => (
            <div
              key={day}
              className="bg-muted/80 px-2 py-2.5 text-center text-xs font-semibold text-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Content row */}
        <div className="grid grid-cols-7 gap-px bg-border">
          {DAYS.map((day) => (
            <div key={day} className="flex min-h-[200px] flex-col gap-1.5 bg-card/50 p-1.5">
              {timetableData[day].length > 0 ? (
                timetableData[day].map((item, index) => {
                  const IconComponent = categoryIcons[item.category] || Radio
                  const colorClass = categoryColors[item.category] || 'bg-primary/10 hover:bg-primary/20'
                  
                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className={`group overflow-hidden rounded-lg border p-2.5 transition-all ${colorClass}`}
                    >
                      <div className="flex items-start gap-1.5">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-background/50">
                          <IconComponent className="size-3 text-foreground" />
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <h4 className="truncate text-xs font-semibold leading-tight text-foreground" title={item.title}>
                            {item.title}
                          </h4>
                          <p className="mt-0.5 truncate text-[10px] text-muted-foreground" title={item.host}>
                            {item.host}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="size-2.5 shrink-0" />
                        <span className="truncate">{item.time}</span>
                        <span className="shrink-0 text-muted-foreground/50">·</span>
                        <span className="truncate">{item.duration}</span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[10px] text-muted-foreground/40">-</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
