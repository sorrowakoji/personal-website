import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const matches = await sql`

			SELECT

				em.*,


				json_build_object(
					'id', g.id,
					'name', g.name,
					'pfp', g.pfp,
                    'icon', g.icon
				) AS game,


				COALESCE(
					json_agg(
						DISTINCT jsonb_build_object(

							'id', es.id,

							'start', es.start,

							'end', es.end

						)

					)
					FILTER (
						WHERE es.id IS NOT NULL
					),

					'[]'
				) AS streams


			FROM "EwcMatch" em


			LEFT JOIN "Game" g

				ON g.id = em.game_id



			LEFT JOIN "EwcStreamSchedule" es

				ON es."ewcMatchId" = em.id



			GROUP BY

				em.id,

				g.id



			ORDER BY

				em.start ASC

		`;

    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load EWC schedule",
      },
      {
        status: 500,
      },
    );
  }
}
