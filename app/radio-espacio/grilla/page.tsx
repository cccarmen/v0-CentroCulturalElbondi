'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  Radio,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  X,
  Music,
  Newspaper,
  Palette,
  MessageCircle,
  Baby,
  Trophy,
  LayoutGrid,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'
import { RadioWeeklyGrid } from '@/components/radio-weekly-grid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  RADIO_CATEGORIES,
  radioShows,
  getCategoryCount,
  type RadioCategory,
} from '@/lib/radio-shows'

type CategoryFilter = RadioCategory | 'todos'

const categoryIcons: Record<CategoryFilter, React.ReactNode> = {
  todos: <LayoutGrid className="size-4" />,
  musica: <Music className="size-4" />,
  informativo: <Newspaper className="size-4" />,
  cultural: <Palette className="size-4" />,
  debate: <MessageCircle className="size-4" />,
  infantil: <Baby className="size-4" />,
  deportes: <Trophy className="size-4" />,
}

const categoryDotStyles: Record<RadioCategory, string> = {
  musica: 'bg-primary',
  informativo: 'bg-chart-2',
  cultural: 'bg-chart-4',
  debate: 'bg-chart-3',
  infantil: 'bg-chart-5',
  deportes: 'bg-accent-foreground',
}

export default function GrillaRadioPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('todos')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const categoryOptions: { label: string; value: CategoryFilter }[] = [
    { label: 'Todos los programas', value: 'todos' },
    ...RADIO_CATEGORIES.map((c) => ({ label: c.label, value: c.value as CategoryFilter })),
  ]

  const hasActiveFilters = categoryFilter !== 'todos'

  return (
    <>
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
                <BreadcrumbLink asChild>
                  <Link href="/radio-espacio">Radio Espacio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Grilla Semanal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero header */}
      <section className="relative bg-primary px-4 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary-foreground/80">
                <Radio className="size-5" />
                <span className="text-sm font-medium uppercase tracking-wide">
                  Radio Activa 96.9
                </span>
              </div>
              <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
                Grilla Semanal
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/80">
                Consultá la programacion completa de Radio Activa Comunitaria. Todos los programas, dias y horarios de la semana en un solo lugar.
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Calendar className="size-4" />
              <span className="text-sm">
                {radioShows.length} programas activos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros + Contenido */}
      <section className="bg-background py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar - Filtros */}
            <aside className="lg:w-[280px] shrink-0">
              {/* Toggle mobile */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 lg:hidden"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Filter className="size-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      1
                    </Badge>
                  )}
                </span>
                {showMobileFilters ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </button>

              <div
                className={`mt-4 space-y-6 lg:mt-0 ${
                  showMobileFilters ? 'block' : 'hidden lg:block'
                }`}
              >
                {/* Categorias */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    Categoria
                  </h3>
                  <div className="space-y-1">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCategoryFilter(opt.value)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          categoryFilter === opt.value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {categoryIcons[opt.value]}
                        <span className="flex-1 text-left">{opt.label}</span>
                        <span className="text-xs opacity-70">
                          {getCategoryCount(opt.value as RadioCategory | 'todos')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Limpiar filtros */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setCategoryFilter('todos')}
                  >
                    <X className="mr-2 size-4" />
                    Limpiar filtros
                  </Button>
                )}

                {/* Leyenda de colores */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Referencias
                  </h3>
                  <ul className="space-y-2">
                    {RADIO_CATEGORIES.map((cat) => (
                      <li key={cat.value} className="flex items-center gap-2">
                        <span
                          className={`size-2.5 shrink-0 rounded-full ${
                            categoryDotStyles[cat.value]
                          }`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {cat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info card */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info className="size-4 text-primary" />
                    Como usar la grilla
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    En pantallas grandes podes ver la semana completa. En el celular, tocá el dia que queres consultar para ver sus programas.
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    Los programas marcados como <span className="font-semibold text-red-500">EN VIVO</span> son transmisiones desde los eventos del centro cultural.
                  </p>
                </div>

                {/* CTA Escuchar vivo */}
                <Link
                  href="/radio-espacio"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary p-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Radio className="size-4" />
                  Escuchar en vivo
                </Link>
              </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Header de resultados */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-2xl tracking-wide text-foreground md:text-3xl">
                  Programacion de lunes a domingo
                </h2>

                {/* Badges de filtros activos */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1 pr-1">
                      {
                        categoryOptions.find((o) => o.value === categoryFilter)
                          ?.label
                      }
                      <button
                        onClick={() => setCategoryFilter('todos')}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        aria-label="Quitar filtro"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  </div>
                )}
              </div>

              {/* Grilla semanal */}
              <ScrollReveal>
                <RadioWeeklyGrid categoryFilter={categoryFilter} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border/40 bg-primary/5 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
              Tenes una propuesta de programa?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Radio Activa es un espacio abierto a la comunidad. Si queres sumarte con un programa propio, escribinos y te contamos como participar.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="mailto:radioactiva@elbondi.com">Contactanos</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/radio-espacio">Volver a Radio Espacio</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
