import { createElement, type ElementType, type ReactNode } from 'react'

/**
 * The display font (Rye) is a Western wood-type face that does not include the
 * Spanish "ñ" / "Ñ" glyph, so any heading rendered with `font-display` shows a
 * missing-glyph box for that character.
 *
 * `DisplayText` works around this without swapping fonts: it splits the string
 * and, for every "ñ"/"Ñ", composes the glyph from Rye's own "n"/"N" plus a
 * hand-drawn SVG tilde. The result blends with the surrounding letters because
 * the base "n" is the real font glyph.
 *
 * Accessibility & copy/paste:
 * - The real character lives in an `sr-only` node, so screen readers announce
 *   the correct word and text selection copies "ñ" (not "n").
 * - The visible composite is `aria-hidden` and its base letter is drawn with a
 *   CSS `::before`, so it is never announced twice nor copied as a stray "n".
 */

const TILDE_PATH = 'M1 7 C 3 2.5, 5.5 2.5, 7 5 S 11 7.5, 13 3'

function Enye({ upper }: { upper: boolean }) {
  return (
    <span className="enye">
      <span className="sr-only">{upper ? 'Ñ' : 'ñ'}</span>
      <span className="enye__visual" data-upper={upper ? 'true' : undefined} aria-hidden="true">
        <svg
          className="enye__tilde"
          viewBox="0 0 14 10"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d={TILDE_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}

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

  if (!children.includes('ñ') && !children.includes('Ñ')) {
    return createElement(Tag, { className }, children)
  }

  const nodes: ReactNode[] = []
  let buffer = ''
  let key = 0

  for (const char of children) {
    if (char === 'ñ' || char === 'Ñ') {
      if (buffer) {
        nodes.push(buffer)
        buffer = ''
      }
      nodes.push(<Enye key={key++} upper={char === 'Ñ'} />)
    } else {
      buffer += char
    }
  }
  if (buffer) nodes.push(buffer)

  return createElement(Tag, { className }, ...nodes)
}
