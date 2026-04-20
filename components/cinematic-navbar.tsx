'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const navLinks = [
  { label: 'Centro Cultural', href: '/centro-cultural' },
  { label: 'Eventos', href: '/programacion' },
  { label: 'Talleres', href: '/talleres' },
  { label: 'Radio', href: '/radio-espacio' },
  { label: 'FAQ', href: '/faq' },
]

export function CinematicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      // Become solid after scrolling past ~60% of viewport
      setScrolled(window.scrollY > window.innerHeight * 0.6)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/40 bg-background/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo - always visible in left corner, bigger when not scrolled */}
        <a 
          href="/" 
          className="flex flex-shrink-0 items-center transition-all duration-500"
        >
          <img
            src="/images/logo-dark.png"
            alt="El Bondi - Centro Cultural Comunitario"
            className={`block w-auto transition-all duration-500 dark:hidden ${scrolled ? 'h-8' : 'hidden'}`}
          />
          <img
            src="/images/logo-white.png"
            alt="El Bondi - Centro Cultural Comunitario"
            className={`w-auto transition-all duration-500 ${scrolled ? 'hidden h-8 dark:block' : 'block h-14 sm:h-16 md:h-20'}`}
          />
        </a>

        {/* Navigation links */}
        <nav 
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegacion principal"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                  : 'text-white/90 hover:text-white'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
            className={`transition-colors duration-300 ${
              scrolled
                ? 'hover:bg-primary/10 hover:text-primary'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden transition-colors duration-300 ${
              scrolled
                ? 'hover:bg-primary/10 hover:text-primary'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div 
          className={`border-t md:hidden ${
            scrolled 
              ? 'border-border/40 bg-background' 
              : 'border-white/10 bg-black/80 backdrop-blur-md'
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Navegacion movil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
