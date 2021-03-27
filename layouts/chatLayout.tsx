import React from "react"
import { useRouter } from "next/router"
import styles from "~/styles/chat.module.scss"
import HTMLHead from "~/components/htmlHead/htmlHead"

type Props = {
  toggleSideMenu: boolean
  children: React.ReactChildren
}

const ChatLayout: React.FC = ({ toggleSideMenu = true, children }: Props) => {
  const router = useRouter()
  const { container, containerToggle } = styles
  return (
    <main
      className={
        toggleSideMenu ? `${container} ${containerToggle}` : `${container}`
      }
    >
      <HTMLHead title={router.query.slug} />
      {children}
    </main>
  )
}

export default ChatLayout
