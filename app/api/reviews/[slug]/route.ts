import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const { slug } = await params;

    const reviews = await sql`
      SELECT
        r.*,

        json_build_object(
          'id', g.id,
          'name', g.name,
          'pfp', g.pfp,
          'metadata',
          COALESCE(
            json_agg(
              json_build_object(
                'id', gm.id,
                'type', gm.type,
                'value', gm.value
              )
            ) FILTER (
              WHERE gm.id IS NOT NULL
            ),
            '[]'
          )
        ) AS game

      FROM "Review" r

      LEFT JOIN "Game" g
        ON g.id = r.game_id

      LEFT JOIN "GameMetadata" gm
        ON gm.game_id = g.id

      WHERE r.slug = ${slug}

      GROUP BY
        r.id,
        g.id

      LIMIT 1
    `;

    if (!reviews.length) {
      return NextResponse.json(
        {
          error: "Review not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(reviews[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load review",
      },
      {
        status: 500,
      },
    );
  }
}
