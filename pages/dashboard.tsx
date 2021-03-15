import React, { useContext, useEffect, useState } from "react"
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
import style from "@/styles/dashboard.module.scss"
import HTMLHead from "@/components/htmlHead/htmlHead"

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

  useEffect(async () => {
    if (app.auth().currentUser) {
      const username = app.auth().currentUser.displayName
      await getUserFriends()
      setUsername(username)
    }
  }, [])

  const handleRoom = slug => {
    router.push(`/chat/${slug}`)
  }
  const handleModal = () => setModal(!toggleModal)

  const {
    container,
    contentWrapper,
    welcome,
    roomsGrid,
    room,
    roomImage,
    roomName,
  } = style

  if (!ctx.user) router.push("/")
  return (
    <main className={container}>
      <HTMLHead title={`Hello, ${ctx.user.displayName} - Dashboard`} />
      <Header />
      <section className={contentWrapper}>
        <div className={welcome}>Hello, {ctx.user.displayName}</div>
        <div className={roomsGrid}>
          <div className={room} onClick={handleModal}>
            <div className={roomImage}>+</div>
            <p className={roomName}>Add new</p>
          </div>
          {ctx.rooms.map(({ name, slug }) => {
            return (
              <div className={room} key={name} onClick={() => handleRoom(slug)}>
                <div className={roomImage} />
                <p className={roomName}>{name}</p>
              </div>
            )
          })}
        </div>
        {toggleModal && (
          <Modal>
            <CreateRoom toggleModal={toggleModal} closeModal={handleModal} />
          </Modal>
        )}
      </section>
    </main>
  )
}

export default withThemeContext(Dashboard)
