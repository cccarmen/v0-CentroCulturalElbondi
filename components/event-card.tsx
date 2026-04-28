import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
}

export function EventCard({ slug, title, description, image, date, time, location, price, category = 'evento' }: EventCardProps) {
  return (
    <Link
      href={`/evento/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      {/* Image section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 text-xs">
          {category === 'taller' ? 'Taller' : 'Evento'}
        </Badge>
      </div>

      {/* Content section - consistent spacing */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title - fixed 2 lines, ~48px height */}
        <h3 className="line-clamp-2 h-12 text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {/* Date/Time - below title */}
        <p className="mt-1 text-xs font-medium text-primary/80">
          {date} - {time}
        </p>
        {/* Description - fixed 2 lines ~40px height */}
        <p className="mt-2 line-clamp-2 h-10 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
        {/* Location - 8px gap, border top, truncate */}
        <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-xs text-muted-foreground">
            {location || 'El Bondi'}
          </span>
        </div>
        {/* Price - truncate if too long */}
        <p className="mt-2 truncate text-sm font-medium text-primary">
          {price ? (price.toLowerCase().includes('gratis') || price.toLowerCase().includes('libre') ? 'Gratis' : price.split('/')[0]) : 'Gratis'}
        </p>
      </div>
    </Link>
  )
}
