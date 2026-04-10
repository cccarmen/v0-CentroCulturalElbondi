import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talleres y Bachilleratos | El Bondi',
  description:
    'Formacion artistica en circo, musica, danza y mas. Talleres para todas las edades en El Bondi, centro cultural comunitario de Ingeniero Maschwitz.',
}

export default function TalleresLayout({ children }: { children: React.ReactNode }) {
  return children
}
