import { useEffect, useState } from "react"
import styled from "styled-components"
import { io } from "socket.io-client"

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: column;
  height: 100vh;
  width: 100%;
`
const InputContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
`
const StyledButton = styled.button``

const StyledMessages = styled.div`
  height: 50vh;
  width: 100%;
`

// @ts-ignore
const socket = io()

const Chat = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [type, setType] = useState("")
  useEffect(() => {
    socket.on("hello", ({ message }) => setMessage(message))
    socket.on("newMessage", arg => {
      setMessages([...message, arg])
    })
  }, [messages])

  const handleType = e => {
    setType(e.target.value)
  }
  const sendMessage = () => {
    socket.emit("message", { message: type, user: "Jacek" })
  }
  return (
    <StyledWrapper>
      <StyledMessages>
        {messages.map(item => {
          return <div>
            <p>{item.message}</p>
            <p>{item.user}</p>
          </div>
        })}
      </StyledMessages>
      <InputContainer>
        <input type="text" onChange={e => handleType(e)} />
        <StyledButton onClick={sendMessage}>Send</StyledButton>
      </InputContainer>
    </StyledWrapper>
  )
}

export default Chat
