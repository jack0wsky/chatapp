import { useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import axios from "axios"
import Input from "@/components/input/input"

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
  padding: 5vw;
  width: 40%;
`
const StyledSubmitButton = styled.button`
  background-color: #3b52ff;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  height: max-content;
  padding: 15px 20px;
  width: 40%;

  &:focus {
    outline: none;
  }
`

// const socket = io("http://localhost:3001")

const Chat = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  console.log(router)

  const handleInput = (e: any): any => {
    switch (e.target.name) {
      case "username": {
        setUser(e.target.value)
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
    await axios
      .post("http://localhost:3001/auth", {
        username: user,
        password,
      })
      .then(res => {
        if (res.status === 200) router.push("/dashboard")
      })
      .catch(err => {
        throw err
      })
  }

  return (
    <StyledWrapper>
      <LoginForm>
        <Input
          onChange={handleInput}
          label="Username"
          value={user}
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
