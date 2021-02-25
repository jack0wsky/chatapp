import { useState } from "react"
import { createGlobalStyle } from "styled-components"
import UserContext from "@/context/context"

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
      <UserContext.Provider value={{ user, auth, handleUser, toggleAuth }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
