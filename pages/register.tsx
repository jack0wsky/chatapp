import { useState } from "react"
import "firebase/auth"
import firebase from "~/constants/firebase"
import styles from "~/styles/hello.module.scss"
import Input from "~/components/input/input"

const Register = () => {
  const handleRegister = async e => {
    e.preventDefault()
    await firebase
      .auth()
      .createUserWithEmailAndPassword(formFields.email, formFields.password)
      .then(() => setUsername())
      .catch(err => console.log(err))
  }

  const setUsername = () => {
    const user = firebase.auth().currentUser
    user
      .updateProfile({
        displayName: formFields.username,
      })
      .then(() => console.log("username set"))
      .catch(err => console.log(err))
  }
  const handleInputs = e => {
    const { name, value } = e.target
    setFormFields(prevState => ({ ...prevState, [name]: value }))
  }
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  })

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input
          label="Username"
          name="username"
          type="text"
          value={formFields.username}
          onChange={handleInputs}
        />
        <Input
          label="E-mail address"
          name="email"
          type="email"
          value={formFields.email}
          onChange={handleInputs}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formFields.password}
          onChange={handleInputs}
        />
        <button onClick={e => handleRegister(e)} className={styles.submit}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
