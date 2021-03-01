import styled from "styled-components"
import { motion } from "framer-motion"
import Input from "@/components/input/input"
import React, { useState } from "react"

const StyledContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.light.white};
  border-radius: 10px;
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.3);
  height: auto;
  min-height: 30vh;
  opacity: 0;
  padding: 30px 0 0;
  width: 25vw;
`
const StyledName = styled.h4`
  font-size: 2em;
  font-weight: 400;
  margin: 0 30px;
`

const InputsContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: auto;
  margin: 30px 0 0;
  padding: 0 30px;
  min-height: 20vh;
  width: 100%;
`
const ButtonsContainer = styled.div`
  display: flex;
  height: auto;
  min-height: 50px;
  width: 100%;
`
const CTAButton = styled.button`
  color: #000;
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: 100%;
  padding: 15px 30px;
  width: 50%;

  &:hover {
    background-color: #f6f6f6;
  }
  &:focus {
    outline: none;
  }
`
const CancelButton = styled(CTAButton)`
  color: ${({ theme }) => theme.light.warning};
`

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

  return (
    <StyledContainer
      animate={{ y: 0, opacity: 1 }}
      transition={{ from: 30 }}
      variants={variants}
    >
      <StyledName>Create Chat</StyledName>
      <InputsContainer>
        <Input
          label="Chat name"
          value={chatName}
          type="text"
          name="chat"
          onChange={handleChatName}
        />
      </InputsContainer>
      <ButtonsContainer>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <CTAButton>Create</CTAButton>
      </ButtonsContainer>
    </StyledContainer>
  )
}

export default CreateRoom
