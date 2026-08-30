import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CardSlider } from '@/components/card-slider'
import { workshops } from '@/lib/data'

export function WorkshopsSection() {
  return (
    <section id="talleres" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal scaleFrom={0.92} duration={800}>
          <h2 className="text-balance text-center font-heading text-4xl tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Talleres
          </h2>
        </ScrollReveal>
        <CardSlider items={workshops.slice(0, 4)} />
        <ScrollReveal>
          <div className="mt-6 flex justify-center">
            <Link
              href="/programacion?categoria=taller"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
            >
              Ver todos los talleres
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
