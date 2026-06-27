import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const schedules = await sql`
      SELECT
        s.*,

        json_build_object(
          'id', g.id,
          'name', g.name,
          'pfp', g.pfp
        ) AS game,

        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', c.id,
              'name', c.name,
              'pfp', c.pfp,
              'socials',
              COALESCE(
                (
                  SELECT json_agg(
                    jsonb_build_object(
                      'id', sl.id,
                      'platform', sl.platform,
                      'url', sl.url
                    )
                  )
                  FROM "SocialLink" sl
                  WHERE sl.collaborator_id = c.id
                ),
                '[]'
              )
            )
          ) FILTER (
            WHERE c.id IS NOT NULL
          ),
          '[]'
        ) AS collaborators

      FROM "Schedule" s

      LEFT JOIN "Game" g
        ON g.id = s.game_id

      LEFT JOIN "_CollaboratorToSchedule" cs
        ON cs."B" = s.id

      LEFT JOIN "Collaborator" c
        ON c.id = cs."A"

      GROUP BY
        s.id,
        g.id

      ORDER BY
        s.date ASC
    `;

    const now = new Date();

    const upcoming = schedules.filter(
      (schedule) => new Date(schedule.date) >= now,
    );

    const latestPast = schedules
      .filter((schedule) => new Date(schedule.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 1)
      .map((latest) => ({
        ...latest,
        inactive: true,
      }));

    const result = [...latestPast, ...upcoming];

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load schedule",
      },
      {
        status: 500,
      },
    );
  }
}
