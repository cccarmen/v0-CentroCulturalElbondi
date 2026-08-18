import type { ReactNode } from 'react'
import { DisplayText } from '@/components/display-text'

interface InteractivePageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function InteractivePageHeader({ title, description, children }: InteractivePageHeaderProps) {
  return (
    <div className="relative z-10">
      <h1 className="font-display text-4xl leading-tight text-primary-foreground text-balance md:text-5xl lg:text-6xl">
        <DisplayText>{title}</DisplayText>
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">{description}</p>
      )}
      {children}
    </div>
  )
}
