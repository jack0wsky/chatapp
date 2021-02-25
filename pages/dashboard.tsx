import React from "react"
import styled from "styled-components"
import UserContext from "@/context/context"
import { io } from "socket.io-client"
import { useRouter } from "next/router"

const StyledWrapper = styled.main`
  height: 100vh;
  padding: 5vw;
  width: 100%;
`

const StyledRoomsGrid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  height: auto;
  margin: 30px 0 0;
  min-height: 100px;
  width: max-content;
`
const StyledRoom = styled.button`
  height: 80px;
  width: 80px;
`

const rooms = [
  { name: "Room 1", slug: "room-1" },
  { name: "Room 2", slug: "room-2" },
]

const Dashboard: React.FC = () => {
  const router = useRouter()
  const handleRoom = slug => {
    router.push(`/rooms/${slug}`)
  }
  return (
    <UserContext.Consumer>
      {({ user }) => {
        return (
          <StyledWrapper>
            <h3>Hello, {user}</h3>
            <StyledRoomsGrid>
              {rooms.map(({ name, slug }) => {
                return (
                  <StyledRoom onClick={() => handleRoom(slug)}>
                    {name}
                  </StyledRoom>
                )
              })}
            </StyledRoomsGrid>
          </StyledWrapper>
        )
      }}
    </UserContext.Consumer>
  )
}

export default Dashboard
