import styled from "styled-components"
import { motion } from "framer-motion"
import Input from "~/components/input/input"
import React, { useState } from "react"
import styles from "~/styles/createRoom.module.scss"

type Props = {
  toggleModal: boolean
  closeModal: () => void
}

const CreateRoom: ({ toggleModal, closeModal }: Props) => JSX.Element = ({
  toggleModal,
  closeModal,
}: Props) => {
  const [chatName, setChatName] = useState("")
  const variants = {
    open: { opacity: 1, scale: 1, y: 0 },
    closed: { opacity: 0, scale: 0, y: 30 },
  }

  const handleChatName = e => {
    setChatName(e.target.value)
  }

  const {
    container,
    name,
    buttonsContainer,
    inputsContainer,
    ctaButton,
    cancelButton,
  } = styles

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={{ from: 30 }}
      variants={variants}
    >
      <div className={container}>
        <h4 className={name}>Create Hello</h4>
        <div className={inputsContainer}>
          <Input
            label="Hello name"
            value={chatName}
            type="text"
            name="chat"
            onChange={handleChatName}
          />
        </div>
        <div className={buttonsContainer}>
          <button className={cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button className={ctaButton}>Create</button>
        </div>
      </div>
    </motion.div>
  )
}

export default CreateRoom
