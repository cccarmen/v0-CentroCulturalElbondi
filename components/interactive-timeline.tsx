'use client'

import { useState } from 'react'
import Image from 'next/image'

const timelineEvents = [
  {
    year: '2009',
    title: 'Primera asamblea del colectivo cultural',
    description: 'Primera asamblea del colectivo cultural.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-cumple.jpg', '/images/evento-ronda.jpg'],
  },
  {
    year: '2011',
    title: 'Ingreso al espacio ubicado en la calle El Dorado',
    description: 'Nace el Centro Cultural El Bondi.',
    images: ['/images/evento-musica.jpg', '/images/evento-variete.jpg', '/images/evento-folklore.jpg'],
  },
  {
    year: '2012',
    title: 'Creacion de la ONG',
    description: 'Creacion de la ONG Colectivo Cultural y primera asamblea.',
    images: ['/images/evento-musica.jpg', '/images/evento-variete.jpg', '/images/evento-folklore.jpg'],
  },
  {
    year: '2013',
    title: 'Primera retransmision Radioactiva',
    description: 'Primera retransmision Radioactiva.',
    images: ['/images/evento-musica.jpg', '/images/evento-variete.jpg', '/images/evento-folklore.jpg'],
  },

  {
    year: '2016',
    title: 'Primera tertulia rebelde',
    description: 'Primera tertulia rebelde.',
    images: ['/images/evento-ronda.jpg', '/images/evento-pareja.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2019',
    title: 'Primera Variete Bajo las Estrellas',
    description: 'Primera Variete Bajo las Estrellas.',
    images: ['/images/evento-baile-atardecer.jpg', '/images/evento-folklore.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2020',
    title: 'Viandas comunitarias',
    description: 'Proyecto de viandas para cuidarnos entre vecines durante la pandemia. El espacio comunitario que nunca cierra.',
    images: ['/images/evento-fiesta.jpg', '/images/evento-danza-circulo.jpg', '/images/evento-encuentro.jpg'],
  },
  {
    year: '2021',
    title: 'Actividades pospandemia',
    description: 'Primeras actividades pospandemia.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-ronda.jpg', '/images/evento-cumple.jpg'],
  },
  {
    year: '2022',
    title: 'Inicio del Bachi Popular',
    description: 'Inicio del Bachi Popular.',
    images: ['/images/evento-folklore.jpg', '/images/evento-musica.jpg', '/images/evento-variete.jpg'],
  },
  {
    year: '2023',
    title: 'Viandas comunitarias',
    description: 'Proyecto de viandas para cuidarnos entre vecines durante la pandemia. El espacio comunitario que nunca cierra.',
    images: ['/images/evento-cumple.jpg', '/images/evento-pareja.jpg', '/images/evento-ronda.jpg'],
  },
  {
    year: '2024',
    title: 'Actividades pospandemia',
    description: 'Primeras actividades pospandemia.',
    images: ['/images/evento-baile-atardecer.jpg', '/images/evento-fiesta.jpg', '/images/evento-encuentro.jpg'],
  },
  {
    year: '2025',
    title: 'Abuela en el Bondi',
    description: 'Abuela en el Bondi: Taty Almeida.',
    images: ['/images/evento-danza-circulo.jpg', '/images/evento-folklore.jpg', '/images/evento-variete.jpg'],
  },
  {
    year: '2026',
    title: 'Cumple de 15 Bondi',
    description: 'La mejor pena hasta ahora. Cumple de 15 Bondi.',
    images: ['/images/evento-fiesta.jpg', '/images/evento-musica.jpg', '/images/evento-cumple.jpg'],
  },
]

export function InteractiveTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Nuestra Historia
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            15 Anos Construyendo Comunidad
          </h2>
        </div>

        {/* Interactive timeline */}
        <div className="relative">
          {/* Timeline list */}
          <div className="relative" role="list" aria-label="Linea de tiempo de El Bondi">
            {/* Vertical line accent */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden="true" />

            <ul className="flex flex-col">
              {timelineEvents.map((event, index) => (
                <li
                  key={event.year}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
                  role="listitem"
                  aria-label={`${event.year}: ${event.title}. ${event.description}`}
                  className="group relative cursor-pointer border-b border-border/30 transition-colors hover:bg-muted/30 focus:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  <div className="flex items-center gap-4 py-5 pl-6 pr-4 md:gap-8 md:py-6">
                    {/* Year */}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-display text-3xl tabular-nums transition-all duration-300 md:text-4xl lg:text-5xl ${
                        hoveredIndex === index
                          ? 'text-primary'
                          : 'text-muted-foreground/50'
                      }`}
                    >
                      {event.year}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-base font-semibold leading-tight transition-all duration-300 md:text-lg lg:text-xl ${
                          hoveredIndex === index
                            ? 'text-foreground'
                            : 'text-foreground/80'
                        }`}
                      >
                        {event.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm leading-relaxed transition-all duration-300 md:text-base ${
                          hoveredIndex === index
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground/70'
                        }`}
                      >
                        {event.description}
                      </p>
                    </div>

                    {/* 3 Images on right - visible on hover */}
                    <div 
                      className={`hidden shrink-0 items-center gap-2 transition-all duration-300 md:flex ${
                        hoveredIndex === index 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-4 opacity-0'
                      }`}
                      aria-hidden="true"
                    >
                      {event.images.map((img, imgIndex) => (
                        <div 
                          key={imgIndex}
                          className="relative h-16 w-16 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 lg:h-20 lg:w-20"
                          style={{
                            transitionDelay: `${imgIndex * 50}ms`,
                          }}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-1 bg-primary transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
