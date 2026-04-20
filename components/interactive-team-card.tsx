'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface InteractiveTeamCardProps {
  name: string
  role: string
  bio: string
  image?: string
}

export function InteractiveTeamCard({ name, role, bio, image }: InteractiveTeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15

    setTransform({ rotateX, rotateY, scale: 1.02 })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  // Generate initials for fallback
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="relative h-full rounded-xl border border-border/50 bg-card p-6 transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovering 
            ? `${transform.rotateY * -2}px ${transform.rotateX * 2}px 30px rgba(0,0,0,0.15)` 
            : '0 4px 6px rgba(0,0,0,0.05)',
        }}
      >
        {/* Shine effect overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(
              ${105 + transform.rotateY * 2}deg,
              transparent 40%,
              rgba(255,255,255,0.1) 45%,
              rgba(255,255,255,0.2) 50%,
              rgba(255,255,255,0.1) 55%,
              transparent 60%
            )`,
          }}
        />

        <div className="flex flex-col items-center gap-4 text-center" style={{ transform: 'translateZ(20px)' }}>
          {/* Image with parallax effect */}
          <div 
            className="relative overflow-hidden rounded-full border-2 border-primary/30 transition-transform duration-200"
            style={{
              transform: `translateZ(40px) translateX(${transform.rotateY * 0.5}px) translateY(${-transform.rotateX * 0.5}px)`,
              width: '100px',
              height: '100px',
            }}
          >
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-primary/10">
                <span className="text-2xl font-semibold text-primary">{initials}</span>
              </div>
            )}
          </div>

          {/* Text content with subtle parallax */}
          <div 
            className="transition-transform duration-200"
            style={{
              transform: `translateZ(30px) translateX(${transform.rotateY * 0.3}px)`,
            }}
          >
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <span className="text-sm font-medium text-primary">{role}</span>
          </div>

          <p 
            className="text-sm leading-relaxed text-muted-foreground transition-transform duration-200"
            style={{
              transform: `translateZ(10px)`,
            }}
          >
            {bio}
          </p>
        </div>

        {/* Border glow on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(${135 + transform.rotateY}deg, transparent, rgba(var(--primary-rgb, 139, 92, 246), 0.3), transparent)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      </div>
    </div>
  )
}
