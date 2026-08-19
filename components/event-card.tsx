import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, ArrowUpRight, Clock, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getProductionLabel } from '@/lib/data'
import type { EventItem } from '@/lib/data'

interface EventCardProps {
  slug: string
  title: string
  description: string
  image: string
  date: string
  time: string
  location?: string
  price?: string
  category?: 'evento' | 'taller'
  production?: EventItem['production']
}

export function EventCard({ slug, title, description, image, date, time, location, price, category = 'evento', production }: EventCardProps) {
  const isBondi = production === 'bondi'
  const productionLabel = getProductionLabel(production)

  return (
    <Link
      href={`/evento/${slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 ease-cinematic hover:-translate-y-1.5 hover:bg-secondary hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
        isBondi
          ? 'border-primary/50 ring-1 ring-primary/20 hover:border-primary'
          : 'border-border hover:border-primary'
      }`}
    >
      {/* Image section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Arrow reveal on hover */}
        <div className="absolute right-3 top-3 flex size-8 translate-y-1 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 shadow-md transition-all duration-300 ease-cinematic group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>
        {isBondi && productionLabel && (
          <Badge className="absolute top-3 left-3 gap-1 bg-primary text-xs text-primary-foreground">
            <Star className="size-3 fill-current" />
            {productionLabel}
          </Badge>
        )}
      </div>

      {/* Content section - clear reading hierarchy */}
      <div className="flex flex-1 flex-col p-4">
        {/* 1. Date - most scannable, leads the hierarchy */}
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {date}
        </p>
        {/* 2. Title - primary identity */}
        <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-6 text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        {/* 3. Description - supporting detail, fixed 2 lines */}
        <p className="mt-2 line-clamp-2 h-10 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
        {/* 4. Meta footer - grouped logistics, pinned to bottom for alignment */}
        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-xs text-muted-foreground">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-xs text-muted-foreground">
              {location || 'El Bondi'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="size-3.5 shrink-0 text-primary" />
            <span className="truncate text-sm font-semibold text-primary">
              {price ? (price.toLowerCase().includes('gratis') || price.toLowerCase().includes('libre') ? 'Gratis' : price.split('/')[0]) : 'Gratis'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
