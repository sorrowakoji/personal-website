import { ComingSoonOverlay } from '@/components/coming-soon-overlay'
import { GameReviews } from '@/components/game-reviews'

export const metadata = {
  title: 'Game Reviews — Sorrow Akoji',
  description: 'Game reviews and opinions from VTuber Sorrow Akoji.',
}

export default function ReviewsPage() {
  return (
    <main className="graph-paper min-h-screen pt-16">
      <GameReviews />

      <ComingSoonOverlay />
    </main>
  )
}
