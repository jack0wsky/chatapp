import React from "react"
import style from "~/styles/base/input.module.scss"

interface Error {
  name: string
  message: string
}

interface Props {
  label: string
  value: string
  type: string
  name: string
  errors?: Error[]
  onChange: (object) => any
}

const Input: React.FC<Props> = ({
  label,
  value,
  type,
  name,
  onChange,
  errors,
}) => {
  const filterErrorMessage = () => {
    if (errors) {
      const found = errors.find(({ name: fieldName }) => fieldName === name)
      if (found) return found.message
    }
  }
  return (
    <div className={style.field}>
      <label className={style.fieldLabel} htmlFor={name}>
        {label}
      </label>
      <input
        className={style.fieldInput}
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={e => onChange(e)}
      />
      <p className={style.fieldError}>{filterErrorMessage()}</p>
    </div>
  )
}

export default Input
