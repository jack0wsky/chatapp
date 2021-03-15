import styles from "@/styles/header.module.scss"
import withThemeContext from "@/context/themeContext"

const Header = ({ handleTheme, state }) => {
  return (
    <header className={styles.container}>
      <button className={styles.toggleTheme} onClick={handleTheme}>
        {state ? (
          <img src="/sun-light.svg" alt="dark mode icon" />
        ) : (
          <img src="/half-moon.svg" alt="light mode icon" />
        )}
      </button>
    </header>
  )
}

export default withThemeContext(Header)
