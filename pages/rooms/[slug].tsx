import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import UserContext from "@/context/context"

const StyledChatContainer = styled.section`
  height: 100vh;
  width: 100%;
`
const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 90%;
  width: 60vw;
`
const Messages = styled.div`
  display: flex;
  flex-flow: column;
  height: auto;
  min-height: 60vh;
  width: 100%;
`
const Message = styled.div`
  display: flex;
  flex-flow: column;
  color: #000;
  background-color: #ddd;
  height: auto;
  min-height: 50px;
  width: max-content;
  padding: 10px;
  min-width: 50px;
  max-width: 30vw;
`
const MyMessage = styled(Message)`
  align-self: flex-end;
  color: #fff;
  background-color: #3b52ff;
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
            if (name === ctx.user) {
              return (
                <MyMessage>
                  <Text>{message}</Text>
                  <Text>{name}</Text>
                </MyMessage>
              )
            } else {
              return (
                <Message>
                  <Text>{message}</Text>
                  <Text>{name}</Text>
                </Message>
              )
            }
          })}
        </Messages>
        <WriteBox>
          <input value={message} onChange={e => handleMessage(e)} type="text" />
          <button onClick={sendMessage}>Send</button>
        </WriteBox>
      </ChatWrapper>
    </StyledChatContainer>
  )
}

export default RoomTemplate
