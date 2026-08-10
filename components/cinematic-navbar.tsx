'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type NavChild = { label: string; href: string }
type NavLink = { label: string; href?: string; children?: NavChild[] }

const navLinks: NavLink[] = [
  {
    label: 'Sobre nosotros',
    children: [
      { label: 'Centro Cultural', href: '/centro-cultural' },
      { label: 'Colectivo Cultural', href: '/colectivo-cultural' },
    ],
  },
  { label: 'Eventos', href: '/programacion' },
  {
    label: 'Aprender en el Bondi',
    children: [
      { label: 'Talleres', href: '/talleres' },
      { label: 'Educación', href: '/educacion' },
    ],
  },
  {
    label: 'Comunicación',
    children: [
      { label: 'Radio Activa', href: '/radio-espacio' },
      { label: 'Redes', href: '/redes' },
    ],
  },
  { label: 'Cómo llegar', href: '/#ubicacion' },
  { label: 'FAQ', href: '/faq' },
]

export function CinematicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      <div className="mx-auto flex h-[clamp(3.5rem,3rem+2.5vw,5rem)] max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        {/* Logo - always visible in left corner, bigger when not scrolled */}
        <a 
          href="/" 
          className="flex min-w-0 flex-shrink-0 items-center transition-all duration-500"
        >
          <img
            src="/images/logo-white.png"
            alt="El Bondi - Centro Cultural Comunitario"
            className="h-[clamp(1.75rem,1.5rem+1vw,2.25rem)] w-auto"
          />
        </a>

        {/* Navigation links */}
        <nav 
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegacion principal"
        >
          {navLinks.map((link, index) =>
            link.children ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)] font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary ${
                    scrolled
                      ? 'text-foreground/80 hover:bg-primary/10 hover:text-primary data-[state=open]:text-primary'
                      : 'text-white/90 hover:text-white data-[state=open]:text-white'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                  <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-44">
                  {link.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <a href={child.href} className="cursor-pointer">
                        {child.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)] font-medium transition-all duration-300 ${
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
            )
          )}
        </nav>

        {/* Mobile menu toggle */}
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
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="flex flex-col">
                  <span
                    className={`px-3 pt-2 pb-1 text-xs font-semibold tracking-wide uppercase ${
                      scrolled ? 'text-muted-foreground' : 'text-white/60'
                    }`}
                  >
                    {link.label}
                  </span>
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className={`rounded-md px-3 py-2 pl-6 text-sm font-medium transition-colors ${
                        scrolled
                          ? 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
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
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
