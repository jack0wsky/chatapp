import { createContext } from "react"

export default createContext({
  rooms: [],
  user: null,
  setUser: (user: unknown) => {},
  theme: false,
  toggleTheme: () => {},
})
