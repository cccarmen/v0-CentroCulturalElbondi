'use client'

import { useState } from 'react'
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
  { label: 'FAQ', href: '/faq' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[clamp(3.5rem,3rem+2.5vw,5rem)] max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <a href="/" className="flex min-w-0 flex-shrink-0">
          <img
            src="/images/logo-white.png"
            alt="El Bondi - Centro Cultural Comunitario"
            className="h-[clamp(2.25rem,1.8rem+2vw,3.5rem)] w-auto"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacion principal">
          {navLinks.map((link) =>
            link.children ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)] font-medium text-foreground/80 transition-colors outline-none hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary data-[state=open]:text-primary">
                  {link.label}
                  <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
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
                className="rounded-md px-3 py-2 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)] font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Navegacion movil">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="flex flex-col">
                  <span className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {link.label}
                  </span>
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="rounded-md px-3 py-2 pl-6 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
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
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
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
