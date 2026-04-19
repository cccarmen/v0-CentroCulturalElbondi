import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grilla Semanal | Radio Activa 96.9 - El Bondi',
  description:
    'Consultá la programacion semanal completa de Radio Activa Comunitaria FM 96.9. Todos los programas, dias y horarios en un solo lugar.',
}

export default function GrillaLayout({ children }: { children: React.ReactNode }) {
  return children
}
