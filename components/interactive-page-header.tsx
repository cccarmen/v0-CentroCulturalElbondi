'use client'

import { useState, useCallback } from 'react'

interface InteractivePageHeaderProps {
  title: string
  description?: string
  className?: string
}

// Color palette for hover effects
const hoverColors = [
  'text-amber-300',
  'text-emerald-300', 
  'text-sky-300',
  'text-rose-300',
  'text-violet-300',
  'text-orange-300',
  'text-teal-300',
  'text-pink-300',
]

export function InteractivePageHeader({ 
  title, 
  description,
  className = '' 
}: InteractivePageHeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [charColors, setCharColors] = useState<Record<number, string>>({})

  // Split title into words for animation
  const words = title.split(' ')

  const handleCharHover = useCallback((wordIndex: number, charIndex: number) => {
    const globalIndex = wordIndex * 100 + charIndex
    setHoveredIndex(globalIndex)
    
    // Assign a random color that persists for this character
    if (!charColors[globalIndex]) {
      const randomColor = hoverColors[Math.floor(Math.random() * hoverColors.length)]
      setCharColors(prev => ({ ...prev, [globalIndex]: randomColor }))
    }
  }, [charColors])

  const handleCharLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  return (
    <div className={className}>
      <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => {
              const globalIndex = wordIndex * 100 + charIndex
              const isHovered = hoveredIndex === globalIndex
              const color = charColors[globalIndex]
              
              return (
                <span
                  key={charIndex}
                  onMouseEnter={() => handleCharHover(wordIndex, charIndex)}
                  onMouseLeave={handleCharLeave}
                  className={`inline-block cursor-default transition-all duration-200 ease-out ${
                    isHovered 
                      ? `${color} scale-110 -rotate-3` 
                      : 'text-primary-foreground'
                  }`}
                  style={{
                    transitionDelay: isHovered ? '0ms' : `${charIndex * 10}ms`,
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
