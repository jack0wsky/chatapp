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

  useEffect(() => {
    socket.emit("join", { name: ctx.user, slug: router.query.slug })
    socket.on("helloMessage", ({ text }) => setWelcome(text))
    socket.on("globalMessage", ({ text }) => setAdminMessage(text))
  }, [])

  useEffect(() => {
    socket.on("message", msg => {
      setMessages(prevState => [...prevState, msg])
    })
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    const timestamp = new Date()
    socket.emit("sendMessage", {
      name: ctx.user,
      room: router.query.slug,
      message,
      timestamp,
    })
    setMessage("")
  }
  const handleMessage = e => setMessage(e.target.value)

  const handleSideMenu = () => setSideMenu(!toggleSideMenu)

  return (
    <main
      className={
        toggleSideMenu
          ? `${styles.container} ${styles.containerToggle}`
          : `${styles.container}`
      }
    >
      <ChatHeader
        theme={ctx.theme}
        welcome={welcome}
        chatStatus={adminMessage}
      />
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
                isUser={name === ctx.user}
                uploadTime={timestamp}
              />
            )
          })}
        </div>
        <div className={styles.writeBox}>
          <input
            className={styles.input}
            value={message}
            onChange={e => handleMessage(e)}
            placeholder="Write..."
            type="text"
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
