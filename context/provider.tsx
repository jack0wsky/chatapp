import { Component } from "react"
import UserContext from "@/context/context.ts"

class Provider extends Component<any, any> {
  state = {
    user: null,
    rooms: [
      { name: "Culture Talk", slug: "culture-talk" },
      { name: "Blinders", slug: "blinders" },
    ],
  }
  setUser = (user: unknown) => this.setState({ user })

  render() {
    const { children } = this.props

    return (
      <UserContext.Provider
        value={{
          rooms: this.state.rooms,
          user: this.state.user,
          setUser: this.setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default Provider
