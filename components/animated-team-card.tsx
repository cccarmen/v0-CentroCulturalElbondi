'use client'

import { useState } from 'react'
import Image from 'next/image'

// Different animation types for variety
type AnimationType = 'tilt-left' | 'tilt-right' | 'zoom' | 'slide-up' | 'rotate' | 'shake'

interface AnimatedTeamCardProps {
  name: string
  role: string
  bio: string
  image: string
  animation: AnimationType
}

export function AnimatedTeamCard({ name, role, bio, image, animation }: AnimatedTeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get animation styles based on type
  const getImageTransform = () => {
    if (!isHovered) return 'scale(1) rotate(0deg) translateY(0) translateX(0)'
    
    switch (animation) {
      case 'tilt-left':
        return 'scale(1.1) rotate(-8deg) translateY(-5px)'
      case 'tilt-right':
        return 'scale(1.1) rotate(8deg) translateY(-5px)'
      case 'zoom':
        return 'scale(1.2) rotate(0deg) translateY(0)'
      case 'slide-up':
        return 'scale(1.05) rotate(0deg) translateY(-15px)'
      case 'rotate':
        return 'scale(1.1) rotate(360deg) translateY(0)'
      case 'shake':
        return 'scale(1.08) rotate(-3deg) translateX(3px)'
      default:
        return 'scale(1.1) rotate(0deg) translateY(-5px)'
    }
  }

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale transition-all duration-500 ease-out"
          style={{
            transform: getImageTransform(),
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Role badge on hover */}
        <div 
          className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-all duration-300"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {role}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {name}
        </h3>
        <span className="text-sm font-medium text-primary">{role}</span>
        <p className="mt-auto text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </div>

      {/* Animated border on hover */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-primary/50 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  )
}
