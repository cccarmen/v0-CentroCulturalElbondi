import { createElement, type ElementType } from 'react'

/**
 * The display font (Milonga) includes the Spanish "ñ" / "Ñ" glyph natively, so
 * headings can render the string directly. `DisplayText` is kept as a thin
 * wrapper so existing call sites continue to work.
 */
export function DisplayText({
  children,
  as,
  className,
}: {
  children: string
  as?: ElementType
  className?: string
}) {
  const Tag: ElementType = as ?? 'span'
  return createElement(Tag, { className }, children)
}
