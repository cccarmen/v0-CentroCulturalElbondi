'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DisplayText } from '@/components/display-text'

const timelineEvents = [
  {
    year: '2009',
    period: 'Junio',
    title: 'Creacion del Colectivo Cultural',
    description: 'Un grupo de 8 vecinos y vecinas se reunieron bajo la convocatoria de generar proyectos con impacto positivo en la comunidad, integrando a sectores vulnerables.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-cumple.jpg', '/images/evento-ronda.jpg'],
  },
  {
    year: '2009',
    period: 'Noviembre',
    title: 'Primera Tertulia Rebelde',
    description: 'Una convocatoria para ampliar la participacion comunitaria y sumar integrantes a los proyectos en marcha. Desde entonces celebramos una Tertulia Rebelde cada ano.',
    images: ['/images/evento-ronda.jpg', '/images/evento-pareja.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2009',
    period: 'Diciembre',
    title: 'Primera actividad publica: 400 metros de murales',
    description: 'Pintamos 400 metros de murales rodeando las escuelas primaria 13 y secundaria 16, junto a decenas de vecinos voluntarios y el apoyo de pinturerias locales.',
    images: ['/images/evento-danza-circulo.jpg', '/images/evento-variete.jpg', '/images/evento-fiesta.jpg'],
  },
  {
    year: '2010',
    period: 'Marzo',
    title: '100 aniversario de Ingeniero Maschwitz',
    description: 'Celebramos el centenario del pueblo en la plaza Mitre con radio abierta, exposicion artistica, actividades circenses y merienda popular.',
    images: ['/images/evento-fiesta.jpg', '/images/evento-encuentro.jpg', '/images/evento-cumple.jpg'],
  },
  {
    year: '2010',
    period: 'Julio',
    title: 'Proyecciones de cine en la Sociedad de Fomento',
    description: 'Tuvimos como invitado a Rodrigo de la Serna con "Diarios de Motocicleta" y al director Adrian Caetano.',
    images: ['/images/evento-musica.jpg', '/images/evento-variete.jpg', '/images/evento-folklore.jpg'],
  },
  {
    year: '2010',
    period: 'Agosto',
    title: 'Dia del Nino itinerante',
    description: 'Festejo del Dia del Nino recorriendo los distintos barrios de Ingeniero Maschwitz.',
    images: ['/images/evento-cumple.jpg', '/images/evento-ronda.jpg', '/images/evento-encuentro.jpg'],
  },
  {
    year: '2011',
    period: 'Febrero',
    title: 'Recuperacion de los carnavales en Escobar',
    description: 'Participamos junto a otras organizaciones en la redaccion de una nueva ordenanza que legalizara los festejos de carnaval en el partido.',
    images: ['/images/evento-baile-atardecer.jpg', '/images/evento-folklore.jpg', '/images/evento-pareja.jpg'],
  },
  {
    year: '2011',
    period: '15 de Marzo',
    title: 'Recuperacion del antiguo cine Gloria',
    description: 'El Colectivo Cultural ocupo y recupero como centro cultural el emblematico edificio frente a la estacion, que habia sido almacen, hotel, cine y algodonera.',
    images: ['/images/evento-variete.jpg', '/images/evento-musica.jpg', '/images/evento-folklore.jpg'],
  },
  {
    year: '2011',
    period: 'Junio',
    title: 'Nace "Gloria la del Bondi"',
    description: 'Fundacion del grupo de teatro comunitario, con el apoyo del mitico grupo "Catalinas Sur" de La Boca, que presento "Venimos de muy lejos".',
    images: ['/images/evento-variete.jpg', '/images/evento-baile-atardecer.jpg', '/images/evento-danza-circulo.jpg'],
  },
  {
    year: '2011',
    period: '9 de Julio',
    title: 'Acta de posesion',
    description: 'Acta de posesion ante escribano y con decenas de vecinos invitados, en el marco de la primera Pena celebrada el Dia de la Independencia.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-fiesta.jpg', '/images/evento-cumple.jpg'],
  },
  {
    year: '2011',
    period: 'Agosto',
    title: 'Primera actividad publica en el centro cultural',
    description: 'Celebramos el Dia del Nino con un espectaculo de titeres a sala llena. Como no teniamos sillas, los chicos se sentaron en tronquitos.',
    images: ['/images/evento-cumple.jpg', '/images/evento-encuentro.jpg', '/images/evento-ronda.jpg'],
  },
  {
    year: '2011',
    period: 'Diciembre',
    title: 'Nace FM RadioActiva Comunitaria',
    description: 'Primera Tertulia Rebelde en el centro cultural e inicio de las transmisiones de FM RadioActiva Comunitaria.',
    images: ['/images/radio-estudio-activa.jpg', '/images/radio-mic-vintage.jpg', '/images/radio-logo-969.jpg'],
  },
  {
    year: '2013',
    period: 'Octubre',
    title: 'Estreno de "Una historia gloriosa"',
    description: 'El grupo Gloria la del Bondi representa en escena la historia del espacio: almacen, hotel, cine, algodonera, abandono y recuperacion, junto a la del pueblo y el pais.',
    images: ['/images/evento-variete.jpg', '/images/evento-folklore.jpg', '/images/evento-musica.jpg'],
  },
  {
    year: '2019',
    period: '',
    title: 'Creacion del Bachillerato Popular',
    description: 'Nace el Bachillerato Popular El Bondi, secundario para personas adultas con titulo oficial, en el marco de la Educacion Popular.',
    images: ['/images/evento-encuentro.jpg', '/images/evento-musica.jpg', '/images/evento-variete.jpg'],
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
            <DisplayText>15 Años Construyendo Comunidad</DisplayText>
          </h2>
        </div>

        {/* Interactive timeline */}
        <div className="relative">
          {/* Timeline list */}
          <div className="relative">
            {/* Vertical line accent */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden="true" />

            <ul className="flex flex-col" aria-label="Linea de tiempo de El Bondi">
              {timelineEvents.map((event, index) => (
                <li
                  key={`${event.year}-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
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
                          : 'text-muted-foreground/70'
                      }`}
                    >
                      {event.year}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {event.period && (
                        <span className="text-xs font-medium uppercase tracking-wider text-primary">
                          {event.period}
                        </span>
                      )}
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
                        className={`mt-1 text-sm leading-relaxed text-muted-foreground transition-all duration-300 md:text-base`}
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
