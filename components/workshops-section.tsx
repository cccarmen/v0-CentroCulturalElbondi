import { EventCard } from '@/components/event-card'
import { ScrollReveal } from '@/components/scroll-reveal'

const workshops = [
  {
    title: 'Acrobacias Aereas',
    description: 'Taller de telas y trapecio para principiantes y avanzados. Desarrollo fisico y artistico.',
    image: '/images/workshop-1.jpg',
    date: 'Lunes y Miercoles',
    time: '18:00 hs',
  },
  {
    title: 'Teatro Comunitario',
    description: 'Espacio de formacion teatral abierto a la comunidad. Exploracion escenica y trabajo grupal.',
    image: '/images/workshop-2.jpg',
    date: 'Martes y Jueves',
    time: '19:00 hs',
  },
  {
    title: 'Danza Contemporanea',
    description: 'Clases de danza contemporanea para todos los niveles. Expresion corporal y creatividad en movimiento.',
    image: '/images/workshop-3.jpg',
    date: 'Miercoles y Viernes',
    time: '17:00 hs',
  },
  {
    title: 'Produccion Musical',
    description: 'Taller de produccion y grabacion musical. Aprendizaje de herramientas de audio y composicion.',
    image: '/images/workshop-4.jpg',
    date: 'Sabados',
    time: '15:00 hs',
  },
]

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
            <ScrollReveal key={workshop.title} delay={index * 120} className="h-full">
              <EventCard {...workshop} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
