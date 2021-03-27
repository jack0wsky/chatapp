import React, { useContext } from "react"
import Context from "~/context/context"
import style from "~/styles/chatHeader.module.scss"

type Props = {
  welcome: string
  chatStatus: string
}

const ChatHeader: ({ welcome, chatStatus }: Props) => JSX.Element = ({
  welcome,
  chatStatus,
}: Props) => {
  const ctx = useContext(Context)

  return (
    <div className={style.wrapper}>
      <h2 className={style.name}>{ctx.user}</h2>
      <p className={style.status}>{chatStatus}</p>
    </div>
  )
}

export default ChatHeader
