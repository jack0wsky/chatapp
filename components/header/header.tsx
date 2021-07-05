import React, { useContext } from "react"
import styles from "~/styles/header.module.scss"
import Context from "~/context/context"

const Header: React.FC = () => {
  const ctx = useContext(Context)

  return (
    <header className={styles.container}>
      <button className={styles.toggleTheme} onClick={ctx.toggleTheme}>
        {ctx.theme ? (
          <img src="/sun-light.svg" alt="dark mode icon" />
        ) : (
          <img src="/half-moon.svg" alt="light mode icon" />
        )}
      </button>
    </header>
  )
}

export default Header
