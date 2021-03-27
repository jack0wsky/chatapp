import styles from "~/styles/sideMenu.module.scss"
import Channel from "~/components/channel/channel"
import { useRouter } from "next/router"

type Props = {
  handleSideMenu: () => any
  toggleSideMenu: boolean
}

const channels = ["general", "developers"]

const SideMenu = ({ handleSideMenu, toggleSideMenu }: Props) => {
  const {
    container,
    toggleButton,
    channelsSection,
    channelsGrid,
    sectionHeader,
    sectionTitle,
    createChannel,
  } = styles

  const router = useRouter()

  const matchCurrentChannel = (e, className, defaultClass) => {
    const { slug } = router.query
    const match = channels.find(channel => channel === slug)
    if (match) {
      const links = []
      const allLinks = defaultClass.current.parentNode.children
      links.push(...allLinks)
      links.forEach(link => link.classList.remove(className))
      e.currentTarget.classList.add(className)
    }
  }
  return (
    <div className={container}>
      <button className={toggleButton} onClick={handleSideMenu} />
      <div className={channelsSection}>
        <div className={sectionHeader}>
          <h3 className={sectionTitle}>Channels</h3>
          <button className={createChannel}>+</button>
        </div>
        <div className={channelsGrid}>
          {channels.map(channel => (
            <Channel
              matchCurrentChannel={matchCurrentChannel}
              channelName={channel}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideMenu
