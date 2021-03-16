import React from "react"
import dashboardStyles from "@/styles/dashboard.module.scss"
import chatStyles from "@/styles/chat.module.scss"
import styles from "@/styles/friends.module.scss"

type Props = {
  friends: any
  themeState: boolean
}

const { room, roomImage, roomName } = dashboardStyles
const { title } = chatStyles

const Friends = ({ friends, themeState }: Props) => {
  return (
    <>
      <h2 className={title}>Friends</h2>
      <section
        className={styles.container}
        style={{ gridTemplateColumns: `repeat(${friends.length}, 100px)` }}
      >
        {friends.map(({ name }) => {
          return (
            <div className={room} key={name}>
              <div className={roomImage} />
              <p className={roomName}>{name}</p>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Friends
