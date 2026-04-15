'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Home, Play, Pause, Radio, Mic, Users, Clock, Headphones, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const podcasts = [
  {
    id: 1,
    title: 'Voces del Barrio',
    description: 'Historias y testimonios de los vecinos de Maschwitz. Un espacio para escuchar las voces que construyen nuestra comunidad.',
    duration: '45:30',
    date: '12 Abr 2026',
    image: '/images/evento-encuentro.jpg',
    category: 'Comunidad',
  },
  {
    id: 2,
    title: 'Ritmos Latinoamericanos',
    description: 'Un recorrido musical por los sonidos de America Latina. Folklore, cumbia, tango y mas.',
    duration: '58:15',
    date: '10 Abr 2026',
    image: '/images/evento-musica.jpg',
    category: 'Musica',
  },
  {
    id: 3,
    title: 'Cultura en Movimiento',
    description: 'Entrevistas con artistas locales, gestores culturales y protagonistas de la escena cultural de la zona norte.',
    duration: '32:45',
    date: '8 Abr 2026',
    image: '/images/evento-variete.jpg',
    category: 'Entrevistas',
  },
  {
    id: 4,
    title: 'El Patio de los Pibes',
    description: 'Programa infantil con cuentos, musica y juegos para los mas chicos de la comunidad.',
    duration: '25:00',
    date: '5 Abr 2026',
    image: '/images/evento-cumple.jpg',
    category: 'Infantil',
  },
  {
    id: 5,
    title: 'Folklore al Atardecer',
    description: 'La mejor seleccion de folklore argentino para acompanar las tardes. Chacareras, zambas y mas.',
    duration: '1:15:20',
    date: '3 Abr 2026',
    image: '/images/evento-folklore.jpg',
    category: 'Musica',
  },
  {
    id: 6,
    title: 'Mesa de Debate',
    description: 'Temas de actualidad, politica comunitaria y discusion abierta con referentes locales.',
    duration: '52:10',
    date: '1 Abr 2026',
    image: '/images/evento-ronda.jpg',
    category: 'Debate',
  },
]

const radioFeatures = [
  {
    icon: Mic,
    title: 'Produccion Local',
    description: 'Contenido creado por y para la comunidad de Maschwitz y alrededores.',
  },
  {
    icon: Users,
    title: 'Participacion Comunitaria',
    description: 'Espacios abiertos para que los vecinos compartan sus voces e historias.',
  },
  {
    icon: Headphones,
    title: 'Programacion Variada',
    description: 'Musica, entrevistas, debates y programas para todas las edades.',
  },
]

function PodcastCard({ podcast }: { podcast: typeof podcasts[0] }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 text-xs">
          {podcast.category}
        </Badge>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-3 right-3 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
        </button>
      </div>
      <CardContent className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {podcast.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {podcast.description}
        </p>
        <div className="mt-auto flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {podcast.duration}
          </span>
          <span>{podcast.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RadioEspacioPage() {
  const [isLivePlaying, setIsLivePlaying] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30 px-4 py-4">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5">
                    <Home className="size-4" />
                    <span className="sr-only sm:not-sr-only">Inicio</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Radio Espacio</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Header */}
      <section className="border-b border-border/40 bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
              {/* Radio Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Radio className="size-7 text-primary-foreground" />
                  </div>
                  <span className="font-display text-6xl text-primary-foreground md:text-7xl">96.9</span>
                </div>
                <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl">
                  Radio Activa Comunitaria
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
                  La voz de Maschwitz y alrededores. Desde 2012 transmitiendo cultura, musica y las voces de nuestra comunidad.
                </p>

                {/* Live Player */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsLivePlaying(!isLivePlaying)}
                    className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {isLivePlaying ? (
                      <>
                        <Pause className="size-5" />
                        Pausar Radio
                      </>
                    ) : (
                      <>
                        <Play className="size-5" />
                        Escuchar en Vivo
                      </>
                    )}
                  </Button>
                  {isLivePlaying && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-red-500" />
                      </span>
                      <span className="text-sm font-medium text-primary-foreground">EN VIVO</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Radio Image */}
              <div className="w-full max-w-sm shrink-0 lg:w-2/5">
                <div className="relative overflow-hidden rounded-xl border border-primary-foreground/10 shadow-2xl">
                  <img
                    src="/images/radio.jpg"
                    alt="Radio Activa Comunitaria FM 96.9"
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Radio Section */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
                Sobre Radio Activa
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
                Radio Activa Comunitaria FM 96.9 nacio en 2012 como un proyecto del Centro Cultural El Bondi para dar voz a la comunidad de Maschwitz y la zona norte del Gran Buenos Aires. Somos una radio comunitaria, sin fines de lucro, gestionada por vecinos y vecinas comprometidos con la comunicacion popular.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                Nuestra programacion incluye musica local e internacional, programas de debate, espacios para la cultura y el arte, y sobre todo, las voces de quienes construyen dia a dia nuestra comunidad. Transmitimos las 24 horas, los 7 dias de la semana.
              </p>
            </div>
          </ScrollReveal>

          {/* Features */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {radioFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="size-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div>
                <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
                  Ultimos Podcasts
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Escucha los programas que te perdiste o revivi tus favoritos.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                Ver todos
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast, index) => (
              <ScrollReveal key={podcast.id} delay={index * 80}>
                <PodcastCard podcast={podcast} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-primary/5 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
              Queres participar?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Radio Activa es un espacio abierto a la comunidad. Si tenes una propuesta de programa, queres compartir tu musica o simplemente queres conocer como funciona una radio comunitaria, escribinos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="mailto:radioactiva@elbondi.com">
                  Contactanos
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/talleres">
                  Taller de Radio
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
