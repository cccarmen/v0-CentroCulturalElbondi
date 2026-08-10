'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Mail,
  ArrowRight,
  Home,
  MessageCircle,
  Instagram,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getItemBySlug, getRelatedItems } from '@/lib/data'

export default function EventoPage() {
  const params = useParams()
  const slug = params.slug as string
  const item = getItemBySlug(slug)

  if (!item) {
    notFound()
  }

  const related = getRelatedItems(slug, 3)

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
                <BreadcrumbLink asChild>
                  <Link href="/programacion">Programacion</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Content Grid - Card on LEFT, Info on RIGHT */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* LEFT SIDE - Detail Card with Image and Info */}
          <aside className="flex w-full flex-col gap-6 lg:w-[400px]">
            {/* Event Image Card */}
            <Card className="overflow-hidden border-border/50">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover"
                />
                <Badge
                  className="absolute left-4 top-4 bg-primary/90 text-primary-foreground"
                >
                  {item.category === 'evento' ? 'Evento' : 'Taller'}
                </Badge>
              </div>
              <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold text-foreground">Detalles</h3>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Fecha</span>
                    <p className="text-sm font-medium text-foreground">{item.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Horario</span>
                    <p className="text-sm font-medium text-foreground">{item.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Lugar</span>
                    <p className="text-sm font-medium text-foreground">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ticket className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Precio</span>
                    <p className="text-sm font-medium text-foreground">{item.price}</p>
                  </div>
                </div>

                {item.maxParticipants && (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cupos</span>
                      <p className="text-sm font-medium text-foreground">
                        Maximo {item.maxParticipants} participantes
                      </p>
                    </div>
                  </div>
                )}

                <hr className="border-border/50" />

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Contacto</span>
                    <a
                      href={`mailto:${item.contact}`}
                      className="block text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                    >
                      {item.contact}
                    </a>
                  </div>
                </div>

                {(item.whatsapp || item.instagram) && (
                  <div className="flex flex-wrap gap-2">
                    {item.whatsapp && (
                      <a
                        href={`https://wa.me/${item.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                    )}
                    {item.instagram && (
                      <a
                        href={item.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Instagram className="size-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>
          </aside>

          {/* RIGHT SIDE - Title, Description, Organizer */}
          <div className="flex flex-1 flex-col gap-8">
            {/* Title and Badge */}
            <div>
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                {item.category === 'evento' ? 'Evento' : 'Taller'}
              </Badge>
              <h1 className="font-display text-4xl tracking-wide text-foreground md:text-5xl">
                {item.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {item.description}
              </p>
            </div>

            {/* Full Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Acerca de este {item.category === 'evento' ? 'evento' : 'taller'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {item.fullDescription}
              </p>
            </div>

            {/* Instructor / Organizer */}
            {item.instructor && (
              <Card className="border-border/50">
                <CardContent className="flex items-start gap-5 p-6">
                  <Avatar className="size-16 border-2 border-primary/30">
                    <AvatarImage src={item.instructor.avatar} alt={item.instructor.name} />
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                      {item.instructor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      {item.category === 'evento' ? 'Organiza' : 'Instructor/a'}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{item.instructor.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.instructor.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </section>

      {/* Related Items */}
      {related.length > 0 && (
        <section className="border-t border-border/50 bg-secondary/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl">
              {item.category === 'evento' ? 'Mas Eventos' : 'Mas Talleres'}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/evento/${rel.slug}`}
                  className="group relative flex h-[280px] flex-col overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-40% to-black/10" />
                  <div className="relative mt-auto rounded-b-xl bg-black/60 p-4 backdrop-blur-[2px]">
                    <h3 className="truncate text-lg font-semibold text-white">{rel.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-white/80">{rel.description}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {rel.date}
                      </span>
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
