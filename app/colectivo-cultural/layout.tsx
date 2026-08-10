import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Colectivo Cultural | El Bondi',
  description:
    'El Colectivo Cultural de Ingeniero Maschwitz es la organización asamblearia y autogestiva que dio vida a El Bondi. Conocé su historia y las comisiones que sostienen el espacio.',
}

export default function ColectivoCulturalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
