'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { EventCard } from '@/components/event-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import type { EventItem } from '@/lib/data'

const ITEMS_PER_PAGE = {
  sm: 1,
  md: 2,
  lg: 4,
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg'>('lg')

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w >= 1024) setBreakpoint('lg')
      else if (w >= 640) setBreakpoint('md')
      else setBreakpoint('sm')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return breakpoint
}

interface CardSliderProps {
  items: EventItem[]
}

export function CardSlider({ items }: CardSliderProps) {
  const breakpoint = useBreakpoint()
  const perPage = ITEMS_PER_PAGE[breakpoint]
  const totalPages = Math.ceil(items.length / perPage)

  const [activePage, setActivePage] = useState(0)

  // Reset to page 0 if breakpoint changes and active page overflows
  useEffect(() => {
    if (activePage >= totalPages) setActivePage(0)
  }, [totalPages, activePage])

  const visibleItems = useMemo(() => {
    const start = activePage * perPage
    return items.slice(start, start + perPage)
  }, [items, activePage, perPage])

  const goToPage = useCallback((page: number) => {
    setActivePage(page)
  }, [])

  return (
    <div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((item, index) => (
          <ScrollReveal key={`${activePage}-${item.slug}`} delay={index * 100} className="h-full">
            <EventCard
              slug={item.slug}
              title={item.title}
              description={item.description}
              image={item.image}
              date={item.date}
              time={item.time}
              location={item.location}
              price={item.price}
            />
          </ScrollReveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Ir a pagina ${i + 1}`}
              aria-current={i === activePage ? 'true' : undefined}
              className={`size-2.5 rounded-full transition-all duration-300 ${
                i === activePage
                  ? 'scale-110 bg-primary'
                  : 'bg-muted hover:bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
