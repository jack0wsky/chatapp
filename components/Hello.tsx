import { useState, useContext } from "react"
import { useRouter } from "next/router"
import Input from "@/components/input/input"
import UserContext from "@/context/context"
import Firebase from "@/constants/firebase"
import style from "@/styles/hello.module.scss"
import { validateLogin } from "@/services/loginValidation"
import { FormFields } from "@/utils/formFields"

const formStates = Object.freeze({
  default: "Login",
  sending: "Logging in...",
  success: "Succes!",
})

const Hello = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [fieldErrors, setFieldErrors] = useState([])
  const [submitButton, setSubmitButton] = useState(formStates.default)
  const [isLogged, setLogged] = useState(false)

  const userContext = useContext(UserContext)
  const [loginError, setLoginError] = useState("")

  const router = useRouter()

  const handleInput = (e: any): any => {
    const { name, value } = e.target

    switch (name) {
      case FormFields.email: {
        setEmail(value)
        return
      }
      case FormFields.password: {
        setPassword(value)
        return
      }
      case FormFields.username: {
        setUsername(value)
      }
    }
  }

  const firebaseInit = () => {
    setSubmitButton(formStates.sending)
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
    const errors = validateLogin({ email, username, password })
    setFieldErrors(errors)
    if (errors.length === 0) firebaseInit()
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
          name={FormFields.email}
          errors={fieldErrors}
        />
        <Input
          onChange={handleInput}
          label="Username"
          value={username}
          type="text"
          name={FormFields.username}
          errors={fieldErrors}
        />
        <Input
          label="Password"
          onChange={handleInput}
          value={password}
          type="password"
          name={FormFields.password}
          errors={fieldErrors}
        />
        <button className={style.submit} type="submit" onClick={handleLogin}>
          {submitButton}
        </button>
        <p className={style.error}>{loginError}</p>
      </form>
    </section>
  )
}

export default Hello
