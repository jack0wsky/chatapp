import Provider from "@/context/provider"
import { ContextThemeProvider } from "@/context/themeContext"
import "@/styles/global.scss"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Provider>
        <ContextThemeProvider>
          <Component {...pageProps} />
        </ContextThemeProvider>
      </Provider>
    </>
  )
}

export default MyApp
