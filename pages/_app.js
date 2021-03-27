import Provider from "~/context/provider.tsx"
import "~/styles/global.scss"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
