'use client'

import { useState, useCallback, useRef } from 'react'

interface InteractivePageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function InteractivePageHeader({ 
  title, 
  description,
  className = '' 
}: InteractivePageHeaderProps) {
  const [hoveredChars, setHoveredChars] = useState<Set<number>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringTitle, setIsHoveringTitle] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Split title into words for animation
  const words = title.split(' ')

  const handleCharHover = useCallback((globalIndex: number) => {
    setHoveredChars(prev => new Set(prev).add(globalIndex))
  }, [])

  const handleCharLeave = useCallback((globalIndex: number) => {
    setHoveredChars(prev => {
      const newSet = new Set(prev)
      newSet.delete(globalIndex)
      return newSet
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  return (
    <div className={className}>
      {/* Title container with cursor dot and texture */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-lg px-4 py-2 -mx-4 -my-2"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringTitle(true)}
        onMouseLeave={() => setIsHoveringTitle(false)}
      >
        {/* Noise texture overlay that appears on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHoveringTitle ? 0.15 : 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
        
        {/* Gradient spotlight that follows cursor */}
        <div
          className="pointer-events-none absolute z-0 transition-opacity duration-300"
          style={{
            width: '300px',
            height: '300px',
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            opacity: isHoveringTitle ? 1 : 0,
          }}
          aria-hidden="true"
        />
        
        {/* White dot that follows cursor */}
        <div
          className="pointer-events-none absolute z-10 size-4 rounded-full bg-white shadow-lg transition-all duration-150 ease-out md:size-6"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            opacity: isHoveringTitle ? 1 : 0,
            scale: isHoveringTitle ? 1 : 0.5,
          }}
        />
        
        <h1 className="relative z-20 font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split('').map((char, charIndex) => {
                const globalIndex = wordIndex * 100 + charIndex
                const isHovered = hoveredChars.has(globalIndex)
                
                return (
                  <span
                    key={charIndex}
                    onMouseEnter={() => handleCharHover(globalIndex)}
                    onMouseLeave={() => handleCharLeave(globalIndex)}
                    className={`inline-block cursor-none transition-all duration-200 ease-out ${
                      isHovered ? 'text-white scale-105' : 'text-primary-foreground'
                    }`}
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                )
              })}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
          <span className="sr-only">{title}</span>
        </h1>
      </div>
      
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
