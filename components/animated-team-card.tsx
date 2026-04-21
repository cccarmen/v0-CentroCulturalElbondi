import Image from 'next/image'

interface AnimatedTeamCardProps {
  name: string
  role: string
  bio: string
  image: string
}

export function AnimatedTeamCard({ name, role, bio, image }: AnimatedTeamCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-foreground">
          {name}
        </h3>
        <span className="text-sm font-medium text-primary">{role}</span>
        <p className="mt-auto text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </div>
    </div>
  )
}
