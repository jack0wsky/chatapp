import React, { createContext } from "react"
import { FirebaseAuth } from "@firebase/auth-types"

interface IValues {
  rooms: Record<string, string>[]
  user: string
  setUser: (user: string) => void
  theme: boolean
  toggleTheme?: () => React.ComponentState
  firebase: FirebaseAuth | Record<string, unknown> | any
  cacheMessages: (key: string, value: any) => void
}

export default createContext<IValues>(null)
