'use client'

import { Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export function RadioSection() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-primary py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.55_0.18_305/0.2),transparent)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 lg:flex-row lg:gap-16 lg:px-8">
        {/* Radio Image */}
        <ScrollReveal direction="left" className="w-full max-w-md shrink-0 lg:w-2/5">
          <div className="group relative overflow-hidden rounded-lg border border-primary-foreground/10 shadow-2xl">
            <img
              src="/images/radio.jpg"
              alt="Radio Activa Comunitaria FM 96.9"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            {/* Live "on air" indicator */}
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex size-2.5">
                <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-red-500" />
                <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
                En vivo
              </span>
            </div>
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

          <div>
            <Button
              asChild
              size="lg"
              className="group gap-2 bg-primary-foreground text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/90 hover:shadow-xl hover:shadow-black/20"
            >
              <a href="https://radioactiva.ar" target="_blank" rel="noopener noreferrer">
                <Radio className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                Escuchar en vivo
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
