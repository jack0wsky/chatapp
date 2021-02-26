import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "@/context/context"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import CreateRoom from "@/components/createRoom/createRoom"
import { Room } from "@/constants/index"

const StyledWrapper = styled.main`
  height: 100vh;
  padding: 2vw 5vw;
  position: relative;
  width: 100%;
`
const StyledWelcome = styled.h2`
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

const Dashboard: React.FC = () => {
  const router = useRouter()
  const ctx = useContext(UserContext)
  const [toggleModal, setModal] = useState(false)

  useEffect(() => {
    if (ctx.user === "") router.push("/")
  }, [ctx.user])

  Room()

  const handleRoom = slug => {
    router.push(`/rooms/${slug}`)
  }
  const handleModal = () => setModal(!toggleModal)

  return (
    <StyledWrapper>
      <StyledWelcome>Hello, {ctx.user}</StyledWelcome>
      <StyledRoomsGrid>
        <StyledRoom onClick={handleModal}>
          <StyledRoomImage />
          <RoomName>Add new</RoomName>
        </StyledRoom>
        {rooms.map(({ name, slug }) => {
          return (
            <StyledRoom onClick={() => handleRoom(slug)}>
              <StyledRoomImage></StyledRoomImage>
              <RoomName>{name}</RoomName>
            </StyledRoom>
          )
        })}
      </StyledRoomsGrid>
      <CreateRoom toggleModal={toggleModal} closeModal={handleModal} />
    </StyledWrapper>
  )
}

export default Dashboard
