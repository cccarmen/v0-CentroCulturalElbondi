'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  Radio,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import { InteractiveGlow } from '@/components/interactive-glow'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const RADIO_WEBSITE_URL = 'https://radioactiva.ar'

const galleryImages = [
  { src: '/images/radio-mixer-knobs.jpg', alt: 'Controles de la consola de audio' },
  { src: '/images/radio-studio-desk.jpg', alt: 'Estudio de Radio Activa con consola y auriculares' },
  { src: '/images/radio-mic-vintage.jpg', alt: 'Microfono vintage del estudio' },
  { src: '/images/radio-mic-condenser.jpg', alt: 'Microfono profesional con filtro anti-pop' },
  { src: '/images/radio-estudio-activa.jpg', alt: 'Estudio de Radio Activa 96.9 en vivo' },
  { src: '/images/radio-logo-969.jpg', alt: 'Logo Radio Activa Comunitaria 96.9' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/fmradioactiva96.9/', handle: '@fmradioactiva96.9' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/radioactivacomunitaria', handle: '/radioactivacomunitaria' },
  { name: 'Youtube', icon: Youtube, url: 'https://www.youtube.com/@fmradioactiva96.9', handle: '@fmradioactiva96.9' },
  { name: 'App Android', icon: ExternalLink, url: 'https://play.google.com/store/apps/details?id=com.radioactivacomunitaria', handle: 'Descarga la App' },
]

export default function RadioEspacioPage() {
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
                <BreadcrumbPage>Radio Espacio</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-border/40 bg-primary py-16 lg:py-24">
        <InteractiveGlow />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Radio Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Radio className="size-6 text-primary-foreground" />
                  </div>
                  <span className="font-display text-5xl text-primary-foreground md:text-6xl">96.9</span>
                </div>
                <InteractivePageHeader
                  title="Radio Activa Comunitaria"
                  description="La voz de Maschwitz y alrededores. Desde 2012 transmitiendo cultura, musica y las voces de nuestra comunidad."
                />

                {/* Listen live CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <a href={RADIO_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                      <Radio className="size-5" />
                      Escuchar en Vivo
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Radio Section */}
      <section className="border-b border-border/40 bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Description */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
                  Quienes Somos
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Maschwitz es la primera localidad del Partido de Escobar en tener una radio comunitaria. 
                    En FM RadioActiva se promueven las voces del pueblo y nuestra diversidad local.
                  </p>
                  <p className="leading-relaxed">
                    Organizaciones sociocomunitarias, estudiantes, jovenes, adultos y adultos mayores tienen las puertas abiertas 
                    en este medio de comunicacion. Somos una radio comunitaria sin fines de lucro y no pertenecemos a un partido politico.
                  </p>
                  <p className="leading-relaxed">
                    La musica que suena es diversa, como quienes participan de este sueno, sea desde el estudio o escuchando. 
                    FM RadioActiva, la radio comunitaria del pueblo.
                  </p>
                </div>

                {/* Mission & Values */}
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Nuestra mision</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Promover la integracion social, el respeto por los Derechos Humanos y el cuidado del medio ambiente
                      por medio de la cultura. Elegimos las actividades culturales porque creemos que la cultura nos
                      relaciona, nos integra y nos convoca a formar parte activa de la sociedad en la que vivimos.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Nuestros valores</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {['Solidaridad', 'Libertad', 'Honestidad', 'Companerismo', 'Respeto', 'Igualdad', 'Responsabilidad', 'Compromiso'].map((valor) => (
                        <li
                          key={valor}
                          className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-foreground"
                        >
                          {valor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact info */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>Av El Dorado 1518, Ingeniero Maschwitz 1723</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="size-4 text-primary" />
                    <span>11 6005-1234</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4 text-primary" />
                    <a href="mailto:fmra969@gmail.com" className="hover:text-primary transition-colors">fmra969@gmail.com</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Media */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground">
                  Seguinos en Redes
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Encontranos en todas las plataformas y no te pierdas nada.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{social.name}</p>
                          <p className="text-xs text-muted-foreground">{social.handle}</p>
                        </div>
                        <ExternalLink className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="border-b border-border/40 bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
              La Radio en Imagenes
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Momentos de transmision, eventos especiales y la vida cotidiana en Radio Activa.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="group relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{image.alt}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Listen CTA Section */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center lg:px-8 lg:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.55_0.18_305/0.25),transparent)]" />
              <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Radio className="size-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl tracking-wide text-primary-foreground md:text-4xl text-balance">
                  Escucha nuestra programacion en vivo
                </h2>
                <p className="max-w-lg leading-relaxed text-primary-foreground/80 text-pretty">
                  Toda la programacion de FM RadioActiva Comunitaria 96.9 esta disponible en nuestro sitio web.
                  Ingresa para escuchar en vivo y conocer los programas.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <a href={RADIO_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                    Ir a radioactiva.ar
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
