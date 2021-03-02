import React, { Component, createContext } from "react"

const darkMode = "(prefers-color-scheme: dark)"
// TODO set prefered mode

export const ThemeContext = createContext(true)

export class ContextThemeProvider extends Component<any, any> {
  state = {
    light: true,
  }
  handleToggleTheme = () => {
    this.state.light
      ? this.setState({ light: false })
      : this.setState({ light: true })
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
