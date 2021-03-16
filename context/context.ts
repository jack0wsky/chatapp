import { createContext } from "react"

export default createContext({
  rooms: [],
  user: null,
  setUser: () => {},
  theme: false,
  toggleTheme: () => {},
})
