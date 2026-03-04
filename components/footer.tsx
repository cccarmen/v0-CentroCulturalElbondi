export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-xl text-foreground">El Bondi</span>
          <span className="text-xs text-muted-foreground">Centro Cultural Comunitario</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Colectivo
          </a>
          <a href="#eventos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contacto
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Instagram
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Facebook
          </a>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl border-t border-border/50 px-4 pt-6 lg:px-8">
        <p className="text-center text-xs text-muted-foreground">
          {'El Bondi \u00A9 2024-2026. Todos los derechos reservados. Se reservan el derecho de negar la entrada. La distribucion de los asientos es primero por'}
          {' llegada. Informacion de Privacidad y Cookies.'}
        </p>
      </div>
    </footer>
  )
}
