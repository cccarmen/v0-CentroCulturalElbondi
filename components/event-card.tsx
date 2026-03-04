'use client'

import { useState } from 'react'
import { Calendar, Clock, X } from 'lucide-react'

interface EventCardProps {
  title: string
  description: string
  image: string
  date: string
  time: string
}

export function EventCard({ title, description, image, date, time }: EventCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="group relative flex h-[380px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border/50 bg-card text-left shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      >
        {/* Full-bleed image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay — stronger and taller for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-40% to-black/10" />

        {/* Content pinned to bottom with solid backing — fixed height for consistency */}
        <div className="relative mt-auto flex h-[140px] flex-col justify-between rounded-b-xl bg-black/60 p-4 backdrop-blur-[2px]">
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <h3 className="truncate text-lg font-semibold text-white drop-shadow-sm">{title}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-white/90">{description}</p>
          </div>
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
        </div>
      </button>

      {/* Expanded overlay */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={image} alt={title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Cerrar"
            >
              <X className="size-4" />
            </button>
            <div className="flex flex-col gap-3 p-6">
              <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {time}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
