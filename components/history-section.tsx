import { ScrollReveal } from '@/components/scroll-reveal'

const timelineEvents = [
  {
    year: '2010',
    title: 'Fundacion',
    description: 'El Bondi nace como un proyecto comunitario en Maschwitz, con el objetivo de brindar cultura y educacion.',
  },
  {
    year: '2012',
    title: 'Primer Festival',
    description: 'Se realiza el primer festival cultural comunitario, convocando artistas y vecinos de toda la zona norte.',
  },
  {
    year: '2014',
    title: 'Radio Activa',
    description: 'Nace la radio comunitaria FM 96.9 como herramienta de comunicacion popular y participacion ciudadana.',
  },
  {
    year: '2016',
    title: 'Bachillerato Popular',
    description: 'Se inaugura el bachillerato popular para jovenes y adultos, ofreciendo educacion inclusiva y accesible.',
  },
  {
    year: '2018',
    title: 'Ampliacion del Espacio',
    description: 'Se amplian las instalaciones con nuevas aulas, salon de ensayo y espacio para talleres artisticos.',
  },
  {
    year: '2020',
    title: 'Resistencia Digital',
    description: 'Adaptacion a la virtualidad durante la pandemia, manteniendo talleres, radio y acompanamiento comunitario.',
  },
  {
    year: '2022',
    title: 'Reapertura Cultural',
    description: 'Vuelta a la presencialidad con programacion completa de espectaculos, talleres y actividades educativas.',
  },
  {
    year: '2024',
    title: 'Nuevo Escenario',
    description: 'Se inaugura el nuevo escenario al aire libre para festivales y eventos culturales de mayor convocatoria.',
  },
  {
    year: '2026',
    title: 'Expansion Comunitaria',
    description: 'El Bondi se expande con nuevos proyectos de arte, educacion y comunicacion para la comunidad.',
  },
]

export function HistorySection() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance text-center font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Historia del Lugar
          </h2>
        </ScrollReveal>

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-primary/30" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0
              return (
                <ScrollReveal
                  key={event.year}
                  delay={index * 100}
                  direction={isLeft ? 'left' : 'right'}
                >
                <div
                  className={`relative flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-[calc(50%-24px)] ${isLeft ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">{event.year}</span>
                    <h3 className="mt-0.5 text-base font-semibold text-foreground">{event.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 mx-3 flex size-6 shrink-0 items-center justify-center">
                    <div className="size-3 rounded-full border-2 border-primary bg-background" />
                  </div>

                  {/* Spacer */}
                  <div className="w-[calc(50%-24px)]" />
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
