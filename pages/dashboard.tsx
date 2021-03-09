import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "@/context/context"
import { useRouter } from "next/router"
import CreateRoom from "@/components/createRoom/createRoom"
import Modal from "@/components/hoc/withModal"
import Friends from "@/components/friends/friends"
import Header from "@/components/header/header"
import withThemeContext from "@/context/themeContext"
import axios from "axios"
import { SERVER_DOMAIN } from "@/constants/index"
import app from "@/constants/firebase"

interface ThemeProps {
  themeState: boolean
}

const StyledWrapper = styled.main<ThemeProps>`
  background-color: ${({ theme, themeState }) =>
    themeState ? theme.dark.background : theme.light.background};
  height: 100vh;
  position: relative;
  width: 100%;
`
const StyledWelcome = styled.h2<ThemeProps>`
  color: ${({ theme, themeState }) =>
    themeState ? theme.dark.text : theme.light.text};
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
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  flex-flow: column;
  justify-content: center;
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
export const RoomName = styled.p<ThemeProps>`
  color: ${({ theme, themeState }) =>
    themeState ? theme.dark.text : theme.light.text};
  margin: 10px 0 0;
`
export const StyledContentWrapper = styled.section`
  height: auto;
  min-height: 60vh;
  padding: 0 5vw;
  width: 100%;
`
const rooms = [
  { name: "Culture Talk", slug: "culture-talk" },
  { name: "Blinders", slug: "blinders" },
]

const Dashboard = ({ state }) => {
  const router = useRouter()
  const ctx = useContext(UserContext)
  const [toggleModal, setModal] = useState(false)
  const [userrname, setUsername] = useState(null)
  const [friends, setFriends] = useState([])

  const getUserFriends = async () => {
    const email = app.auth().currentUser.email
    await axios
      .get(`${SERVER_DOMAIN}/users/${email}`)
      .then(res => {
        if (res.status === 200) setFriends(res.data.friends)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (app.auth().currentUser) {
      const username = app.auth().currentUser.displayName
      setUsername(username)
      ctx.handleUser(username)
    } else {
      router.push("/")
    }
  }, [])

  // @ts-ignore
  useEffect(async () => {
    await getUserFriends()
  }, [])

  const handleRoom = slug => {
    router.push(`/chat/${slug}`)
  }
  const handleModal = () => setModal(!toggleModal)

  return (
    <StyledWrapper themeState={state}>
      <Header />
      <StyledContentWrapper>
        <StyledWelcome themeState={state}>Hello, {ctx.user}</StyledWelcome>
        <Friends friends={friends} themeState={state} />
        <StyledRoomsGrid>
          <StyledRoom onClick={handleModal}>
            <StyledRoomImage>+</StyledRoomImage>
            <RoomName themeState={state}>Add new</RoomName>
          </StyledRoom>
          {rooms.map(({ name, slug }) => {
            return (
              <StyledRoom key={name} onClick={() => handleRoom(slug)}>
                <StyledRoomImage />
                <RoomName themeState={state}>{name}</RoomName>
              </StyledRoom>
            )
          })}
        </StyledRoomsGrid>
        {toggleModal && (
          <Modal>
            <CreateRoom toggleModal={toggleModal} closeModal={handleModal} />
          </Modal>
        )}
      </StyledContentWrapper>
    </StyledWrapper>
  )
}

export default withThemeContext(Dashboard)
