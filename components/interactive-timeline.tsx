'use client'

import { useState, useRef, useEffect } from 'react'
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
  // The active chapter is driven by scroll position (the item crossing the
  // viewport center) so the story advances as the user reads. Hover/focus can
  // override it for direct exploration.
  const [activeIndex, setActiveIndex] = useState(0)
  const [pointerIndex, setPointerIndex] = useState<number | null>(null)
  const [fillHeight, setFillHeight] = useState(0)

  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const currentIndex = pointerIndex ?? activeIndex
  const current = timelineEvents[currentIndex]

  // Detect which chapter is crossing the vertical center of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(idx)) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Grow the progress line so it reaches the marker of the current chapter.
  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[currentIndex]
      if (!el) return
      setFillHeight(el.offsetTop + 34)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [currentIndex])

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header — sets up the story */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Nuestra Historia
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            <DisplayText>15 Años Construyendo Comunidad</DisplayText>
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Todo empezo con ocho vecinos y una idea. Recorre, ano a ano, los momentos que
            convirtieron a El Bondi en el espacio cultural que es hoy.
          </p>
        </div>

        {/* Story layout: sticky progress rail + scrolling chapters */}
        <div className="lg:flex lg:gap-16">
          {/* Sticky progress rail (desktop) */}
          <div className="hidden lg:block lg:w-56 lg:shrink-0">
            <div className="sticky top-32">
              <div
                key={current.year}
                className="font-display text-7xl leading-none text-primary transition-all duration-500 xl:text-8xl"
              >
                {current.year}
              </div>
              <div className="mt-6 max-w-[14rem]">
                {current.period && (
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {current.period}
                  </span>
                )}
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {current.title}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline chapters */}
          <div className="relative flex-1">
            {/* Track */}
            <div
              className="absolute left-0 top-0 h-full w-px bg-border"
              aria-hidden="true"
            />
            {/* Progress fill */}
            <div
              className="absolute left-0 top-0 w-px bg-primary transition-[height] duration-500 ease-cinematic"
              style={{ height: `${fillHeight}px` }}
              aria-hidden="true"
            />

            <ul className="flex flex-col" aria-label="Linea de tiempo de El Bondi">
              {timelineEvents.map((event, index) => {
                const isActive = index === currentIndex
                const isPassed = index <= activeIndex
                return (
                  <li
                    key={`${event.year}-${index}`}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    data-index={index}
                    onMouseEnter={() => setPointerIndex(index)}
                    onMouseLeave={() => setPointerIndex(null)}
                    onFocus={() => setPointerIndex(index)}
                    onBlur={() => setPointerIndex(null)}
                    tabIndex={0}
                    aria-label={`${event.year}: ${event.title}. ${event.description}`}
                    aria-current={isActive ? 'step' : undefined}
                    className="group relative cursor-pointer rounded-r-lg pl-8 pr-2 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset md:pl-12"
                  >
                    {/* Marker on the line */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-[26px] flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-background transition-all duration-300 ${
                        isActive
                          ? 'scale-125 border-primary'
                          : isPassed
                            ? 'border-primary'
                            : 'border-border'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full bg-primary transition-all duration-300 ${
                          isPassed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                    </span>

                    <div className="flex items-start gap-4 py-6 md:gap-8">
                      <div className="min-w-0 flex-1">
                        {/* Year shown inline on mobile only (rail covers desktop) */}
                        <span
                          className={`mr-2 font-display text-lg tabular-nums transition-colors duration-300 lg:hidden ${
                            isActive ? 'text-primary' : 'text-muted-foreground/70'
                          }`}
                        >
                          {event.year}
                        </span>
                        {event.period && (
                          <span className="text-xs font-medium uppercase tracking-wider text-primary">
                            {event.period}
                          </span>
                        )}
                        <h3
                          className={`mt-1 text-base font-semibold leading-tight transition-all duration-300 md:text-lg lg:text-xl ${
                            isActive
                              ? 'translate-x-1 text-foreground'
                              : 'text-foreground/70'
                          }`}
                        >
                          {event.title}
                        </h3>
                        <p
                          className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 md:text-base ${
                            isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'
                          }`}
                        >
                          {event.description}
                        </p>
                      </div>

                      {/* Photos reveal for the active chapter */}
                      <div
                        className={`hidden shrink-0 items-center gap-2 transition-all duration-500 ease-cinematic md:flex ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : 'pointer-events-none translate-x-6 opacity-0'
                        }`}
                        aria-hidden="true"
                      >
                        {event.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative h-16 w-16 overflow-hidden rounded-lg shadow-md transition-transform duration-500 ease-cinematic lg:h-20 lg:w-20"
                            style={{
                              transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                              transitionDelay: isActive ? `${imgIndex * 80}ms` : '0ms',
                            }}
                          >
                            <Image src={img} alt="" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
