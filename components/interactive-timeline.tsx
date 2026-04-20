'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

const timelineEvents = [
  {
    year: '2010',
    title: 'Fundacion',
    description: 'El Bondi nace como un proyecto comunitario en Maschwitz.',
    image: '/images/evento-encuentro.jpg',
  },
  {
    year: '2012',
    title: 'Primer Festival',
    description: 'Se realiza el primer festival cultural comunitario.',
    image: '/images/evento-musica.jpg',
  },
  {
    year: '2014',
    title: 'Radio Activa',
    description: 'Nace la radio comunitaria FM 96.9.',
    image: '/images/evento-variete.jpg',
  },
  {
    year: '2016',
    title: 'Bachillerato Popular',
    description: 'Se inaugura el bachillerato popular para jovenes y adultos.',
    image: '/images/evento-folklore.jpg',
  },
  {
    year: '2018',
    title: 'Ampliacion del Espacio',
    description: 'Se amplian las instalaciones con nuevas aulas y salon de ensayo.',
    image: '/images/evento-ronda.jpg',
  },
  {
    year: '2020',
    title: 'Resistencia Digital',
    description: 'Adaptacion a la virtualidad durante la pandemia.',
    image: '/images/evento-cumple.jpg',
  },
  {
    year: '2022',
    title: 'Reapertura Cultural',
    description: 'Vuelta a la presencialidad con programacion completa.',
    image: '/images/evento-pareja.jpg',
  },
  {
    year: '2024',
    title: 'Nuevo Escenario',
    description: 'Se inaugura el nuevo escenario al aire libre.',
    image: '/images/evento-baile-atardecer.jpg',
  },
  {
    year: '2026',
    title: 'Expansion Comunitaria',
    description: 'El Bondi se expande con nuevos proyectos.',
    image: '/images/evento-fiesta.jpg',
  },
]

export function InteractiveTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

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
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          {/* Floating image that follows cursor */}
          <div
            className="pointer-events-none fixed z-50 transition-all duration-200 ease-out"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.8,
            }}
          >
            {hoveredIndex !== null && (
              <div className="relative h-64 w-80 overflow-hidden rounded-lg shadow-2xl md:h-80 md:w-96">
                <Image
                  src={timelineEvents[hoveredIndex].image}
                  alt={timelineEvents[hoveredIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-3xl font-bold text-white">
                    {timelineEvents[hoveredIndex].year}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline list */}
          <div className="relative">
            {/* Vertical line accent */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            <ul className="flex flex-col">
              {timelineEvents.map((event, index) => (
                <li
                  key={event.year}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative cursor-pointer border-b border-border/30 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-baseline gap-6 py-6 pl-8 pr-4 md:gap-12 md:py-8">
                    {/* Year */}
                    <span
                      className={`shrink-0 font-display text-4xl tabular-nums transition-all duration-300 md:text-6xl lg:text-7xl ${
                        hoveredIndex === index
                          ? 'text-primary'
                          : 'text-muted-foreground/40'
                      }`}
                    >
                      {event.year}
                    </span>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                      <h3
                        className={`text-xl font-semibold transition-all duration-300 md:text-2xl lg:text-3xl ${
                          hoveredIndex === index
                            ? 'translate-x-2 text-foreground'
                            : 'text-foreground/70'
                        }`}
                      >
                        {event.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm transition-all duration-300 md:text-base ${
                          hoveredIndex === index
                            ? 'translate-x-2 text-muted-foreground'
                            : 'text-muted-foreground/50'
                        }`}
                      >
                        {event.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className={`shrink-0 transition-all duration-300 ${
                        hoveredIndex === index
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-4 opacity-0'
                      }`}
                    >
                      <svg
                        className="size-6 text-primary md:size-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div
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
