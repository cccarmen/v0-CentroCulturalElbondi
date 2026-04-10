'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Mail,
  ArrowLeft,
  ArrowRight,
  Phone,
  User,
  CheckCircle2,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getItemBySlug, getRelatedItems } from '@/lib/data'

export default function EventoPage() {
  const params = useParams()
  const slug = params.slug as string
  const item = getItemBySlug(slug)

  const [showForm, setShowForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  if (!item) {
    notFound()
  }

  const related = getRelatedItems(slug, 3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-secondary/30 px-4 py-4">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/programacion"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Volver a Programacion
          </Link>
        </div>
      </section>

      {/* Content Grid - Card on LEFT, Info on RIGHT */}
      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-14">
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

                {!formSubmitted && (
                  <Button 
                    className="mt-4 w-full" 
                    size="lg"
                    onClick={() => setShowForm(true)}
                    disabled={showForm}
                  >
                    {item.category === 'evento' ? 'Reservar mi lugar' : 'Inscribirme'}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                )}

                {formSubmitted && (
                  <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-center text-sm font-medium text-green-700">
                    Solicitud enviada correctamente
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

            {/* Reservation Form Section */}
            {showForm && !formSubmitted && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    {item.category === 'evento' ? 'Reservar mi lugar' : 'Inscribirme al taller'}
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Completa tus datos y nos pondremos en contacto contigo para confirmar tu {item.category === 'evento' ? 'reserva' : 'inscripcion'}. El pago se realiza de forma presencial.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
                        <User className="size-4 text-primary" />
                        Nombre completo *
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        placeholder="Tu nombre y apellido"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="border-border/50"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                          <Mail className="size-4 text-primary" />
                          Correo electronico *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-border/50"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium">
                          <Phone className="size-4 text-primary" />
                          Telefono / WhatsApp *
                        </Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          required
                          placeholder="+54 11 1234-5678"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="border-border/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="mensaje" className="flex items-center gap-2 text-sm font-medium">
                        Mensaje (opcional)
                      </Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Alguna consulta o comentario adicional..."
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        className="min-h-[80px] border-border/50"
                      />
                    </div>

                    <div className="mt-2 flex gap-3">
                      <Button type="submit" className="flex-1 gap-2">
                        <Send className="size-4" />
                        Enviar solicitud
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Confirmation Message */}
            {formSubmitted && (
              <Card className="border-green-500/30 bg-green-500/10">
                <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle2 className="size-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Solicitud enviada con exito
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Gracias por tu interes en {item.category === 'evento' ? 'este evento' : 'este taller'}. 
                    Nos pondremos en contacto contigo a la brevedad al correo <strong className="text-foreground">{formData.email}</strong> para 
                    confirmar tu {item.category === 'evento' ? 'reserva' : 'inscripcion'}.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    El pago se realiza de forma presencial en El Bondi.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Related Items */}
      {related.length > 0 && (
        <section className="border-t border-border/50 bg-secondary/30 py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-center font-display text-3xl tracking-wide text-foreground md:text-4xl">
              {item.category === 'evento' ? 'Mas Eventos' : 'Mas Talleres'}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/evento/${rel.slug}`}
                  className="group relative flex h-[280px] flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
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
