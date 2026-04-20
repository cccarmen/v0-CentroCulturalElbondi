'use client'

import { useState, useCallback } from 'react'

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

  return (
    <div className={className}>
      <h1 className="font-display text-4xl tracking-wide md:text-5xl lg:text-6xl">
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
                  className="inline-block cursor-default transition-all duration-300 ease-out"
                  style={{
                    // Filled by default, outlined on hover (opposite effect)
                    color: isHovered ? 'transparent' : 'var(--primary-foreground)',
                    WebkitTextStroke: isHovered ? '2px var(--primary-foreground)' : '0px transparent',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
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
      
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
