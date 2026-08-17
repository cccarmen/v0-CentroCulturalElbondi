import { DisplayText } from '@/components/display-text'

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
      {/* Moving colored lights (aurora) behind the glass title */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Bright lavender */}
        <div className="absolute -left-8 top-0 size-56 rounded-full bg-[oklch(0.82_0.15_305)] opacity-90 blur-2xl animate-drift-a" />
        {/* Bright pink */}
        <div className="absolute left-[36%] -top-8 size-64 rounded-full bg-[oklch(0.80_0.17_345)] opacity-90 blur-2xl animate-drift-b" />
        {/* Bright magenta */}
        <div className="absolute right-0 -top-4 size-56 rounded-full bg-[oklch(0.75_0.20_330)] opacity-90 blur-2xl animate-drift-c" />
        {/* Deep violet for contrast/depth */}
        <div className="absolute -bottom-14 left-1/3 size-56 rounded-full bg-[oklch(0.35_0.16_300)] opacity-80 blur-2xl animate-drift-b" />
        {/* White highlight */}
        <div className="absolute -bottom-8 right-1/5 size-44 rounded-full bg-white opacity-40 blur-3xl animate-drift-a" />
      </div>

      {/* Frosted glass title panel */}
      <div className="relative z-10 rounded-2xl border border-white/25 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur-md backdrop-saturate-150 lg:p-8">
        <h1 className="font-display text-4xl tracking-wide text-primary-foreground drop-shadow-sm md:text-5xl lg:text-6xl">
          <DisplayText>{title}</DisplayText>
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85 lg:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
