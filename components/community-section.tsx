'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'

export function CommunitySection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="comunidad" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left - CTA */}
          <ScrollReveal direction="left">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>
            <h2 className="font-display text-4xl tracking-wide text-foreground md:text-5xl">
              Se parte de nuestra comunidad
            </h2>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              Al vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal direction="right" delay={200}>
          <Card className="border-border/50 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Para mas informacion</CardTitle>
              <p className="text-sm text-muted-foreground">
                Completa el formulario y nos pondremos en contacto. Tambien nos podes escribir a nuestras redes.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="text-lg font-medium text-foreground">{'Gracias por escribirnos!'}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Nos pondremos en contacto pronto.</p>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="Tu nombre" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="asunto">Asunto</Label>
                    <Input id="asunto" placeholder="De que se trata?" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea id="mensaje" placeholder="Escribi tu mensaje..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
