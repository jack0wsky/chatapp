import React, { Component } from "react"
import styles from "~/styles/chat.module.scss"
import Message from "~/components/message/Message"

interface Message {
  user: string
  message: string
  timestamp: number | string
}

interface Type {
  isTyping: boolean
  user: string
}

interface IProps {
  messages: Message[]
  type: Type
  message: string
  onType: () => void
  onEnter: () => void
}

class Chat extends Component<any, IProps> {
  render() {
    const {
      chatWrapper,
      messages: messagesStyle,
      isTyping,
      writeBox,
      input,
    } = styles
    const { messages, user, type, message, onType, onEnter } = this.props
    return (
      <section className={chatWrapper}>
        <div className={messagesStyle}>
          {messages.map(({ message, name, timestamp }) => {
            return (
              <Message
                key={timestamp}
                message={message}
                user={name}
                isCurrentUser={name === user}
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
            onChange={onType}
            placeholder="Write..."
            type="text"
            onKeyPress={onEnter}
          />
        </div>
      </section>
    )
  }
}

export default Chat
