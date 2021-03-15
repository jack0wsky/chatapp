import { useRouter } from "next/router"
import style from "@/styles/chatHeader.module.scss"

type Props = {
  welcome: string
  chatStatus: string
}

const ChatHeader = ({ welcome, chatStatus }: Props) => {
  const { push } = useRouter()

  const handleReturn = () => push("/dashboard")

  return (
    <div className={style.wrapper}>
      <button className={style.returnLink} onClick={handleReturn} />
      <h2 className={style.name}>{welcome}</h2>
      <p className={style.status}>{chatStatus}</p>
    </div>
  )
}

export default ChatHeader
