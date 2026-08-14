import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_ALT = 'El Bondi - Centro Cultural Comunitario en Ingeniero Maschwitz'
export const OG_CONTENT_TYPE = 'image/png'

// Loads a Google Font as an ArrayBuffer so Satori can render it.
// Falls back gracefully (returns null) if the network request fails.
async function loadGoogleFont(font: string, weight: number, text: string) {
  try {
    const family = `${font.replace(/ /g, '+')}:wght@${weight}`
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)
    if (resource) {
      const res = await fetch(resource[1])
      if (res.status === 200) return await res.arrayBuffer()
    }
  } catch {
    // ignore and fall back to default fonts
  }
  return null
}

export async function renderOgImage() {
  const title = 'El Bondi'
  const subtitle = 'Derechos que se viven: cultura, educación y comunicación.'
  const eyebrow = 'CENTRO CULTURAL COMUNITARIO'
  const location = 'Ingeniero Maschwitz · Buenos Aires'

  // Read the stock hero photo from the filesystem and inline it as a data URL.
  const heroData = await readFile(join(process.cwd(), 'public/images/hero.jpg'))
  const heroSrc = `data:image/jpeg;base64,${heroData.toString('base64')}`

  // Load fonts (Rye for the display title, Geist for supporting copy).
  const [rye, geistBold, geistRegular] = await Promise.all([
    loadGoogleFont('Rye', 400, title),
    loadGoogleFont('Geist', 700, `${eyebrow}${location}`),
    loadGoogleFont('Geist', 400, subtitle),
  ])

  const fonts = [
    rye && { name: 'Rye', data: rye, weight: 400 as const, style: 'normal' as const },
    geistBold && { name: 'Geist', data: geistBold, weight: 700 as const, style: 'normal' as const },
    geistRegular && { name: 'Geist', data: geistRegular, weight: 400 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#1a0f24',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        {/* Background photo */}
        <img
          src={heroSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Purple gradient scrim for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(90deg, rgba(20,11,28,0.97) 0%, rgba(20,11,28,0.95) 48%, rgba(20,11,28,0.6) 72%, rgba(20,11,28,0.15) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(0deg, rgba(15,8,22,0.85) 0%, rgba(15,8,22,0) 55%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '64px 80px',
            maxWidth: 760,
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 44,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#c07de0',
                marginRight: 18,
              }}
            />
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 6,
                color: '#e6cdf2',
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: 'Rye, Geist, serif',
              fontSize: 132,
              lineHeight: 1,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              marginTop: 20,
              marginBottom: 26,
              textShadow: '0 6px 40px rgba(0,0,0,0.55)',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 400,
              lineHeight: 1.35,
              color: '#f1e8f7',
              maxWidth: 600,
            }}
          >
            {subtitle}
          </div>

          {/* Location tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 40,
              fontSize: 26,
              fontWeight: 700,
              color: '#c07de0',
              letterSpacing: 1,
            }}
          >
            {location}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
    },
  )
}
