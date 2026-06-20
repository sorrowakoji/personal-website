export function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return process.env.API_URL!
}