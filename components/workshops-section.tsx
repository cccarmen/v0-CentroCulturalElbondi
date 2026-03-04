import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CardSlider } from '@/components/card-slider'
import { workshops } from '@/lib/data'

export function WorkshopsSection() {
  return (
    <section id="talleres" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance text-center font-display text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Talleres y Bachillerato
          </h2>
        </ScrollReveal>
        <CardSlider items={workshops.slice(0, 4)} />
        <ScrollReveal>
          <div className="mt-6 flex justify-center">
            <Link
              href="/programacion?categoria=taller"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver todos los talleres
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
