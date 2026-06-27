import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const reviews = await sql`
      SELECT
        r.*,

        json_build_object(
          'id', g.id,
          'name', g.name,
          'pfp', g.pfp
        ) AS game

      FROM "Review" r

      LEFT JOIN "Game" g
        ON g.id = r.game_id

      ORDER BY r.id DESC
    `;

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load reviews",
      },
      {
        status: 500,
      },
    );
  }
}
