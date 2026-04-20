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

  // Logo transforms
  const logoScale = 1 - scrollProgress * 0.4
  const logoOpacity = 1 - scrollProgress * 0.3
  const logoY = scrollProgress * -60

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

          {/* Morphing Logo - positioned left, big and white, transforms with scroll */}
          <div
            className="absolute left-6 top-1/2 z-20 origin-left transition-all duration-500 ease-out sm:left-10 md:left-16 lg:left-20"
            style={{
              transform: `translateY(-50%) translateY(${logoY}px) scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          >
            <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {/* Main logo - large on left side with high visual priority */}
              <div className="relative">
                {/* Glow backdrop for extra prominence */}
                <div 
                  className="absolute -inset-8 blur-3xl transition-opacity duration-500 md:-inset-16"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
                    opacity: 1 - scrollProgress * 0.8,
                  }}
                />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElBondi-logo-blanco%20%284%29-129hLIOYFwpBUojLFmMTM414Q80dul.png"
                  alt="El Bondi - Centro Cultural Comunitario"
                  className="relative h-32 w-auto drop-shadow-2xl transition-all duration-500 sm:h-44 md:h-56 lg:h-72 xl:h-[22rem] 2xl:h-[28rem]"
                  style={{
                    filter: `drop-shadow(0 0 ${80 - scrollProgress * 60}px rgba(255,255,255,0.5)) drop-shadow(0 8px 40px rgba(0,0,0,0.6))`,
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

          {/* Editorial content that fades in as video recedes */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-all duration-300"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
              pointerEvents: scrollProgress > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl text-center">
              <h1 className="font-display text-4xl tracking-wide text-foreground md:text-6xl lg:text-7xl">
                Un espacio para la comunidad
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Donde el arte, la cultura y los vecinos se encuentran. 
                Un centro cultural vivo, construido por y para la comunidad de Maschwitz.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
