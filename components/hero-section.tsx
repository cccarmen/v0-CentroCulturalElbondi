import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative aspect-[16/7] min-h-[400px] w-full lg:min-h-[560px]">
        <img
          src="/images/hero.jpg"
          alt="Centro Cultural Comunitario El Bondi - Espacio de arte y cultura"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <div className="mx-auto w-full max-w-7xl">
            <h1 className="font-display text-5xl tracking-wide text-primary-foreground drop-shadow-lg md:text-7xl lg:text-8xl">
              El Bondi
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              <span className="text-sm font-semibold tracking-widest text-primary-foreground/90 uppercase">
                Centro Cultural Comunitario
              </span>
              <p className="max-w-md text-base text-primary-foreground/80 lg:text-lg">
                Derechos que se viven: cultura, educacion y comunicacion.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="outline"
            size="icon-lg"
            className="size-16 rounded-full border-2 border-primary-foreground/60 bg-primary/60 text-primary-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary/80"
            aria-label="Reproducir video"
          >
            <Play className="size-6 fill-current" />
          </Button>
        </div>
      </div>
    </section>
  )
}
