import { EwcSchedule } from "@/types/ewc";
import { formatTime } from "@/utils/time";

type Props = {
  schedules: EwcSchedule[];
};

function toMinutes(date: string, base: Date) {
  return Math.floor((new Date(date).getTime() - base.getTime()) / 60000);
}

function alignToHour(date: Date) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}

export default function EwcDayTimeline({ schedules }: Props) {
  if (!schedules.length) return null;

  // --- BASE RANGE ---
  const startDate = new Date(
    Math.min(...schedules.map((s) => new Date(s.start).getTime())),
  );

  const endDate = new Date(
    Math.max(...schedules.map((s) => new Date(s.end).getTime())),
  );

  const base = alignToHour(startDate);
  const end = alignToHour(new Date(endDate.getTime() + 60 * 60 * 1000));

  const totalMinutes = (end.getTime() - base.getTime()) / 60000;

  // --- HOURS HEADER ---
  const hours: Date[] = [];
  const cursor = new Date(base);

  while (cursor <= end) {
    hours.push(new Date(cursor));
    cursor.setHours(cursor.getHours() + 1);
  }

  function position(startMin: number, endMin: number) {
    return {
      left: `${(startMin / totalMinutes) * 100}%`,
      width: `${((endMin - startMin) / totalMinutes) * 100}%`,
    };
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex">
        {/* left spacer = game column */}
        <div className="w-40" />

        {/* timeline header */}
        <div className="flex-1 relative h-16 text-xs rounded px-4">
          {hours.map((h) => {
            const minutes = (h.getTime() - base.getTime()) / 60000;
            const left = (minutes / totalMinutes) * 100;

            return (
              <span
                key={h.toISOString()}
                className="absolute -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                {formatTime(h.toISOString())}
              </span>
            );
          })}
        </div>
      </div>

      {/* ROWS */}
      {schedules.map((item) => {
        const startMin = toMinutes(item.start, base);
        const endMin = toMinutes(item.end, base);

        return (
          <div key={item.id} className="flex items-center gap-3">
            {/* GAME COLUMN */}
            <div className="w-40 flex items-center gap-2 text-sm">
              <img
                src={item.game.pfp ?? "/placeholder-game.png"}
                className="w-8 h-12 rounded"
              />
              <span>{item.game.name}</span>
            </div>

            {/* TIMELINE */}
            <div className="flex-1 relative h-16 rounded">
              {/* main schedule bar */}
              <div
                className="
							absolute
							top-2
							h-6
							bg-neutral-500
							rounded
							text-xs
							px-2
							flex
							items-center
							z-10
							"
                style={position(startMin, endMin)}
              >
                {formatTime(item.start)} - {formatTime(item.end)}
              </div>

              {/* streams */}
              {item.streams.map((stream) => {
                const sStart = toMinutes(stream.start, base);
                const sEnd = toMinutes(stream.end, base);

                return (
                  <div
                    key={stream.id}
                    className="
										absolute
										top-9
										h-6
										bg-white
										text-black
										rounded
										text-xs
										px-2
										flex
										items-center
										z-20
										"
                    style={position(sStart, sEnd)}
                  >
                    {`${formatTime(stream.start)} - ${formatTime(stream.end)}`}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-6 text-xs text-gray-400">
        {/* EWC */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-neutral-500" />
          <span>EWC Schedule</span>
        </div>

        {/* My Stream */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-white border border-gray-400" />
          <span>My Stream</span>
        </div>
      </div>
    </div>
  );
}
