'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollReveal } from '@/components/scroll-reveal'

type ContactMethod = 'email' | 'phone' | 'both'

export default function DonarPage() {
  const [submitted, setSubmitted] = useState(false)
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEmailRequired = contactMethod === 'email' || contactMethod === 'both'
  const isPhoneRequired = contactMethod === 'phone' || contactMethod === 'both'

  const isFormValid = () => {
    if (!name.trim() || !consent) return false
    if (isEmailRequired && !email.trim()) return false
    if (isPhoneRequired && !phone.trim()) return false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    // Simulate form submission - in production this would send to an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        {/* Hero header */}
        <section className="relative bg-primary px-4 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
          <div className="relative mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="size-4" />
              Volver al inicio
            </Link>
            <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
              Donar
            </h1>
          </div>
        </section>

        {/* Success message */}
        <div className="mx-auto max-w-3xl px-4 py-16 lg:py-20">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-10 text-primary" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground md:text-3xl">
                Recibimos tu solicitud
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Gracias por tu interes en apoyar a El Bondi. Nos pondremos en contacto con vos
                {contactMethod === 'email' && ' por email'}
                {contactMethod === 'phone' && ' por telefono'}
                {contactMethod === 'both' && ' por email o telefono'}
                {' '}para coordinar tu donacion.
              </p>
              <div className="mt-8 flex gap-4">
                <Button asChild variant="outline" className="rounded-lg">
                  <Link href="/">Volver al inicio</Link>
                </Button>
                <Button asChild className="rounded-lg">
                  <Link href="/programacion">Ver programacion</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="relative bg-primary px-4 py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>
          <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
            Donar
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            Tu donacion nos ayuda a seguir sosteniendo un espacio de cultura, educacion y comunicacion para la comunidad.
          </p>
        </div>
      </section>

      {/* Form content */}
      <div className="mx-auto max-w-3xl px-4 py-10 lg:py-14">
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Info card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Heart className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Quiero hacer una donacion
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Completa el formulario y nos pondremos en contacto para coordinar la donacion. Podes elegir como prefieres que te contactemos.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact method */}
            <div>
              <h2 className="text-lg font-semibold text-foreground">Como prefieres que te contactemos?</h2>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {([
                  { value: 'email' as ContactMethod, label: 'Por email', icon: Mail },
                  { value: 'phone' as ContactMethod, label: 'Por telefono', icon: Phone },
                  { value: 'both' as ContactMethod, label: 'Ambos', icon: Heart },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setContactMethod(opt.value)}
                    className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-left text-sm font-medium transition-all ${
                      contactMethod === opt.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    <opt.icon className="size-4 shrink-0" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-foreground">Tus datos de contacto</h2>
              
              <div>
                <Label htmlFor="donor-name" className="text-sm font-medium">
                  Nombre completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="donor-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              {isEmailRequired && (
                <div>
                  <Label htmlFor="donor-email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
              )}

              {isPhoneRequired && (
                <div>
                  <Label htmlFor="donor-phone" className="text-sm font-medium">
                    Telefono <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="donor-phone"
                    type="tel"
                    placeholder="+54 11 1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="donor-message" className="text-sm font-medium">
                  Mensaje (opcional)
                </Label>
                <textarea
                  id="donor-message"
                  placeholder="Contanos sobre tu intencion de donacion, monto aproximado, o cualquier consulta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
                required
              />
              <label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                Acepto ser contactado por El Bondi Centro Cultural para coordinar mi donacion. 
                Mis datos seran utilizados unicamente para este fin. <span className="text-destructive">*</span>
              </label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 rounded-lg"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  <Heart className="size-4" />
                  Quiero donar
                </>
              )}
            </Button>

            {/* Alternative contact */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Tambien podes contactarnos directamente a{' '}
                <a href="mailto:mailcolectivocultural@gmail.com" className="font-medium text-primary hover:underline">
                  mailcolectivocultural@gmail.com
                </a>
              </p>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </main>
  )
}
