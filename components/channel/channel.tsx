import React, { useRef, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Context from "~/context/context"
import Link from "next/link"
import styles from "~/styles/channel.module.scss"
import { io } from "socket.io-client"

type Props = {
  channelName: string
  matchCurrentChannel: (
    e: object,
    className: string,
    defaultClass: string | object
  ) => void
  switchChannels: () => void
}

const Channel: ({
  channelName,
  matchCurrentChannel,
  switchChannels,
}: Props) => JSX.Element = ({
  channelName,
  matchCurrentChannel,
  switchChannels,
}: Props) => {
  const { container, isActive } = styles
  const channel = useRef(null)
  const { query } = useRouter()
  const ctx = useContext(Context)
  const socket = io("http://localhost:3001")

  useEffect(() => {
    const { slug } = query
    if (channelName === slug) {
      channel.current.classList.add(isActive)
    }
  }, [])

  const joinChannel = e => {
    switchChannels(channelName)
    matchCurrentChannel(e, isActive, channel)
  }

  return (
    <Link href={`/chat/${channelName}`}>
      <a onClick={e => joinChannel(e)} className={`${container}`} ref={channel}>
        # {channelName}
      </a>
    </Link>
  )
}

export default Channel
