import Head from "next/head"
import Hello from "@/components/Hello"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Chat app</title>
      </Head>
      <Hello />
    </div>
  )
}

export default Home
