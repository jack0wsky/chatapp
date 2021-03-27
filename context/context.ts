import { createContext } from "react"
import firebase from "~/constants/firebase"

export default createContext({
  rooms: [],
  user: null,
  setUser: (user: unknown) => {},
  theme: false,
  toggleTheme: () => {},
  firebase: {},
})
