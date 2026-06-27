export function formatTime(date: string) {
  const utcDate = new Date(date);

  return utcDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getTimezoneOffset() {
  const minutes = -new Date().getTimezoneOffset();

  const sign = minutes >= 0 ? "+" : "-";

  const abs = Math.abs(minutes);

  const hours = Math.floor(abs / 60);
  const mins = abs % 60;

  return `UTC${sign}${hours}${mins ? `:${mins}` : ""}`;
}

export function getTimezone() {
  return `${
    Intl.DateTimeFormat().resolvedOptions().timeZone
  } (${getTimezoneOffset()})`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
