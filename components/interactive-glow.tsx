'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cursor-reactive glow for the purple page headers.
 *
 * The header section itself keeps the exact brand color (`bg-primary`); this
 * overlay adds a soft, darker-purple light that smoothly follows the cursor
 * and fades in on hover, giving an interactive movement effect without
 * changing the branding color.
 *
 * Drop it as the first child of any `bg-primary` section (make the section
 * `relative isolate overflow-hidden`). Respects prefers-reduced-motion.
 */
export function InteractiveGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Render only on the client, after hydration, to avoid SSR mismatch.
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    // Eased pointer tracking for fluid movement.
    const target = { x: 50, y: 50, on: 0 }
    const eased = { x: 50, y: 50, on: 0 }

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width) * 100
      target.y = ((e.clientY - rect.top) / rect.height) * 100
    }
    const onEnter = () => {
      target.on = 1
    }
    const onLeave = () => {
      target.on = 0
    }

    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerenter', onEnter)
    parent.addEventListener('pointerleave', onLeave)

    let raf = 0
    const render = () => {
      eased.x += (target.x - eased.x) * 0.08
      eased.y += (target.y - eased.y) * 0.08
      eased.on += (target.on - eased.on) * 0.06
      el.style.opacity = String(eased.on)
      el.style.background = `radial-gradient(600px circle at ${eased.x}% ${eased.y}%, oklch(0.42 0.19 305) 0%, oklch(0.5 0.2 305 / 0.55) 32%, transparent 72%)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerenter', onEnter)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0"
    />
  )
}
