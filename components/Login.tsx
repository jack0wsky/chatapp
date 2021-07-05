import React, { FC } from "react"
import { useState, useContext, useEffect } from "react"
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

const Login: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [fieldErrors, setFieldErrors] = useState([])
  const [submitButton, setSubmitButton] = useState(formStates.default)
  const [isLogged, setLogged] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const ctx = useContext(Context)
  const [loginError, setLoginError] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (ctx.user !== "") router.push("/chat/general")
    if (email === "" && password === "") {
      const cachedEmail = localStorage.getItem("e-mail")
      const cachedPassword = localStorage.getItem("password")
      const cachedConsent = localStorage.getItem("rememberMe")
      if (cachedEmail) setEmail(cachedEmail)
      if (cachedPassword) setPassword(cachedPassword)
      if (cachedConsent) setRememberMe(JSON.parse(cachedConsent))
    }
  }, [])

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
    }
  }

  const loginWithPersistence = async () => {
    try {
      await ctx.firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return firebaseInit()
        })
        .catch(() => {
          console.log("error")
        })
    } catch (e) {
      setLoginError(e.message)
    }
  }

  const cacheLoginData = () => {
    localStorage.setItem("e-mail", email)
    localStorage.setItem("password", password)
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe))
  }

  const firebaseInit = () => {
    setSubmitButton(formStates.sending)
    const { firebase } = ctx
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { setUser }: any = ctx
        setUser(firebase.auth().currentUser.displayName)
        if (rememberMe) {
          cacheLoginData()
        } else {
          localStorage.removeItem("e-mail")
          localStorage.removeItem("password")
          localStorage.removeItem("rememberMe")
        }
        setLogged(true)
        setSubmitButton(formStates.success)
        setLoginError("")
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
      {loginError !== "" ? (
        <div className={style.error}>{loginError}</div>
      ) : null}
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
          label="Password"
          onChange={handleInput}
          value={password}
          type="password"
          name={FormFields.password}
          errors={fieldErrors}
        />
        <label className={style.rememberMe}>
          <input
            className={style.rememberMeInput}
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>
        <button className={style.submit} type="submit" onClick={handleLogin}>
          {submitButton}
        </button>
        <p>
          Don't have account? <Link href="/register">Create one</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
