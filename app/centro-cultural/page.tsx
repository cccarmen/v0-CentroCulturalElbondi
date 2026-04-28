'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollReveal } from '@/components/scroll-reveal'
import { InteractivePageHeader } from '@/components/interactive-page-header'
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
  { name: 'Municipalidad de Escobar', reason: 'Apoyo institucional y acompanamiento en proyectos culturales desde los inicios del centro.' },
  { name: 'Cooperativa de Trabajo La Cultural', reason: 'Colaboracion permanente en la gestion y sostenimiento del espacio comunitario.' },
  { name: 'Red de Centros Culturales del Norte', reason: 'Articulacion con otros espacios culturales para fortalecer la red comunitaria de la zona.' },
  { name: 'Vecinos y Vecinas de Maschwitz', reason: 'Por ser parte esencial de este proyecto, participar de las actividades y sostener el espacio dia a dia.' },
  { name: 'Colectivo Artistas por la Comunidad', reason: 'Artistas que donan su tiempo y talento para los festivales y espectaculos del centro cultural.' },
  { name: 'Fundacion Cultura Viva', reason: 'Financiamiento y asesoramiento para el desarrollo del bachillerato popular y programas educativos.' },
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
      <section className="border-b border-border/40 bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <InteractivePageHeader
              title="Centro Cultural El Bondi"
              description="Mas de 15 anos construyendo comunidad a traves de la cultura, la educacion y la comunicacion en Maschwitz."
            />
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
                <div className="flex h-full flex-col gap-2 rounded-lg border border-border/50 bg-card p-5 transition-shadow duration-300 hover:shadow-md">
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
