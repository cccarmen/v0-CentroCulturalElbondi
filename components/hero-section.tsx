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
{/* Video element — only rendered when a real video URL is provided */}

        {/* Gradient overlays — layered for smooth diffusion in both themes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 via-40% to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

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


      </div>
    </section>
  )
}
