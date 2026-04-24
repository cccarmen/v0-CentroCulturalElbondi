'use client'

import { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ScrollReveal } from '@/components/scroll-reveal'

export function RadioSection() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([33])
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: '#cf1919' }}>
      <div className="absolute inset-0" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 lg:flex-row lg:gap-16 lg:px-8">
        {/* Radio Image */}
        <ScrollReveal direction="left" className="w-full max-w-md shrink-0 lg:w-2/5">
          <div className="relative overflow-hidden rounded-lg border border-primary-foreground/10 shadow-2xl">
            <img
              src="/images/radio.jpg"
              alt="Radio Activa Comunitaria FM 96.9"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="font-display text-5xl text-primary-foreground drop-shadow-lg md:text-6xl">96.9</span>
              <div className="text-xs font-bold tracking-wider text-primary-foreground/80 uppercase">
                Radio Activa Comunitaria
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Radio Info */}
        <ScrollReveal direction="right" className="flex w-full flex-col gap-6" delay={200}>
          <div>
            <h2 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl">
              Radio Activa Comunitaria
            </h2>
            <p className="mt-3 max-w-lg leading-relaxed text-primary-foreground/80">
              Lleva RadioActiva Comunitaria FM 96.9 con vos, vayas donde vayas.
              Escuchanos en vivo desde cualquier parte del mundo haciendo clic en
              nuestro enlace a continuacion.
            </p>
          </div>

          {/* Audio Player */}
          <div className="w-full max-w-lg rounded-lg border border-primary-foreground/10 bg-primary-foreground/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Anterior"
                >
                  <SkipBack className="size-4" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => setPlaying(!playing)}
                  aria-label={playing ? 'Pausar' : 'Reproducir'}
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Siguiente"
                >
                  <SkipForward className="size-4" />
                </Button>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <span className="text-xs tabular-nums text-primary-foreground/70">0:00</span>
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="flex-1 [&_[data-slot=slider-range]]:bg-primary-foreground [&_[data-slot=slider-thumb]]:border-primary-foreground [&_[data-slot=slider-thumb]]:bg-primary-foreground [&_[data-slot=slider-track]]:bg-primary-foreground/20"
                />
                <span className="text-xs tabular-nums text-primary-foreground/70">1:38</span>
              </div>

              <Volume2 className="size-4 shrink-0 text-primary-foreground/60" />
            </div>
          </div>

{/* Audio element — only rendered when a real stream URL is provided */}
        </ScrollReveal>
      </div>
    </section>
  )
}
