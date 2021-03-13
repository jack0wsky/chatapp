import { useState, useContext } from "react"
import { useRouter } from "next/router"
import { ThemeContext } from "@/context/themeContext"
import Input from "@/components/input/input"
import UserContext from "@/context/context"
import Firebase from "@/constants/firebase"
import style from "@/styles/hello.module.scss"

const formStates = Object.freeze({
  default: "Login",
  sending: "Logging in...",
  success: "Succes!",
})

const Hello = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [submitButton, setSubmitButton] = useState(formStates.default)
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
        setSubmitButton(formStates.success)
        const user = Firebase.auth().currentUser
        user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            userContext.setUser(user)
            router.push("/dashboard")
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        setSubmitButton(formStates.default)
        setLoginError(err.message)
      })
  }

  const handleLogin = (e: any) => {
    e.preventDefault()
    setSubmitButton(formStates.sending)
    firebaseInit()
  }

  return (
    <section className={style.container}>
      {isLogged && <div className={style.success}>Logged successfully</div>}
      <form className={style.form}>
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
        <button className={style.submit} type="submit" onClick={handleLogin}>
          {submitButton}
        </button>
        <p>{loginError}</p>
      </form>
    </section>
  )
}

export default Hello
