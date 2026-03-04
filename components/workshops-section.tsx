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
        <CardSlider items={workshops} />
      </div>
    </section>
  )
}
