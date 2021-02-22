import Head from "next/head"
import Chat from "components/Chat"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat app</title>
      </Head>
      <Chat />
    </div>
  )
}
