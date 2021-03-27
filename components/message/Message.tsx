import { useEffect } from "react"
import styles from "~/styles/message.module.scss"

interface iProps {
  isCurrentUser: boolean
  themeState?: boolean
  uploadTime?: string
  message: string
  user: string
}

const Message = ({ message, user, isCurrentUser, uploadTime }: iProps) => {
  const getTime = () => {
    const uploaded = new Date(uploadTime).getMinutes()
    const now = new Date().getMinutes()
  }

  const {
    container,
    isMyMessage,
    message: messageStyle,
    messageContainer,
    strangerMessageContainer,
    user: userStyle,
  } = styles

  const conditionalClass = (className, modifier) => {
    return isCurrentUser ? `${className} ${modifier}` : `${className}`
  }

  return (
    <div className={conditionalClass(container, isMyMessage)}>
      <p className={styles.time}></p>
      <div
        className={conditionalClass(messageContainer, strangerMessageContainer)}
      >
        <p className={conditionalClass(userStyle, styles["user--isMe"])}>
          {user}
        </p>
        <p
          className={conditionalClass(
            messageStyle,
            styles["message--stranger"]
          )}
        >
          {message}
        </p>
      </div>
    </div>
  )
}

export default Message
