'use client'

import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { DisplayText } from '@/components/display-text'

interface InteractivePageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function InteractivePageHeader({ title, description, children }: InteractivePageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="group relative overflow-hidden rounded-2xl bg-primary p-6 lg:p-8"
    >
      {/* Cursor-following darker-purple glow that reveals across the whole frame on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:hidden"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, oklch(0.42 0.19 300) 0%, oklch(0.5 0.2 300 / 0.55) 30%, transparent 70%)`,
        }}
      />
      {/* Soft interactive spotlight ring following the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:hidden"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(200px circle at ${pos.x}% ${pos.y}%, oklch(0.35 0.17 300 / 0.6) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10">
        <h1 className="font-display text-4xl leading-tight text-primary-foreground text-balance md:text-5xl lg:text-6xl">
          <DisplayText>{title}</DisplayText>
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
