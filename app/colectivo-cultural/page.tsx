import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import { InteractiveGlow } from '@/components/interactive-glow'
import { EstructuraOrganizacional } from '@/components/estructura-organizacional'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/**
 * Historia del Colectivo Cultural como organización (anterior al espacio).
 * Copia basada en la historia real; ajustable cuando llegue la redacción final.
 */
const historyParagraphs = [
  'El Colectivo Cultural de Ingeniero Maschwitz es una organización asamblearia, comunitaria y autogestiva que nació en 2009, antes de contar con un espacio propio. En sus primeros años las actividades fueron itinerantes: proyecciones de cine, murales, festejos del pueblo, Día del Niño, kermeses y talleres de radio en espacios públicos e instituciones amigas.',
  'Con el tiempo, tener una casa propia se transformó en el principal objetivo. En 2011 el Colectivo recuperó un edificio de más de cien años que llevaba casi cuatro décadas abandonado, frente a la estación de tren, y lo puso al servicio de la comunidad como centro cultural.',
  'Hoy el Centro Cultural El Bondi es "la casa" y el mayor proyecto del Colectivo Cultural, pero no es lo único: la organización es una entidad más amplia, con su propia identidad, que también acompaña otros proyectos y trabaja junto a otras organizaciones del territorio.',
]

export default function ColectivoCulturalPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5">
                    <Home className="size-4" />
                    <span className="sr-only sm:not-sr-only">Inicio</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Colectivo Cultural</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Header */}
      <section className="relative isolate flex min-h-[384px] items-center overflow-hidden border-b border-border/40 bg-primary py-16 lg:py-24">
        <InteractiveGlow />
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <InteractivePageHeader
              title="Colectivo Cultural"
              description="La organización que dio vida a El Bondi. El Colectivo Cultural de Ingeniero Maschwitz es una entidad asamblearia y autogestiva que existe desde antes del espacio, y del cual el centro cultural es su proyecto más grande."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Historia de la organización */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-balance font-heading text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Nuestra historia
            </h2>
            <p className="mt-3 text-pretty text-sm font-medium text-primary">
              Una organización anterior al espacio
            </p>
          </ScrollReveal>
          <div className="mt-8 flex flex-col gap-6">
            {historyParagraphs.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estructura organizacional (Asamblea, Comisiones y Proyectos) */}
      <EstructuraOrganizacional />

      {/* Cross-link to the space + contact */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
              <h3 className="text-balance text-xl font-semibold text-foreground">
                ¿Querés conocer el espacio o sumarte?
              </h3>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                El Centro Cultural El Bondi es la casa del colectivo. Conocé el espacio o escribinos para participar de la organización.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/centro-cultural"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Ver el Centro Cultural
                </Link>
                <a
                  href="mailto:mailcolectivocultural@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Sumarte al colectivo
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
