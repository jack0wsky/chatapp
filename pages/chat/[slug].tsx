import { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import Context from "@/context/context"
import Message from "@/components/message/Message"
import ChatHeader from "@/components/chatHeader/chatHeader"
import SideMenu from "@/components/sideMenu/sideMenu"
import styles from "@/styles/chat.module.scss"

const RoomTemplate = () => {
  const socket = io("http://localhost:3001")
  const router = useRouter()
  const [welcome, setWelcome] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [adminMessage, setAdminMessage] = useState("")
  const [toggleSideMenu, setSideMenu] = useState(false)
  const ctx = useContext(Context)
  const [user, setUser] = useState(ctx.user.displayName)

  useEffect(() => {
    socket.emit("join", { name: user, slug: router.query.slug })
    socket.on("helloMessage", ({ text }) => setWelcome(text))
    socket.on("globalMessage", ({ text }) => setAdminMessage(text))
  }, [])

  useEffect(() => {
    socket.on("message", msg => {
      console.log(msg)
      setMessages(prevState => [...prevState, msg])
    })
  }, [messages])

  const sendMessage = e => {
    e.preventDefault()
    const timestamp = new Date()
    socket.emit("sendMessage", {
      name: ctx.user.displayName,
      room: router.query.slug,
      message,
      timestamp,
    })
    setMessage("")
  }

  const onEnter = e => {
    if (e.key === "Enter") sendMessage(e)
  }

  const handleSideMenu = () => setSideMenu(!toggleSideMenu)

  const { container, containerToggle } = styles

  return (
    <main
      className={
        toggleSideMenu ? `${container} ${containerToggle}` : `${container}`
      }
    >
      <ChatHeader welcome={welcome} chatStatus={adminMessage} />
      <SideMenu
        handleSideMenu={handleSideMenu}
        toggleSideMenu={toggleSideMenu}
      />
      <section className={styles.chatWrapper}>
        <div className={styles.messages}>
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
        <div className={styles.writeBox}>
          <input
            className={styles.input}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write..."
            type="text"
            onKeyPress={onEnter}
          />
          <button className={styles.sendButton} onClick={sendMessage}>
            Send
          </button>
        </div>
      </section>
    </main>
  )
}

export default RoomTemplate
