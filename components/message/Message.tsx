import { useContext } from "react"
import Context from "@/context/context"
import styles from "@/styles/message.module.scss"

interface iProps {
  isUser: () => boolean
  themeState?: boolean
  uploadTime?: string
}

const Message = ({ message, user, isUser, uploadTime }) => {
  const getTime = () => {
    const uploaded = new Date(uploadTime).getMinutes()
    const now = new Date().getMinutes()
    return now - uploaded
  }
  const ctx = useContext(Context)
  return (
    <div className={styles.container}>
      <p className={styles.time}>{getTime()}</p>
      <div className={styles.messageContainer}>
        <p className={styles.user}>{user}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

export default Message
