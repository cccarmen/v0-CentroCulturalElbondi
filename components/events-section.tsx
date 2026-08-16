import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CardSlider } from '@/components/card-slider'
import { getSortedEvents } from '@/lib/data'

export function EventsSection() {
  // Recurring events (e.g. Varieté) repeat monthly. On the homepage preview we
  // only want each title once (its next occurrence); the full programación page
  // still lists every date.
  const seen = new Set<string>()
  const featured = getSortedEvents()
    .filter((event) => {
      if (seen.has(event.title)) return false
      seen.add(event.title)
      return true
    })
    .slice(0, 4)

  return (
    <section id="eventos" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance text-center font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Eventos
          </h2>
        </ScrollReveal>
        <CardSlider items={featured} />
        <ScrollReveal>
          <div className="mt-6 flex justify-center">
            <Link
              href="/programacion?categoria=evento"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
            >
              Ver todos los eventos
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
