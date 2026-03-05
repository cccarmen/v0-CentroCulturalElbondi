import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  const socialLinks = [
    { icon: XIcon, href: '#', label: 'X (Twitter)' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-border bg-card">
      {/* Main footer content */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        {/* Left: Logo + Info columns */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {/* Logo & copyright */}
          <div className="flex flex-col gap-3">
            <img
              src="/images/logo-dark.png"
              alt="El Bondi - Centro Cultural Comunitario"
              className="block h-9 w-auto dark:hidden"
            />
            <img
              src="/images/logo-white.png"
              alt="El Bondi - Centro Cultural Comunitario"
              className="hidden h-9 w-auto dark:block"
            />
            <span className="text-sm text-muted-foreground">{'© 2026'}</span>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-foreground">Contact us</h4>
            <span className="text-sm text-muted-foreground">Ubicacion:</span>
            <a
              href="mailto:mailcolectivocultural@gmail.com"
              className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Contacto mailcolectivocultural@gmail.com
            </a>
          </div>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex size-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <social.icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 bg-card/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row lg:px-8">
          <p className="text-xs text-muted-foreground">
            {'Copyright © 2015-2026 colectivo cultural | Lorem Ipsum | Design by'}
          </p>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Impressum
          </a>
        </div>
      </div>
    </footer>
  )
}
