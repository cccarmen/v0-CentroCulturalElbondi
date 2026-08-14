'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
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

  // Group items into pages, each page holds `perPage` items.
  const pages = useMemo(() => {
    const result: EventItem[][] = []
    for (let i = 0; i < items.length; i += perPage) {
      result.push(items.slice(i, i + perPage))
    }
    return result
  }, [items, perPage])

  const totalPages = pages.length
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)

  // Keep the active dot in sync with the scroll position.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const page = Math.round(el.scrollLeft / el.clientWidth)
    setActivePage(page)
  }, [])

  const goToPage = useCallback((page: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' })
  }, [])

  // Reset scroll to start when the breakpoint (and therefore paging) changes.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    setActivePage(0)
  }, [perPage])

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="grid w-full shrink-0 snap-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {page.map((item, index) => (
              <ScrollReveal key={item.slug} delay={index * 100} className="h-full">
                <EventCard
                  slug={item.slug}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  date={item.date}
                  time={item.time}
                  location={item.location}
                  price={item.price}
                  category={item.category}
                  production={item.production}
                />
              </ScrollReveal>
            ))}
          </div>
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
