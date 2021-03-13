import React from "react"
import style from "@/styles/base/input.module.scss"

interface Props {
  label: string
  value: string
  type: string
  name: string
  onChange: (object) => any
}

const Input: React.FC<Props> = ({ label, value, type, name, onChange }) => {
  return (
    <div className={style.field}>
      <label className={style.field__label} htmlFor={name}>
        {label}
      </label>
      <input
        className={style.field__input}
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

export default Input
