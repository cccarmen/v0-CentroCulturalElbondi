import { Megaphone } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <Megaphone className="hidden size-4 shrink-0 sm:block" />
        <p>
          <span className="font-medium">{'Ultimas novedades!'}</span>
          {' Proxima Varite: "Circo, musica en vivo y exposicion de arte urbano" para la comunidad el 15 de enero de 2026. '}
          <a href="/entradas/noche-de-variete" className="font-semibold underline underline-offset-2 hover:opacity-80">
            {'Compre sus entradas aqui!'}
          </a>
        </p>
      </div>
    </div>
  )
}
