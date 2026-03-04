import { EventCard } from '@/components/event-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { workshops } from '@/lib/data'

export function WorkshopsSection() {
  return (
    <section id="talleres" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance text-center font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Talleres y Bachillerato
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workshops.map((workshop, index) => (
            <ScrollReveal key={workshop.slug} delay={index * 120} className="h-full">
              <EventCard
                slug={workshop.slug}
                title={workshop.title}
                description={workshop.description}
                image={workshop.image}
                date={workshop.date}
                time={workshop.time}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
