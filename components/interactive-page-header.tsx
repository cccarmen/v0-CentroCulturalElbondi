interface InteractivePageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function InteractivePageHeader({ 
  title, 
  description,
  className = '' 
}: InteractivePageHeaderProps) {
  return (
    <div className={className}>
      <h1 className="font-display text-4xl tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
