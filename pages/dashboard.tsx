import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import CreateRoom from "@/components/createRoom/createRoom"
import Modal from "@/components/hoc/withModal"
import Friends from "@/components/friends/friends"
import Header from "@/components/header/header"
import Context from "@/context/context"
import axios from "axios"
import { SERVER_DOMAIN } from "@/constants/index"
import app from "@/constants/firebase"
import style from "@/styles/dashboard.module.scss"
import HTMLHead from "@/components/htmlHead/htmlHead"

const Dashboard = () => {
  const router = useRouter()
  const ctx = useContext(Context)
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

  const redirect = dir => router.push(dir)

  useEffect(async () => {
    if (ctx.user) {
      const username = app.auth().currentUser.displayName
      await getUserFriends()
      setUsername(username)
    } else {
      redirect("/")
    }
  }, [ctx.user])

  const handleRoom = slug => {
    redirect(`/chat/${slug}`)
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

  const displayName = ctx.user && ctx.user.displayName

  return (
    <main className={container}>
      <HTMLHead
        title={`Hello, ${ctx.user ? displayName : "Jacek"} - Dashboard`}
      />
      <Header />
      <section className={contentWrapper}>
        <div className={welcome}>Hello, {ctx.user && displayName}</div>
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

export default Dashboard
