'use client'

import { useState } from 'react'
import Image from 'next/image'

const timelineEvents = [
  {
    year: '2010',
    title: 'Fundacion',
    description: 'El Bondi nace como un proyecto comunitario en Maschwitz.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-cumple.jpg', '/images/evento-ronda.jpg'],
  },
  {
    year: '2012',
    title: 'Primer Festival',
    description: 'Se realiza el primer festival cultural comunitario.',
    images: ['/images/evento-musica.jpg', '/images/evento-variete.jpg', '/images/evento-folklore.jpg'],
  },
  {
    year: '2014',
    title: 'Radio Activa',
    description: 'Nace la radio comunitaria FM 96.9.',
    images: ['/images/evento-variete.jpg', '/images/evento-musica.jpg', '/images/evento-encuentro.jpg'],
  },
  {
    year: '2016',
    title: 'Bachillerato Popular',
    description: 'Se inaugura el bachillerato popular para jovenes y adultos.',
    images: ['/images/evento-folklore.jpg', '/images/evento-ronda.jpg', '/images/evento-cumple.jpg'],
  },
  {
    year: '2018',
    title: 'Ampliacion del Espacio',
    description: 'Se amplian las instalaciones con nuevas aulas y salon de ensayo.',
    images: ['/images/evento-ronda.jpg', '/images/evento-pareja.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2020',
    title: 'Resistencia Digital',
    description: 'Adaptacion a la virtualidad durante la pandemia.',
    images: ['/images/evento-cumple.jpg', '/images/evento-encuentro.jpg', '/images/evento-fiesta.jpg'],
  },
  {
    year: '2022',
    title: 'Reapertura Cultural',
    description: 'Vuelta a la presencialidad con programacion completa.',
    images: ['/images/evento-pareja.jpg', '/images/evento-baile-atardecer.jpg', '/images/evento-variete.jpg'],
  },
  {
    year: '2024',
    title: 'Nuevo Escenario',
    description: 'Se inaugura el nuevo escenario al aire libre.',
    images: ['/images/evento-baile-atardecer.jpg', '/images/evento-folklore.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2026',
    title: 'Expansion Comunitaria',
    description: 'El Bondi se expande con nuevos proyectos.',
    images: ['/images/evento-fiesta.jpg', '/images/evento-danza-circulo.jpg', '/images/evento-encuentro.jpg'],
  },
]

export function InteractiveTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
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
