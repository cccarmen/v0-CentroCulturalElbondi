import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { DisplayText } from '@/components/display-text'

const flyers = [
  {
    src: '/images/flyer-agenda-septiembre.jpg',
    alt: 'Agenda de eventos de septiembre en El Bondi: Cachengue y Tambor, Varieté Bajo las Estrellas, Festival Cubo Estudio y Teatro Carga',
    title: 'Agenda de Septiembre',
    caption: 'Todos los eventos del mes en un solo lugar.',
    href: '/programacion?categoria=evento',
    cta: 'Ver la programación',
  },
  {
    src: '/images/flyer-variete-septiembre.jpg',
    alt: 'Flyer de Varieté Bajo las Estrellas, Temporada 12, 12 de septiembre 21 hs en El Bondi',
    title: 'Varieté Bajo las Estrellas',
    caption: 'Nuestra producción insignia · 12 de septiembre, 21 hs.',
    href: '/evento/variete-bajo-las-estrellas-septiembre',
    cta: 'Ver el evento',
  },
]

export function FlyersSection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Calendar className="size-3.5" />
              Septiembre 2026
            </span>
            <h2 className="mt-4 text-balance font-heading text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
              Los flyers del mes
            </h2>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Diseñados por la comunidad del Bondi. Mirá la agenda completa de
              septiembre y sumate a cada propuesta.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {flyers.map((flyer, index) => (
            <ScrollReveal key={flyer.src} delay={index * 150}>
              <figure className="group flex h-full flex-col">
                <Link
                  href={flyer.href}
                  className="relative block overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={flyer.cta + ': ' + flyer.title}
                >
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={flyer.src}
                      alt={flyer.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <div>
                    <h3 className="font-heading text-2xl tracking-wide text-white drop-shadow-md md:text-3xl">
                      <DisplayText>{flyer.title}</DisplayText>
                    </h3>
                        <p className="mt-1 text-sm text-white/85 drop-shadow">
                          {flyer.caption}
                        </p>
                      </div>
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="size-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
