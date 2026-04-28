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
        q: 'Que es El Bondi Centro Cultural Comunitario?',
        a: 'El Bondi es un centro cultural comunitario ubicado en Maschwitz, Provincia de Buenos Aires. Es un espacio dedicado a la cultura, la educacion y la comunicacion, donde se desarrollan talleres, eventos artisticos, espectaculos de variete, y funciona la radio comunitaria FM 96.9 Radio Activa.',
      },
      {
        q: 'Donde esta ubicado El Bondi?',
        a: 'Nos encontramos en Av. El Bondi 1114, Ingeniero Maschwitz, Provincia de Buenos Aires, Argentina. Podes encontrarnos facilmente en el mapa de nuestra pagina principal.',
      },
      {
        q: 'Cual es el horario de atencion?',
        a: 'El centro cultural esta abierto de lunes a sabados de 10:00 a 21:00 hs. Los domingos abrimos segun la programacion de eventos. Te recomendamos consultar nuestras redes sociales para horarios especiales.',
      },
      {
        q: 'Como puedo contactarme con El Bondi?',
        a: 'Podes escribirnos a mailcolectivocultural@gmail.com, visitarnos en nuestras redes sociales (Instagram, Facebook, X) o acercarte directamente al centro cultural. Tambien podes completar el formulario de contacto en nuestra pagina web.',
      },
    ],
  },
  {
    category: 'Eventos y Novedades',
    questions: [
      {
        q: 'Como me entero de los proximos eventos?',
        a: 'Publicamos todos nuestros eventos en la seccion "Eventos y Novedades" de nuestra web, asi como en nuestras redes sociales. Tambien podes suscribirte a nuestro boletin completando el formulario en la seccion "Se parte de nuestra comunidad".',
      },
      {
        q: 'Las entradas para los eventos son pagas?',
        a: 'Depende del evento. Muchas de nuestras actividades son gratuitas y abiertas a la comunidad. Para eventos especiales como el Variete Bajo las Estrellas, puede haber una entrada con un costo accesible. Los detalles de cada evento se publican en su pagina correspondiente.',
      },
      {
        q: 'Puedo organizar un evento en El Bondi?',
        a: 'Si, estamos abiertos a propuestas. Si tenes una idea para un evento cultural, artistico o educativo, escribinos a nuestro mail con tu propuesta y la evaluaremos. Buscamos actividades que aporten valor a la comunidad.',
      },
      {
        q: 'Que tipo de eventos se realizan?',
        a: 'Realizamos una gran variedad de eventos: shows de variete, recitales de musica en vivo, exposiciones de arte, ferias culturales, obras de teatro, proyecciones de cine, y mucho mas. Cada mes hay algo nuevo para disfrutar.',
      },
    ],
  },
  {
    category: 'Talleres y Bachillerato',
    questions: [
      {
        q: 'Que talleres ofrecen actualmente?',
        a: 'Ofrecemos talleres de acrobacia aerea, teatro, danza contemporanea, produccion musical, artes visuales, entre otros. La oferta se actualiza periodicamente, asi que te recomendamos visitar la seccion "Talleres y Bachillerato" para ver la programacion vigente.',
      },
      {
        q: 'Como me inscribo en un taller?',
        a: 'Podes inscribirte directamente haciendo clic en el taller que te interesa en nuestra web y completando el formulario de contacto, o acercandote personalmente al centro cultural. Tambien podes escribirnos por mail o redes sociales.',
      },
      {
        q: 'Tienen bachillerato para adultos?',
        a: 'Si, contamos con un programa de bachillerato popular para jovenes y adultos. Es una propuesta educativa que combina la formacion academica con la participacion comunitaria y cultural. Consulta por los requisitos de inscripcion.',
      },
      {
        q: 'Los talleres tienen costo?',
        a: 'Cada taller tiene sus propias condiciones. Algunos son a colaboracion voluntaria, otros tienen un arancel accesible. Buscamos que el acceso a la cultura no sea una barrera, por lo que siempre hay opciones para todos.',
      },
    ],
  },
  {
    category: 'Radio Activa Comunitaria FM 96.9',
    questions: [
      {
        q: 'Que es Radio Activa Comunitaria?',
        a: 'Radio Activa Comunitaria FM 96.9 es la radio del centro cultural El Bondi. Es un medio de comunicacion comunitario que transmite contenido cultural, musical y educativo, dando voz a la comunidad local.',
      },
      {
        q: 'Como puedo escuchar la radio?',
        a: 'Podes sintonizarnos en FM 96.9 si estas en la zona de Maschwitz, o escucharnos en vivo desde cualquier parte del mundo a traves del reproductor en nuestra pagina web.',
      },
      {
        q: 'Puedo participar en la radio?',
        a: 'Si, la radio comunitaria es un espacio abierto a la participacion. Si tenes una propuesta de programa, columna o queres colaborar, contactanos por mail o acercate al centro cultural.',
      },
    ],
  },
  {
    category: 'Donaciones y Colaboracion',
    questions: [
      {
        q: 'Como puedo colaborar con El Bondi?',
        a: 'Hay muchas formas de colaborar: podes hacer una donacion economica, ofrecer tu tiempo como voluntario, donar materiales o insumos, difundir nuestras actividades, o simplemente participar de los eventos y talleres.',
      },
      {
        q: 'Las donaciones son deducibles de impuestos?',
        a: 'Actualmente estamos trabajando en formalizar este proceso. Te recomendamos contactarnos directamente para consultar sobre las opciones de donacion y los beneficios asociados.',
      },
      {
        q: 'Puedo ser voluntario en El Bondi?',
        a: 'Siempre necesitamos manos que ayuden. Si queres sumarte como voluntario para eventos, talleres, la radio o el mantenimiento del espacio, escribinos contandonos que te gustaria hacer y nos ponemos en contacto.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30 px-4 py-4">
        <div className="mx-auto max-w-7xl">
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
      <section className="border-b border-border/40 bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <InteractivePageHeader
              title="Preguntas Frecuentes"
              description="Encontra las respuestas a las preguntas mas comunes sobre El Bondi, nuestros eventos, talleres, la radio comunitaria y como colaborar."
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
