'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, Home, Users, Handshake, Sparkles, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
import { InteractiveGlow } from '@/components/interactive-glow'
import { AnimatedTeamCard } from '@/components/animated-team-card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const teamMembers = [
  {
    name: 'Martin Gonzalez',
    role: 'Maestro de Ceremonias',
    bio: 'Animador y presentador de los eventos del centro cultural. Su energia y carisma hacen unicas las noches del Variete Bajo las Estrellas.',
    image: '/images/team-performer.jpg',
  },
  {
    name: 'Fernando Silva',
    role: 'Coordinador de Voluntarios',
    bio: 'Parte fundamental del equipo del Variete Bajo las Estrellas. Coordina a los voluntarios y colabora en la produccion de eventos.',
    image: '/images/team-crew.jpg',
  },
  {
    name: 'Mariana Lopez',
    role: 'Directora General',
    bio: 'Fundadora de El Bondi desde 2010. Gestora cultural con mas de 15 anos de experiencia en proyectos comunitarios y educativos en la zona norte del Gran Buenos Aires.',
    image: '/images/team-mariana.jpg',
  },
  {
    name: 'Carlos Mendez',
    role: 'Coordinador de Talleres',
    bio: 'Artista plastico y educador popular. Coordina la oferta de talleres y el programa de bachillerato popular desde sus inicios.',
    image: '/images/team-carlos.jpg',
  },
  {
    name: 'Lucia Fernandez',
    role: 'Directora de Radio Activa',
    bio: 'Comunicadora social y periodista comunitaria. Dirige la programacion de Radio Activa FM 96.9 y coordina los talleres de radio.',
    image: '/images/team-lucia.jpg',
  },
  {
    name: 'Diego Ramirez',
    role: 'Coordinador de Eventos',
    bio: 'Productor de espectaculos y gestor cultural. Responsable de la programacion de eventos, el Variete Bajo las Estrellas y festivales.',
    image: '/images/team-diego.jpg',
  },
  {
    name: 'Ana Torres',
    role: 'Coordinadora de Educacion',
    bio: 'Pedagoga y educadora popular. Lleva adelante el bachillerato popular y los programas de formacion para jovenes y adultos.',
    image: '/images/team-ana.jpg',
  },
  {
    name: 'Pablo Gutierrez',
    role: 'Responsable Tecnico',
    bio: 'Tecnico en sonido e iluminacion. Se encarga de toda la parte tecnica de eventos, la radio y el mantenimiento del espacio.',
    image: '/images/team-pablo.jpg',
  },
  {
    name: 'Sofia Herrera',
    role: 'Instructora de Circo',
    bio: 'Artista circense y docente. Ensena acrobacias, malabares y artes aereas a ninos, jovenes y adultos en los talleres del centro.',
    image: '/images/team-sofia.jpg',
  },
]

const specialThanks = [
  { name: 'Leonor Conti', reason: 'Viuda del Nene Conti, hijo del dueno del cine San Martin y Gloria. Nos dio las llaves para ingresar al espacio y su apoyo frente a distintos sectores de la sociedad local.' },
  { name: 'Jose Freitas y Dario Minskas', reason: 'Abogado y escribano que colaboraron con su tiempo y conocimiento para sentar las bases legales de nuestros derechos sobre la propiedad recuperada como centro cultural.' },
  { name: 'Soderia Mabel', reason: 'Nos proveen de agua potable desde el inicio de la recuperacion del espacio.' },
  { name: 'Ferreteria Duto', reason: 'Acompana con materiales y herramientas para sostener y mejorar dia a dia el espacio recuperado.' },
  { name: 'Locrero Yeyo', reason: 'Presente con su locro en las penas y celebraciones del Colectivo Cultural.' },
  { name: 'Neben', reason: 'Colabora con el equipamiento tecnico necesario para nuestras actividades y eventos.' },
]

const alliedOrganizations = [
  'Biblioteca 20 de Diciembre de Escobar',
  'Biblioteca La Maquina de Hacer Pajaros de Garin',
  'FOL Matheu',
  'Club Villa Vallier Escobar',
  'ONG Luz Esperanza y Pureza',
  'Murga Los Portenitos',
  'Sociedad de Fomento de Ingeniero Maschwitz',
  'Sociedad de Fomento del Barrio San Miguel',
]

/**
 * Historia del edificio / el espacio físico (El Dorado 1518).
 * NOTA: copia provisoria y muy breve. Reemplazar por el relato definitivo
 * que enviarán las y los colaboradores de la organización.
 */
const espacioParagraphs = [
  'Todo empezó en marzo de 2011, cuando entramos al espacio de El Dorado 1518, en Ingeniero Maschwitz. Un edificio con mucha historia, frente a la estación del tren, que estaba abandonado y que decidimos recuperar para la comunidad.',
  'Desde entonces, esta casa es el lugar donde suceden los eventos, los talleres y la vida cotidiana del centro cultural: el escenario, el patio, las aulas y cada rincón fueron acondicionados con trabajo colectivo.',
]

const organizationIntro =
  'El Bondi es una organización asamblearia, comunitaria y autogestiva. Nos organizamos colectivamente para sostener el espacio, tomar decisiones y acompañar los proyectos que suceden día a día.'

const organizationPillars = [
  {
    icon: Users,
    title: 'Asamblea',
    description:
      'La asamblea es el espacio principal de decisión colectiva. Allí se comparten necesidades, se definen prioridades y se acuerdan los pasos a seguir para el funcionamiento del centro cultural.',
  },
  {
    icon: Handshake,
    title: 'Comisiones',
    description:
      'Las comisiones acompañan tareas clave para que el espacio funcione: comunicación, legales, tesorería, mantenimiento, relaciones institucionales y otras áreas de trabajo.',
  },
  {
    icon: Sparkles,
    title: 'Proyectos',
    description:
      'Además de las comisiones, El Bondi reúne proyectos culturales, educativos y comunitarios que tienen su propia dinámica, pero se articulan con la asamblea y el espíritu colectivo del espacio.',
  },
]

const galleryImages = [
  { src: '/images/evento-variete.jpg', alt: 'Artista de variete en traje tradicional' },
  { src: '/images/evento-folklore.jpg', alt: 'Ballet folklorico con vestidos purpura' },
  { src: '/images/evento-ronda.jpg', alt: 'Ronda de baile comunitario' },
  { src: '/images/evento-musica.jpg', alt: 'Musica en vivo con guitarra y canto' },
  { src: '/images/evento-pareja.jpg', alt: 'Pareja bailando al atardecer' },
  { src: '/images/evento-baile-atardecer.jpg', alt: 'Baile folklorico con luz dorada' },
  { src: '/images/evento-encuentro.jpg', alt: 'Abrazo entre amigas en encuentro comunitario' },
  { src: '/images/evento-cumple.jpg', alt: 'Celebracion de cumpleanos comunitario' },
  { src: '/images/evento-danza-circulo.jpg', alt: 'Danza en circulo con la comunidad' },
]

export default function CentroCulturalPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const goNext = () => setLightboxIndex((i) => (i + 1) % galleryImages.length)
  const goPrev = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)

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
                <BreadcrumbPage>Centro Cultural</BreadcrumbPage>
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
              title="Centro Cultural El Bondi"
              description="Más de 15 años construyendo comunidad a través de la cultura, la educación y la comunicación en Maschwitz."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* El espacio (building history) Section */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              El espacio
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              El Dorado 1518, Ingeniero Maschwitz: el edificio donde suceden los eventos, los talleres y la vida del centro cultural.
            </p>
          </ScrollReveal>

          <div className="mt-10 flex flex-col gap-6">
            {espacioParagraphs.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Organize Section */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-balance text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Cómo nos organizamos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground">
              {organizationIntro}
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizationPillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 100}>
                <article className="flex h-full flex-col gap-4 rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <pillar.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 flex justify-center">
              <Link
                href="/colectivo-cultural"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                Conocé más sobre el Colectivo Cultural
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Nuestro Equipo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Las personas que hacen posible El Bondi dia a dia, con compromiso, pasion y dedicacion a la comunidad.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 100}>
                <AnimatedTeamCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Thanks Section */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Agradecimientos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              A todas las personas, organizaciones y colectivos que hacen posible este proyecto comunitario.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialThanks.map((thanks, index) => (
              <ScrollReveal key={thanks.name} delay={index * 80}>
                <div className="flex h-full flex-col gap-2 rounded-lg border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary" aria-hidden="true">
                      {thanks.name[0]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{thanks.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{thanks.reason}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 rounded-lg border border-border/50 bg-card p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Organizaciones culturales y sociales amigas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Apoyaron la recuperacion del espacio desde el comienzo y siguen caminando junto al Colectivo Cultural.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {alliedOrganizations.map((org) => (
                  <li
                    key={org}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-foreground"
                  >
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Galeria
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Momentos que reflejan la vida y la energia de nuestro centro cultural.
            </p>
          </ScrollReveal>

          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={image.src} delay={index * 60}>
                <button
                  onClick={() => openLightbox(index)}
                  className="group mb-4 block w-full overflow-hidden rounded-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                  aria-label={`Ver imagen: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="flex max-h-[90vh] max-w-4xl flex-col items-center gap-4 border-none bg-black/95 p-2 sm:p-4"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {galleryImages[lightboxIndex]?.alt}
          </DialogTitle>

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-3 right-3 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar galeria"
          >
            <X className="size-5" />
          </button>

          <div className="relative flex w-full items-center justify-center">
            <button
              onClick={goPrev}
              className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-5" />
            </button>

            <img
              src={galleryImages[lightboxIndex]?.src}
              alt={galleryImages[lightboxIndex]?.alt}
              className="max-h-[75vh] w-auto rounded-lg object-contain"
            />

            <button
              onClick={goNext}
              className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <p className="text-center text-sm text-white/70">
            {galleryImages[lightboxIndex]?.alt}
            <span className="ml-2 text-white/40">
              {lightboxIndex + 1} / {galleryImages.length}
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </main>
  )
}
