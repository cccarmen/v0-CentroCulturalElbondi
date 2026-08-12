import type { Metadata } from 'next'
import {
  Rye,
  Bevan,
  Alfa_Slab_One,
  Abril_Fatface,
  Ultra,
  Bungee,
  Bungee_Shade,
  Fredericka_the_Great,
  Titan_One,
  Rammetto_One,
} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Tipografías · El Bondi',
  description:
    'Opciones de tipografía de estilo vintage con soporte de acentos y caracteres especiales.',
}

const rye = Rye({ subsets: ['latin', 'latin-ext'], weight: '400' })
const bevan = Bevan({ subsets: ['latin', 'latin-ext'], weight: '400' })
const alfaSlab = Alfa_Slab_One({ subsets: ['latin', 'latin-ext'], weight: '400' })
const abril = Abril_Fatface({ subsets: ['latin', 'latin-ext'], weight: '400' })
const ultra = Ultra({ subsets: ['latin', 'latin-ext'], weight: '400' })
const bungee = Bungee({ subsets: ['latin', 'latin-ext'], weight: '400' })
const bungeeShade = Bungee_Shade({ subsets: ['latin', 'latin-ext'], weight: '400' })
const fredericka = Fredericka_the_Great({ subsets: ['latin', 'latin-ext'], weight: '400' })
const titanOne = Titan_One({ subsets: ['latin', 'latin-ext'], weight: '400' })
const rammetto = Rammetto_One({ subsets: ['latin', 'latin-ext'], weight: '400' })

type FontOption = {
  name: string
  className: string
  style: string
  current?: boolean
}

const fonts: FontOption[] = [
  {
    name: 'Rye',
    className: rye.className,
    style: 'Western / cartel de circo · actual',
    current: true,
  },
  {
    name: 'Bevan',
    className: bevan.className,
    style: 'Slab vintage · prensa antigua',
  },
  {
    name: 'Alfa Slab One',
    className: alfaSlab.className,
    style: 'Slab pesada · póster impactante',
  },
  {
    name: 'Abril Fatface',
    className: abril.className,
    style: 'Display elegante · editorial vintage',
  },
  {
    name: 'Ultra',
    className: ultra.className,
    style: 'Slab robusta · titular fuerte',
  },
  {
    name: 'Titan One',
    className: titanOne.className,
    style: 'Redondeada gruesa · lúdica',
  },
  {
    name: 'Rammetto One',
    className: rammetto.className,
    style: 'Bold redondeada · retro pop',
  },
  {
    name: 'Bungee',
    className: bungee.className,
    style: 'Señalética urbana · condensada',
  },
  {
    name: 'Bungee Shade',
    className: bungeeShade.className,
    style: 'Sombreada 3D · marquesina',
  },
  {
    name: 'Fredericka the Great',
    className: fredericka.className,
    style: 'Dibujada a mano · sombreado artístico',
  },
]

const sampleTitle = 'Centro Cultural El Bondi'
const accents = 'áéíóú ÁÉÍÓÚ ñÑ üÜ ¿? ¡! «» – —'

export default function TipografiasPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 border-b border-border/40 pb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Muestra de tipografías
          </p>
          <h1 className="text-balance text-4xl font-bold text-foreground lg:text-5xl">
            Opciones para los títulos
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Todas mantienen un aire vintage / cartel de feria como el estilo
            actual, pero soportan acentos y caracteres especiales. Compará cómo
            se ven con el nombre del centro y con el set de acentos.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {fonts.map((font) => (
            <section
              key={font.name}
              className="rounded-lg border border-border/40 bg-card p-6 lg:p-8"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold text-card-foreground">
                  {font.name}
                </h2>
                {font.current && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Actual
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  {font.style}
                </span>
              </div>

              <p
                className={`${font.className} text-pretty text-3xl leading-tight text-foreground lg:text-5xl`}
              >
                {sampleTitle}
              </p>

              <p
                className={`${font.className} mt-4 text-xl text-muted-foreground lg:text-2xl`}
              >
                {accents}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
