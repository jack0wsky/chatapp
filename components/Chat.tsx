import { useState, useContext } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import axios from "axios"
import Input from "@/components/input/input"
import UserContext from "@/context/context"
import { io } from "socket.io-client"
import { SERVER_DOMAIN } from "@/constants/index"

const StyledWrapper = styled.section`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`
const LoginForm = styled.form`
  background-color: #ddd;
  display: grid;
  grid-row-gap: 20px;
  grid-template-rows: repeat(3, 1fr);
  height: auto;
  min-height: 40px;
  padding: 50px;
  min-width: 20%;
  width: auto;
`
const StyledSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.light.cta};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  height: max-content;
  padding: 15px 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`

// const socket = io("http://localhost:3001")

const Chat = () => {
  const [nick, setNick] = useState("")
  const [password, setPassword] = useState("")
  const { handleUser, toggleAuth } = useContext(UserContext)
  const [socketId, setID] = useState("")

  const router = useRouter()

  const handleInput = (e: never): any => {
    switch (e.target.name) {
      case "username": {
        setNick(e.target.value)
        return
      }
      case "password": {
        setPassword(e.target.value)
        return
      }
    }
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const socket = io(SERVER_DOMAIN)
    socket.on("connect", async () => {
      await axios
        .post(`${SERVER_DOMAIN}/auth`, {
          username: nick,
          password,
          socketId: socket.id,
        })
        .then(res => {
          if (res.status === 200) {
            handleUser(res.data.username)
            toggleAuth()
            console.log(res)
            router.push("/dashboard")
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  return (
    <StyledWrapper>
      <LoginForm>
        <Input
          onChange={handleInput}
          label="Username"
          value={nick}
          type="text"
          name="username"
        />
        <Input
          label="Password"
          onChange={handleInput}
          value={password}
          type="password"
          name="password"
        />
        <StyledSubmitButton type="submit" onClick={e => handleLogin(e)}>
          Login
        </StyledSubmitButton>
      </LoginForm>
    </StyledWrapper>
  )
}

export default Chat
