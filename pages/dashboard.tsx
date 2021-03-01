import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "@/context/context"
import { useRouter } from "next/router"
import CreateRoom from "@/components/createRoom/createRoom"
import Modal from "@/components/hoc/withModal"
import Friends from "@/components/friends/friends"
import withThemeContext from "@/context/themeContext"
import axios from "axios"
import { SERVER_DOMAIN } from "@/constants/index"

interface ThemeProps {
  themeState: string
}

const StyledWrapper = styled.main<ThemeProps>`
  background-color: ${({ theme, themeState }) =>
    themeState === "light" ? theme.light.background : theme.dark.background};
  height: 100vh;
  padding: 2vw 5vw;
  position: relative;
  width: 100%;
`
const StyledWelcome = styled.h2<ThemeProps>`
  color: ${({ theme, themeState }) =>
    themeState === "light" ? theme.light.text : theme.dark.text};
  font-size: 2.5em;
  font-weight: 400;
`
const StyledRoomsGrid = styled.div`
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  height: auto;
  margin: 30px 0 0;
  min-height: 100px;
  width: max-content;
`
export const StyledRoom = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: auto;
  width: auto;

  &:focus {
    outline: none;
  }
`
export const StyledRoomImage = styled.div`
  align-items: center;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  height: 70px;
  justify-content: center;
  width: 70px;
`
export const RoomName = styled.p`
  margin: 10px 0 0;
`
const rooms = [
  { name: "Culture Talk", slug: "culture-talk" },
  { name: "Blinders", slug: "blinders" },
]

const Dashboard = ({ handleTheme, state: { theme } }) => {
  const router = useRouter()
  const ctx = useContext(UserContext)
  const [toggleModal, setModal] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (ctx.user === "") router.push("/")
  }, [ctx.user])

  const getCurrentUserData = async nick => {
    await axios
      .get(`${SERVER_DOMAIN}/users`, {
        params: {
          nick,
        },
      })
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err))
  }

  useEffect(async () => await getCurrentUserData(ctx.user), [])

  const handleRoom = slug => {
    router.push(`/rooms/${slug}`)
  }
  const handleModal = () => setModal(!toggleModal)

  return (
    <StyledWrapper themeState={theme}>
      <StyledWelcome themeState={theme}>Hello, {ctx.user}</StyledWelcome>
      <button onClick={handleTheme}>Toggle theme</button>
      <Friends friends={user.friends} />
      <StyledRoomsGrid>
        <StyledRoom onClick={handleModal}>
          <StyledRoomImage>+</StyledRoomImage>
          <RoomName>Add new</RoomName>
        </StyledRoom>
        {rooms.map(({ name, slug }) => {
          return (
            <StyledRoom key={name} onClick={() => handleRoom(slug)}>
              <StyledRoomImage />
              <RoomName>{name}</RoomName>
            </StyledRoom>
          )
        })}
      </StyledRoomsGrid>
      {toggleModal && (
        <Modal>
          <CreateRoom toggleModal={toggleModal} closeModal={handleModal} />
        </Modal>
      )}
    </StyledWrapper>
  )
}

export default withThemeContext(Dashboard)
