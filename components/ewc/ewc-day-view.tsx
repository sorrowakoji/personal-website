import { EwcSchedule } from "@/types/ewc";
import EwcDayTimeline from "./ewc-day-timeline";

type Props = {
  date: Date;
  schedules: EwcSchedule[];
};

export default function EwcDayView({ date, schedules }: Props) {
  const daySchedules = schedules.filter((item) => {
    const itemDate = new Date(item.start);

    return (
      itemDate.getFullYear() === date.getFullYear() &&
      itemDate.getMonth() === date.getMonth() &&
      itemDate.getDate() === date.getDate()
    );
  });

  if (daySchedules.length === 0) {
    return <p className="text-gray-500">No EWC schedule</p>;
  }

  return (
    <div className="border rounded-xl p-5">
      <EwcDayTimeline schedules={daySchedules} />
    </div>
  );
}
