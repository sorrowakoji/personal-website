export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  }

  return process.env.API_URL!;
}
