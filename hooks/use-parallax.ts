'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll parallax. Returns a ref to attach to an element and a
 * translateY (in px) that eases as the element moves through the viewport.
 *
 * `speed` controls intensity: positive moves the element up as you scroll down.
 * Respects prefers-reduced-motion (returns 0 offset).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.15) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const viewportH = window.innerHeight
      // How far the element's center is from the viewport center, normalized.
      const distanceFromCenter = rect.top + rect.height / 2 - viewportH / 2
      setOffset(-distanceFromCenter * speed)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [speed])

  return { ref, offset }
}
