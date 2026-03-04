import { EventCard } from '@/components/event-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { events } from '@/lib/data'

export function EventsSection() {
  return (
    <section id="eventos" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance text-center font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Eventos y Novedades
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <ScrollReveal key={event.slug} delay={index * 120} className="h-full">
              <EventCard
                slug={event.slug}
                title={event.title}
                description={event.description}
                image={event.image}
                date={event.date}
                time={event.time}
              />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-muted" />
          <span className="size-2 rounded-full bg-muted" />
        </div>
      </div>
    </section>
  )
}
