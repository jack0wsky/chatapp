import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import UserContext from "@/context/context"
import Message from "@/components/message/Message"

const StyledChatContainer = styled.section`
  background-color: ${({ theme }) => theme.light.background};
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
const StyledWelcome = styled.div`
  align-items: center;
  display: flex;
  height: 70px;
  padding: 0 5vw;
  width: 100%;
`
const StyledReturnLink = styled.button`
  font-size: 1em;
  margin: 0 20px 0 0;
`

export const StyledTitle = styled.h3``

const RoomTemplate = () => {
  const socket = io("http://localhost:3001")
  const router = useRouter()
  const [welcome, setWelcome] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const ctx = useContext(UserContext)

  useEffect(() => {
    socket.emit("join", { name: ctx.user, slug: router.query.slug })
    socket.on("helloMessage", ({ text }) => {
      setWelcome(text)
    })
    socket.on("globalMessage", msg => {
      console.log(msg)
    })
  }, [])

  useEffect(() => {
    socket.on("message", msg => {
      setMessages(prevState => [...prevState, msg])
    })
    console.log(messages)
  }, [messages])

  // TODO add timestamp
  const sendMessage = e => {
    e.preventDefault()
    socket.emit("sendMessage", {
      name: ctx.user,
      room: router.query.slug,
      message,
    })
    setMessage("")
  }
  const handleMessage = e => {
    setMessage(e.target.value)
  }
  const handleReturn = () => {
    router.push("/dashboard")
  }

  return (
    <StyledChatContainer>
      <StyledWelcome>
        <StyledReturnLink onClick={handleReturn}>Return</StyledReturnLink>
        <StyledTitle>{welcome}</StyledTitle>
      </StyledWelcome>
      <ChatWrapper>
        <Messages>
          {messages.map(({ message, name }) => {
            return (
              <Message
                message={message}
                user={name}
                isUser={name === ctx.user}
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
