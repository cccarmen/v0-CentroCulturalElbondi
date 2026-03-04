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
    <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.55_0.18_305/0.2),transparent)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 lg:flex-row lg:gap-16 lg:px-8">
        {/* Radio Image */}
        <ScrollReveal direction="left" className="w-full max-w-md shrink-0 lg:w-2/5">
          <div className="flex items-center justify-center rounded-xl border border-primary-foreground/10 bg-white p-8 shadow-2xl">
            <img
              src="/images/radio-logo.png"
              alt="Radio Activa Comunitaria FM 96.9"
              className="w-full max-w-sm object-contain"
            />
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
          <div className="w-full max-w-lg rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 p-4 backdrop-blur-sm">
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

          <audio ref={audioRef} preload="none">
            <source src="" type="audio/mpeg" />
          </audio>
        </ScrollReveal>
      </div>
    </section>
  )
}
