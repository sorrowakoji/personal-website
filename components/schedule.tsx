import { Calendar, Tv2 } from "lucide-react";
import { ScheduleView } from "./schedule-view";
import { ScheduleEvent } from "@/types/schedule";

export async function Schedule({
  events,
  error,
}: {
  events: ScheduleEvent[];
  error?: string;
}) {
  return (
    <section className="graph-paper relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Stream Schedule
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
                When I&apos;m Live
              </h1>

              <p className="text-muted-foreground mt-2">
                Upcoming streams and collaborations.
              </p>
            </div>
          </div>
        </div>

        <ScheduleView events={events} error={error} />
      </div>
    </section>
  );
}
