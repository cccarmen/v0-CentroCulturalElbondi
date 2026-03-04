import { Navbar } from '@/components/navbar'
import { AnnouncementBar } from '@/components/announcement-bar'
import { HeroSection } from '@/components/hero-section'
import { EventsSection } from '@/components/events-section'
import { WorkshopsSection } from '@/components/workshops-section'
import { HistorySection } from '@/components/history-section'
import { RadioSection } from '@/components/radio-section'
import { MapSection } from '@/components/map-section'
import { CommunitySection } from '@/components/community-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <EventsSection />
        <WorkshopsSection />
        <HistorySection />
        <RadioSection />
        <MapSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  )
}
