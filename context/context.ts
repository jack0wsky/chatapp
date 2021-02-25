import { createContext } from "react"

type ContextType = {
  user: string
  auth: boolean
  setUser: (user) => void
  setAuth: (auth) => void
}

export default createContext<Partial<ContextType>>({})
