import Head from "next/head"
import Login from "~/components/Login"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Chat app</title>
      </Head>
      <Login />
    </div>
  )
}

export default Home
