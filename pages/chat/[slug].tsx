import React, { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import Context from "~/context/context"
import ChatLayout from "~/layouts/chatLayout"
import Message from "~/components/message/Message"
import ChatHeader from "~/components/chatHeader/chatHeader"
import SideMenu from "~/components/sideMenu/sideMenu"
import styles from "~/styles/chat.module.scss"
import { db } from "~/constants/firebase"

const RoomTemplate = () => {
  const socket = io("http://localhost:3001")
  const router = useRouter()
  const [welcome, setWelcome] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState({ isTyping: false, user: "" })
  const [messages, setMessages] = useState([])
  const [adminMessage, setAdminMessage] = useState("")
  const [toggleSideMenu, setSideMenu] = useState(false)
  const ctx = useContext(Context)

  useEffect(() => {
    if (!ctx.user) {
      router.push("/")
    } else {
      socket.emit("join", {
        name: ctx.user.displayName,
        slug: router.query.slug,
      })
      socket.on("helloMessage", ({ text }) => setWelcome(text))
      socket.on("globalMessage", ({ text }) => setAdminMessage(text))
      db.collection("channels")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => console.log(doc.data().name))
        })
    }
  }, [ctx.user])

  useEffect(() => {
    socket.on("message", msg => {
      setMessages(prevState => [...prevState, msg])
    })
    socket.on("isTyping", ({ name }) => {
      setType({ isTyping: true, user: name })
    })
  })

  const sendMessage = e => {
    setType({ isTyping: false, user: "" })
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

  const onType = e => {
    socket.emit("typing", {
      name: ctx.user.displayName,
      room: router.query.slug,
    })
    if (e.target.value.length === 0 || e.target.value === "") {
      setType({ isTyping: false, user: "" })
    }
    setMessage(e.target.value)
  }

  const onEnter = e => {
    if (e.key === "Enter") sendMessage(e)
  }

  const handleSideMenu = () => setSideMenu(!toggleSideMenu)

  return (
    <ChatLayout>
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
                isCurrentUser={name === ctx.user.displayName}
                uploadTime={timestamp}
              />
            )
          })}
        </div>
        {type.isTyping && (
          <p className={styles.isTyping}>{type.user} is typing</p>
        )}
        <div className={styles.writeBox}>
          <input
            className={styles.input}
            value={message}
            onChange={onType}
            placeholder="Write..."
            type="text"
            onKeyPress={onEnter}
          />
          <button className={styles.sendButton} onClick={sendMessage}>
            Send
          </button>
        </div>
      </section>
    </ChatLayout>
  )
}

export default RoomTemplate
