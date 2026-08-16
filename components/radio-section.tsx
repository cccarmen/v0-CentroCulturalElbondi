'use client'

import { ScrollReveal } from '@/components/scroll-reveal'

export function RadioSection() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-primary py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.55_0.18_305/0.2),transparent)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 lg:flex-row lg:gap-16 lg:px-8">
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
        </ScrollReveal>
      </div>
    </section>
  )
}
