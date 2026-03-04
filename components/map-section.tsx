'use client'

import { useState } from 'react'
import { MapPin, Navigation, MousePointerClick } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'

const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.5!2d-58.7467!3d-34.3923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDIzJzMyLjMiUyA1OMKwNDQnNDguMSJX!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar'

export function MapSection() {
  const [isActive, setIsActive] = useState(false)

  return (
    <section className="relative bg-muted">
      <div className="relative h-[450px] w-full overflow-hidden lg:h-[500px]">
        {/* Google Maps iframe */}
        <iframe
          title="Ubicacion de Colectivo Cultural El Bondi en Maschwitz"
          src={GOOGLE_MAPS_EMBED_URL}
          className="size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        />

        {/* Click-to-activate overlay */}
        {!isActive && (
          <button
            type="button"
            onClick={() => setIsActive(true)}
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent transition-colors hover:bg-black/5"
            aria-label="Hacer clic para interactuar con el mapa"
          >
            <span className="flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 text-sm font-medium text-card-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
              <MousePointerClick className="size-4 text-primary" />
              Haz clic para explorar el mapa
            </span>
          </button>
        )}

        {/* Info overlay */}
        <ScrollReveal direction="left" delay={300}>
          <div className="absolute bottom-4 left-4 z-20 max-w-xs rounded-xl border border-border/50 bg-card/95 p-4 shadow-lg backdrop-blur-sm">
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
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
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
