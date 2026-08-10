import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Educación | El Bondi',
  description:
    'Espacios de educación popular, acompañamiento y encuentro en El Bondi: bachillerato popular, apoyo escolar y encuentro de educación popular en Ingeniero Maschwitz.',
}

export default function EducacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
