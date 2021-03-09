import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import UserContext from "@/context/context"
import { ThemeContext } from "@/context/themeContext"
import Message from "@/components/message/Message"
import ChatHeader from "@/components/chatHeader/chatHeader"
import SideMenu from "@/components/sideMenu/sideMenu"

type StyledProps = {
  themeState: boolean
}
interface ContainerProps extends StyledProps {
  toggleSideMenu: boolean
}

const StyledChatContainer = styled.section<ContainerProps>`
  display: grid;
  grid-template-areas: "header header header" "side-menu chat chat";
  grid-template-columns: ${({ toggleSideMenu }) =>
    toggleSideMenu ? `5vw 95vw` : "20vw 80vw"};
  background-color: ${({ theme, themeState }) =>
    themeState ? theme.dark.background : theme.light.background};
  height: 100vh;
  width: 100%;
`
const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;
  grid-area: chat;
  height: 90%;
  width: 100%;
`
const Messages = styled.div`
  display: flex;
  flex-flow: column;
  height: 95vh;
  min-height: 60vh;
  overflow-y: auto;
  width: 100%;
`
const WriteBox = styled.div`
  justify-self: flex-end;
  display: flex;
  height: 5vh;
  min-height: 60px;
  width: 100%;
`
const StyledInput = styled.input<StyledProps>`
  background-color: ${({ theme, themeState }) =>
    themeState ? theme.dark.lightBg : theme.light.lightBg};
  border: ${({ theme, themeState }) =>
    themeState ? theme.dark.lightBg : theme.light.lightBg};
  border-radius: 50px;
  font-size: 1em;
  height: 44px;
  margin: 0 20px;
  padding: 20px;
  width: 60%;

  &:focus {
    outline: none;
  }
`
const StyledSendButton = styled.button`
  color: ${({ theme }) => theme.light.white};
  background-color: ${({ theme }) => theme.light.cta};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  height: 44px;
  padding: 0 20px;
  width: max-content;

  &:focus {
    outline: none;
  }
`

export const StyledTitle = styled.h3``

const RoomTemplate = () => {
  const socket = io("http://localhost:3001")
  const router = useRouter()
  const [welcome, setWelcome] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [adminMessage, setAdminMessage] = useState("")
  const [toggleSideMenu, setSideMenu] = useState(false)
  const ctx = useContext(UserContext)
  const themeCtx = useContext(ThemeContext)

  useEffect(() => {
    socket.emit("join", { name: ctx.user, slug: router.query.slug })
    socket.on("helloMessage", ({ text }) => {
      setWelcome(text)
    })
    socket.on("globalMessage", ({ text }) => {
      console.log(text)
      setAdminMessage(text)
    })
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
  const handleMessage = e => {
    setMessage(e.target.value)
  }
  const handleSideMenu = () => setSideMenu(!toggleSideMenu)

  return (
    <StyledChatContainer
      toggleSideMenu={toggleSideMenu}
      themeState={themeCtx.state}
    >
      <ChatHeader
        theme={themeCtx.state}
        welcome={welcome}
        chatStatus={adminMessage}
      />
      <SideMenu
        handleSideMenu={handleSideMenu}
        toggleSideMenu={toggleSideMenu}
      />
      <ChatWrapper>
        <Messages>
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
        </Messages>
        <WriteBox>
          <StyledInput
            themeState={themeCtx.state}
            value={message}
            onChange={e => handleMessage(e)}
            placeholder="Write..."
            type="text"
          />
          <StyledSendButton onClick={sendMessage}>Send</StyledSendButton>
        </WriteBox>
      </ChatWrapper>
    </StyledChatContainer>
  )
}

export default RoomTemplate
