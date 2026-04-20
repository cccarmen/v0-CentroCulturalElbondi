'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Home, Play, Pause, Radio, Mic, Users, Clock, Headphones, ExternalLink, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const radioSessions = [
  {
    id: 1,
    title: 'Voces del Barrio - Ep. 24',
    duration: '45:30',
    durationSeconds: 2730,
    date: '12 Abr 2026',
  },
  {
    id: 2,
    title: 'Ritmos Latinoamericanos - Especial Cumbia',
    duration: '58:15',
    durationSeconds: 3495,
    date: '10 Abr 2026',
  },
  {
    id: 3,
    title: 'Cultura en Movimiento - Entrevista a Artistas Locales',
    duration: '32:45',
    durationSeconds: 1965,
    date: '8 Abr 2026',
  },
  {
    id: 4,
    title: 'El Patio de los Pibes - Cuentos de Abril',
    duration: '25:00',
    durationSeconds: 1500,
    date: '5 Abr 2026',
  },
  {
    id: 5,
    title: 'Folklore al Atardecer - Chacareras y Zambas',
    duration: '1:15:20',
    durationSeconds: 4520,
    date: '3 Abr 2026',
  },
  {
    id: 6,
    title: 'Mesa de Debate - Temas Comunitarios',
    duration: '52:10',
    durationSeconds: 3130,
    date: '1 Abr 2026',
  },
  {
    id: 7,
    title: 'Noticiero Comunitario - Edicion Semanal',
    duration: '28:45',
    durationSeconds: 1725,
    date: '29 Mar 2026',
  },
  {
    id: 8,
    title: 'Rock Nacional - Clasicos de los 80',
    duration: '1:02:30',
    durationSeconds: 3750,
    date: '27 Mar 2026',
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

function AudioSessionItem({ 
  session, 
  isActive, 
  isPlaying, 
  onPlay 
}: { 
  session: typeof radioSessions[0]
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
}) {
  const [progress, setProgress] = useState(0)

  return (
    <div 
      className={`group rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
          : 'bg-card hover:bg-muted/50 border border-border'
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Play/Pause Button */}
        <button
          onClick={onPlay}
          className={`flex size-12 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 ${
            isActive 
              ? 'bg-primary-foreground text-primary shadow-md' 
              : 'bg-primary text-primary-foreground'
          }`}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying && isActive ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5 ml-0.5" />
          )}
        </button>

        {/* Session Info */}
        <div className="min-w-0 flex-1">
          <h3 className={`truncate font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
            {session.title}
          </h3>
          <p className={`text-sm ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
            {session.date}
          </p>
        </div>

        {/* Duration */}
        <div className={`shrink-0 text-sm font-medium ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
          {session.duration}
        </div>
      </div>

      {/* Progress Bar - only shown when active */}
      {isActive && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <SkipBack className="size-4" />
            </button>
            <span className="text-xs text-primary-foreground/70 w-10">0:00</span>
            <div className="relative flex-1 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-primary-foreground rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 size-3 bg-primary-foreground rounded-full shadow-sm"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <span className="text-xs text-primary-foreground/70 w-10 text-right">{session.duration}</span>
            <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <SkipForward className="size-4" />
            </button>
            <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors ml-2">
              <Volume2 className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RadioEspacioPage() {
  const [isLivePlaying, setIsLivePlaying] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null)
  const [isSessionPlaying, setIsSessionPlaying] = useState(false)

  const handleSessionPlay = (sessionId: number) => {
    if (activeSessionId === sessionId) {
      setIsSessionPlaying(!isSessionPlaying)
    } else {
      setActiveSessionId(sessionId)
      setIsSessionPlaying(true)
    }
  }

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
                <InteractivePageHeader
                  title="Radio Activa Comunitaria"
                  description="La voz de Maschwitz y alrededores. Desde 2012 transmitiendo cultura, musica y las voces de nuestra comunidad."
                />

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
                <div className="relative overflow-hidden rounded-lg border border-primary-foreground/10 shadow-2xl">
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

      {/* Radio Sessions Section */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div>
                <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
                  Ultimas Sesiones de Radio
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Escucha los programas que te perdiste o revivi tus favoritos.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                Ver archivo completo
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </ScrollReveal>

          <div className="mt-12 flex flex-col gap-3">
            {radioSessions.map((session, index) => (
              <ScrollReveal key={session.id} delay={index * 50}>
                <AudioSessionItem 
                  session={session}
                  isActive={activeSessionId === session.id}
                  isPlaying={isSessionPlaying && activeSessionId === session.id}
                  onPlay={() => handleSessionPlay(session.id)}
                />
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
