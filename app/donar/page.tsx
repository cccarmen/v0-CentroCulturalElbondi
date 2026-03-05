'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, User, UserX, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FileteadoOrnaments } from '@/components/fileteado-ornaments'

const presetAmounts = [500, 1000, 2000, 5000, 10000, 25000]

type Frequency = 'one-time' | 'monthly'
type Identity = 'named' | 'anonymous'

export default function DonarPage() {
  const [step, setStep] = useState(1)
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2000)
  const [customAmount, setCustomAmount] = useState('')
  const [identity, setIdentity] = useState<Identity>('named')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const donationAmount = customAmount ? Number(customAmount) : selectedAmount

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) setSelectedAmount(null)
  }

  const handleContinueToPaypal = () => {
    const amount = donationAmount
    if (!amount || amount <= 0) return

    // Build PayPal donation URL
    const params = new URLSearchParams({
      cmd: frequency === 'monthly' ? '_xclick-subscriptions' : '_donations',
      business: 'mailcolectivocultural@gmail.com',
      item_name: `Donacion${frequency === 'monthly' ? ' mensual' : ''} - El Bondi Centro Cultural`,
      amount: amount.toString(),
      currency_code: 'ARS',
      no_note: '1',
      return: typeof window !== 'undefined' ? `${window.location.origin}/donar?gracias=1` : '',
    })

    if (frequency === 'monthly') {
      params.set('a3', amount.toString())
      params.set('p3', '1')
      params.set('t3', 'M')
      params.set('src', '1')
    }

    window.open(`https://www.paypal.com/cgi-bin/webscr?${params.toString()}`, '_blank')
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
        <FileteadoOrnaments />
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

      {/* Steps indicator */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          {[
            { num: 1, label: 'Monto' },
            { num: 2, label: 'Datos' },
            { num: 3, label: 'Donar' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num < step) setStep(s.num)
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
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

      {/* Form content */}
      <div className="mx-auto max-w-3xl px-4 py-10 lg:py-14">
        {/* Step 1: Frequency + Amount */}
        {step === 1 && (
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              {/* Frequency */}
              <div>
                <h2 className="text-lg font-semibold text-foreground">Frecuencia de donacion</h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {([
                    { value: 'one-time' as Frequency, label: 'Una vez' },
                    { value: 'monthly' as Frequency, label: 'Mensual' },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFrequency(opt.value)}
                      className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-left text-sm font-medium transition-all ${
                        frequency === opt.value
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          frequency === opt.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/40'
                        }`}
                      >
                        {frequency === opt.value && (
                          <span className="size-2 rounded-full bg-primary-foreground" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amounts */}
              <div>
                <h2 className="text-lg font-semibold text-foreground">Monto</h2>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleSelectPreset(amount)}
                      className={`rounded-lg border-2 px-4 py-4 text-center text-sm font-semibold transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-foreground hover:border-primary/40'
                      }`}
                    >
                      {formatAmount(amount)}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Input
                    type="number"
                    placeholder="Otro monto"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 rounded-lg"
                onClick={() => setStep(2)}
                disabled={!donationAmount || donationAmount <= 0}
              >
                Continuar
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </ScrollReveal>
        )}

        {/* Step 2: Identity */}
        {step === 2 && (
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Tu informacion</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Podes donar con tu nombre o de forma anonima.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {([
                    { value: 'named' as Identity, label: 'Con mi nombre', icon: User },
                    { value: 'anonymous' as Identity, label: 'Anonimo', icon: UserX },
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
              </div>

              {identity === 'named' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="donor-name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="donor-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donor-email" className="text-sm font-medium">
                      Email (opcional)
                    </Label>
                    <Input
                      id="donor-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 h-11"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="donor-message" className="text-sm font-medium">
                  Mensaje (opcional)
                </Label>
                <textarea
                  id="donor-message"
                  placeholder="Dejanos un mensaje de apoyo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-lg"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="size-4" />
                  Atras
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 rounded-lg"
                  onClick={() => setStep(3)}
                  disabled={identity === 'named' && !name.trim()}
                >
                  Continuar
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 3: Summary + PayPal */}
        {step === 3 && (
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Resumen de donacion</h2>

                <div className="mt-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Monto</span>
                    <span className="text-lg font-bold text-foreground">
                      {donationAmount ? formatAmount(donationAmount) : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Frecuencia</span>
                    <span className="text-sm font-medium text-foreground">
                      {frequency === 'one-time' ? 'Pago unico' : 'Mensual'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Donante</span>
                    <span className="text-sm font-medium text-foreground">
                      {identity === 'anonymous' ? 'Anonimo' : name}
                    </span>
                  </div>
                  {message && (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Mensaje</span>
                      <p className="text-sm text-foreground">{`"${message}"`}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <Heart className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Gracias por apoyar a El Bondi
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Al hacer click en el boton seras redirigido a PayPal para completar tu donacion de forma segura.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-lg"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="size-4" />
                  Atras
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 rounded-lg"
                  onClick={handleContinueToPaypal}
                >
                  Donar con PayPal
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
