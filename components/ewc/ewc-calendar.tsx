"use client";

import { useState } from "react";
import Image from "next/image";
import EwcTimeline from "./ewc-day-timeline";
import { EwcSchedule, getEsportsIcon } from "@/types/ewc";
import EwcDayView from "./ewc-day-view";
import { formatTime } from "@/utils/time";

type Props = {
  schedules: EwcSchedule[];
};

function getUniqueGames(schedules: EwcSchedule[]) {
  const map = new Map<number, EwcSchedule>();

  schedules.forEach((item) => {
    map.set(item.game.id, item);
  });

  return Array.from(map.values());
}

export default function EwcCalendar({ schedules }: Props) {
  const [month, setMonth] = useState(new Date(2026, 6));

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = month.getFullYear();

  const monthIndex = month.getMonth();

  function changeMonth(value: number) {
    const next = new Date(year, monthIndex + value, 1);

    const nextYear = next.getFullYear();
    const nextMonth = next.getMonth();

    // only allow July 2026 and August 2026
    const allowed = nextYear === 2026 && (nextMonth === 6 || nextMonth === 7);

    if (!allowed) {
      return;
    }

    setMonth(next);

    setSelectedDay(null);
  }

  const days = new Date(year, monthIndex + 1, 0).getDate();

  const firstDay = new Date(year, monthIndex, 1).getDay();

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let i = 1; i <= days; i++) {
    cells.push(i);
  }

  function getSchedule(day: number) {
    return schedules.filter((item) => {
      const date = new Date(
        item.start.endsWith("Z") ? item.start : item.start + "Z",
      );

      return (
        date.getFullYear() === year &&
        date.getMonth() === monthIndex &&
        date.getDate() === day
      );
    });
  }

  const selectedSchedules = selectedDay ? getSchedule(selectedDay) : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => changeMonth(-1)}
          className="border rounded px-3 py-1"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold">
          {month.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <button
          onClick={() => changeMonth(1)}
          className="border rounded px-3 py-1"
        >
          →
        </button>
      </div>

      <div
        className="
					grid
					grid-cols-7
					border
				"
      >
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Sunday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Monday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Tuesday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Wednesday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Thursday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Friday
        </div>
        <div
          className="
								min-h-12
								border
								p-2
                                text-center
							"
        >
          Saturday
        </div>

        {cells.map((day, index) => (
          <div
            key={index}
            onClick={() => day && setSelectedDay(day)}
            className="
								min-h-32
								border
								p-2
								cursor-pointer
								hover:bg-purple-600/10
							"
          >
            {day && (
              <>
                <div className="font-bold">{day}</div>

                <div
                  className="
												mt-2
												grid
												grid-cols-2
												gap-3
											"
                >
                  {getUniqueGames(getSchedule(day)).map((item) => (
                    <div
                      key={item.id}
                      title={item.game.name}
                      className="grid grid-cols-2"
                    >
                      <Image
                        src={
                          getEsportsIcon(item.game.id) ?? item.game.pfp ?? ""
                        }
                        width={60}
                        height={60}
                        alt={item.game.name}
                        className="
																w-7
																h-7
																rounded
                                                                overflow-hidden
															"
                      />

                      <span className="text-xs">{formatTime(item.start)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {month.toLocaleString("en-US", {
              month: "long",
            })}{" "}
            {selectedDay}
          </h2>

          <div className="space-y-5">
            {
              <EwcDayView
                date={new Date(year, monthIndex, selectedDay)}
                schedules={schedules}
              />
            }
          </div>
        </div>
      )}
    </div>
  );
}
