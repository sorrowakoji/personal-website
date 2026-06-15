import { ScheduleEvent } from '@/types/schedule'
import { Schedule } from '@/components/schedule'

export const metadata = {
  title: 'Stream Schedule — Sorrow Akoji',
  description: 'Upcoming streams and collaborations.',
}

async function getScheduleEvents(): Promise<{
  events: ScheduleEvent[]
  error?: string
}> {
  try {
    const res = await fetch(`${process.env.API_URL!}/api/schedule`, {
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch schedule')
    }

    const data = await res.json()

    return {
      events: data.events ?? data,
      error: data.error,
    }
  } catch (err) {
    return {
      events: [],
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch schedule',
    }
  }
}

export default async function SchedulePage() {
  const { events, error } = await getScheduleEvents()

  return (
    <main className="min-h-screen pt-16">
      <Schedule events={events} error={error} />
    </main>
  )
}