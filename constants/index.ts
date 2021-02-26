export const SERVER_DOMAIN = "http://localhost:3001"

export const Room = (name: string, slug: string): Record<string, string> => {
  return { name, slug }
}
