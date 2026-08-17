import { DisplayText } from '@/components/display-text'

// Same cinematic clip used by the homepage hero so the title sections feel
// connected to it — shown blurred and darkened behind a glass panel.
const HEADER_VIDEO_URL =
  'https://nqoenjvb7emeaosc.public.blob.vercel-storage.com/Sequence%2001_2.mp4'

interface InteractivePageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function InteractivePageHeader({
  title,
  description,
  className = '',
}: InteractivePageHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Cinematic video background (blurred + darkened for the glass look) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <video
          src={HEADER_VIDEO_URL}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          poster="/images/hero.jpg"
          className="size-full scale-110 object-cover blur-[2px]"
        >
          <track kind="captions" />
        </video>
        {/* Color + darkness wash so the title stays readable and on-brand */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-background/70" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Frosted glass title panel */}
      <div className="relative z-10 rounded-2xl border border-white/25 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-md backdrop-saturate-150 lg:p-8">
        <h1 className="font-display text-4xl tracking-wide text-primary-foreground drop-shadow-md md:text-5xl lg:text-6xl">
          <DisplayText>{title}</DisplayText>
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90 drop-shadow lg:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
