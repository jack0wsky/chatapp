import { useState } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import UserContext from "@/context/context"
import { ContextThemeProvider } from "@/context/themeContext"
import { theme } from "@/theme/theme"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState("")
  const [auth, setAuth] = useState(false)
  const handleUser = user => setUser(user)
  const toggleAuth = () => setAuth(!auth)
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContextThemeProvider>
          <UserContext.Provider value={{ user, auth, handleUser, toggleAuth }}>
            <GlobalStyle />
            <Component {...pageProps} />
          </UserContext.Provider>
        </ContextThemeProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
