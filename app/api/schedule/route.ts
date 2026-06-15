import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { Collaborator, TYPE_CONFIG } from '@/types/schedule'

export async function GET() {
  try {
    const schedules = await sql`
        (
        SELECT *
        FROM schedule
        WHERE date < NOW()
        ORDER BY date DESC
        LIMIT 1
        )

        UNION ALL

        (
        SELECT *
        FROM schedule
        WHERE date >= NOW()
        )

        ORDER BY date ASC
        `

    const gameIds = [
      ...new Set(
        schedules.map((s) => s.game_id)
      ),
    ]

    const collaboratorIds = [
      ...new Set(
        schedules.flatMap(
          (s) => s.collab_id ?? []
        )
      ),
    ]

    const games =
      gameIds.length > 0
        ? await sql`
            SELECT *
            FROM game
            WHERE id = ANY(${gameIds})
          `
        : []

    const collaborators =
      collaboratorIds.length > 0
        ? await sql`
            SELECT *
            FROM collaborator
            WHERE id = ANY(${collaboratorIds})
          `
        : []

    const gameMap = new Map(
      games.map((g) => [g.id, g])
    )

    const collaboratorMap = new Map(
      collaborators.map((c) => [c.id, c])
    )

    const events = schedules.map((schedule) => {
      const dateObj = new Date(schedule.date)

      const game = gameMap.get(
        schedule.game_id
      )

      return {
        id: String(schedule.id),

        date: dateObj
          .toISOString()
          .split('T')[0],

        time: dateObj.toLocaleTimeString(
          'en-US',
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }
        ),

        game: {
          id: String(game!.id),
          name: game!.name,
          pfp: game!.pfp,
        },

        collaborator: (
          schedule.collab_id ?? []
        )
          .map((id: number) =>
            collaboratorMap.get(id)
          )
          .filter(Boolean)
          .map((c: Collaborator) => ({
            id: String(c.id),
            name: c.name,
            pfp: c.pfp,
            url: c.url,
          })),

        type:
          TYPE_CONFIG[
            schedule.type as keyof typeof TYPE_CONFIG
          ],

        inactive: dateObj < new Date(),

        description: schedule.description,
      }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to load schedule',
      },
      {
        status: 500,
      }
    )
  }
}