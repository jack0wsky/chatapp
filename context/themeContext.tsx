import React, { Component, createContext } from "react"

enum Theme {
  light = "light",
  dark = "dark",
}

type ThemeProps = {
  state: string
  handleTheme: any
}

const ThemeContext = createContext(Theme.light)

export class ContextThemeProvider extends Component<any, any> {
  state = {
    theme: Theme.light,
  }
  handleToggleTheme = () => {
    this.state.theme === Theme.light
      ? this.setState({ theme: Theme.dark })
      : this.setState({ theme: Theme.light })
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{ state: this.state, handleTheme: this.handleToggleTheme }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

const withThemeContext = (Component: any) => {
  return function Wrapper(props: any): any {
    return (
      <ThemeContext.Consumer>
        {({ state, handleTheme }) => (
          <Component {...props} state={state} handleTheme={handleTheme} />
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default withThemeContext
