'use client'

import { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handlePlayToggle() {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative aspect-video max-h-[75vh] min-h-[420px] w-full">
        {/* Poster / Video */}
        <img
          src="/images/hero.jpg"
          alt="Centro Cultural Comunitario El Bondi - Espacio de arte y cultura"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          loop
          muted
          preload="none"
          onEnded={() => setIsPlaying(false)}
        >
          <source src="" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        {/* Centered play button */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <ScrollReveal direction="none" delay={500} duration={800}>
            <button
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              className="group relative flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-out hover:scale-110 hover:bg-white/20 md:size-20"
            >
              <span className="absolute inset-0 rounded-full border border-white/10 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:opacity-0" />
              {isPlaying ? (
                <Pause className="size-5 fill-current md:size-6" />
              ) : (
                <Play className="size-5 translate-x-0.5 fill-current md:size-6" />
              )}
            </button>
          </ScrollReveal>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-10">
          <div className="mx-auto w-full max-w-7xl">
            <ScrollReveal direction="left" duration={900}>
              <h1 className="font-display text-5xl tracking-wide text-white drop-shadow-md md:text-7xl lg:text-8xl">
                El Bondi
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={150} duration={900}>
              <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-white/80 uppercase md:text-sm">
                Centro Cultural Comunitario
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={300} duration={900}>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
                Derechos que se viven: cultura, educacion y comunicacion.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
