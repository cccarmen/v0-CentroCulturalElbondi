'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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

const faqCategories = [
  {
    category: 'Sobre El Bondi',
    questions: [
      {
        q: '¿Qué es El Bondi Centro Cultural Comunitario?',
        a: 'El Bondi es un centro cultural comunitario ubicado en Maschwitz, Provincia de Buenos Aires. Es un espacio dedicado a la cultura, la educación y la comunicación, donde se desarrollan talleres, eventos artísticos, espectáculos de varieté, y funciona la radio comunitaria FM 96.9 Radio Activa.',
      },
      {
        q: '¿Dónde está ubicado El Bondi?',
        a: 'Nos encontramos en El Dorado 1518, Ingeniero Maschwitz, Provincia de Buenos Aires, Argentina, frente a la estación del tren. Podés encontrarnos fácilmente en el mapa de nuestra página principal.',
      },
      {
        q: '¿Cuál es el horario de atención?',
        a: 'El centro cultural está abierto de lunes a sábados de 10:00 a 21:00 hs. Los domingos abrimos según la programación de eventos. Te recomendamos consultar nuestras redes sociales para horarios especiales.',
      },
      {
        q: '¿Cómo puedo contactarme con El Bondi?',
        a: 'Podés escribirnos a mailcolectivocultural@gmail.com, visitarnos en nuestras redes sociales (Instagram, Facebook, X) o acercarte directamente al centro cultural. También podés completar el formulario de contacto en nuestra página web.',
      },
    ],
  },
  {
    category: 'Eventos y Novedades',
    questions: [
      {
        q: '¿Cómo me entero de los próximos eventos?',
        a: 'Publicamos todos nuestros eventos en la sección "Eventos y Novedades" de nuestra web, así como en nuestras redes sociales. También podés suscribirte a nuestro boletín completando el formulario en la sección "Sé parte de nuestra comunidad".',
      },
      {
        q: '¿Las entradas para los eventos son pagas?',
        a: 'Depende del evento. Muchas de nuestras actividades son gratuitas y abiertas a la comunidad. Para eventos especiales como el Varieté Bajo las Estrellas, puede haber una entrada con un costo accesible. Los detalles de cada evento se publican en su página correspondiente.',
      },
      {
        q: '¿Puedo organizar un evento en El Bondi?',
        a: 'Sí, estamos abiertos a propuestas. Si tenés una idea para un evento cultural, artístico o educativo, escribinos a nuestro mail con tu propuesta y la evaluaremos. Buscamos actividades que aporten valor a la comunidad.',
      },
      {
        q: '¿Qué tipo de eventos se realizan?',
        a: 'Realizamos una gran variedad de eventos: shows de varieté, recitales de música en vivo, exposiciones de arte, ferias culturales, obras de teatro, proyecciones de cine, y mucho más. Cada mes hay algo nuevo para disfrutar.',
      },
    ],
  },
  {
    category: 'Talleres y Bachillerato',
    questions: [
      {
        q: '¿Qué talleres ofrecen actualmente?',
        a: 'Ofrecemos talleres de acrobacia aérea, teatro, danza contemporánea, producción musical, artes visuales, entre otros. La oferta se actualiza periódicamente, así que te recomendamos visitar la sección "Talleres y Bachillerato" para ver la programación vigente.',
      },
      {
        q: '¿Cómo me inscribo en un taller?',
        a: 'Podés inscribirte directamente haciendo clic en el taller que te interesa en nuestra web y completando el formulario de contacto, o acercándote personalmente al centro cultural. También podés escribirnos por mail o redes sociales.',
      },
      {
        q: '¿Tienen bachillerato para adultos?',
        a: 'Sí, contamos con un programa de bachillerato popular para jóvenes y adultos. Es una propuesta educativa que combina la formación académica con la participación comunitaria y cultural. Consultá por los requisitos de inscripción.',
      },
      {
        q: '¿Los talleres tienen costo?',
        a: 'Cada taller tiene sus propias condiciones. Algunos son a colaboración voluntaria, otros tienen un arancel accesible. Buscamos que el acceso a la cultura no sea una barrera, por lo que siempre hay opciones para todos.',
      },
    ],
  },
  {
    category: 'Radio Activa Comunitaria FM 96.9',
    questions: [
      {
        q: '¿Qué es Radio Activa Comunitaria?',
        a: 'Radio Activa Comunitaria FM 96.9 es la radio del centro cultural El Bondi. Es un medio de comunicación comunitario que transmite contenido cultural, musical y educativo, dando voz a la comunidad local.',
      },
      {
        q: '¿Cómo puedo escuchar la radio?',
        a: 'Podés sintonizarnos en FM 96.9 si estás en la zona de Maschwitz, o escucharnos en vivo desde cualquier parte del mundo a través del reproductor en nuestra página web.',
      },
      {
        q: '¿Puedo participar en la radio?',
        a: 'Sí, la radio comunitaria es un espacio abierto a la participación. Si tenés una propuesta de programa, columna o querés colaborar, contactanos por mail o acercate al centro cultural.',
      },
    ],
  },
  {
    category: 'Donaciones y Colaboración',
    questions: [
      {
        q: '¿Cómo puedo colaborar con El Bondi?',
        a: 'Hay muchas formas de colaborar: podés hacer una donación económica, ofrecer tu tiempo como voluntario, donar materiales o insumos, difundir nuestras actividades, o simplemente participar de los eventos y talleres.',
      },
      {
        q: '¿Las donaciones son deducibles de impuestos?',
        a: 'Actualmente estamos trabajando en formalizar este proceso. Te recomendamos contactarnos directamente para consultar sobre las opciones de donación y los beneficios asociados.',
      },
      {
        q: '¿Puedo ser voluntario en El Bondi?',
        a: 'Siempre necesitamos manos que ayuden. Si querés sumarte como voluntario para eventos, talleres, la radio o el mantenimiento del espacio, escribinos contándonos qué te gustaría hacer y nos ponemos en contacto.',
      },
    ],
  },
]

export default function FaqPage() {
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
                <BreadcrumbPage>Preguntas Frecuentes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Header */}
      <section className="relative isolate flex min-h-[384px] items-center overflow-hidden border-b border-border/40 bg-primary py-16 lg:py-24">
        <InteractiveGlow />
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <InteractivePageHeader
              title="Preguntas Frecuentes"
              description="Encontrá las respuestas a las preguntas más comunes sobre El Bondi, nuestros eventos, talleres, la radio comunitaria y cómo colaborar."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-12">
            {faqCategories.map((category, catIndex) => (
              <ScrollReveal key={category.category} delay={catIndex * 100}>
                <div>
                  <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground md:text-3xl">
                    {category.category}
                  </h2>
                  <div className="rounded-lg border border-border bg-card p-2">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem
                          key={qIndex}
                          value={`${category.category}-${qIndex}`}
                          className="border-border/50 px-4"
                        >
                          <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
