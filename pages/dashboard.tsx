import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "@/context/context"
import { useRouter } from "next/router"
import CreateRoom from "@/components/createRoom/createRoom"
import Modal from "@/components/hoc/withModal"
import withThemeContext from "@/context/themeContext"

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
const StyledRoom = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: auto;
  width: auto;

  &:focus {
    outline: none;
  }
`
const StyledRoomImage = styled.div`
  background-color: #ddd;
  border-radius: 50%;
  height: 70px;
  width: 70px;
`
const RoomName = styled.p`
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

  useEffect(() => {
    if (ctx.user === "") router.push("/")
  }, [ctx.user])

  const handleRoom = slug => {
    router.push(`/rooms/${slug}`)
  }
  const handleModal = () => setModal(!toggleModal)

  return (
    <StyledWrapper themeState={theme}>
      <StyledWelcome themeState={theme}>Hello, {ctx.user}</StyledWelcome>
      <button onClick={handleTheme}>Toggle theme</button>
      <StyledRoomsGrid>
        <StyledRoom onClick={handleModal}>
          <StyledRoomImage />
          <RoomName>Add new</RoomName>
        </StyledRoom>
        {rooms.map(({ name, slug }) => {
          return (
            <StyledRoom onClick={() => handleRoom(slug)}>
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
