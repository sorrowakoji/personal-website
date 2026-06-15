'use client'

import { useState } from 'react'
import { Calendar, Clock, RefreshCw, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getScheduleTypeLabel, ScheduleEvent, ScheduleType, TYPE_CONFIG } from '@/types/schedule'

interface Props {
  events: ScheduleEvent[]
  error?: string
}

function formatEventDate(date: string, time: string) {
  const d = new Date(`${date}T${time}`)

  return {
    day: d.toLocaleDateString('en-US', {
      weekday: 'long',
    }),
    date: d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    time: d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  }
}

export function ScheduleView({ events, error }: Props) {
  const availableTypes = [
      ...new Set(events.map((event) => event.type.type)),
    ] as ScheduleType[]

    const [filter, setFilter] = useState<'all' | ScheduleType>('all')

    const filtered = events.filter((event) => {
      if (filter === 'all') return true

      return event.type.type === filter
    })

  const grouped: Record<string, ScheduleEvent[]> = {}

  for (const event of filtered) {
    const d = new Date(`${event.date}T${event.time}`)

    const weekStart = new Date(d)
    weekStart.setDate(d.getDate() - d.getDay())

    const key = weekStart.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })

    if (!grouped[key]) {
      grouped[key] = []
    }

    grouped[key].push(event)
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold mb-0.5">
              Could not load schedule
            </p>

            <p className="text-red-400/70">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {(['all', ...availableTypes] as Array<'all' | ScheduleType>).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
              filter === f
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            )}
          >
            {getScheduleTypeLabel(f)}
          </button>
        ))}

        {/* <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3" />
          Auto-refreshes every 5 minutes
        </span> */}
      </div>

      {filtered.length === 0 && !error && (
        <div className="text-center py-20 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />

          <p className="font-semibold text-foreground">
            No scheduled streams
          </p>

          <p className="text-sm mt-1">
            Check back soon for upcoming streams!
          </p>
        </div>
      )}

      {Object.entries(grouped).map(([weekLabel, weekEvents]) => (
        <div key={weekLabel}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 pl-1">
              Week of {weekLabel}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 pl-1">
              All time in UTC+7
            </span>
          </div>

          <div className="space-y-3">
            {weekEvents.map((event) => {
              const formatted = formatEventDate(
                event.date,
                event.time
              )

              return (
                <div
                  key={event.id}
                  className={cn(
                    "group flex items-start gap-4 p-4 rounded-2xl border bg-card/50 hover:bg-card border-border hover:border-primary/40 transition-all duration-200",
                    event.inactive
                      ? 'opacity-50 bg-muted/20'
                      : 'bg-card/50 hover:bg-card hover:border-primary/40'
                  )}
                >
                  <div
                    className={cn(
                      'w-1 self-stretch rounded-full shrink-0',
                      event.type.type === ScheduleType.Regular
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    )}
                  />

                  <div>
                    <img
                      src={event.game.pfp}
                      alt={event.game.name}
                      className="w-12 h-15 rounded-md object-cover"
                    />
                  </div>

                  <div className="min-w-[100px] shrink-0">
                    <p className="text-xs text-muted-foreground font-medium">
                      {formatted.day}
                    </p>

                    <p className="text-sm font-bold text-foreground mt-0.5">
                      {formatted.date}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatted.time}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {event.collaborator.length === 0 && (
                          <h3 className="font-semibold text-foreground text-xl leading-snug">
                            {event.game.name}
                          </h3>
                        )}
                        {event.collaborator.length > 0 && (
                          <h4 className="font-semibold text-foreground text-md leading-snug">
                            {event.game.name}
                          </h4>
                        )}
                      </div>

                      <span
                        className={cn(
                          'shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full border',
                          event.type.classes
                        )}
                      >
                        {event.type.label}
                      </span>
                    </div>

                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {event.description}
                      </p>
                    )}

                    {event.collaborator.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs text-muted-foreground mt-1">
                              Collaborators: 
                            </span>
                        {event.collaborator.map((collab) => (
                          <a
                            key={collab.id}
                            href={collab.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                          >
                            {collab.pfp && (
                              <img
                                src={collab.pfp}
                                alt={collab.name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                            )}

                            <span className="text-xs">
                              {collab.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}