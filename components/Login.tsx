import React from "react"
import { useState, useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Input from "~/components/input/input"
import Context from "~/context/context"
import firebase from "firebase/app"
import "firebase/auth"
import style from "~/styles/hello.module.scss"
import { validateLogin } from "~/services/loginValidation"
import { FormFields } from "~/utils/formFields"

enum formStates {
  default = "Login",
  sending = "Logging in...",
  success = "Success!",
}

type EventTarget = {
  target: {
    name: string
    value: string
  }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [fieldErrors, setFieldErrors] = useState([])
  const [submitButton, setSubmitButton] = useState(formStates.default)
  const [isLogged, setLogged] = useState(false)

  const ctx = useContext(Context)
  const [loginError, setLoginError] = useState("")

  const router = useRouter()

  const handleInput = (e: EventTarget): Record<string, unknown> => {
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

  const loginWithPersistence = async () => {
    await ctx.firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebaseInit()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const firebaseInit = () => {
    setSubmitButton(formStates.sending)
    const { firebase } = ctx
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
        const { setUser }: any = ctx
        setUser(firebase.auth().currentUser.displayName)
        setLogged(true)
        setSubmitButton(formStates.success)
        router.push("/chat/general")
      })
      .catch(err => {
        setSubmitButton(formStates.default)
        setLoginError(err.message)
      })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const errors = validateLogin({ email, password })
    setFieldErrors(errors)
    if (errors.length === 0) await loginWithPersistence()
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
        <p>
          Don't have account? <Link href="/register">Create one</Link>
        </p>
        <p className={style.error}>{loginError}</p>
      </form>
    </section>
  )
}

export default Login
