import React, { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import Context from "~/context/context"
import ChatLayout from "~/layouts/chatLayout"
import ChatHeader from "~/components/chatHeader/chatHeader"
import Chat from "~/components/chat/chat"
import SideMenu from "~/components/sideMenu/sideMenu"

const RoomTemplate: React.FC = () => {
  //const socket = io("http://localhost:3001")
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [globalMessage, setGlobalMessage] = useState<React.ComponentState>("")
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

  const initSocket = () => {
    try {
      return io("http://localhost:3001")
    } catch (e) {
      console.log(e, "some error")
    }
  }

  const getChannels = async (db, user) => {
    const items = db.collection("channels")
    /* items
        .where("members", "array-contains", user.displayName)
        .get()
        .then(querySnapshot => {
          const tempArr = []
          querySnapshot.forEach(doc => {
            tempArr.push(doc.data())
          })
          setChannels(sortAlphabetically(tempArr))
        }), */
  }

  const fetchChannels = () => {
    const { firebase } = ctx
    if (firebase) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser(user.displayName)
          const db = firebase.firestore()
          initSocket().emit("join", {
            name: user.displayName,
            slug: router.query.slug,
          })
          try {
            db.collection("messages")
              .get()
              .then(querySnapshot =>
                querySnapshot.forEach(doc => console.log(doc.data()))
              )
            getChannels(db, user)
          } catch (e) {
            console.log(e)
          }
        } else {
          router.push("/")
        }
      })
    }
  }

  const handleJoinRoom = () => {
    initSocket().emit("join", {
      name: user || "Stranger",
      slug: router.query.slug || "general",
    })
    initSocket().on("globalMessage", ({ text }) => setGlobalMessage(text))
  }

  useEffect(() => {
    const { setUser, firebase } = ctx
    if (firebase.auth().currentUser) {
      setUser(firebase.auth().currentUser.displayName)
    }
    initSocket()
    handleJoinRoom()
    initSocket().on("members", members => console.log("members", members))
    fetchChannels()
    console.log(channels)
  }, [channels])

  useEffect(() => {
    initSocket().on("message", msg => {
      setMessages(prevState => [...prevState, msg])
    })
    ctx.cacheMessages("messages", messages)
  }, [messages, message])

  const sendMessage = e => {
    e.preventDefault()
    setType({ isTyping: false, user: "" })

    const timestamp = new Date()
    initSocket().emit("sendMessage", {
      name: user,
      room: router.query.slug,
      message,
      timestamp,
      key: messages.length + 1,
    })
    setMessage("")
  }

  const onType = e => {
    initSocket().emit("typing", {
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
      {ctx.firebase && (
        <Chat
          globalMessage={globalMessage}
          messages={messages}
          onEnter={onEnter}
          type={type}
          onType={onType}
          message={message}
          user={user}
          loggedUser={"stranger"}
        />
      )}
    </ChatLayout>
  )
}

export default RoomTemplate
