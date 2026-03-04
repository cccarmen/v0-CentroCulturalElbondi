import { EventCard } from '@/components/event-card'
import { ScrollReveal } from '@/components/scroll-reveal'

const events = [
  {
    title: 'Noche de Varite',
    description: 'Espectaculo de circo, danza, comedia y musica en vivo. Una noche de varietes para toda la comunidad.',
    image: '/images/event-1.jpg',
    date: '15 Ene 2026',
    time: '20:00 hs',
  },
  {
    title: 'Festival de Musica',
    description: 'Bandas locales e invitados especiales. Una celebracion de la musica independiente regional.',
    image: '/images/event-2.jpg',
    date: '22 Ene 2026',
    time: '19:00 hs',
  },
  {
    title: 'Expo Arte Urbano',
    description: 'Exposicion colectiva de artistas urbanos. Graffiti, murales y arte contemporaneo en la comunidad.',
    image: '/images/event-3.jpg',
    date: '29 Ene 2026',
    time: '17:00 hs',
  },
  {
    title: 'A la Canasta!',
    description: 'Evento comunitario de intercambio y feria. Comida casera, artesanias y juegos para toda la familia.',
    image: '/images/event-4.jpg',
    date: '5 Feb 2026',
    time: '14:00 hs',
  },
]

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
            <ScrollReveal key={event.title} delay={index * 120}>
              <EventCard {...event} />
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
