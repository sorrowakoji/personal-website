import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { EwcSchedule } from "@/types/ewc";

export async function getEwcSchedule(): Promise<EwcSchedule[]> {
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
