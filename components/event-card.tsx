import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface EventCardProps {
  slug: string
  title: string
  description: string
  image: string
  date: string
  time: string
}

export function EventCard({ slug, title, description, image, date, time }: EventCardProps) {
  return (
    <Link
      href={`/evento/${slug}`}
      className="group relative flex h-[380px] w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      {/* Full-bleed image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-40% to-black/10" />

      {/* Content pinned to bottom — fixed height for consistency */}
      <div className="relative mt-auto flex h-[140px] flex-col justify-between rounded-b-xl bg-black/60 p-4 backdrop-blur-[2px]">
        <div className="flex flex-col gap-1.5 overflow-hidden">
          <h3 className="truncate text-lg font-semibold text-white drop-shadow-sm">{title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/90">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-white/80">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {time}
            </span>
          </div>
          <ArrowRight className="size-4 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </Link>
  )
}
