'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Pause, Volume2, VolumeOff, ChevronDown } from 'lucide-react'

const HERO_VIDEO_URL =
  'https://nqoenjvb7emeaosc.public.blob.vercel-storage.com/Sequence%2001_2.mp4'

interface MousePosition {
  x: number
  y: number
}

export function ImmersiveHero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 })
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // Calculate progress: 0 at top, 1 when hero is scrolled past
      const progress = Math.min(Math.max(-rect.top / windowHeight, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Video load handler
  const handleVideoLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handlePlayToggle = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleMuteToggle = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  // Calculate dynamic transforms based on scroll and mouse
  const videoScale = 1 + scrollProgress * 0.15
  const videoOpacity = 1 - scrollProgress * 0.6
  const videoBlur = scrollProgress * 8
  const parallaxX = (mousePosition.x - 0.5) * 20
  const parallaxY = (mousePosition.y - 0.5) * 20

  // Logo transforms - starts large on left, moves and scales with scroll
  const logoScale = 1 - scrollProgress * 0.5
  const logoOpacity = 1 - scrollProgress * 0.4
  const logoX = scrollProgress * 40 // moves right as user scrolls
  const logoY = scrollProgress * -100 // moves up as user scrolls
  const logoRotate = scrollProgress * -3 // subtle rotation

  // Content reveal
  const contentOpacity = Math.max(0, (scrollProgress - 0.3) * 2.5)
  const contentY = 60 - scrollProgress * 60

  return (
    <div ref={containerRef} className="relative">
      {/* Full-screen cinematic hero container */}
      <section className="relative h-[200vh]">
        {/* Sticky video container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Video layer with parallax and scroll effects */}
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${videoScale}) translate(${parallaxX}px, ${parallaxY}px)`,
              opacity: videoOpacity,
              filter: `blur(${videoBlur}px)`,
            }}
          >
            <video
              ref={videoRef}
              src={HERO_VIDEO_URL}
              autoPlay
              playsInline
              muted
              loop
              preload="auto"
              poster="/images/hero.jpg"
              onLoadedData={handleVideoLoad}
              className="size-full object-cover"
            >
              <track kind="captions" />
            </video>

            {/* Cinematic vignette overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

            {/* Subtle film grain texture */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Cursor-following spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 400px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.03) 0%, transparent 70%)`,
              opacity: 1 - scrollProgress,
            }}
          />

          {/* Gradient overlays for smooth transition */}
          <div 
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent"
            style={{ opacity: 0.4 + scrollProgress * 0.6 }}
          />
          <div 
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent"
            style={{ opacity: scrollProgress * 0.5 }}
          />

          {/* Morphing Logo - large on left, transforms with scroll */}
          <div
            className="absolute left-8 top-1/2 z-20 origin-left transition-all duration-[400ms] ease-out md:left-12 lg:left-16"
            style={{
              transform: `translateY(-50%) translateX(${logoX}px) translateY(${logoY}px) scale(${logoScale}) rotate(${logoRotate}deg)`,
              opacity: logoOpacity,
            }}
          >
            <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {/* Main logo - large with high visual priority, positioned left */}
              <div className="relative">
                {/* Animated glow backdrop */}
                <div 
                  className="absolute -inset-8 blur-3xl transition-all duration-500 md:-inset-16"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
                    opacity: 1 - scrollProgress * 0.9,
                    transform: `scale(${1.2 - scrollProgress * 0.3})`,
                  }}
                />
                {/* Secondary glow for depth */}
                <div 
                  className="absolute -inset-4 blur-2xl transition-all duration-500 md:-inset-8"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    opacity: 1 - scrollProgress * 0.7,
                  }}
                />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElBondi-logo-blanco%20%284%29-129hLIOYFwpBUojLFmMTM414Q80dul.png"
                  alt="El Bondi - Centro Cultural Comunitario"
                  className="relative h-28 w-auto drop-shadow-2xl transition-all duration-500 sm:h-40 md:h-52 lg:h-64 xl:h-[22rem] 2xl:h-[26rem]"
                  style={{
                    filter: `drop-shadow(0 0 ${80 - scrollProgress * 60}px rgba(255,255,255,0.5)) drop-shadow(0 8px 32px rgba(0,0,0,0.6))`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator - fades out on scroll */}
          <div
            className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 transition-all duration-500"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 3),
              transform: `translateX(-50%) translateY(${scrollProgress * 20}px)`,
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                Explora
              </span>
              <div className="animate-bounce">
                <ChevronDown className="size-6 text-white/70" />
              </div>
            </div>
          </div>

          {/* Editorial content that fades in as video recedes - positioned right to balance logo */}
          <div
            className="absolute inset-0 flex items-center justify-end px-4 transition-all duration-300 md:px-12 lg:px-16"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
              pointerEvents: scrollProgress > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-xl text-right lg:max-w-2xl">
              <h1 className="font-display text-3xl tracking-wide text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
                Un espacio para la comunidad
              </h1>
              <p className="ml-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl">
                Donde el arte, la cultura y los vecinos se encuentran. 
                Un centro cultural vivo, construido por y para la comunidad de Maschwitz.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
                <a
                  href="/programacion"
                  className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  <span className="relative z-10">Ver Programacion</span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a
                  href="/centro-cultural"
                  className="rounded-full border border-border bg-background/80 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background hover:shadow-lg"
                >
                  Conoce El Bondi
                </a>
              </div>
            </div>
          </div>

          {/* Video controls - bottom right, always visible */}
          <div 
            className="absolute bottom-6 right-6 z-30 flex gap-2 transition-all duration-300"
            style={{
              opacity: Math.max(0.5, 1 - scrollProgress),
            }}
          >
            <button
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              className="group relative flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 ease-out hover:bg-black/50"
            >
              {isPlaying ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
            <button
              onClick={handleMuteToggle}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="group relative flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 ease-out hover:bg-black/50"
            >
              {isMuted ? (
                <VolumeOff className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Spacer for smooth transition to content */}
      <div className="pointer-events-none h-[10vh]" />
    </div>
  )
}
