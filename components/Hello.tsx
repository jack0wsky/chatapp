import { useState, useContext } from "react"
import { useRouter } from "next/router"
import { ThemeContext } from "@/context/themeContext"
import styled from "styled-components"
import Input from "@/components/input/input"
import UserContext from "@/context/context"
import Firebase from "@/constants/firebase"

interface StyledProps {
  themeState: boolean
}

const StyledWrapper = styled.section<StyledProps>`
  align-items: center;
  display: flex;
  flex-flow: column;
  background-color: ${({ theme, themeState }) =>
    themeState ? theme.dark.background : theme.light.background};
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 100%;
`
const LoginForm = styled.form`
  background-color: #ddd;
  display: grid;
  grid-row-gap: 20px;
  grid-template-rows: repeat(3, 1fr);
  height: auto;
  min-height: 40px;
  padding: 50px;
  min-width: 20%;
  width: auto;
`
const StyledSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.light.cta};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  height: max-content;
  padding: 15px 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`
const StyledSuccess = styled.div`
  align-items: center;
  background-color: #2cb121;
  color: #fff;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`

const Hello = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLogged, setLogged] = useState(false)
  const userContext = useContext(UserContext)
  const themeContext = useContext(ThemeContext)
  const [loginError, setLoginError] = useState("")
  const [socketId, setID] = useState("")

  const router = useRouter()

  const handleInput = (e: any): any => {
    switch (e.target.name) {
      case "email": {
        setEmail(e.target.value)
        return
      }
      case "password": {
        setPassword(e.target.value)
        return
      }
      case "username": {
        setUsername(e.target.value)
      }
    }
  }

  const firebaseInit = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLogged(true)
        const user = Firebase.auth().currentUser
        user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            router.push("/dashboard")
          })
          .catch(err => console.log(err))
      })
      .catch(err => setLoginError(err.message))
  }

  const handleLogin = (e: any) => {
    e.preventDefault()
    firebaseInit()
  }

  const { state } = themeContext

  return (
    <StyledWrapper themeState={state}>
      {isLogged && <StyledSuccess>Logged successfully</StyledSuccess>}
      <LoginForm>
        <Input
          onChange={handleInput}
          label="E-mail"
          value={email}
          type="text"
          name="email"
        />
        <Input
          onChange={handleInput}
          label="Username"
          value={username}
          type="text"
          name="username"
        />
        <Input
          label="Password"
          onChange={handleInput}
          value={password}
          type="password"
          name="password"
        />
        <StyledSubmitButton type="submit" onClick={e => handleLogin(e)}>
          Login
        </StyledSubmitButton>
        <p>{loginError}</p>
      </LoginForm>
    </StyledWrapper>
  )
}

export default Hello
