export const useLocalStorage = (key: string, value: string) => {
  const isClient = typeof window !== "undefined"

  if (isClient) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const items = localStorage.getItem(JSON.parse(value))
  if (items) return items
}
