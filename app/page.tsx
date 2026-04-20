import { CinematicNavbar } from '@/components/cinematic-navbar'
import { ImmersiveHero } from '@/components/immersive-hero'
import { EventsSection } from '@/components/events-section'
import { WorkshopsSection } from '@/components/workshops-section'
import { InteractiveTimeline } from '@/components/interactive-timeline'
import { RadioSection } from '@/components/radio-section'
import { MapSection } from '@/components/map-section'
import { CommunitySection } from '@/components/community-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <CinematicNavbar />

      <main className="flex-1">
        <ImmersiveHero />
        <EventsSection />
        <WorkshopsSection />
        <InteractiveTimeline />
        <RadioSection />
        <MapSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  )
}
