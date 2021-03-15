import styles from "@/styles/sideMenu.module.scss"

type Props = {
  handleSideMenu: () => any
  toggleSideMenu: boolean
}

const SideMenu = ({ handleSideMenu, toggleSideMenu }: Props) => {
  return (
    <div className={styles.container}>
      <button className={styles.toggleButton} onClick={handleSideMenu} />
    </div>
  )
}

export default SideMenu
