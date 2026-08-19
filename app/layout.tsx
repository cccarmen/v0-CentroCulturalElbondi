import type { Metadata, Viewport } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700', '900'],
  variable: '--font-fraunces',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

const title = 'El Bondi - Centro Cultural Comunitario'
const description =
  'Derechos que se viven: cultura, educación y comunicación. Centro Cultural Comunitario en Ingeniero Maschwitz.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'El Bondi',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#732B8F',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background overflow-x-clip">
      <body className={`${geist.variable} ${fraunces.variable} font-sans antialiased overflow-x-clip`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
