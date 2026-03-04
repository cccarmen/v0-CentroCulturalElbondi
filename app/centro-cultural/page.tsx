'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollReveal } from '@/components/scroll-reveal'

const teamMembers = [
  {
    name: 'Mariana Lopez',
    role: 'Directora General',
    bio: 'Fundadora de El Bondi desde 2010. Gestora cultural con mas de 15 anos de experiencia en proyectos comunitarios y educativos en la zona norte del Gran Buenos Aires.',
  },
  {
    name: 'Carlos Mendez',
    role: 'Coordinador de Talleres',
    bio: 'Artista plastico y educador popular. Coordina la oferta de talleres y el programa de bachillerato popular desde sus inicios.',
  },
  {
    name: 'Lucia Fernandez',
    role: 'Directora de Radio Activa',
    bio: 'Comunicadora social y periodista comunitaria. Dirige la programacion de Radio Activa FM 96.9 y coordina los talleres de radio.',
  },
  {
    name: 'Diego Ramirez',
    role: 'Coordinador de Eventos',
    bio: 'Productor de espectaculos y gestor cultural. Responsable de la programacion de eventos, el Variete Bajo las Estrellas y festivales.',
  },
  {
    name: 'Ana Torres',
    role: 'Coordinadora de Educacion',
    bio: 'Pedagoga y educadora popular. Lleva adelante el bachillerato popular y los programas de formacion para jovenes y adultos.',
  },
  {
    name: 'Pablo Gutierrez',
    role: 'Responsable Tecnico',
    bio: 'Tecnico en sonido e iluminacion. Se encarga de toda la parte tecnica de eventos, la radio y el mantenimiento del espacio.',
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
  { src: '/images/gallery-1.jpg', alt: 'Festival nocturno al aire libre en El Bondi' },
  { src: '/images/gallery-2.jpg', alt: 'Taller de arte y murales en el centro cultural' },
  { src: '/images/gallery-3.jpg', alt: 'Espectaculo de acrobacia aerea en el Variete' },
  { src: '/images/gallery-4.jpg', alt: 'Voluntarios y miembros de la comunidad' },
  { src: '/images/gallery-5.jpg', alt: 'Taller de musica con jovenes' },
  { src: '/images/gallery-6.jpg', alt: 'Sesion de grabacion en Radio Activa' },
  { src: '/images/hero.jpg', alt: 'Variete Bajo las Estrellas' },
  { src: '/images/event-1.jpg', alt: 'Show de variete en escenario' },
  { src: '/images/event-2.jpg', alt: 'Concierto en vivo' },
]

const timelineEvents = [
  {
    year: '2010',
    title: 'Fundacion',
    description: 'Un grupo de vecinos y artistas de Maschwitz decidieron crear un espacio comunitario donde la cultura, la educacion y la comunicacion fueran derechos accesibles para todos. Asi nacio El Bondi, en un terreno cedido por la comunidad, con la vision de transformar el barrio a traves del arte y la participacion.',
  },
  {
    year: '2012',
    title: 'Primer Festival Cultural',
    description: 'Se realizo el primer festival cultural al aire libre, convocando artistas locales y de toda la zona norte. Ese dia, mas de 500 personas se acercaron a disfrutar de musica, teatro, danza y artes circenses. Fue el momento en que la comunidad confirmo que El Bondi era su lugar.',
  },
  {
    year: '2014',
    title: 'Nace Radio Activa FM 96.9',
    description: 'Con la conviccion de que la comunicacion es un derecho, se inauguro la radio comunitaria FM 96.9. Desde sus inicios, Radio Activa se convirtio en la voz del barrio, transmitiendo musica, informacion local y dando espacio a voces que no encuentran lugar en los medios tradicionales.',
  },
  {
    year: '2016',
    title: 'Bachillerato Popular',
    description: 'Se inauguro el bachillerato popular para jovenes y adultos que no pudieron completar sus estudios. Combinando educacion formal con participacion comunitaria, el programa ha permitido que decenas de personas obtengan su titulo secundario mientras se forman como ciudadanos activos.',
  },
  {
    year: '2018',
    title: 'Ampliacion del Espacio',
    description: 'Gracias al esfuerzo colectivo y donaciones de la comunidad, se ampliaron las instalaciones con nuevas aulas, un salon de ensayo equipado y espacios dedicados a talleres artisticos. El centro cultural duplico su capacidad de recibir actividades simultaneas.',
  },
  {
    year: '2020',
    title: 'Resistencia y Virtualidad',
    description: 'Durante la pandemia, El Bondi se reinvento. Los talleres se trasladaron a plataformas virtuales, la radio mantuvo su transmision como servicio esencial de informacion barrial, y se organizo una red de solidaridad para acompanar a las familias del barrio mas afectadas.',
  },
  {
    year: '2022',
    title: 'Reapertura y Variete',
    description: 'Con la vuelta a la presencialidad, se lanzo el ciclo "Variete Bajo las Estrellas", un espectaculo mensual que combina circo, musica, humor y teatro al aire libre. Rapidamente se convirtio en un evento emblematico de la zona, atrayendo publico de todo el Gran Buenos Aires.',
  },
  {
    year: '2024',
    title: 'Nuevo Escenario',
    description: 'Se inauguro el nuevo escenario al aire libre con capacidad para 800 personas, equipado con iluminacion profesional y sonido de alta calidad. Este espacio permite realizar festivales de mayor envergadura y recibir artistas nacionales.',
  },
  {
    year: '2026',
    title: 'Expansion Comunitaria',
    description: 'El Bondi se expande con nuevos proyectos: una biblioteca popular, un espacio de cowork para emprendedores del barrio y programas de formacion en oficios. El sueno que empezo en 2010 sigue creciendo con la fuerza de la comunidad.',
  },
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
      {/* Hero Header */}
      <section className="border-b border-border/40 bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="size-4" />
              Volver al inicio
            </Link>
            <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
              Centro Cultural El Bondi
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
              Mas de 15 anos construyendo comunidad a traves de la cultura, la educacion y la comunicacion en Maschwitz.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Nuestra Historia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Desde un sueno compartido entre vecinos hasta convertirse en uno de los centros culturales comunitarios mas activos de la zona norte.
            </p>
          </ScrollReveal>

          <div className="relative mt-14">
            {/* Vertical line */}
            <div className="absolute top-0 left-4 h-full w-0.5 bg-primary/30 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

            <div className="flex flex-col gap-10">
              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0
                return (
                  <ScrollReveal
                    key={event.year}
                    delay={index * 80}
                    direction={isLeft ? 'left' : 'right'}
                  >
                    {/* Mobile: always left-aligned */}
                    <div className="relative flex items-start gap-4 pl-10 md:hidden">
                      <div className="absolute left-2.5 top-1 z-10 size-3 rounded-full border-2 border-primary bg-background" />
                      <div>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">{event.year}</span>
                        <h3 className="mt-0.5 text-lg font-semibold text-foreground">{event.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                      </div>
                    </div>

                    {/* Desktop: alternating */}
                    <div className={`relative hidden items-start md:flex ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-[calc(50%-24px)] ${isLeft ? 'text-right' : 'text-left'}`}>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">{event.year}</span>
                        <h3 className="mt-0.5 text-lg font-semibold text-foreground">{event.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="relative z-10 mx-3 flex size-6 shrink-0 items-center justify-center">
                        <div className="size-3 rounded-full border-2 border-primary bg-background" />
                      </div>
                      <div className="w-[calc(50%-24px)]" />
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border/40 bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
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
                <Card className="h-full border-border/50 transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                    <Avatar className="size-20 border-2 border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                      <span className="text-sm font-medium text-primary">{member.role}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Thanks Section */}
      <section className="border-t border-border/40 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
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
                <div className="flex h-full flex-col gap-2 rounded-xl border border-border/50 bg-card p-5 transition-shadow duration-300 hover:shadow-md">
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
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
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
                  className="group mb-4 block w-full overflow-hidden rounded-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                  aria-label={`Ver imagen: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
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
