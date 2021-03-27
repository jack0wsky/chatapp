import React, { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import Context from "~/context/context"
import ChatLayout from "~/layouts/chatLayout"
import ChatHeader from "~/components/chatHeader/chatHeader"
import Chat from "~/components/chat/chat"
import SideMenu from "~/components/sideMenu/sideMenu"

const RoomTemplate: React.FC = () => {
  const socket = io("http://localhost:3001")
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [type, setType] = useState({ isTyping: false, user: "" })
  const [messages, setMessages] = useState([])
  const [channels, setChannels] = useState([])
  const [toggleSideMenu, setSideMenu] = useState(false)
  const [user, setUser] = useState("")
  const ctx = useContext(Context)

  const sortAlphabetically = arr => {
    return arr.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })
  }

  const getChannels = (db, user) => {
    try {
      db.collection("channels")
        .where("members", "array-contains", user.displayName)
        .get()
        .then(querySnapshot => {
          const tempArr = []
          querySnapshot.forEach(doc => {
            tempArr.push(doc.data())
          })
          setChannels(sortAlphabetically(tempArr))
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    socket.emit("join", {
      name: user,
      slug: router.query.slug,
    })
    socket.on("globalMessage", msg => {
      console.log(msg)
    })
    const { firebase } = ctx
    if (firebase) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser(user.displayName)
          const db = firebase.firestore()
          socket.emit("join", {
            name: user.displayName,
            slug: router.query.slug,
          })
          db.collection("messages")
            .get()
            .then(querySnapshot =>
              querySnapshot.forEach(doc => console.log(doc.data()))
            )
          getChannels(db, user)
        } else {
          router.push("/")
        }
      })
    }
  }, [])

  useEffect(() => {
    socket.on("message", msg => {
      console.log("fire")
      setMessages(prevState => [...prevState, msg])
    })
    socket.on("isTyping", ({ name }) => {
      setType({ isTyping: true, user: name })
    })
  }, [message])

  const sendMessage = e => {
    e.preventDefault()
    setType({ isTyping: false, user: "" })

    const timestamp = new Date()
    socket.emit("sendMessage", {
      name: user,
      room: router.query.slug,
      message,
      timestamp,
    })
    setMessage("")
  }

  const onType = e => {
    socket.emit("typing", {
      name: user,
      room: router.query.slug,
    })
    if (e.target.value.length === 0 || e.target.value === "") {
      setType({ isTyping: false, user: "" })
    }
    setMessage(e.target.value)
  }

  const onEnter = e => e.key === "Enter" && sendMessage(e)

  const handleSideMenu = () => setSideMenu(!toggleSideMenu)

  return (
    <ChatLayout>
      <ChatHeader user={user} />
      <SideMenu
        handleSideMenu={handleSideMenu}
        toggleSideMenu={toggleSideMenu}
        channels={channels}
      />
      <Chat
        messages={messages}
        onEnter={onEnter}
        type={type}
        onType={onType}
        message={message}
        user={user}
      />
    </ChatLayout>
  )
}

export default RoomTemplate
