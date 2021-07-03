import React, { useEffect } from "react"
import styles from "~/styles/message.module.scss"

interface iProps {
  isCurrentUser: boolean
  themeState?: boolean
  uploadTime?: string
  message: string
  user: string
  text?: string
}

const Message: ({
  message,
  user,
  isCurrentUser,
  uploadTime,
  text,
}: iProps) => JSX.Element = ({
  message,
  user,
  isCurrentUser,
  uploadTime,
  text,
}: iProps) => {
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
