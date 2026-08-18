'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  /** Subtly scale up from this value as the element reveals (e.g. 0.95). */
  scaleFrom?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
  scaleFrom,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const translateMap = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  }

  // When a scaleFrom is provided we drive the transform inline so it can
  // combine a subtle scale with the directional offset.
  const hiddenTransform = scaleFrom
    ? `scale(${scaleFrom}) ${
        direction === 'up'
          ? 'translateY(2rem)'
          : direction === 'down'
            ? 'translateY(-2rem)'
            : direction === 'left'
              ? 'translateX(2rem)'
              : direction === 'right'
                ? 'translateX(-2rem)'
                : ''
      }`
    : undefined

  return (
    <div
      ref={ref}
      className={
        scaleFrom
          ? `${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`
          : `${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : `opacity-0 ${translateMap[direction]}`} ${className}`
      }
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        ...(scaleFrom ? { transform: isVisible ? 'scale(1)' : hiddenTransform } : null),
      }}
    >
      {children}
    </div>
  )
}
