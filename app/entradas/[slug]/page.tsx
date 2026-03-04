'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Mail,
  Download,
  Check,
  Minus,
  Plus,
  User,
  UserX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'
import { getItemBySlug } from '@/lib/data'

type DeliveryOption = 'email' | 'download' | 'both'
type IdentityType = 'named' | 'anonymous'

export default function EntradasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const event = getItemBySlug(slug)

  const [step, setStep] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [delivery, setDelivery] = useState<DeliveryOption>('email')
  const [identity, setIdentity] = useState<IdentityType>('named')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  if (!event) return notFound()

  // Extract numeric price if possible, otherwise fallback
  const priceMatch = event.price.match(/\$[\d.,]+/)
  const priceLabel = priceMatch ? priceMatch[0] : event.price
  const numericPrice = priceMatch
    ? Number(priceMatch[0].replace(/[$.,]/g, ''))
    : 0
  const isFree = event.price.toLowerCase().includes('gratis') || event.price.toLowerCase().includes('libre')
  const totalPrice = numericPrice * quantity

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handlePayPal = () => {
    if (isFree) return

    const params = new URLSearchParams({
      cmd: '_donations',
      business: 'mailcolectivocultural@gmail.com',
      item_name: `Entrada: ${event.title} x${quantity}`,
      amount: totalPrice.toString(),
      currency_code: 'ARS',
      no_note: '1',
      return: typeof window !== 'undefined' ? `${window.location.origin}/entradas/${slug}?confirmado=1` : '',
    })

    window.open(`https://www.paypal.com/cgi-bin/webscr?${params.toString()}`, '_blank')
  }

  const canProceedStep1 = quantity > 0
  const canProceedStep2 = delivery !== undefined
  const canProceedStep3 = identity === 'anonymous' || (name.trim() && email.trim())

  const steps = [
    { num: 1, label: 'Evento' },
    { num: 2, label: 'Entrega' },
    { num: 3, label: 'Datos' },
    { num: 4, label: isFree ? 'Confirmar' : 'Pagar' },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={event.image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>
          <Badge className="mb-3 bg-primary/80 text-primary-foreground hover:bg-primary/80">
            <Ticket className="mr-1.5 size-3" />
            Comprar entrada
          </Badge>
          <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl lg:text-6xl">
            {event.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-3 overflow-x-auto px-4 py-4">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => { if (s.num < step) setStep(s.num) }}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                step === s.num
                  ? 'bg-primary text-primary-foreground'
                  : step > s.num
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
              } ${s.num < step ? 'cursor-pointer hover:bg-primary/20' : s.num > step ? 'cursor-default' : ''}`}
              disabled={s.num > step}
            >
              {step > s.num ? <Check className="size-3.5" /> : <span>{s.num}</span>}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
        {/* Step 1: Event details + quantity */}
        {step === 1 && (
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Left: event info */}
              <div className="flex flex-col gap-6 lg:col-span-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Sobre el evento</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.fullDescription}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">Detalles</h3>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Fecha:</span>
                      <span className="font-medium text-foreground">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Hora:</span>
                      <span className="font-medium text-foreground">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Lugar:</span>
                      <span className="font-medium text-foreground">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Ticket className="size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">Precio:</span>
                      <span className="font-medium text-foreground">{event.price}</span>
                    </div>
                  </div>
                </div>

                {event.instructor && (
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground">Presentado por</h3>
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={event.instructor.avatar}
                        alt={event.instructor.name}
                        className="size-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.instructor.name}</p>
                        <p className="text-xs text-muted-foreground">{event.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: quantity + CTA */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">Selecciona tus entradas</h3>

                  {!isFree && (
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-foreground">{priceLabel}</span>
                      <span className="ml-1 text-sm text-muted-foreground">por entrada</span>
                    </div>
                  )}

                  {isFree && (
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-sm">Entrada libre y gratuita</Badge>
                    </div>
                  )}

                  <div className="mt-6">
                    <Label className="text-sm font-medium">Cantidad</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-10 rounded-lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-10 text-center text-lg font-semibold text-foreground">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-10 rounded-lg"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {!isFree && totalPrice > 0 && (
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">{formatAmount(totalPrice)}</span>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="mt-5 w-full gap-2 rounded-lg"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                  >
                    Continuar
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 2: Delivery preference */}
        {step === 2 && (
          <ScrollReveal>
            <div className="mx-auto max-w-xl flex flex-col gap-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Como queres recibir tu entrada?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selecciona como preferis obtener tus {quantity > 1 ? 'entradas' : 'entrada'}.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {([
                  { value: 'email' as DeliveryOption, icon: Mail, label: 'Recibir por email', desc: 'Te enviamos la entrada a tu correo electronico para que la presentes desde tu celular.' },
                  { value: 'download' as DeliveryOption, icon: Download, label: 'Descargar directamente', desc: 'Descarga la entrada en formato PDF para imprimirla o guardarla en tu dispositivo.' },
                  { value: 'both' as DeliveryOption, icon: Ticket, label: 'Ambas opciones', desc: 'Recibila por email y tambien descargala al instante. Asi la tenes por las dudas.' },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDelivery(opt.value)}
                    className={`flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                      delivery === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        delivery === opt.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <opt.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{opt.desc}</p>
                    </div>
                    <span
                      className={`ml-auto mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        delivery === opt.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      }`}
                    >
                      {delivery === opt.value && <Check className="size-3 text-primary-foreground" />}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="gap-2 rounded-lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="size-4" />
                  Atras
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 rounded-lg"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                >
                  Continuar
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 3: Identity + contact info */}
        {step === 3 && (
          <ScrollReveal>
            <div className="mx-auto max-w-xl flex flex-col gap-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Datos del comprador</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Podes comprar con tu nombre o de forma anonima.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: 'named' as IdentityType, label: 'Con mi nombre', icon: User },
                  { value: 'anonymous' as IdentityType, label: 'Anonimo', icon: UserX },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setIdentity(opt.value)}
                    className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-left text-sm font-medium transition-all ${
                      identity === opt.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    <opt.icon className="size-4 shrink-0" />
                    {opt.label}
                  </button>
                ))}
              </div>

              {identity === 'named' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="buyer-name" className="text-sm font-medium">Nombre completo *</Label>
                    <Input
                      id="buyer-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyer-email" className="text-sm font-medium">
                      Email *
                      {(delivery === 'email' || delivery === 'both') && (
                        <span className="ml-1 text-xs text-primary">(para recibir tu entrada)</span>
                      )}
                    </Label>
                    <Input
                      id="buyer-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyer-phone" className="text-sm font-medium">Telefono (opcional)</Label>
                    <Input
                      id="buyer-phone"
                      type="tel"
                      placeholder="+54 11 1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1.5 h-11"
                    />
                  </div>
                </div>
              )}

              {identity === 'anonymous' && (delivery === 'email' || delivery === 'both') && (
                <div>
                  <Label htmlFor="anon-email" className="text-sm font-medium">
                    Email *
                    <span className="ml-1 text-xs text-primary">(para recibir tu entrada)</span>
                  </Label>
                  <Input
                    id="anon-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 h-11"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="gap-2 rounded-lg" onClick={() => setStep(2)}>
                  <ArrowLeft className="size-4" />
                  Atras
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 rounded-lg"
                  onClick={() => setStep(4)}
                  disabled={!canProceedStep3}
                >
                  Continuar
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 4: Summary + pay */}
        {step === 4 && (
          <ScrollReveal>
            <div className="mx-auto max-w-xl flex flex-col gap-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Resumen de tu compra</h2>

                <div className="mt-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Evento</span>
                    <span className="text-sm font-medium text-foreground">{event.title}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Fecha y hora</span>
                    <span className="text-sm font-medium text-foreground">{event.date} - {event.time}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Cantidad</span>
                    <span className="text-sm font-medium text-foreground">{quantity} {quantity > 1 ? 'entradas' : 'entrada'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Entrega</span>
                    <span className="text-sm font-medium text-foreground">
                      {delivery === 'email' ? 'Por email' : delivery === 'download' ? 'Descarga directa' : 'Email + Descarga'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Comprador</span>
                    <span className="text-sm font-medium text-foreground">
                      {identity === 'anonymous' ? 'Anonimo' : name}
                    </span>
                  </div>
                  {!isFree && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-primary">{formatAmount(totalPrice)}</span>
                    </div>
                  )}
                  {isFree && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-semibold text-foreground">Total</span>
                      <Badge variant="secondary" className="text-sm">Gratuito</Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <Ticket className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isFree ? 'Confirma tu asistencia' : 'Pago seguro con PayPal'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {isFree
                        ? 'Tu entrada gratuita sera enviada al correo proporcionado. Presentala el dia del evento.'
                        : 'Al hacer click seras redirigido a PayPal para completar tu pago de forma segura. Una vez confirmado, recibiras tu entrada segun el metodo elegido.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps to purchase info */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Pasos para obtener tu entrada</h3>
                <ol className="mt-3 flex flex-col gap-2.5">
                  {[
                    isFree ? 'Confirma tu asistencia con el boton de abajo' : 'Hace click en el boton para ir a PayPal',
                    isFree ? 'Recibi la confirmacion por email' : 'Completa el pago de forma segura en PayPal',
                    delivery === 'email'
                      ? 'Recibi tu entrada por email'
                      : delivery === 'download'
                        ? 'Descarga tu entrada en formato PDF'
                        : 'Recibi tu entrada por email y descargala tambien',
                    'Presenta tu entrada el dia del evento',
                  ].map((stepText, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{stepText}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="gap-2 rounded-lg" onClick={() => setStep(3)}>
                  <ArrowLeft className="size-4" />
                  Atras
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 rounded-lg"
                  onClick={isFree ? () => alert('Entrada confirmada! Recibirás un email con tu entrada.') : handlePayPal}
                >
                  {isFree ? 'Confirmar asistencia' : 'Pagar con PayPal'}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </main>
  )
}
