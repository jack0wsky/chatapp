import React, { Component } from "react"
import styles from "~/styles/sideMenu.module.scss"
import Channel from "~/components/channel/channel"
import { withRouter } from "next/router"
import { io, Socket } from "socket.io-client"
import { RouteComponentProps } from "react-router"

type Channel = {
  name: string
  member: string
}

interface RouterProps extends RouteComponentProps {
  query?: {
    slug: string
  }
}

interface Props {
  channels: Channel[]
  router: RouterProps
}
interface IState {
  currentChat: string
}

class SideMenu extends Component<Props, IState> {
  private socket: Socket

  constructor(props) {
    super(props)
    this.state = {
      currentChat: "test name",
    }
    this.socket = io("http://localhost:3001")
  }

  componentDidUpdate(prevProps, prevState: IState) {
    if (prevState.currentChat !== this.state.currentChat) {
    }
  }

  switchChannels = (name: string) => {
    this.setState({ currentChat: name })
  }

  matchCurrentChannel = (e, className, defaultClass) => {
    const { slug } = this.props.router.query
    const match = this.props.channels.find(channel => channel.name === slug)
    if (match) {
      const links = []
      const allLinks = defaultClass.current.parentNode.children
      links.push(...allLinks)
      links.forEach(link => link.classList.remove(className))
      e.currentTarget.classList.add(className)
    }
  }
  render() {
    const {
      container,
      channelsSection,
      channelsGrid,
      sectionHeader,
      sectionTitle,
      createChannel,
    } = styles

    const { channels } = this.props

    return (
      <div className={container}>
        <div className={channelsSection}>
          <div className={sectionHeader}>
            <h3 className={sectionTitle}>Channels</h3>
            <button className={createChannel}>+</button>
          </div>
          <div className={channelsGrid}>
            {channels.length > 0 ? (
              channels.map(channel => (
                <Channel
                  key={channel.name}
                  matchCurrentChannel={this.matchCurrentChannel}
                  channelName={channel.name}
                  switchChannels={this.switchChannels}
                />
              ))
            ) : (
              <p>Loading channels...</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SideMenu)
