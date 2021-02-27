import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import UserContext from "@/context/context"
import Message from "@/components/message/Message"

const StyledChatContainer = styled.section`
  height: 100vh;
  width: 100%;
`
const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 90%;
  width: 100%;
`
const Messages = styled.div`
  display: flex;
  flex-flow: column;
  height: auto;
  min-height: 60vh;
  width: 100%;
`
const Text = styled.p`
  width: max-content;
`
const WriteBox = styled.div`
  justify-self: flex-end;
  display: flex;
  height: auto;
  min-height: 60px;
  width: 100%;
`
const StyledInput = styled.input`
  border: 1px solid #dedede;
  border-radius: 50px;
  font-size: 1em;
  height: 44px;
  margin: 0 20px;
  padding: 20px;

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

const RoomTemplate = () => {
  const socket = io("http://localhost:3001")
  const { query } = useRouter()
  const [welcome, setWelcome] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const ctx = useContext(UserContext)

  useEffect(() => {
    socket.emit("join", { name: ctx.user, slug: query.slug })
    socket.on("helloMessage", ({ text }) => {
      setWelcome(text)
    })
  }, [])

  useEffect(() => {
    socket.on("message", msg => {
      setMessages([...messages, msg])
    })
  }, [])

  // TODO add timestamp
  const sendMessage = e => {
    e.preventDefault()
    socket.emit("sendMessage", { name: ctx.user, room: query.slug, message })
    setMessage("")
  }
  const handleMessage = e => {
    setMessage(e.target.value)
  }
  return (
    <StyledChatContainer>
      {welcome}
      <ChatWrapper>
        <Messages>
          {messages.map(({ message, name }) => {
            return (
              <Message
                message={message}
                user={name}
                isUser={ctx.user === "Jacek"}
              />
            )
          })}
        </Messages>
        <WriteBox>
          <StyledInput
            value={message}
            onChange={e => handleMessage(e)}
            type="text"
          />
          <StyledSendButton onClick={sendMessage}>Send</StyledSendButton>
        </WriteBox>
      </ChatWrapper>
    </StyledChatContainer>
  )
}

export default RoomTemplate
