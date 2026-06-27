import EwcCalendar from "@/components/ewc/ewc-calendar";
import { EwcSchedule } from "@/types/ewc";
import { getTimezone } from "@/utils/time";
import { getBaseUrl } from "../utils/getBaseUrl";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "EWC Schedule — Sorrow Akoji",
  description: "Upcoming streams for Esports World Cup.",
};

async function getEwcSchedule(): Promise<EwcSchedule[]> {
  const res = await fetch(`${getBaseUrl()}/api/ewc`, {
    next: {
      revalidate: 5,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch EWC schedule");
  }

  return res.json();
}

export default async function EwcPage() {
  const schedules = await getEwcSchedule();

  return (
    <div className="p-6 graph-papermin-h-screen pt-16">
      <h2 className="text-center text-xl">Esports World Cup - Schedule</h2>

      <p className="text-center text-xs">Click into the grid for more detail</p>

      <div className="min-h-12 text-center">
        All time are in your timezone (hopefully)
      </div>

      <EwcCalendar schedules={schedules} />
    </div>
  );
}
