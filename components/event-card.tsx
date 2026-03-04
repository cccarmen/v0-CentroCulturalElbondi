import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface EventCardProps {
  title: string
  description: string
  image: string
  date: string
  time: string
}

export function EventCard({ title, description, image, date, time }: EventCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {time}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
