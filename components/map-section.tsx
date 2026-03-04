import { MapPin, Navigation } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'

export function MapSection() {
  return (
    <section className="relative bg-muted">
      <div className="relative h-[450px] w-full overflow-hidden lg:h-[500px]">
        <iframe
          title="Ubicacion de Colectivo Cultural El Bondi en Maschwitz"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-58.76%2C-34.40%2C-58.73%2C-34.38&layer=mapnik&marker=-34.3923%2C-58.7467"
          className="size-full border-0"
          loading="lazy"
          allowFullScreen
        />

        {/* Info overlay */}
        <ScrollReveal direction="left" delay={300}>
        <div className="absolute bottom-4 left-4 z-10 max-w-xs rounded-xl border border-border/50 bg-card/95 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
              <MapPin className="size-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Colectivo Cultural</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                Av. El Bondi 1174, B1623 Ingeniero Maschwitz,
                Provincia de Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Location badges */}
        <ScrollReveal direction="right" delay={400}>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge variant="secondary" className="gap-1.5 bg-card/95 text-card-foreground shadow-md backdrop-blur-sm">
            <Navigation className="size-3" />
            {'134, Maschwitz'}
          </Badge>
          <Badge variant="secondary" className="gap-1.5 bg-card/95 text-card-foreground shadow-md backdrop-blur-sm">
            <MapPin className="size-3" />
            {'Altura Chapa y Pintura'}
          </Badge>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
