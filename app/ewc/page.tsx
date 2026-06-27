import EwcCalendar from "@/components/ewc/ewc-calendar";
import { getEwcSchedule } from "@/utils/ewc";
import { getTimezone } from "@/utils/time";

export default async function EwcPage() {
  const schedules = await getEwcSchedule();

  return (
    <div className="p-6 graph-papermin-h-screen pt-16">
      <h2 className="text-center text-xl">Esports World Cup - Schedule</h2>

      <p className="text-center text-xs">Click into the grid for more detail</p>

      <div className="min-h-12 text-center">
        All time are in {getTimezone()} timezone
      </div>

      <EwcCalendar schedules={schedules} />
    </div>
  );
}
