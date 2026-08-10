import { MapPin, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

export function LocationCta() {
  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-start gap-6 rounded-xl border border-border/50 bg-card/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary">
                <MapPin className="size-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground sm:text-xl">
                  Cómo llegar
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Estamos en El Dorado 1518, Ingeniero Maschwitz. Vení a conocer
                  el espacio y sumarte a las actividades.
                </p>
              </div>
            </div>

            <a
              href="/#ubicacion"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Ver ubicación
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
