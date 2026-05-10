import { ScrollReveal } from '@/components/scroll-reveal'

const timelineEvents = [
  {
    year: '2009',
    title: 'Primera asamblea del colectivo cultural',
    description: 'Primera asamblea del colectivo cultural.',
  },
  {
    year: '2011',
    title: 'Ingreso al espacio ubicado en la calle El Dorado',
    description: 'Nace el Centro Cultural El Bondi.',
  },
  {
    year: '2012',
    title: 'Creacion de la ONG',
    description: 'Creacion de la ONG Colectivo Cultural y primera asamblea.',
  },
  {
    year: '2013',
    title: 'Primera retransmision Radioactiva',
    description: 'Primera retransmision Radioactiva.',
  },

  {
    year: '2016',
    title: 'Primera tertulia rebelde',
    description: 'Primera tertulia rebelde.',
  },
  {
    year: '2019',
    title: 'Primera Variete Bajo las Estrellas',
    description: 'Primera Variete Bajo las Estrellas.',
  },
  {
    year: '2020',
    title: 'Viandas comunitarias',
    description: 'Proyecto de viandas para cuidarnos entre vecines durante la pandemia. El espacio comunitario que nunca cierra.',
  },
  {
    year: '2021',
    title: 'Actividades pospandemia',
    description: 'Primeras actividades pospandemia.',
  },
  {
    year: '2022',
    title: 'Inicio del Bachi Popular',
    description: 'Inicio del Bachi Popular.',
  },
  {
    year: '2023',
    title: 'Viandas comunitarias',
    description: 'Proyecto de viandas para cuidarnos entre vecines durante la pandemia. El espacio comunitario que nunca cierra.',
  },
  {
    year: '2024',
    title: 'Actividades pospandemia',
    description: 'Primeras actividades pospandemia.',
  },
  {
    year: '2025',
    title: 'Abuela en el Bondi',
    description: 'Abuela en el Bondi: Taty Almeida.',
  },
  {
    year: '2026',
    title: 'Cumple de 15 Bondi',
    description: 'La mejor pena hasta ahora. Cumple de 15 Bondi.',
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
