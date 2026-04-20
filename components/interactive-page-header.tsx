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
      {/* Title container with cursor dot */}
      <div 
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringTitle(true)}
        onMouseLeave={() => setIsHoveringTitle(false)}
      >
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
        
        <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
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
