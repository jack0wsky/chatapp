import React, { useContext } from "react"
import Context from "~/context/context"
import style from "~/styles/chatHeader.module.scss"

type Props = {
  user: string
}

const ChatHeader: ({ user }: Props) => JSX.Element = ({ user }: Props) => {
  const ctx = useContext(Context)

  return (
    <div className={style.wrapper}>
      <h2 className={style.name}>{user}</h2>
    </div>
  )
}

export default ChatHeader
