import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Redes | El Bondi',
  description:
    'Seguí al Centro Cultural El Bondi en sus redes: Instagram @cccelbondi y el canal de YouTube del Colectivo Cultural. Enterate de eventos, talleres y la vida del espacio.',
}

export default function RedesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
