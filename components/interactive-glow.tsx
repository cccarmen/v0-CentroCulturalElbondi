'use client'

import { useEffect, useRef } from 'react'

/**
 * Cursor-following darker-purple glow that fills its nearest positioned parent.
 * Drop it as the first child of any `bg-primary` section (make the section
 * `relative isolate overflow-hidden`) and the whole purple frame reacts to the
 * mouse. Motion is eased with a requestAnimationFrame lerp for a smooth,
 * trailing feel and is disabled under prefers-reduced-motion.
 */
export function InteractiveGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = 50
    let targetY = 50
    let curX = 50
    let curY = 50
    let raf = 0

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width) * 100
      targetY = ((e.clientY - rect.top) / rect.height) * 100
    }
    const onEnter = () => {
      el.style.opacity = '1'
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    const tick = () => {
      // Ease toward the cursor for a smooth, slightly trailing motion.
      curX += (targetX - curX) * 0.1
      curY += (targetY - curY) * 0.1
      el.style.setProperty('--gx', `${curX}%`)
      el.style.setProperty('--gy', `${curY}%`)
      raf = requestAnimationFrame(tick)
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseenter', onEnter)
    parent.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseenter', onEnter)
      parent.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-out motion-reduce:hidden"
      style={{
        background:
          'radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), oklch(0.4 0.19 300 / 0.85) 0%, oklch(0.46 0.19 300 / 0.35) 40%, transparent 72%)',
      }}
    />
  )
}
