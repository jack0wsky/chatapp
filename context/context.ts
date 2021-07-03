import React, { createContext } from "react"
import { FirebaseAuth, User } from "@firebase/auth-types"

interface IValues {
  rooms: Record<string, string>[]
  user: User
  setUser: (user: User) => void
  theme: boolean
  toggleTheme?: () => React.ComponentState
  firebase: FirebaseAuth | Record<string, unknown> | any
}

export default createContext<IValues>({
  rooms: [],
  user: null,
  setUser: (user: User) => user,
  theme: false,
  firebase: {},
})
