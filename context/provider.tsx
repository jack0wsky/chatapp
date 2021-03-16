import { Component } from "react"
import UserContext from "@/context/context.ts"

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
  setUser = user => this.setState({ user })

  toggleTheme = () => {
    this.setState((prevState: Record<string, unknown>) => ({
      theme: !prevState.theme,
    }))
  }

  render() {
    const { children } = this.props
    return (
      <UserContext.Provider
        value={{
          rooms: this.state.rooms,
          user: this.state.user,
          setUser: this.setUser,
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default Provider
