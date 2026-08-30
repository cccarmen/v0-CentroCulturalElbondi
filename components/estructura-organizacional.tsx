import {
  Users,
  Scale,
  Megaphone,
  Wallet,
  Wrench,
  Landmark,
  Building2,
  HeartHandshake,
  UtensilsCrossed,
  SlidersHorizontal,
  GraduationCap,
  Radio,
  PartyPopper,
  Palette,
  Pencil,
  Drum,
  Drama,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

interface NodeItem {
  icon: LucideIcon
  title: string
  referent?: string
  description: string
}

/** Comisiones: sostienen el funcionamiento cotidiano de la organización. */
const comisiones: NodeItem[] = [
  {
    icon: Scale,
    title: 'Legal',
    referent: 'Pau Cid',
    description: 'Supervisa los procesos administrativos y legales de la organización.',
  },
  {
    icon: Megaphone,
    title: 'Comunicación',
    referent: 'Rubén',
    description: 'Página web, redes sociales y comunicación interna del colectivo.',
  },
  {
    icon: Wallet,
    title: 'Tesorería',
    referent: 'Seba Zunino',
    description: 'Gestiona los recursos económicos y los presupuestos del espacio.',
  },
  {
    icon: Wrench,
    title: 'Obra y Mantenimiento',
    referent: 'Andy Gil',
    description: 'Organiza y gestiona las tareas de obra y mantenimiento del edificio.',
  },
  {
    icon: Landmark,
    title: 'Comisión Directiva',
    description: 'Base legal de la ONG Colectivo Cultural.',
  },
  {
    icon: Building2,
    title: 'Relaciones Institucionales',
    referent: 'Tania Gallas',
    description: 'Vínculos con instituciones estatales y otras organizaciones sociales.',
  },
  {
    icon: HeartHandshake,
    title: 'Género',
    referent: 'Tania Gallas',
    description: 'Trabaja por la erradicación de la violencia de género en el espacio.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Buffet',
    referent: 'Camila Boggio',
    description: 'Gestiona y administra el buffet del Bondi y a sus voluntarios.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Técnica',
    referent: 'Javi Pagés',
    description: 'Administra la técnica del Bondi para eventos y shows.',
  },
]

/** Proyectos: propuestas con objetivos específicos al servicio de la comunidad. */
const proyectos: NodeItem[] = [
  {
    icon: GraduationCap,
    title: 'Bachi Popular',
    referent: 'Noelia',
    description: 'Educación secundaria para personas adultas.',
  },
  {
    icon: Radio,
    title: 'Radioactiva Comunitaria 96.9',
    referent: 'Javi Paz',
    description: 'Medio de comunicación de radio comunitaria y streaming.',
  },
  {
    icon: Palette,
    title: 'Talleres',
    referent: 'Marina',
    description: 'Talleres artísticos, culturales y circenses.',
  },
  {
    icon: Pencil,
    title: 'Apoyo Escolar',
    referent: 'Tania Gallas',
    description: 'Apoyo y acompañamiento a infancias en su estudio.',
  },
  {
    icon: Drum,
    title: 'Tambores de Mawy',
    referent: 'Pancho',
    description: 'Cuerda de candombe.',
  },
  {
    icon: Drama,
    title: 'Gloria la del Bondi',
    referent: 'Pau Cid',
    description: 'Grupo vecinal y popular de teatro comunitario.',
  },
  {
    icon: Sprout,
    title: 'Semillas',
    description:
      'Encuentros sobre producción, alimentación y medioambiente. Banco de semillas.',
  },
]

/** Ciclos y eventos que dependen del proyecto Eventos. */
const eventos: { title: string; referent: string }[] = [
  { title: 'Variete Bajo las Estrellas', referent: 'Andy Gil' },
  { title: 'La Mejor Peña Hasta Ahora', referent: 'Seba Zunino' },
  { title: 'Tertulia', referent: 'Rubén' },
  { title: 'Domingos Culturales', referent: 'Silvia Amarilla' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-secondary-foreground">
      {children}
    </span>
  )
}

function NodeCard({ item }: { item: NodeItem }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
        <item.icon className="size-5 text-primary" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-balance text-base font-semibold text-foreground">{item.title}</h3>
        {item.referent && (
          <p className="text-sm font-medium text-primary">Referente: {item.referent}</p>
        )}
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </article>
  )
}

/** Small vertical connector to give the diagram a hierarchical, flow-chart feel. */
function Connector() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-border" />
    </div>
  )
}

export function EstructuraOrganizacional() {
  return (
    <section className="border-t border-border/40 bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Intro */}
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-heading text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl">
              Estructura organizacional
            </h2>
            <p className="mx-auto mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Somos una organización asamblearia, comunitaria y autogestiva. Así nos organizamos
              para sostener el espacio y llevar adelante nuestros proyectos.
            </p>
          </div>
        </ScrollReveal>

        {/* Asamblea (top of the tree) */}
        <ScrollReveal>
          <div className="mt-12 flex flex-col items-center">
            <SectionLabel>Asamblea</SectionLabel>
            <div className="mt-4 flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:flex-row sm:text-left">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Users className="size-8 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-foreground">Asamblea</h3>
                <p className="text-sm font-medium text-primary">
                  Máximo órgano de decisión de la institución
                </p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  La componen la comisión directiva, las referentes de comisiones y las
                  referentes de proyectos.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <Connector />

        {/* Comisiones */}
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <SectionLabel>Comisiones</SectionLabel>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
              Las comisiones hacen al funcionamiento general de la organización y al sostén del
              espacio.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comisiones.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 60}>
              <NodeCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <Connector />
        </div>

        {/* Proyectos */}
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <SectionLabel>Proyectos</SectionLabel>
            <p className="mx-auto mt-4 max-w-3xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
              Los proyectos son propuestas definidas para brindar un servicio a la comunidad con
              objetivos específicos. Tienen autonomía de funcionamiento, siempre enmarcados en las
              bases propuestas por la asamblea y supeditados a ella.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 60}>
              <NodeCard item={item} />
            </ScrollReveal>
          ))}

          {/* Eventos: proyecto con ciclos propios */}
          <ScrollReveal delay={proyectos.length * 60} className="sm:col-span-2 lg:col-span-1">
            <article className="flex h-full flex-col gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/15">
                  <PartyPopper className="size-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-foreground">Eventos</h3>
                  <p className="text-sm font-medium text-primary">Referente: Rubén</p>
                </div>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Gestión del espacio para la realización de shows y eventos, con ciclos propios:
              </p>
              <ul className="flex flex-col gap-2">
                {eventos.map((evento) => (
                  <li
                    key={evento.title}
                    className="flex flex-col rounded-lg border border-border/50 bg-background px-3 py-2"
                  >
                    <span className="text-sm font-semibold text-foreground">{evento.title}</span>
                    <span className="text-xs text-muted-foreground">{evento.referent}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
