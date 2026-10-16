import eventosData from '@/content/eventos.json'
import talleresData from '@/content/talleres.json'

export type EventType = 'teatro' | 'circo' | 'musica' | 'feria' | 'variedades'

export const EVENT_TYPES: { value: EventType; label: string; icon: string }[] = [
  { value: 'teatro', label: 'Teatro', icon: 'theater' },
  { value: 'circo', label: 'Circo', icon: 'sparkles' },
  { value: 'musica', label: 'Música', icon: 'music' },
  { value: 'feria', label: 'Feria', icon: 'store' },
  { value: 'variedades', label: 'Variedades', icon: 'palette' },
]

export interface EventItem {
  slug: string
  title: string
  description: string
  fullDescription: string
  image: string
  date: string
  time: string
  category: 'evento' | 'taller'
  eventType?: EventType
  production?: 'bondi' | 'externa'
  location: string
  price: string
  maxParticipants?: number
  contact: string
  whatsapp?: string
  instagram?: string
  calendarDate?: string // ISO date string for calendar matching e.g. "2026-09-05"
  instructor?: {
    name: string
    avatar: string
    bio: string
  }
}

// Pages CMS writes empty optional fields as "" or null, so they are stripped
// here to keep the EventItem shape the components already rely on.
type RawItem = Omit<EventItem, 'category' | 'eventType' | 'production' | 'maxParticipants'> & {
  eventType?: string | null
  production?: string | null
  maxParticipants?: number | null
}

const OPTIONAL_STRINGS = ['whatsapp', 'instagram', 'calendarDate'] as const

function normalize(items: RawItem[], category: EventItem['category']): EventItem[] {
  return items
    .filter((item) => item && typeof item.slug === 'string' && item.slug.trim() !== '')
    .map((item) => {
      const normalized = { ...item, category } as EventItem
      for (const key of OPTIONAL_STRINGS) {
        if (typeof normalized[key] === 'string' && normalized[key]!.trim() === '') {
          delete normalized[key]
        }
      }
      if (!normalized.eventType) delete normalized.eventType
      if (!normalized.production) delete normalized.production
      if (normalized.maxParticipants == null) delete normalized.maxParticipants
      if (normalized.instructor && !normalized.instructor.name?.trim()) {
        delete normalized.instructor
      }
      return normalized
    })
}

export const events: EventItem[] = normalize(eventosData as RawItem[], 'evento')

export const workshops: EventItem[] = normalize(talleresData as RawItem[], 'taller')

const PRODUCTION_LABELS: Record<NonNullable<EventItem['production']>, string> = {
  bondi: 'Producción de El Bondi',
  externa: '',
}

export function getProductionLabel(production?: EventItem['production']): string {
  if (!production) return ''
  return PRODUCTION_LABELS[production]
}

// Events sorted chronologically by date so the closest events always come
// first. El Bondi productions are still highlighted visually (star badge and
// ring on the card) rather than being reordered to the top.
export function getSortedEvents(source: EventItem[] = events): EventItem[] {
  const byDate = (a: EventItem, b: EventItem) => {
    if (!a.calendarDate || !b.calendarDate) return 0
    return new Date(a.calendarDate).getTime() - new Date(b.calendarDate).getTime()
  }

  return [...source].sort(byDate)
}

export function getAllItems(): EventItem[] {
  return [...events, ...workshops]
}

export function getItemBySlug(slug: string): EventItem | undefined {
  return getAllItems().find((item) => item.slug === slug)
}

export function getRelatedItems(slug: string, limit = 3): EventItem[] {
  const current = getItemBySlug(slug)
  if (!current) return []
  return getAllItems()
    .filter((item) => item.slug !== slug && item.category === current.category)
    .slice(0, limit)
}

export function getEventDates(): Date[] {
  return getAllItems()
    .filter((item) => item.calendarDate)
    .map((item) => new Date(item.calendarDate! + 'T12:00:00'))
}

export function getItemsByDate(dateStr: string): EventItem[] {
  return getAllItems().filter((item) => item.calendarDate === dateStr)
}
