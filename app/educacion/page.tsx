import Link from 'next/link'
import { Home, GraduationCap, BookOpen, Users, ArrowRight } from 'lucide-react'
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
 * Proyectos de educación popular de El Bondi.
 * Copia provisoria hasta que Marcos/Rubén envíen la redacción final.
 * Para editar: cambiá título/descripción o sumá un objeto nuevo al array.
 */
const educationProjects = [
  {
    icon: GraduationCap,
    title: 'Bachillerato popular',
    description:
      'Un espacio educativo pensado desde la comunidad, para acompañar trayectorias y sostener el derecho a estudiar.',
  },
  {
    icon: BookOpen,
    title: 'Apoyo escolar',
    description:
      'Acompañamiento para chicos, chicas y jóvenes del barrio, con una mirada cercana, comunitaria y solidaria.',
  },
  {
    icon: Users,
    title: 'Encuentro de educación popular',
    description:
      'Un encuentro mensual para compartir saberes, experiencias y herramientas desde la educación popular.',
  },
]

export default function EducacionPage() {
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
                <BreadcrumbPage>Educación</BreadcrumbPage>
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
              title="Educación"
              description="En El Bondi también construimos espacios de educación popular, acompañamiento y encuentro. Son proyectos que tienen su propia dinámica dentro del colectivo y que buscan abrir oportunidades de aprendizaje, participación y organización comunitaria."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Education Projects */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-balance text-center font-display text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Nuestros proyectos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground">
              Cada proyecto tiene su propia forma de andar, pero comparte el mismo espíritu: aprender y organizarnos entre todas y todos.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {educationProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 100}>
                <article className="flex h-full flex-col gap-4 rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <project.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-balance text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact / next step */}
          <ScrollReveal>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
              <h3 className="text-balance text-xl font-semibold text-foreground">
                ¿Querés sumarte o saber más?
              </h3>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                Escribinos y te contamos cómo participar de los espacios de educación popular de El Bondi.
              </p>
              <a
                href="mailto:mailcolectivocultural@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Consultar
                <ArrowRight className="size-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
