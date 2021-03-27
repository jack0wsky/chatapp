import { FormFields } from "~/utils/formFields"

interface Props {
  email: string
  username?: string
  password: string
}

export const validateLogin = ({ email, password }: Props) => {
  const errors = []
  const report = (name, message) => ({ name, message })

  if (!email || email.length === 0)
    errors.push(report(FormFields.email, "Email cannot be empty"))

  if (!password || password.length === 0)
    errors.push(report(FormFields.password, "Password cannot be empty"))

  return errors
}
