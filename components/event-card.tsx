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
      {/* Image section - given prominence with a taller 4:3 ratio */}
      <div className="relative aspect-[4/3] overflow-hidden">
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

      {/* Content section - clear reading hierarchy with even spacing */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* 1. "When" - date + time grouped as the scannable eyebrow */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>{date}</span>
          <span className="size-1 rounded-full bg-primary/50" aria-hidden="true" />
          <span className="inline-flex items-center gap-1 font-medium normal-case tracking-normal text-muted-foreground">
            <Clock className="size-3.5 shrink-0" />
            {time}
          </span>
        </div>

        {/* 2. Title + description - the identity block */}
        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* 3. Footer - "where" and "how much", each on its own row so long values stay readable */}
        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{location || 'El Bondi'}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Ticket className="size-3.5 shrink-0" />
            <span className="truncate">
              {price ? (price.toLowerCase().includes('gratis') || price.toLowerCase().includes('libre') ? 'Gratis' : price.split('/')[0]) : 'Gratis'}
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
