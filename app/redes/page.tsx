import Link from 'next/link'
import { Home, Instagram, Youtube, ArrowUpRight, Radio } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/**
 * Redes del Centro Cultural / Colectivo Cultural El Bondi.
 * OJO: la radio (FM RadioActiva 96.9) tiene sus propias redes en /radio-espacio.
 */
const socials = [
  {
    name: 'Instagram',
    handle: '@cccelbondi',
    description:
      'El día a día del espacio: eventos, talleres, convocatorias y fotos de lo que pasa en El Bondi.',
    href: 'https://instagram.com/cccelbondi',
    icon: Instagram,
    cta: 'Seguir en Instagram',
  },
  {
    name: 'YouTube',
    handle: '@ElBondi-colectivocultural',
    description:
      'Registros de shows, ferias, charlas y proyectos del Colectivo Cultural. Reviví lo que pasó en el escenario.',
    href: 'https://youtube.com/@ElBondi-colectivocultural/videos',
    icon: Youtube,
    cta: 'Ir al canal',
  },
]

export default function RedesPage() {
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
                <span className="text-muted-foreground">Comunicación</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Redes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Header */}
      <section className="border-b border-border/40 bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <InteractivePageHeader
              title="Redes"
              description="Seguí al Centro Cultural El Bondi en sus redes para enterarte de todo lo que pasa en el espacio: eventos, talleres, convocatorias y la vida del Colectivo Cultural."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Social link cards */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {socials.map((social, index) => (
              <ScrollReveal key={social.name} delay={index * 100}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-4 rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <social.icon className="size-6 text-primary" aria-hidden="true" />
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{social.name}</h2>
                    <p className="text-sm font-medium text-primary">{social.handle}</p>
                  </div>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {social.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {social.cta}
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube latest video embed */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-balance font-display text-3xl tracking-wide text-foreground md:text-4xl">
              Nuestro canal de YouTube
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              Shows, ferias, charlas y registros de lo que sucede en El Bondi. Mirá lo último del canal del Colectivo Cultural.
            </p>
          </ScrollReveal>

          {/*
            NOTA: para incrustar un reproductor en vivo del canal necesitamos el
            ID del canal (formato UC...). Con el handle @ElBondi-colectivocultural
            YouTube no permite embeber la lista de subidas. Pasanos el ID del canal
            (o el link de un video/playlist) y lo cambiamos por un <iframe> real.
          */}
          <ScrollReveal delay={100}>
            <a
              href="https://youtube.com/@ElBondi-colectivocultural/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 block overflow-hidden rounded-lg border border-border/50 bg-background transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              aria-label="Abrir el canal de YouTube del Colectivo Cultural El Bondi"
            >
              <div className="relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-primary/15 via-background to-secondary/30">
                <div className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Youtube className="size-9" aria-hidden="true" />
                </div>
                <span className="absolute bottom-4 left-4 rounded-md bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
                  @ElBondi-colectivocultural
                </span>
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-6 flex justify-center">
              <a
                href="https://youtube.com/@ElBondi-colectivocultural/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Youtube className="size-4" />
                Ver todos los videos
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cross-link to Radio */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Radio className="size-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-balance text-xl font-semibold text-foreground">
                ¿Buscás la radio?
              </h2>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                FM RadioActiva 96.9 es la radio comunitaria del espacio, con su propia programación y sus propias redes. Escuchala en vivo y conocé sus programas.
              </p>
              <Link
                href="/radio-espacio"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                Ir a Radio Activa
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
