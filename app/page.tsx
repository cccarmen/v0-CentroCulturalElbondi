import { Navbar } from '@/components/navbar'
import { ImmersiveHero } from '@/components/immersive-hero'
import { EventsSection } from '@/components/events-section'
import { FlyersSection } from '@/components/flyers-section'
import { WorkshopsSection } from '@/components/workshops-section'
import { InteractiveTimeline } from '@/components/interactive-timeline'
import { RadioSection } from '@/components/radio-section'
import { MapSection } from '@/components/map-section'
import { LocationCta } from '@/components/location-cta'
import { CommunitySection } from '@/components/community-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Saltar al contenido
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <ImmersiveHero />
        <LocationCta />
        <EventsSection />
        <FlyersSection />
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
