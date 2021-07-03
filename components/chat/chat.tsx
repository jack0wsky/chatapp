import React, { Component } from "react"
import styles from "~/styles/chat.module.scss"
import Message from "~/components/message/Message"

export interface Message {
  user: string
  name: string
  message: string
  timestamp: string
  text?: string
  key: number
}

interface Type {
  isTyping: boolean
  user: string
}

interface IProps {
  globalMessage: string
  messages: Message[]
  type: Type
  message: string
  user: string
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  loggedUser: string
}

class Chat extends Component<IProps, never> {
  render() {
    const {
      chatWrapper,
      messages: messagesStyle,
      isTyping,
      writeBox,
      input,
    } = styles

    const {
      messages,
      type,
      message,
      onType,
      onEnter,
      globalMessage,
      loggedUser,
    } = this.props

    return (
      <section className={chatWrapper}>
        <p>{globalMessage}</p>
        <div className={messagesStyle}>
          {messages.map(({ message, name, timestamp, text, key }) => {
            return (
              <Message
                key={key}
                message={message}
                text={text}
                user={name}
                isCurrentUser={name === loggedUser}
                uploadTime={timestamp}
              />
            )
          })}
        </div>
        {type.isTyping && <p className={isTyping}>{type.user} is typing</p>}
        <div className={writeBox}>
          <input
            className={input}
            value={message}
            onChange={e => onType(e)}
            placeholder="Write..."
            type="text"
            onKeyPress={e => onEnter(e)}
          />
        </div>
      </section>
    )
  }
}

export default Chat
