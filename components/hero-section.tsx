'use client'

import { useState, useRef, useCallback } from 'react'
import { Pause, Volume2, VolumeOff } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

const HERO_VIDEO_URL =
  'https://nqoenjvb7emeaosc.public.blob.vercel-storage.com/Sequence%2001_2.mp4'

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative aspect-video max-h-[75vh] min-h-[420px] w-full">
        {/* Video background from Vercel Blob — autoplays muted */}
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          poster="/images/hero.jpg"
          className="absolute inset-0 size-full object-cover"
        >
          <track kind="captions" />
        </video>

        {/* Gradient overlays — layered for smooth diffusion in both themes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 via-40% to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

        {/* Video controls — bottom right */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          <ScrollReveal direction="none" delay={500} duration={800}>
            <div className="flex gap-2">
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
