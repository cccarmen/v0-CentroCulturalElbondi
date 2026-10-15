'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

interface MousePosition {
  x: number
  y: number
}

// Twinkling stars placed over the empty sky area of the illustration.
const STARS = [
  { top: '8%', left: '12%', delay: '0s', size: 3 },
  { top: '14%', left: '34%', delay: '1.2s', size: 2 },
  { top: '6%', left: '58%', delay: '2.4s', size: 3 },
  { top: '18%', left: '72%', delay: '0.6s', size: 2 },
  { top: '10%', left: '88%', delay: '1.8s', size: 3 },
  { top: '22%', left: '22%', delay: '3s', size: 2 },
]

export function ImmersiveHero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const sceneScale = 1 + scrollProgress * 0.15
  const sceneOpacity = 1 - scrollProgress * 0.6
  const sceneBlur = scrollProgress * 8
  const parallaxX = (mousePosition.x - 0.5) * 20
  const parallaxY = (mousePosition.y - 0.5) * 20

  const ctaOpacity = Math.max(0, (scrollProgress - 0.4) * 2.5)
  const ctaY = Math.max(0, 50 - (scrollProgress - 0.4) * 125)

  return (
    // Negative margin (matching the sticky navbar's clamped height) pulls the hero
    // up beneath the translucent header so the 100dvh sticky child fills the full
    // visible viewport at every screen size — keeping the Explora indicator on-screen.
    <div
      ref={containerRef}
      className="relative -mt-[clamp(3.5rem,3rem+2.5vw,5rem)]"
    >
      <section className="relative h-[200vh]" aria-label="El Bondi, Centro Cultural Comunitario">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#2b3466]">
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${sceneScale}) translate(${parallaxX}px, ${parallaxY}px)`,
              opacity: sceneOpacity,
              filter: `blur(${sceneBlur}px)`,
            }}
          >
            <div className="absolute inset-0 animate-scene-drift">
              <Image
                src="/images/el-bondi-render.png"
                alt="Ilustración del edificio de El Bondi: fachada de rayas pastel, techo de cerchas con árboles, una artista de tela aérea, malabarista, pareja bailando y músicos en la vereda."
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_70%]"
              />
            </div>

            {STARS.map((star) => (
              <span
                key={`${star.top}-${star.left}`}
                aria-hidden="true"
                className="pointer-events-none absolute animate-twinkle rounded-full bg-[#fdf3c4]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  animationDelay: star.delay,
                }}
              />
            ))}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.25)_100%)]" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent"
            style={{ opacity: 0.25 + scrollProgress * 0.75 }}
          />

          <div
            className="absolute inset-x-0 bottom-[env(safe-area-inset-bottom,0px)] z-20 flex justify-center pb-8 transition-all duration-500 sm:pb-10 md:pb-12"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 3),
              transform: `translateY(${scrollProgress * 20}px)`,
            }}
          >
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                Explora
              </span>
              <div className="animate-bounce">
                <ChevronDown className="size-5 text-white/80 sm:size-6" />
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-all duration-500"
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
              pointerEvents: scrollProgress > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl text-center">
              <h1 className="font-display text-4xl tracking-wide text-balance text-foreground md:text-6xl lg:text-7xl">
                Un espacio para la comunidad
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
                Donde el arte, la cultura y los vecinos se encuentran.
                Un centro cultural vivo, construido por y para la comunidad de Maschwitz.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/programacion"
                  className="group relative overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  <span className="relative z-10">Ver Programacion</span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a
                  href="/centro-cultural"
                  className="rounded-lg border border-border bg-background/80 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background hover:shadow-lg"
                >
                  Conoce El Bondi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pointer-events-none h-[10vh]" />
    </div>
  )
}
