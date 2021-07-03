import React, { Component } from "react"
import UserContext from "~/context/context"
import firebase from "~/constants/firebase"
import "firebase/auth"
import "firebase/firestore"

interface Room {
  name: string
  slug: string
}

interface IState {
  user: Record<string, string> | null
  rooms: Room[]
}

class Provider extends Component<IState> {
  state = {
    user: null,
    rooms: [
      { name: "Culture Talk", slug: "culture-talk" },
      { name: "Blinders", slug: "blinders" },
    ],
    theme: false,
  }
  setUser = (user: string): React.ComponentState => this.setState({ user })

  toggleTheme = (): React.ComponentState => {
    this.setState((prevState: Record<string, unknown>) => ({
      theme: !prevState.theme,
    }))
  }

  cacheMessages = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  render(): JSX.Element {
    const { children } = this.props
    return (
      <UserContext.Provider
        value={{
          rooms: this.state.rooms,
          user: this.state.user,
          setUser: this.setUser,
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
          cacheMessages: this.cacheMessages,
          firebase,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default Provider
